import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import {  createContext, useContext, useEffect, useRef, useState } from "react"
import { io } from 'socket.io-client';
import { SERVER_ROUTE } from '../utils/commonConstants';
import Button from './Button';
import driverIcon from '../assets/marker.png';
import userIcon from '../assets/user.png';
import { tripCost } from '../utils/configConstants';
import { AuthContext } from "../context/AuthContextProvider";

export const SocketContext = createContext(null);

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const libraries = ["places"];
const socket = io(SERVER_ROUTE);

function Map({trip, setTripInfo}) {
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
  const [routeInfo, setRouteInfo] = useState(undefined);
  const {user} = useContext(AuthContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
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
    // This area is to communicate with the websocket
    // console.log(currentLiveLocation);
  }, [currentLiveLocation])


  useEffect(() => {
    if (trip.locationFrom) {
      // console.log('calculating', trip)
      calculateRoute();
    }
  }, [trip.locationFrom])

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
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      const from = {lat: parseFloat(trip.locationFrom.split(', ')[0]), lng: parseFloat(trip.locationFrom.split(', ')[1])}
      const to = {lat: parseFloat(trip.locationTo.split(', ')[0]), lng: parseFloat(trip.locationTo.split(', ')[1])}
  
      const results = await directionsService.route({
        origin: new window.google.maps.LatLng(from),
        destination: new window.google.maps.LatLng(to),
        // destination: textRoute,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
  
      let info = results.routes[0].legs[0];
  
      setRouteInfo({...info, cost: Math.round(info.distance.value * tripCost.perMeter)});
      setTripInfo({...info, cost: Math.round(info.distance.value * tripCost.perMeter)});
  
      setDirectionsResponse(results);
    }
  }

  // const placeChanged = () => {
  //   let places = destiantionRef.current.getPlaces();

  //   if (places) {
  //     let place = places[0];
  //     setCurrentLocation({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  //   } 
  // }

  const sendMessage = () => {
    socket.emit('send_message', {message, room});
  }

  const joinRoom = () => {
    socket.emit('join_room', room);
    fetch('https://dev.melbournfiresafety.com.au/tnsLab/api').then(response => response.json()).then(data => console.log(data));
  }

  const routeMe = () => {
    // let url = "https://www.google.com/maps/dir/'7.2905715,80.6337262'/'7.226803299999998,80.1958755'/@7.3516569,80.2204329,11z/data=!3m1!4b1!4m10!4m9!1m3!2m2!1d80.6337262!2d7.2905715!1m3!2m2!1d80.1958755!2d7.2268033!3e0?entry=ttu"
    let location = user.isDriver || user.isOwner ? trip.locationFrom : trip.locationTo;
    let url = "https://www.google.com/maps/dir/Current+Location/'"+ location +"'/"
    console.log('printing url', url)
    window.open(url, "_blank", "noreferrer");
  }

  return (
    <div className="p-4">
      {/* <div>Message: <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/><button onClick={sendMessage}>send message</button></div>
      {receivedMessage} */}
      {/* <div className='p-2'>Room: <input type="text" value={room} onChange={(e) => setRoom(e.target.value)}/><button onClick={joinRoom}>Join Room</button></div>
      <div className='p-2'>User Name: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/></div>
      <div className='p-2'>Destination User Name: <input type="text" value={destinationName} onChange={(e) => setDestinationName(e.target.value)}/></div> */}
      
      {/* <Button onClick={() => locate(center)}>Locate Center</Button>
      <Button onClick={() => locate()}>Locate</Button> */}
      
      {/* <Button onClick={calculateRoute}>Show Route</Button> */}
      <div className='bg-slate-100/90 absolute top-0 z-10 mt-4'>
        <div>{routeInfo ? routeInfo.distance.text : 'Loading Distance'}</div>
        <div>{routeInfo ? routeInfo.duration.text : 'Loading Duration'}</div>
        <div>Estimated Cost: {routeInfo ? routeInfo.cost + " LKR" : 'Loading Cost'}</div>
        <Button onClick={routeMe}>Route me on google maps</Button>
      </div>

      {isLoaded ? 
      <div className="">
        <GoogleMap
                center={currentLiveLocation.lat ? currentLiveLocation : center}
                zoom={20}
                mapContainerStyle={{ width: "100%", height: "calc(100vh - 100px)" }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
                >

                {directionsResponse ? <DirectionsRenderer directions={directionsResponse} /> : 'not rendering'}
                {currentLiveLocation.lat ? <MarkerF icon={user.isDriver || user.isOwner ? driverIcon : userIcon} position={currentLiveLocation}/> : ''} 
        </GoogleMap>
        </div>
        :
        "Not yet loaded"
        }
    </div>
  );
}

export default Map;
