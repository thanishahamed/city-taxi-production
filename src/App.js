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
              path: "/availability",
              element: <AvailableTaxiList />
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
