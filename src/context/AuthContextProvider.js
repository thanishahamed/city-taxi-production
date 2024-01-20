import { useEffect, useState } from "react";
import { API_ROUTE } from "../utils/commonConstants";
import { POST } from "../utils/requestActionConstants";
import { processReq } from "../helpers/processRequest";
import { createContext } from "react";

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
            console.log('logout called')
        } else {
            setUser(response);
        }
    }

    return (
        <AuthContext.Provider value={{logOut, isLoggedIn, login, user}}>{children}</AuthContext.Provider>
    );
}

export default AuthContextProvider;