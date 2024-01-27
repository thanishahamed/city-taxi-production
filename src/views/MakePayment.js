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
        <div>Make Payment {location.state.id}</div>
        <div><Button style='success' onClick={onConfirmPayment}>Confirm</Button></div>
    </div>
}


export default MakePayment;