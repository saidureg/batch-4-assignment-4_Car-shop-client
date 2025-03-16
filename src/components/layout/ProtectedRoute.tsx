import { ReactNode } from "react";
import { logout, TUser, useToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useToken);
  const dispatch = useDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  } else {
    return <Navigate to="/login" replace={true} />;
  }
  if (role !== "undefined" && (user as TUser)?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
