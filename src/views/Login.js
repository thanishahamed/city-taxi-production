import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Input from "../components/Input";
import Alert from "../components/Alert";
import { isEmptyString } from "../utils/validations";

const Login = () => {
    const {login, isLoggedIn} = useContext(AuthContext);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [])

    const onSubmit = async (event) => {
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

            const failed = await login(requestObject.username, requestObject.password);
        
            if (!failed) {
                navigate('/')
            } else {
                setIsError(true);
                setErrorMessage(failed);
            }
            
            setIsLoading(false);
        }
    }

    return (
        <div className="md:px-20 m-auto h-screen md:w-1/2 md:p-10 pt-20">
            {!isLoggedIn ? 
                <div>
                    <div className="bg-yellow-100 backdrop-blur border-4 p-10 border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                        <Button size="sm" style={'light'} className={'mb-4'} onClick={() => {navigate('/')}}>Back to Home</Button>
                        <div className="text-4xl pb-8">Login</div>
                        <Alert isShow={isError} setIsShow={setIsError} message={errorMessage} />
                        <form onSubmit={onSubmit} noValidate>
                            <div className="pb-4">
                                <div className="pb-1">User Name / Email</div>
                                <Input name={'username'} className='w-full' required />
                            </div>

                            <div className="pb-4">
                                <div className="pb-1">Password</div>
                                <Input name={'password'} className='w-full' type='password' required />
                            </div>

                            <div className="pb-4">
                                <Button type={'submit'} className={'w-full mt-4'} isLoading={isLoading} disabled={isLoading}>Login</Button>
                            </div>
                        </form>
                    </div>
                    {/* <LoadingIndicator className={''} isLoading={isLoading}/> */}
                    {/* <div className="text-3xl">Login</div> */}
                    {/* <Button onClick={onSubmit}>Submit To Login</Button> */}
                </div>
            : ''}
        </div>
    )
    
}

export default Login;