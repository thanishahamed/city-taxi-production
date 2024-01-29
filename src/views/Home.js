import { useContext } from "react";
import Button from "../components/Button";
import WebPage from "./WebPage";
import { AuthContext } from "../context/AuthContextProvider";
import BookTaxi from "./BookTaxi";
import AvailableHires from "./AvailableHires";

const Home = () => {
    const {logOut, user} = useContext(AuthContext);
    return (
        <div className="md:px-20 m-auto md:w-2/3 md:p-10">
            <div className="bg-yellow-100 backdrop-blur border-4 p-10 w-full border-yellow-200/50 shadow-2xl drop-shadow-sm transition ease-in-out duration-300 rounded-xl pop-right">
                {/* <div className="text-3xl">Home</div> */}
                <div className="text-3xl">Welcome <span className=" underline">{user ? user.firstName : ''}</span> to City Taxi!</div>

                <div className="pt-5">
                    {user.isDriver || user.isOwner ? 
                        <AvailableHires />
                    : <BookTaxi />}
                    
                </div>
            </div>
        </div>
    )
}

export default Home;