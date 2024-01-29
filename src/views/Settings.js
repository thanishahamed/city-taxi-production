import { useContext, useEffect } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router";
import { userRoles } from "../utils/configConstants";
import { processReq } from "../helpers/processRequest";
import { GET } from "../utils/requestActionConstants";
import { API_ROUTE } from "../utils/commonConstants";

const Settings = () => {
    const {logOut, user} = useContext(AuthContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user.id) {
    //         loadVehicle();
    //     }
    // }, [user])

    // const loadVehicle = async () => {
    //     console.log('printin the user details', user.id)
    //     if (user.role === userRoles.driver || user.role === userRoles.owner) {
    //         console.log('before sending request', user.id)
    //         const vehicle = await processReq(GET, API_ROUTE + "/auth/user/vehicle/"+user.id);

    //         console.log('vehicle', vehicle);
    //     }
    // }

    return (
        <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-400 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
            <div className="text-3xl">About Me</div>

            <div className="shadow-xl rounded-lg p-4 md:p-8 bg-slate-50 mt-5">
                <div className=" font-bold underline pb-5">User details</div>
                <div>First Name: {user.firstName}</div>
                <div>Last Name: {user.lastName}</div>
                <div>Email: {user.email}</div>
                <div>Address: {user.address}</div>
                <div>User Role: {user.roleName}</div>

                <hr className="my-5"/>
                {
                    user.vehicle ?
                        <div>
                            <div className=" font-bold">Vehicle details</div>
                            <div>Is Owner: {user.id === user.vehicle.ownerId ? 'YES' : 'NO'}</div> 
                            <div>Vehicle Number: {user.vehicle.vehicleNumber}</div>
                            <div>Vehicle Description: {user.vehicle.description}</div>
                        </div> 
                    : ''
                }
                <Button onClick={logOut} style="danger" size="sm" className={'mt-10'}>Logout <i className="icon-sign-out pl-1"></i></Button>
                {/* <Button onClick={() => navigate('/admin')} size="sm" className={'mt-10'}>Administration</Button> */}
            </div>
            <div className=" text-xs text-right">
                <div className=" font-bold underline pt-5">System Developed By</div>
                <ul className="pl-4">
                    <li>Thanish Ahamed</li>
                    <li>Fathima Sara</li>
                    <li>Uditha</li>
                    <li>Themiya</li>
                    <li>Ayesha</li>
                </ul>
                <div className="pt-5 text-right">All rights reserved @2024 </div>
            </div>
        </div>
    )
}

export default Settings;