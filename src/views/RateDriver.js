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
        <div>
            <div>Rate</div>
            <div className="pb-4">
                <div className="pb-1">Comment</div>
                <Input className='w-full' onChange={(event) => setComment(event.target.value)} value={comment}/>
            </div>
            <div className="flex">
                <Button onClick={() => onRate(1)}>1</Button>
                <Button onClick={() => onRate(2)}>2</Button>
                <Button onClick={() => onRate(3)}>3</Button>
                <Button onClick={() => onRate(4)}>4</Button>
                <Button onClick={() => onRate(5)}>5</Button>
            </div>
        </div>
    )
}

export default RateDriver;