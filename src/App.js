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
import AdminHome from "./views/admin/AdminHome";
import ManageDrivers from "./views/admin/ManageDrivers";
import ManageOwners from "./views/admin/ManageOwners";
import ManagePassenger from "./views/admin/ManagePassenger";
import ManageOperators from "./views/admin/ManageOperators";
import ManageVehicles from "./views/admin/ManageVehicle";
import ManagePayments from "./views/admin/ManagePayments";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <div className="bg-white"></div>,
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
    element: <Admin />,
    children: [
      {
          path:"",
          element: <AdminHome />
      },
      {
          path:"driver",
          element: <ManageDrivers />
      },
      {
          path:"owner",
          element: <ManageOwners />
      },
      {
          path:"passenger",
          element: <ManagePassenger />
      },
      {
          path:"operator",
          element: <ManageOperators />
      },
      {
          path:"vehicle",
          element: <ManageVehicles />
      },
      {
          path:"payment",
          element: <ManagePayments />
      },
      {
          path:"home",
          element: <div>home</div>
      }
  ]
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
