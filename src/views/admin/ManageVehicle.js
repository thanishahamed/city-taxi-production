import useSWR from "swr";
import Table from "../../components/Table";
import { GET } from "../../utils/requestActionConstants";
import { API_ROUTE } from "../../utils/commonConstants";
import { fetcher } from "../../helpers/processRequest";

const ManageVehicles = () => {
    const result = useSWR({method: GET, url: API_ROUTE + '/auth/vehicle/'}, fetcher);

    const showCommonMessage = () => {
        alert('Service Disabled Due To Testing Purpose')
    }

    return (
        <div className="pop-right">
            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Manage Vehicle</div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'vehicleNumber', 'color', 'description']}
                                masterData={result.data}
                                actionButtons={[
                                    {label: '', iconClass: 'icon-pencil-square-o text-lg', action: showCommonMessage, style: 'ghost'},
                                    {label: '', iconClass: 'icon-trash text-red-700 text-lg', action: showCommonMessage, style: 'ghost'}
                                ]}
                            />
                        : ''
                    }
            </div>
        </div>
    )
}

export default ManageVehicles;