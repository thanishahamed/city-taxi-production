import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const BookTaxi = () => {
    const navigate = useNavigate();
    const onClickShowTaxiList = () => {
        navigate('/availability')
    }

    return(
        <div>
            <div className="text-3xl">Book A Taxi!</div>
            <div>
                <div>
                    <div>From</div>
                    <Input />
                </div>
                <div>
                    <div>To</div>
                    <Input />
                </div>
                <Button onClick={onClickShowTaxiList}>Book Now!</Button>
            </div>
        </div>
    )
}

export default BookTaxi;