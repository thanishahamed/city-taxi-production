import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContextProvider";

const BottomNavigation = () => {
    const [activeRoute, setActiveRoute] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const setActiveTab = () => {
        setActiveRoute(window.location.pathname.split('/')[1]);
    }

    useEffect(() => {
        setActiveTab();
    }, []);

    const changeRoute = (route) => {
        navigate(route);
        setActiveTab();
    }

    return (
        <div className="flex sticky bottom-0 bg-slate-100 text-center pop-up md:rounded-full overflow-hidden">
            <div style={{transition: '0.3s'}} className={`flex-1 hover:bg-slate-300 cursor-pointer py-5 ${('/' + activeRoute) === '/' ? "bg-slate-800 hover:bg-slate-800 text-slate-50" : "bg-slate-100"}`} onClick={() => changeRoute('/')}>Home</div>
            <div style={{transition: '0.3s'}} className={`flex-1 hover:bg-slate-300 cursor-pointer py-5 ${('/' + activeRoute) === '/history' ? "bg-slate-800 hover:bg-slate-800 text-slate-50" : "bg-slate-100"}`} onClick={() => changeRoute('/history')}>{user.isPassenger ? 'My Trips' : 'My Hires'}</div>
            {/* <div style={{transition: '0.3s'}} className={`flex-1 hover:bg-slate-300 cursor-pointer py-5 ${('/' + activeRoute) === '/payments' ? "bg-slate-800 hover:bg-slate-800 text-slate-50" : "bg-slate-100"}`} onClick={() => changeRoute('/payments')}>Payments</div> */}
            <div style={{transition: '0.3s'}} className={`flex-1 hover:bg-slate-300 cursor-pointer py-5 ${('/' + activeRoute) === '/settings' ? "bg-slate-800 hover:bg-slate-800 text-slate-50" : "bg-slate-100"}`} onClick={() => changeRoute('/settings')}>More</div>
        </div>
    );
}

export default BottomNavigation;