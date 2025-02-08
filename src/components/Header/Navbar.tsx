import { useState } from "react";
import { Menu, Drawer, Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.css";

import logo from "../../assets/car_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "cars", label: <a href="#">Cars</a> },
    { key: "about", label: <Link to="/about">About</Link> },
  ];
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Car Shop Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="menu-container">
        <Menu
          mode="horizontal"
          selectedKeys={[]}
          items={menuItems}
          className="menu"
        />
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={showDrawer}>
        <MenuOutlined className="icon" />
      </div>

      {/* Avatar (Desktop Only) */}
      <div className="avatar-container">
        <Avatar src="https://via.placeholder.com/40" className="avatar" />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={visible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[]}
          items={menuItems}
          onClick={closeDrawer}
        />
        {/* Avatar inside drawer for mobile */}
        <div className="drawer-avatar">
          <Avatar src="https://via.placeholder.com/40" className="avatar" />
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
