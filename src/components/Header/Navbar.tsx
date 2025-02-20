import { useState } from "react";
import { Menu, Drawer, Avatar, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.css";

import logo from "../../assets/car_logo.png";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "2",
    label: <Link to="">Logout</Link>,
  },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "cars", label: <Link to="/cars">Cars</Link> },
    { key: "about", label: <Link to="/about">About</Link> },
  ];

  const menuItemsForMobile = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "cars", label: <Link to="/cars">Cars</Link> },
    { key: "about", label: <Link to="/about">About</Link> },
    { key: "dashboard", label: <Link to="/">Dashboard</Link> },
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

      <Dropdown menu={{ items }} placement="bottomRight">
        <div className="avatar-container">
          <Avatar src="https://via.placeholder.com/40" className="avatar" />
        </div>
      </Dropdown>

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
