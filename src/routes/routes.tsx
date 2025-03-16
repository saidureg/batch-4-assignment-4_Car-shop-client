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
import Profile from "../pages/Dashboard/User/Profile/Profile";
import ViewOrder from "../pages/Dashboard/User/ViewOrder";
// import ChangePassword from "../pages/Dashboard/User/Profile/ChangePassword";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Order from "../pages/Dashboard/Admin/Order/Order";
import UserTable from "../pages/Dashboard/Admin/UserManagement/UserTable";

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
        element: (
          <ProtectedRoute role="user">
            <OrderVerification />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute role="admin">
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "cars",
        element: (
          <ProtectedRoute role="admin">
            <Car />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: <UserTable />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "myorder",
        element: (
          <ProtectedRoute role="user">
            <ViewOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "changepassword",
        element: (
          <ProtectedRoute role="user">
            <div>Change Password</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
