import { useLocation, useNavigate } from "react-router-dom";
import AvailableTaxiList from "./AvailableTaxiList";
import { useContext, useEffect, useState } from "react";
import { fetcher, processReq } from "../helpers/processRequest";
import { API_ROUTE } from "../utils/commonConstants";
import { GET, POST, PUT } from "../utils/requestActionConstants";
import SuccessMessageViewer from "../components/SuccessMessageViewer";
import LottieViewer from "../components/LottieViewer";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContextProvider";
import useSWR from "swr";
import LoadingIndicator from "../components/LoadingIndicator";
import { paymentStatus, tripStatus } from "../utils/configConstants";
import Map from "../components/Map";

const MyTrip = () => {
    const location = useLocation();
    // const [trip, setTrip] = useState({});
    // const [updatedTrip, setUpdatedTrip] = useState(false);
    const [tripReserved, setTripReserved] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const trip = useSWR({method: GET, url: API_ROUTE + '/auth/trip/' + location.state.id} , fetcher);
    const [tripInfo, setTripInfo] = useState({});

    useEffect(() => {
        if (!trip.isLoading && trip.data.tripStatus === tripStatus.finishedPaid) {
            navigate('/trip/details', {state: trip.data});
        }
    }, [trip.data]);

    const loadTrip = async () => {
        trip.mutate();
        setTripReserved(true);
    }

    const routeToMakePayment = async () => {
        let paymentObject = {
            tripId: trip.data.id,
            totalAmount: tripInfo.cost,
            toBePaid: tripInfo.cost,
            paidAmount: 0,
            paymentStatus: paymentStatus.toBePaid,
        }

        let tripObject = {
            id: trip.data.id,
            tripStatus: tripStatus.finished
        }

        const payment = await processReq(POST, API_ROUTE + "/auth/payment", paymentObject);
        const tripResponse = await processReq(PUT, API_ROUTE + "/auth/trip", tripObject);

        if (payment.id && tripResponse === 1) {
            navigate('/payments/create', {state: {...trip.data, paymentId: payment.id, cost: tripInfo.cost}});
        }
    }

    const cancelTrip = () => {

    }

    const startTrip = async () => {
        let tripObject = {tripStatus: tripStatus.started, id: trip.data.id};

        const tripResponse = await processReq(PUT, API_ROUTE + "/auth/trip", tripObject);

        if (tripResponse === 1) {
            trip.mutate();
        }
    }

    const viewSummary = () => {

    }

    if (user.isPassenger || user.isOperator) {
        return (
            <div className="relative">
                {
                    trip.isLoading ? <LoadingIndicator isLoading={true}/> :
                    
                    !trip.data.driverApproval ?
                        <div>
                            {
                                trip.data.driverId || tripReserved ? 
                                    <div style={{height: 'calc(100vh - 100px)'}} className="bg-yellow-100 backdrop-blur border-4 p-10 border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-down flex items-center justify-around flex-col">
                                        <div>
                                            <SuccessMessageViewer title="Your Trip Created!" message="Waiting for driver..." className='text-3xl text-center leading-10 animate-pulse animate-ping'/> 
                                            <LoadingIndicator isLoading={true}/>
                                        </div>
                                        <div>
                                            {/* <LottieViewer lottieName={'particles'} /> */}
                                            <LottieViewer lottieName={'successCheck'} loop={false}/>
                                        </div>
                                        <div>
                                            {/* <Button style="success" onClick={() => setTrip(updatedTrip)} className={'text-3xl rounded-full'}>Continue</Button> */}
                                        </div>
                                        
                                    </div>
                                : <AvailableTaxiList trip={trip.data} loadTrip={loadTrip}/>
                            }
                        </div>
                    : 
                    <div>
                        <div><Map trip={trip.data} setTripInfo={setTripInfo}/></div>
                        <div className="absolute bottom-20 text-center w-full flex justify-center">
                            <div>
                                {
                                    !trip.isLoading ? 
                                    <div>
                                        {trip.data.tripStatus === tripStatus.started ?
                                            <Button style="danger" onClick={routeToMakePayment}>End Trip</Button>
                                        : 
                                            <div>
                                                {
                                                    user.isDriver || user.isOwner ?
                                                    <Button style="success" onClick={startTrip}>Start Trip</Button>
                                                    :''
                                                }
                                                {
                                                    trip.data.tripStatus === tripStatus.finished ?
                                                    <Button style="danger" onClick={routeToMakePayment}>Make Payment</Button>   
                                                    : trip.data.tripStatus === tripStatus.finishedPaid ?
                                                        <Button style="danger" onClick={viewSummary}>View Summary</Button>
                                                    : <Button style="danger" onClick={cancelTrip}>Cancel Trip</Button>
                                                }
                                                
                                            </div>
                                        }
                                    </div>
                                    : 'Loading...'
                                }
                                
                                
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div className="relative">
                {
                    !trip.isLoading ? 
                    <div>
                        <div><Map trip={trip.data} setTripInfo={setTripInfo}/></div>
                        <div className="absolute bottom-20 text-center w-full flex justify-center">
                            <div>
                            {
                                trip.data.tripStatus === tripStatus.started ?
                                <Button style="danger" onClick={routeToMakePayment}>End Trip</Button>
                                : 
                                <div>
                                    <Button style="success" onClick={startTrip}>Start Trip</Button>
                                    <Button style="danger" onClick={cancelTrip}>Cancel Trip</Button>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                    : 'Loading...'
                }
                
            </div>
        )
    }
}

export default MyTrip;