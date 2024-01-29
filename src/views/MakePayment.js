import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { processReq } from "../helpers/processRequest";
import { POST, PUT } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import { paymentStatus, tripStatus } from "../utils/configConstants";
import dayjs from "dayjs";

const MakePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const onConfirmPayment = async () => {
        let paymentObject = {
            id: location.state.paymentId,
            toBePaid: 0,
            paidAmount: location.state.cost,
            paymentStatus: paymentStatus.paid,
            paidDate: dayjs().format('YYYY-MM-DD hh:mm:ss')
        }

        let tripObject = {
            id: location.state.id,
            tripStatus: tripStatus.finishedPaid
        }

        const payment = await processReq(PUT, API_ROUTE + "/auth/payment", paymentObject);
        const tripResponse = await processReq(PUT, API_ROUTE + "/auth/trip", tripObject);

        if (payment === 1 && tripResponse === 1) {
            navigate('/trip/rate', {state: location.state});
        }
    }

    return <div>
        <div className="md:px-20 m-auto md:w-2/3 md:p-10">
            <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-200/50 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                <div className="text-4xl pb-8 text-red-800 font-semibold text-center">Make Payment</div>
                <div className="shadow-xl rounded-lg p-4 md:p-8 bg-slate-50/80">
                    <div className="text-4xl pb-8 text-slate-800 font-semibold text-center">Rs. {location.state.cost}</div>
                    <div><Button style='success' className={'w-full'} onClick={onConfirmPayment}>Confirm and Pay</Button></div>
                </div>
            </div>
        </div>
    </div>
}


export default MakePayment;