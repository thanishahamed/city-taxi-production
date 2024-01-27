import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./views/Root";
import Login from "./views/Login";
import Home from "./views/Home";
import AuthContainer from "./context/AuthContextProvider";
import Register from "./views/Register";
import AvailableTaxiList from "./views/AvailableTaxiList";
import TripHistory from "./views/TripHistory";
import Settings from "./views/Settings";
import MyPayments from "./views/MyPayments";
import Admin from "./views/Admin";
import MyTrip from "./views/MyTrip";
import MakePayment from "./views/MakePayment";
import RateDriver from "./views/RateDriver";
import TripSummary from "./views/TripSummary";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <div>error 404</div>,
      children: [
          {
              path:"/",
              element: <Home />
          },
          {
              path: "/myTrip",
              element: <MyTrip />
          },
          {
              path: "/history",
              element: <TripHistory />
          },
          {
              path: "/settings",
              element: <Settings />
          },
          {
              path: "/payments",
              element: <MyPayments />
          },
          {
            path: "/payments/create",
            element: <MakePayment />
          },
          {
            path: "/trip/rate",
            element: <RateDriver />
          },
          {
            path: "/trip/details",
            element: <TripSummary />
          },
      ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <Admin />
  }
]);


function App() {
  return (
    <div className="background-image h-full">
      <AuthContainer>
        <RouterProvider router={router} />
      </AuthContainer>
    </div>
  )
}

export default App;
