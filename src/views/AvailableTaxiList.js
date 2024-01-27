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
        <div>
            Available Taxies for trip {trip ? trip.id : ''}

            {
                !availableTaxis.isLoading ? 
                    <Table 
                        headers={['id', 'firstName', 'description', 'vehicleNumber']}
                        masterData={availableTaxis.data}
                        showRatingCell={true}
                        actionButtons={[{label: 'Reserve', action: reserveTaxi, style: 'success'}]}
                    />
                : ''
            }
        </div>
    )
}

export default AvailableTaxiList;