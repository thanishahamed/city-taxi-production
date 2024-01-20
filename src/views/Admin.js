import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const Admin  = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAdmin) {
            
        }
    }, [])

    return (
        <div className="md:px-20">
            {user.isAdmin ?
                <div>
                    <div className="text-3xl">Admin View</div>
                    <Button onClick={() => navigate('/')}>Back to Home</Button>
                </div>
            :
            <div>
                <div>Sorry! Only Admins can access this page!</div>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
            }
        </div>
    )
}

export default Admin;