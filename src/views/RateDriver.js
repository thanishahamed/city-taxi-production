import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { processReq } from "../helpers/processRequest";
import { API_ROUTE } from "../utils/commonConstants";
import { POST } from "../utils/requestActionConstants";
import Input from "../components/Input";

const RateDriver = () => {
    const location = useLocation();
    const {user} = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const onRate = async (val) => {
        let rateObject = {
            ratingValue: val,
            ratedBy: user.id,
            driverId: location.state.driverId,
            comment: comment,
            tripId: location.state.id
        }

        const rating = await processReq(POST, API_ROUTE + "/auth/rating", rateObject);

        if (rating.length > 0) {
            navigate('/trip/details', {state: location.state});
        }
    }

    return (
        <div className="md:px-20 m-auto md:w-2/3 md:p-10">
            <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-200/50 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                <div className="text-4xl pb-8 text-red-800 font-semibold text-center">Rate Driver</div>
                <div className="shadow-xl rounded-lg p-4 md:p-8 bg-slate-50/80">
                    <Input className='w-full h-20' onChange={(event) => setComment(event.target.value)} value={comment} placeholder="Add a feedback here and click on a rate button"/>
                    <div className="flex gap-1 pt-6 justify-center">
                        <Button style="success" onClick={() => onRate(1)}>1</Button>
                        <Button style="success" onClick={() => onRate(2)}>2</Button>
                        <Button style="success" onClick={() => onRate(3)}>3</Button>
                        <Button style="success" onClick={() => onRate(4)}>4</Button>
                        <Button style="success" onClick={() => onRate(5)}>5</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateDriver;