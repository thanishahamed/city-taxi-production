import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import CallIcon from "@mui/icons-material/Call";
import Banner from "./../img/banner.jpg";
import Car1 from "./../img/car-1.jpg";
import Car2 from "./../img/car-2.jpg";
import Car3 from "./../img/car-3.jpg";
import Car4 from "./../img/car-4.jpg";
import Car5 from "./../img/car-5.jpg";
import Car6 from "./../img/car-6.jpg";
import Man from "./../img/man.jpg";
import CreateIcon from "@mui/icons-material/Create";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PetsIcon from "@mui/icons-material/Pets";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";


const WebPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const onClickLogin = () => {
    navigate("login");
  };

  const onClickRegister = () => {
    navigate("register");
  };
  const handleCallClick = () => {
    const phoneNumber = "+94717269006";
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <div className="home">
      <div className="header">
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {!isLoggedIn ? (
          <>
            <div className="flex justify-center gap-4 sm:gap-5" style={{height: 45}}>
              <Button onClick={onClickLogin}>Login</Button>
              <Button onClick={onClickRegister} style="success">
                Register
              </Button>

              <Button onClick={handleCallClick}>
                {" "}
                <CallIcon /> Call US: +94 717269006
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="banner-section">
        <div className="overlay  inset-0 bg-black mt-20">
          <div className="img-container relative">
            <img src={Banner} alt="City Taxi Banner" />
            <div className="caption">
              <h5>BOOK FOR LESS TODAY! TRY CITY TAXI</h5>
              <h1>Need to Travel? Get a lift or Find a free seat</h1>
              <div className="">
                <Button className="btn-banner mx-auto mt-5" onClick={onClickLogin}>BOOK NOW</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="work-section mt-10">
        <h2 className="text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <div className="card text-center max-w-xs mx-auto">
            <CreateIcon fontSize="100px" className="mb-2" />
            <h3>Simple Registration</h3>
            <p className="mt-3">
              Swift rides, simpler journeys. Sign up in seconds for seamless
              travel experiences.
            </p>
          </div>
          <div className="card text-center max-w-xs mx-auto">
            <NoCrashIcon fontSize="100px" className="mb-2" />
            <h3>Select & Book</h3>
            <p className="mt-3">
              Select your ride, book in seconds. Your journey, your way.
            </p>
          </div>
          <div className="card text-center max-w-xs mx-auto">
            <AirlineSeatReclineExtraIcon fontSize="100px" className="mb-2" />
            <h3>Enjoy the Travel</h3>
            <p className="mt-3">
              Select, Book, and Enjoy the Travel – Your seamless ride experience
              awaits!
            </p>
          </div>
        </div>
      </div>

      <div className="car-section mt-10 sm:mt-20 mr-2 ml-2">
        <h2 className="text-center mb-10">Our Best Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car1}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                BMW Z4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A sporty four-seater convertible designed for pure driving
                pleasure
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car2}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Toyota RAV4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compact, reliable SUV with a good focus on efficiency and
                safety.
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car3}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Chevrolet Equinox
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A compact SUV offering style, versatility, and modern features
                for a well-rounded driving experience.
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car4}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                BMW 6 Series
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A luxurious and stylish lineup of coupes and convertibles,
                epitomizing performance and sophistication.
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car5}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Ford Fusion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A midsize sedan blending efficiency, comfort, and modern
                technology for a well-rounded driving experience.
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card>
            <CardMedia
              component="img"
              alt="Card image"
              height="140"
              image={Car6}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Toyota Tacoma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A rugged and reliable midsize pickup truck, renowned for its
                off-road capabilities and durability.
              </Typography>
              <List>
                <ListItem>
                  <AirlineSeatReclineExtraIcon className="mr-2" />
                  <ListItemText primary="Max passengers 4" />
                </ListItem>
                <ListItem>
                  <PetsIcon className="mr-2" />
                  <ListItemText primary="Pets are not allowed in the Car" />
                </ListItem>
                <ListItem>
                  <SmokeFreeIcon className="mr-2" />
                  <ListItemText primary="Smoking is not allowed" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="about-section mt-10 sm:mt-20 mr-2 ml-2">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="description">
            <h2>About City Taxi</h2>
            <p className="xl:max-w-2xl mt-4">
              City Taxi is your trusted partner for swift and reliable
              transportation. Our service is designed to offer convenient rides,
              exceptional customer care, and a seamless travel experience. With
              a fleet of modern vehicles, professional drivers, and easy booking
              options, City Taxi is committed to making your journeys
              comfortable and stress-free. Whether you're commuting daily or
              heading to a special event, choose City Taxi for a ride you can
              rely on.
            </p>
            <h3 className="mb-4 mt-4">Call Us Now</h3>
            <div className="flex flex-col">
              <div className="flex mb-4">
              <Button onClick={handleCallClick}>
                {" "}
                <CallIcon /> Call US: +94 717269006
              </Button>
              </div>
            
            </div>

            <h3 className="mb-4 mt-3">Our Location</h3>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2025854.3253612223!2d79.40456258238466!3d7.38225530935807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afd267f2cc924a1%3A0xbc95e498fc1666c1!2sCity%20Taxi_Anamaduwa!5e0!3m2!1sen!2slk!4v1706290153357!5m2!1sen!2slk"
          
              height="412"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map"
            ></iframe>
          </div>
          <div className="man-img w-full xl:block hidden">
            <img src={Man} alt="Man with car" />
          </div>
        </div>
      </div>
      <footer className="mt-10  sm:mt-20">
        <h2 className='text-center pt-20'>CITY TAXI</h2>
        <p className="text-center mt-4 ml-2 mr-2">Your Reliable Ride Partner for Swift and Seamless Journeys</p>
        <p className="text-center mt-4 pb-20 "><small>Copyright @ City Taxi 2024</small></p>
      </footer>
    </div>
  );
};

export default WebPage;
