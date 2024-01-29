import { useEffect, useState } from "react";
import { API_ROUTE } from "../utils/commonConstants";
import { GET, POST } from "../utils/requestActionConstants";
import { processReq } from "../helpers/processRequest";
import { createContext } from "react";
import { userRoles } from "../utils/configConstants";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        let token = localStorage.getItem('token');

        if ((token && token.length > 0)) {
            setIsLoggedIn(true);
            verifyUser();
        } else {
            setIsLoggedIn(false);
        }
    }

    const logOut = async () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setUser(null);

        window.location.replace('/')
    }

    const login = async (username, password) => {
        const response = await processReq(POST, API_ROUTE + '/login', {username, password});

        if (response.error) {
            console.log('Processing failed!', response.message);
            localStorage.clear();

            return response.message;
        } else {
            console.log('printing response', response);
            setUser(response);
            localStorage.setItem('token', response.token);
        }
        
        checkAuth();
    }

    const verifyUser = async () => {
        const response = await processReq(POST, API_ROUTE + '/auth/user/verify');

        if (response.error) {
            logOut();
        } else {

            let user = response;

            if (user.role === userRoles.driver || user.role === userRoles.vehicleOwner) {
                const vehicle = await processReq(GET, API_ROUTE + "/auth/user/vehicle/"+user.id);

                user.vehicle = vehicle;
            }

            setUser(user);
        }
    }

    return (
        <AuthContext.Provider value={{logOut, isLoggedIn, login, user, verifyUser: verifyUser}}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;