import useSWR from "swr";
import Table from "../../components/Table";
import { GET } from "../../utils/requestActionConstants";
import { API_ROUTE } from "../../utils/commonConstants";
import { fetcher } from "../../helpers/processRequest";

const ManageOwners = () => {
    const result = useSWR({method: GET, url: API_ROUTE + '/auth/user/owner'}, fetcher);

    const showCommonMessage = () => {
        alert('Service Disabled Due To Testing Purpose')
    }

    return (
        <div className="pop-right">
            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Manage Owners</div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'email', 'firstName', 'lastName', 'telephone', 'drivingLicenceNo', 'address', 'status', 'availability']}
                                masterData={result.data}
                                showRatingCell={true}
                                actionButtons={[
                                    {label: '', iconClass: 'icon-pencil-square-o text-lg', action: showCommonMessage, style: 'ghost'},
                                    {label: '', iconClass: 'icon-trash text-red-700 text-lg', action: showCommonMessage, style: 'ghost'}
                                ]}
                                searchBy={'email'}
                            />
                        : ''
                    }
            </div>
        </div>
    )
}

export default ManageOwners;