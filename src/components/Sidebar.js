import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { useEffect, useState } from "react";

function Sidebar(props) {
    const [activeRoute, setActiveRoute] = useState('');
    const navigate = useNavigate();
    const navs = [
        {
            id: 1,
            label: "Dashboard",
            route: "",
            icon: "",
            isActive: false,
        },
        // {
        //     id: 2,
        //     label: "Notifications",
        //     route: "home",
        //     icon: "",
        //     isActive: false,
        // },
        {
            id: 3,
            label: "Drivers",
            route: "driver",
            icon: "",
            isActive: false,
        },
        // {
        //     id: 5,
        //     label: "Owners",
        //     route: "owner",
        //     icon: "",
        //     isActive: false,
        // },
        {
            id: 4,
            label: "Passengers",
            route: "passenger",
            icon: "",
            isActive: false,
        },
        {
            id: 6,
            label: "Operators",
            route: "operator",
            icon: "",
            isActive: false,
        },
        {
            id: 7,
            label: "Vehicles",
            route: "vehicle",
            icon: "",
            isActive: false,
        },
        {
            id: 8,
            label: "Payments",
            route: "payment",
            icon: "",
            isActive: false,
        }
    ];

    const switchRoute = (route) => {
        navigate(route);
        setActiveTab();
    }

    const setActiveTab = () => {
        setActiveRoute(window.location.pathname.split('/')[1]);
    }

    useEffect(() => {
        setActiveTab();
    }, []);

    return (
        <div className="h-full px-4 bg-yellow-400 rounded-md">
            <div className="p-5 cursor-pointer"><img src={logo} width={50} alt={'CLC'} onClick={() => switchRoute(navs[0].route)}/> City Taxi</div>
            <ul>{navs.map(nav => (<li key={nav.id} className={`cursor-pointer text-slate-100 hover:bg-yellow-900 ease-in duration-100 rounded-md px-4 py-2 m-2 ${('/' + activeRoute) === nav.route ? "bg-slate-900" : "bg-slate-800"}`} onClick={() => switchRoute(nav.route)}>{nav.label}</li>))}</ul>
            {!props.hidden ? <div className="md:hidden" style={{height: '100vh', width: '100vw', position: 'fixed', top: 0, zIndex: -3, backdropFilter: 'blur(5px)'}} onMouseEnter={() => props.setHidden(true)}></div> : ''}
        </div>

    );
}

export default Sidebar;