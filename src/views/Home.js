import { useContext } from "react";
import Button from "../components/Button";
import WebPage from "./WebPage";
import { AuthContext } from "../context/AuthContextProvider";
import BookTaxi from "./BookTaxi";

const Home = () => {
    const {logOut, user} = useContext(AuthContext);
    
    const showUser = () => {
        console.log(user);
    }

    return (
        <div>
            <div className="text-3xl">Home</div>
            <div>Welcome {user ? user.email : ''} to City Taxi!</div>
            <Button onClick={showUser}>Show User</Button>

            <div className="pt-5">
                <BookTaxi />
            </div>

            <div className="pt-5">
                <WebPage />
            </div>
        </div>
    )
}

export default Home;