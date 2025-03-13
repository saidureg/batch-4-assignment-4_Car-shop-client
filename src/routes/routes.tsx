import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AllCars from "../pages/Cars/AllCars";
import CarDetails from "../pages/Cars/CarDetails";
import Dashboard from "../components/layout/Dashboard";
import Car from "../pages/Dashboard/Admin/Cars/Car";
import OrderVerification from "../pages/Order/OrderVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cars",
        element: <AllCars />,
      },
      {
        path: "/cars/:id",
        element: <CarDetails />,
      },
      {
        path: "/orders/verify",
        element: <OrderVerification />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "admin-dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "order",
        element: <div>Order</div>,
      },
      {
        path: "cars",
        element: <Car />,
      },
      {
        path: "user",
        element: <div>User</div>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "order",
        element: <div>Order</div>,
      },
      {
        path: "cars",
        element: <Car />,
      },
      {
        path: "change-password",
        element: <div>Change Password</div>,
      },
    ],
  },
]);

export default router;
