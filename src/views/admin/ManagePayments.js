import useSWR from "swr";
import Table from "../../components/Table";
import { GET } from "../../utils/requestActionConstants";
import { API_ROUTE } from "../../utils/commonConstants";
import { fetcher } from "../../helpers/processRequest";

const ManagePayments = () => {
    const result = useSWR({method: GET, url: API_ROUTE + '/auth/payment/'}, fetcher);

    const showCommonMessage = () => {
        alert('Service Disabled Due To Testing Purpose')
    }

    return (
        <div className="pop-right">
            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Manage Payments</div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'totalAmount', 'toBePaid', 'paidAmount', 'paymentStatus']}
                                masterData={result.data}
                            />
                        : ''
                    }
            </div>
        </div>
    )
}

export default ManagePayments;