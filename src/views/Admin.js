import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import Button from "../components/Button";
import { useNavigate, Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import {ConfirmProvider} from "material-ui-confirm";

const Admin  = () => {
    const {isLoggedIn, user, logOut} = useContext(AuthContext);
    const [hidden, setHidden] = useState(false);
    const [sideBarStyles, setSideBarStyles] = useState({maxWidth: 200});
    const navigate = useNavigate();

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

    return (
        <ConfirmProvider>
            <div className="bg-white h-screen">
                {user && user.isAdmin ?
                    <div className={''}>
                        <div className='flex gradient-bg-2'>
                            <div className='gradient-bg-2 h-screen absolute z-40 md:relative pt-10 md:pt-2'
                                 style={sideBarStyles} onMouseEnter={() => setHidden(false)}><Sidebar hidden={hidden} setHidden={setHidden}/>
                            </div>
                            <div className='grow overflow-y-auto h-screen'>
                                <div className='sticky top-0 gradient-bg-1 pr-5 py-2 z-40 flex'>
                                    <div><Button style='ghost' onClick={() => setHidden((old) => !old)}>{hidden ? <i className="icon-bars"></i> : <i className="icon-arrow-left"></i>}</Button></div>

                                    <div className='grow text-right px-2 text-sm flex w-full justify-end items-center'>User: {user.firstName}<Button style='ghost' className={'ml-3'} onClick={logOut}>Logout <i className="icon-sign-out pl-2"></i></Button></div>
                                </div>
                                <div className='p-4'><div className="backdrop-blur border-4 p-10 w-full shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right"><Outlet/></div></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>Login as an admin</div>
                        <Button style="ghost" onClick={() => navigate('/')}>Back to Home</Button>
                    </div>
                }
            </div>
        </ConfirmProvider>
    )
}

export default Admin;