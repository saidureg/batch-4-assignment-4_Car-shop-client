import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AllCars from "../pages/Cars/AllCars";
import CarDetails from "../pages/Cars/CarDetails";
import Dashboard from "../components/layout/Dashboard";
import Product from "../pages/Dashboard/Admin/Product/Product";

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
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "order",
        element: <div>Order</div>,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "user",
        element: <div>User</div>,
      },
    ],
  },
]);

export default router;
