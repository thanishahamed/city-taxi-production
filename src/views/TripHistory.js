import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import useSWR from "swr";
import { GET } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import { fetcher } from "../helpers/processRequest";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const TripHistory = () => {
    const {user} = useContext(AuthContext);
    const route = user.isPassenger || user.isOperator ? '/auth/user/trips/' : '/auth/user/hire/';
    const trips = useSWR({method: GET, url: API_ROUTE + (user.isOperator ? '/auth/trip/' : route + user.id)} , fetcher);
    const navigate = useNavigate();

    const loadTrip = (trip) => {
        navigate('/myTrip', { state: trip })
    }

    const actionButtonArray = [{label: 'View', action: loadTrip, style: 'success'}];
    
    return (
        <div>
            <div className="md:px-20 m-auto md:w-2/3 md:p-10">
                <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                    <div className="text-3xl">{user.isPassenger ? 'Trip History' : 'Hire History'}</div>
                    {

                        trips.isLoading ? "Loading..." :
                        <Table masterData={trips.data} headers={['placeFrom', 'placeTo']} actionButtons={actionButtonArray}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default TripHistory;