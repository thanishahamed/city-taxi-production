import React, {useContext, useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import WebPage from './WebPage';
import { AuthContext } from '../context/AuthContextProvider';
import BottomNavigation from './BottomNavigation';

function Root() {
    const {isLoggedIn} = useContext(AuthContext);
    const [hidden, setHidden] = useState(false);
    const [sideBarStyles, setSideBarStyles] = useState({maxWidth: 200});

    useEffect(() => {
        let styles = {transition: '0.4s', overflow: 'hidden'};

        if (hidden) {
            styles.maxWidth = 10;
            styles.minWidth = 10;
        } else {
            styles.maxWidth = 200;
            styles.minWidth = 200;
        }

        setSideBarStyles(styles);
    }, [hidden]);

    if (isLoggedIn) {
        return (
            <div className={''}>
                <div className='md:px-20 flex justify-between flex-col'>
                    <div className='overflow-x-hidden overflow-y-auto' style={{width: '', height: 'calc(100vh - 64px)'}}><Outlet/></div>
                    <BottomNavigation />
                </div>
            </div>
        )
    } else {
        return <div className='md:px-20'><WebPage /></div>
    }

}

export default Root;