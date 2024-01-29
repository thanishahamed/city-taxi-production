import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { isEmptyString } from "../utils/validations";
import { driverStatus, userRoles } from "../utils/configConstants";
import LoadingIndicator from "../components/LoadingIndicator";
import Alert from "../components/Alert";
import { processReq } from "../helpers/processRequest";
import { API_ROUTE } from "../utils/commonConstants";
import { POST } from "../utils/requestActionConstants";
import LottieViewer from "../components/LottieViewer";
import SuccessMessageViewer from "../components/SuccessMessageViewer";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDriver, setIsDriver] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const onSubmit = async (event) => {
        event.preventDefault();

        let requestObject = {};
        let isValidated = false;

        for (let data of event.target) {
            if (data.type === "submit") {
                continue;
            }
            if (data.type === 'checkbox') {
                requestObject[data.name] = data.checked ? userRoles.driver : userRoles.passenger;

                if (data.checked) {
                    requestObject.availability = driverStatus.available;
                } else {
                    requestObject.availability = driverStatus.busy;
                }
            } else {
                requestObject[data.name] = data.value;
            }

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

            const response  = await processReq(POST, API_ROUTE + '/register', requestObject);

            console.log(response);
            if (response.length > 0) {
                setIsRegistrationComplete(true);
            }

            setIsLoading(false);
        }

        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 4000)
    }

    return (
        <div className="md:px-20 m-auto md:w-2/3 md:p-10">
            {
            isRegistrationComplete ? 
                <div className="bg-yellow-100 backdrop-blur border-4 p-10 border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-down h-screen flex items-center justify-around flex-col">
                    <div>
                        <SuccessMessageViewer title="Congratulations!" message="Registration Successfull!" className='text-3xl text-center'/> 
                    </div>
                    <div>
                        <LottieViewer lottieName={'particles'} />
                        <LottieViewer lottieName={'successCheck'} loop={true}/>
                    </div>
                    <div>
                        <Button style="success" onClick={() => navigate('/login')} className={'text-3xl rounded-full'}>Login</Button>
                    </div>
                    
                </div>
            : isLoading ? <LoadingIndicator className={'h-screen'} isLoading={isLoading}/> : 
                <div className="bg-yellow-100 backdrop-blur border-4 p-10 border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                    <Button size="sm" style={'light'} className={'mb-4'} onClick={() => {navigate('/')}}>Back to Home</Button>
                    <div className="text-4xl pb-8">Register</div>
                    <Alert isShow={isError} setIsShow={setIsError} message={errorMessage} />
                    <form onSubmit={onSubmit} noValidate>
                        <div className="pb-4">
                            <div className="pb-1">Email</div>
                            <Input name={'email'} className='w-full' type="email" required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">First Name</div>
                            <Input name={'firstName'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Last Name</div>
                            <Input name={'lastName'} className='w-full' required />
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Telephone</div>
                            <Input name={'telephone'} className='w-full' required type="tel"/>
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Password</div>
                            <Input name={'password'} className='w-full' required type="password"/>
                        </div>

                        <div className="pb-4">
                            <div className="pb-1">Address</div>
                            <Input name={'address'} className='w-full' required/>
                        </div>

                        <div className="pb-4">
                            <input type="checkbox" className="mr-2" name={'role'} defaultChecked id="role" onChange={(event) => setIsDriver(event.target.checked)}/>
                            <label className="pb-1" htmlFor="role">Register as a Driver</label>
                        </div>

                        {
                            isDriver ? 
                            <div>
                                <div className="pb-4">
                                    <div className="pb-1">Driving Licence Number</div>
                                    <Input name={'drivingLicenceNo'} className='w-full' required/>
                                </div>
                            </div>
                            : ''
                        }

                        <div className="pb-4">
                            <Button type={'submit'} className={'w-full mt-4'}>Register</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default Register;