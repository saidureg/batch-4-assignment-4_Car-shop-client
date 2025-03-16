import { useEffect, useState } from "react";
import { Menu, Drawer, Avatar, Dropdown, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.css";

import logo from "../../assets/auto_shop_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logout, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Text } = Typography;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token) as TUser;
      setUserRole(user.role);
    }
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "cars", label: <Link to="/cars">Cars</Link> },
    { key: "about", label: <Link to="/about">About</Link> },
  ];

  const menuItemsForMobile = [
    ...menuItems,
    isLoggedIn
      ? {
          key: "dashboard",
          label: (
            <Link
              to={
                userRole === "admin"
                  ? "/dashboard/cars"
                  : userRole === "user"
                  ? "/dashboard/profile"
                  : "/"
              }
            >
              Dashboard
            </Link>
          ),
        }
      : null,
  ].filter((item) => item !== null);

  const userMenuItems = [
    {
      key: "1",
      label: (
        <Link
          to={
            userRole === "admin"
              ? "/dashboard/cars"
              : userRole === "user"
              ? "/dashboard/profile"
              : "/"
          }
        >
          Dashboard
        </Link>
      ),
    },
    { key: "2", label: <div onClick={handleLogout}>Logout</div> },
  ];

  return (
    <nav className="navbar ">
      <div className="logo">
        <img src={logo} alt="Car Shop Logo" />
      </div>

      <div className="menu-container">
        <Menu
          mode="horizontal"
          selectedKeys={[]}
          items={menuItems}
          className="menu"
        />
      </div>

      <div className="mobile-menu-icon" onClick={showDrawer}>
        <MenuOutlined className="icon" />
      </div>

      {isLoggedIn ? (
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="avatar-container">
            <Avatar
              src="https://i.ibb.co.com/1t2tDpp9/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thu.png"
              className="avatar"
            />
          </div>
        </Dropdown>
      ) : (
        <Link to="/login">
          <Text style={{ fontSize: "1.2rem", fontWeight: 500 }}>Login</Text>
        </Link>
      )}

      <Drawer
        title="Auto Shop"
        placement="right"
        onClose={closeDrawer}
        open={visible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[]}
          items={menuItemsForMobile}
          onClick={closeDrawer}
        />
      </Drawer>
    </nav>
  );
};

export default Navbar;
