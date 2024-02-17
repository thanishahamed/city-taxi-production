import useSWR from "swr";
import { GET, POST, PUT } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";
import { fetcher, processReq } from "../helpers/processRequest";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Alert from "../components/Alert";
import { isEmptyString } from "../utils/validations";
import { tripStatus } from "../utils/configConstants";

const AvailableHires = () => {
    const {isLoggedIn, user, verifyUser} = useContext(AuthContext);
    const hires = useSWR({method: GET, url: API_ROUTE + '/auth/user/pending-hire/' + user.id} , fetcher);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const approveHire = async (hire) => {
        let reqObj = {...hire, driverApproval: 1}

        const trip = await processReq(PUT, API_ROUTE + '/auth/trip/', reqObj);

        navigate('/myTrip', { state: hire });
    }

    const rejectHire = async (hire) => {
        let reqObj = {...hire, tripStatus: user.isPassenger ? tripStatus.rejectedByPassenger : tripStatus.rejectedByDriver}

        const trip = await processReq(PUT, API_ROUTE + '/auth/trip/', reqObj);

        navigate('/history', { state: hire });
    }

    const onSubmitVehicleForm = async (event) => {
        event.preventDefault();

        let requestObject = {};
        let isValidated = false;

        for (let data of event.target) {
            if (data.type === "submit") {
                continue;
            }

            requestObject[data.name] = data.value;

            if (data.required && isEmptyString(data.value)) {
                let camelCaseToNormalCase = data.name.replace(/([A-Z])/g, " $1");
                
                setErrorMessage(camelCaseToNormalCase.toUpperCase() + ' field cannot be empty');
                setIsError(true);
                data.focus();

                isValidated = false;

                break;
            } else {
                isValidated = true;
            }
        }

        
        if (isValidated) {
            setIsLoading(true);

            requestObject.driverId = user.id;

            const response  = await processReq(PUT, API_ROUTE + '/auth/user/assign/vehicle/', requestObject);

            // console.log(response);
            if (response.error) {
                setErrorMessage(response.message);
                setIsError(true);
            } else if (response.id) {
                verifyUser();
            } else {
                setErrorMessage('Failed! Something went wrong!');
                setIsError(true);
            }

            setIsLoading(false);
        }
    }


    return (
        <div>
            {
                (user.isDriver || user.isOwner) && !user.vehicle ? 
                <div>
                    <div className="text-4xl pb-8 text-red-800 font-semibold">Register Your Vehicle</div>
                    <Alert isShow={isError} setIsShow={setIsError} message={errorMessage} />
                    <form onSubmit={onSubmitVehicleForm} noValidate>
                        <div className="pb-4">
                            <div className="pb-1">Vehicle Number</div>
                            <Input name={'vehicleNumber'} className='w-full' placeholder="eg: AAA-XXXX" type="email" required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Color</div>
                            <Input name={'color'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Description</div>
                            <Input name={'description'} placeholder="Name and description" className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <Button type={'submit'} className={'w-full mt-4'}>Update Vehicle</Button>
                        </div>
                    </form>
                </div>
                : 

                hires.isLoading ? "Loading..." :
                <div>
                    <div className="text-2xl text-red-700 font-semibold">Available Hire List</div>
                    <div className=" text-slate-900">Pickup a hire</div>
                    
                    <Table masterData={hires.data} headers={['placeFrom', 'placeTo']} actionButtons={[
                        {label: 'Approve', action: approveHire, style: 'success'},
                        {label: 'Reject', action: rejectHire, style: 'danger'}
                    ]}/>
                </div>
            }
        </div>
    )
}


export default AvailableHires;