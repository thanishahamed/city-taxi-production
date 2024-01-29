import useSWR from "swr";
import { GET } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { fetcher } from "../helpers/processRequest";
import Button from "../components/Button";

const TripSummary = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const trip = useSWR({method: GET, url: API_ROUTE + "/auth/trip/" + location.state.id} , fetcher); 
    const navigate = useNavigate();
    
    return (
        <div className="md:px-20 m-auto md:w-2/3 md:p-10">
            <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-200/50 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
            <div className="text-4xl pb-8 text-red-800 font-semibold">Trip Summary</div>
            <div className="shadow-xl rounded-lg p-4 md:p-8 bg-slate-50/80">
                {
                    trip.isLoading ? "Loading" : 
                    <div>
                        <div><span className="font-bold pb-2">- Place From:</span> {trip.data.placeFrom}</div>
                        <div><span className="font-bold pb-2">- Place To:</span> {trip.data.placeTo}</div>
                        <div><span className="font-bold pb-2">- Driver:</span> {trip.data.driver.firstName + ' ' + trip.data.driver.lastName}</div>
                        <div><span className="font-bold pb-2">- Driver Contact Number:</span> {trip.data.driver.telephone}</div>
                        {
                            trip.data.vehicle ?
                            <div>
                                <div><span className="font-bold pb-2">- Vehicle:</span> {trip.data.vehicle.description}</div>
                                <div><span className="font-bold pb-2">- Vehicle Color:</span> {trip.data.vehicle.color}</div>
                                <div><span className="font-bold pb-2">- Vehicle Number:</span> {trip.data.vehicle.vehicleNumber}</div>
                            </div> : ''
                        }

                        {
                            trip.data.payment ?
                            <div>
                                <div><span className="font-bold pb-2">- Trip Cost:</span> Rs. {trip.data.payment.totalAmount}</div>
                                <div><span className="font-bold pb-2">- Paid Amount:</span> Rs. {trip.data.payment.paidAmount}</div>
                                <div><span className="font-bold pb-2">- Payment Status:</span> {trip.data.payment.paymentStatus}</div>
                            </div> : ''
                        }
                    </div>
                }
                <Button className={'w-full mt-5'} onClick={() => navigate('/history')}>Go Back</Button>
            </div>
            {console.log(trip.data)}
            </div>
        </div>
    )
}

export default TripSummary;