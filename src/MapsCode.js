import logo from './logo.svg';
import './App.css';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import {  createContext, useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client';
import { SERVER_ROUTE } from './utils/constants';

export const SocketContext = createContext(null);

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const libraries = ["places"];
const socket = io(SERVER_ROUTE);

function App() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [directionsResponse, setDirectionsResponse] = useState(undefined);
  const destiantionRef = useRef(null);
  const [map, setMap] = useState(null);
  const [textRoute, setTextRoute] = useState(undefined);
  const [currentLiveLocation, setCurrentLiveLocation] = useState({});
  const [trackingIp, setTrackingIp] = useState(undefined);
  const [userName, setUserName] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [room, setRoom] = useState('');

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries:libraries
  });

  useEffect(() => {
    listenToLiveLocation();
    initiateSocket();

    socket.on('receive_message', (response) => {
        setReceivedMessage(response);
    })
  }, [])

  const initiateSocket = () => {
    socket.on("connect", () => {
      // socket.id = "tns-id";
      console.info('socket instance initiated', socket.id);
        sessionStorage.setItem('socketId', socket.id);
    });

    socket.on("disconnect", () => {});
  }

  useEffect(() => {
    console.log(currentLiveLocation);
  }, [currentLiveLocation])

  const listenToLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        setCurrentLiveLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
      }, (error) => {
        console.log('error occured', error);
      }, {
        enableHighAccuracy: true, timeout: 60000
      })
    } else {
      console.log('Goe Location Not Found');
    }
  }

  const locate = (place) => {
    if (place) {
      setCurrentLocation(place);
      console.log(place)
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error); // use a set time out
      } else {
        console.log("Geolocation not supported");
      }
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({lat: latitude, lng: longitude});
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: new window.google.maps.LatLng(center),
      destination: new window.google.maps.LatLng(currentLocation),
      // destination: textRoute,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    console.log(results)
    setDirectionsResponse(results);
  }

  const placeChanged = () => {
    let places = destiantionRef.current.getPlaces();

    if (places) {
      let place = places[0];
      setCurrentLocation({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
    } 
  }

  const sendMessage = () => {
    socket.emit('send_message', {message, room});
  }

  const joinRoom = () => {
    socket.emit('join_room', room);
    fetch('https://dev.melbournfiresafety.com.au/tnsLab/api').then(response => response.json()).then(data => console.log(data));
  }

  return (
    <div className="App">
      <div>Message: <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/><button onClick={sendMessage}>send message</button></div>
      {receivedMessage}
      <div>Room: <input type="text" value={room} onChange={(e) => setRoom(e.target.value)}/><button onClick={joinRoom}>Join Room</button></div>
      <div>User Name: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/></div>
      <div>Destination User Name: <input type="text" value={destinationName} onChange={(e) => setDestinationName(e.target.value)}/></div>
      <div><button>Show Me The Location</button></div>
      <button onClick={() => locate(center)}>Locate Center</button>
      <button onClick={() => locate()}>Locate</button>
      <button onClick={calculateRoute}>Show Route</button>
      <button onClick={() => console.log(destiantionRef.current)}>Show Text Route</button>
      Maps {currentLiveLocation.lat}, {currentLiveLocation.lng}

      {isLoaded ? 
      <div className="col-lg-4">
            <Autocomplete onPlaceChanged={(place) => placeChanged(place)}>
              <input
                type="text"
                name="Destication"
                className="form-control"
                placeholder="Destication"
                ref={destiantionRef}
              />
            </Autocomplete>

            <StandaloneSearchBox onLoad={ref => destiantionRef.current = ref} onPlacesChanged={placeChanged}>
              <input type='text' />
            </StandaloneSearchBox>

      
        <GoogleMap
                center={currentLiveLocation.lat ? currentLiveLocation : center}
                zoom={20}
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
                >

                {directionsResponse ? <DirectionsRenderer directions={directionsResponse} /> : 'not rendering'}
                {currentLiveLocation.lat ? <MarkerF position={currentLiveLocation}/> : ''} 
        </GoogleMap>
        </div>
        :
        "Not yet loaded"
        }
    </div>
  );
}

export default App;
