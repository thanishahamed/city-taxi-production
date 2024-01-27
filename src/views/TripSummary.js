import useSWR from "swr";
import { GET } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useLocation } from "react-router-dom";
import { fetcher } from "../helpers/processRequest";

const TripSummary = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const trip = useSWR({method: GET, url: API_ROUTE + "/auth/trip/" + location.state.id} , fetcher); 
    return (
        <div>
            <div>Trip Summary</div>
            {
                trip.isLoading ? "Loading" : 
                <div>{trip.data.tripStatus}</div>
            }
            {console.log(trip.data)}
        </div>
    )
}

export default TripSummary;