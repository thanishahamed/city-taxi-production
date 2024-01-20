import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const WebPage = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(AuthContext);

  const onClickLogin = () => {
    navigate('login')
  }

  const onClickRegister = () => {
    navigate('register')
  }
  return (
        <div className="">
          <div>
            <div className="text-xl">Welcome</div>
            <div className="text-l">Your trusted taxi service!</div>
          </div>
          {!isLoggedIn ? 
            <>
              <div>
                <Button className={'mr-2'} onClick={onClickLogin}>Login</Button>
                <Button onClick={onClickRegister} style="success">Register</Button>
              </div>
              <div>
                <Button className={'mt-2'}>Instant Service</Button>
              </div>
            </>
          : '' }
          <div>
            <div className="text-xl">About Us</div>
            <div>Some Dummy Text</div>
          </div>
        </div>
      );
}

export default WebPage;