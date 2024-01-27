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
        <div className="bg-slate-100">
            {console.log(user)}
            <div className="text-3xl">Settings</div>

            <div>User details</div>
            <div>First Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
            <div>Email: {user.email}</div>
            <div>Address: {user.address}</div>
            <div>User Role: {user.roleName}</div>

            <hr />
            {
                user.vehicle ?
                    <div>
                        <div>Vehicle Details</div>
                        <div>Is Owner: {user.id === user.vehicle.ownerId ? 'YES' : 'NO'}</div> 
                        <div>Vehicle Number: {user.vehicle.vehicleNumber}</div>
                        <div>Vehicle Description: {user.vehicle.description}</div>
                    </div> 
                : 'User Not Linked With A Vehicle'
            }
            <Button onClick={logOut} style="danger" size="sm" className={'mt-10'}>Logout</Button>
            <Button onClick={() => navigate('/admin')} size="sm" className={'mt-10'}>Administration</Button>
        </div>
    )
}

export default Settings;