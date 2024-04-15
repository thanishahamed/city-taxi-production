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

    const getTotalEarning = () => {
        let total = 0;
        let data = result.data;

        if (data && data.length > 0) {
            for (let trans of data) {
                total += trans.paidAmount;
            }
        }

        return "Rs. " + total + ".00";
    }

    return (
        <div className="pop-right">
            <div className="text-4xl pb-8 text-slate-800 font-semibold pop-up">Payments</div>
            <div className="flex gap-5 flex-col md:flex-row pb-10">
                <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl pop-right">
                    <div>Total Earnings</div>
                    <div className="text-4xl">{getTotalEarning()}</div>
                </div>
            </div>
            <div className="border-4 p-10 w-full shadow-xl drop-shadow-sm text-center transition ease-in-out duration-300 rounded-xl">
                    {!result.isLoading ? 
                            <Table 
                                headers={['id', 'totalAmount', 'toBePaid', 'paidAmount', 'paymentStatus']}
                                masterData={result.data}
                                searchBy={'paymentStatus'}
                            />
                        : ''
                    }
            </div>
        </div>
    )
}

export default ManagePayments;