import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Login = () => {
    const {login, isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [])

    const onSubmit = async () => {
        const failed = await login('muktharthanish@gmail.com', '1234');
        
        if (!failed) {
            navigate('/')
        } else {
            alert(failed);
        }
    }

    return (
        <div className="md:px-20">
            {!isLoggedIn ? 
                <div>
                    <div className="text-3xl">Login</div>
                    <Button onClick={onSubmit}>Submit To Login</Button>
                </div>
            : ''}
        </div>
    )
    
}

export default Login;