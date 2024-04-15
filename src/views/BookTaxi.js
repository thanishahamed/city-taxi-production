import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useContext, useRef, useState } from "react";
import { processReq } from "../helpers/processRequest";
import { isEmptyString } from "../utils/validations";
import { API_ROUTE } from "../utils/commonConstants";
import { POST } from "../utils/requestActionConstants";
import Alert from "../components/Alert";
import { AuthContext } from "../context/AuthContextProvider";
import {tripCost, tripStatus, userStatus} from "../utils/configConstants";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { Modal } from "@mui/material";
import Map from "../components/Map";

const libraries = ["places"];

const BookTaxi = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const fromDestinationRef = useRef(null);
    const toDestinationRef = useRef(null);
    const [fromLocation, setFromLocation] = useState({});
    const [toLocation, setToLocation] = useState({});
    const [currentLiveLocation, setCurrentLiveLocation] = useState({});
    const [fromCurrentLocation, setFromCurrentLocation] = useState(false);
    const [routeInfo, setRouteInfo] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [tripInfo, setTripInfo] = useState({});

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_MAPS_API,
        libraries:libraries
      });

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

        setFromCurrentLocation(old => !old);
    }

    const locate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error); // use a set time out
        } else {
            console.log("Geolocation not supported");
        }

        setFromCurrentLocation(old => !old);
    }
    
      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLiveLocation({lat: latitude, lng: longitude});
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }
      
      function error() {
        console.log("Unable to retrieve your location");
      }

    const onSubmit = async (event) => {
        event.preventDefault();

        let requestObject = {};
        let isValidated = false;
        console.log(currentLiveLocation);

        for (let data of event.target) {
            if (data.type === "submit" || data.type === "button") {
                continue;
            }
            
            requestObject[data.name] = data.value;

            if (data.required && isEmptyString(data.value)) {
                let camelCaseToNormalCase = data.name.replace(/([A-Z])/g, " $1");
                
                setErrorMessage(camelCaseToNormalCase.toUpperCase() + ' field cannot be empty');
                setIsError(true);
                data.focus();

                isValidated = false;

                break;
            } else {
                isValidated = true;
            }
        }

        
        if (isValidated) {
            setIsLoading(true);

            let fromLocationClone = fromCurrentLocation ? currentLiveLocation : fromLocation;
            let from = fromLocationClone.lat + ", " + fromLocationClone.lng;
            let to = toLocation.lat + ", " + toLocation.lng;

            requestObject.locationFrom = from;
            requestObject.locationTo = to;
            requestObject.placeFrom = fromCurrentLocation ? from : fromDestinationRef.current.getPlaces()[0].formatted_address;
            requestObject.placeTo = toDestinationRef.current.getPlaces()[0].formatted_address;

            if (user.isOperator) {
                let requestObj1 = {
                    firstName: requestObject.firstName,
                    address: requestObject.address,
                    telephone: requestObject.telephone,
                    status: userStatus.unregistered
                }

                const newUser  = await processReq(POST, API_ROUTE + '/register', requestObj1);

                delete requestObject.firstName;
                delete requestObject.address
                delete requestObject.telephone

                requestObject = {
                    ...requestObject, 
                    createdBy: user.id,
                    passengerId: newUser[0],
                    tripStatus: tripStatus.waitingForDriver
                }
            } else {
                requestObject = {
                    ...requestObject, 
                    createdBy: user.id,
                    passengerId: user.id,
                    tripStatus: tripStatus.waitingForDriver
                }
            }

            const response  = await processReq(POST, API_ROUTE + '/auth/trip', requestObject);

            if (response.length > 0) {
                navigate('/myTrip', { state: {id: response[0]} });
            } else {
                setIsError(true);
                setErrorMessage(response.message);
            }

            setIsLoading(false);
        }
    }

    const fromPlaceChanged = () => {
        let places = fromDestinationRef.current.getPlaces();

        if (places) {
            let place = places[0];
            let location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}

            setFromLocation(location)
        } 
    }

    const toPlaceChanged = () => {
        let places = toDestinationRef.current.getPlaces();

        if (places) {
            let place = places[0];
            let location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}

            setToLocation(location)
        } 
    }

    async function calculateRoute() {
        setModalOpen(true)
        // if (window.google) {
        //     try {
        //         const directionsService = new window.google.maps.DirectionsService();
        //         const from = {lat: fromLocation.lat, lng: fromLocation.lat}
        //         const to = {lat: toLocation.lat, lng: toLocation.lng}

        //         const results = await directionsService.route({
        //             origin: new window.google.maps.LatLng(from),
        //             destination: new window.google.maps.LatLng(to),
        //             // destination: textRoute,
        //             travelMode: window.google.maps.TravelMode.DRIVING,
        //         });

        //         let info = results.routes[0].legs[0];

        //         setRouteInfo({...info, cost: Math.round(info.distance.value * tripCost.perMeter)});
        //         // setTripInfo({...info, cost: Math.round(info.distance.value * tripCost.perMeter)});
        //     } catch (error) {
        //         console.log(error)
        //         alert("Map Loading Failed! Please Press Reload Button To Locate You")
        //     }
        // }
    }

    const closeModalFn = (event) => {
        setModalOpen(false);
    }

    return(
        <div className="shadow-xl rounded-lg p-4 md:p-8 bg-slate-50/80">
            <div className="text-3xl">Book A Taxi!</div>
            <div>
            <Modal
                open={modalOpen}
                onClose={() => closeModalFn()}
            >
                <div>
                    <div className="flex justify-end pt-5 pr-5"><Button style="danger" onClick={()=>setModalOpen(false)}>Close</Button></div>
                    <div className="relative mt-5">
                        <Map trip={{locationFrom: `${fromLocation.lat}, ${fromLocation.lng}`, locationTo: `${toLocation.lat}, ${toLocation.lng}`}} setTripInfo={setTripInfo} disabled={true}/>
                    </div>
                </div>
            </Modal>
                <Alert isShow={isError} setIsShow={setIsError} message={errorMessage} />
                    {
                        isLoaded ?
                        <div>
                            <form noValidate onSubmit={onSubmit}>
                                {
                                    user.isOperator ? <div>
                                        <div className="pb-4">
                                            <div className="pb-1">First Name</div>
                                            <Input name={'firstName'} className='w-full' required />
                                        </div>

                                        <div className="pb-4">
                                            <div className="pb-1">Telephone</div>
                                            <Input name={'telephone'} placeholder='eg: 94777277234' className='w-full' required type="tel"/>
                                        </div>

                                        <div className="pb-4">
                                            <div className="pb-1">Address</div>
                                            <Input name={'address'} className='w-full' required/>
                                        </div>
                                    </div> : ''
                                }

                                <div className="pb-4">
                                    <div className="pb-1">Location From:</div>
                                    <Button type={'button'} size="sm" style={fromCurrentLocation ? 'danger' : 'success'} className={'my-3'} onClick={locate}>{fromCurrentLocation ? "Click to disable using current location" : "Use Current Location"}</Button>
                                    {fromCurrentLocation ? currentLiveLocation.lat ? currentLiveLocation.lat + " - " + currentLiveLocation.lng : 'Loading Current Location...' : ''}
                                    <StandaloneSearchBox onLoad={ref => fromDestinationRef.current = ref} onPlacesChanged={fromPlaceChanged}>
                                        <Input name={'locationFrom'} className='w-full' required={!fromCurrentLocation} disabled={fromCurrentLocation}/>
                                    </StandaloneSearchBox>
                                </div>

                                <div className="pb-4">
                                    <div className="pb-1">Location To:</div>
                                    <StandaloneSearchBox onLoad={ref => toDestinationRef.current = ref} onPlacesChanged={toPlaceChanged}>
                                        <Input name={'locationTo'} className='w-full' required />
                                    </StandaloneSearchBox>
                                </div>
                                
                                <div className="pb-4">
                                    <div className="pb-1">Trip Start Request Time</div>
                                    <Input name={'tripStartTime'} className='w-full' type="datetime-local" required />
                                </div>

                                <div>
                                    <Button type={'button'} disabled={!(fromLocation.lat && toLocation.lat)} onClick={calculateRoute}>View Estimate</Button>
                                </div>

                                <Button type={'submit'} className={'mt-5 w-full'}>Book Now!</Button>
                            </form>
                        </div> 
                        : ''
                    }
                
            </div>
        </div>
    )
}

export default BookTaxi;