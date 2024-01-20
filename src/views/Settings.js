import { useContext } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router";

const Settings = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <div className="text-3xl">Settings</div>
            <Button onClick={logOut} style="danger" size="sm" className={'mt-10'}>Logout</Button>
            <Button onClick={() => navigate('/admin')} size="sm" className={'mt-10'}>Administration</Button>
        </div>
    )
}

export default Settings;