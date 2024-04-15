import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET, PUT } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import useSWR from "swr";
import { fetcher, processReq } from "../helpers/processRequest";
import Table from "../components/Table";

const AvailableTaxiList = ({trip, loadTrip}) => {
    const navigate = useNavigate();
    const availableTaxis = useSWR({method: GET, url: API_ROUTE + '/auth/user/availableDrivers'}, fetcher);
    
    useEffect(() => {
        if (!trip) {
            navigate('/history')
        }
    }, [])

    const reserveTaxi = async (row) => {
        let tripData = {
            ...trip,
            driverId: row.id,
            vehicleId: row.vehicleId
        }

        // delete tripData.tripStartTime;

        const taxi = await processReq(PUT, API_ROUTE + '/auth/trip/', tripData);

        if (taxi === 1) {
            loadTrip();
        } else {
            console.log('Error Occured')
        }
    }

    return (
        <div className="">
            <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-200/50 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                <div className="text-4xl pb-8 text-red-800 font-semibold">Available Taxies</div>
                <div className="text-2xl pb-8 text-slate-800 font-semibold">Trip: {trip ? trip.placeFrom + ' to ' + trip.placeTo : ''}</div>

                {
                    !availableTaxis.isLoading ? 
                        <Table 
                            headers={['id', 'firstName', 'description', 'vehicleNumber']}
                            masterData={availableTaxis.data}
                            showRatingCell={true}
                            actionButtons={[{label: 'Reserve', action: reserveTaxi, style: 'success'}]}
                            searchBy={'firstName'}
                        />
                    : ''
                }
                {console.log(availableTaxis.data)}
            </div>
        </div>
    )
}

export default AvailableTaxiList;