import {
  ProductOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { logout, TUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import "./Dashboard.css";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token) as TUser;
      setUserRole(user.role);
    }
  }, [userRole]);

  let items;

  if (userRole === "user") {
    items = [
      { key: "1", icon: <TeamOutlined />, label: "Profile", path: "profile" },
      {
        key: "2",
        icon: <ShoppingCartOutlined />,
        label: "Order",
        path: "myorder",
      },
    ].map((item) => ({
      key: item.key,
      icon: item.icon,
      label: <NavLink to={`/dashboard/${item.path}`}>{item.label}</NavLink>,
    }));
  } else if (userRole === "admin") {
    items = [
      { key: "1", icon: <ProductOutlined />, label: "Cars", path: "cars" },
      {
        key: "2",
        icon: <ShoppingCartOutlined />,
        label: "Order",
        path: "order",
      },
      { key: "3", icon: <TeamOutlined />, label: "User", path: "user" },
    ].map((item) => ({
      key: item.key,
      icon: item.icon,
      label: <NavLink to={`/dashboard/${item.path}`}>{item.label}</NavLink>,
    }));
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
          setIsCollapsed(collapsed);
        }}
        style={{
          position: "fixed", // Fixes Sider on top of content
          height: "100vh", // Full viewport height
          zIndex: 1000, // Higher than content
        }}
      >
        <div
          style={{
            height: "4rem",
            display: "flex",
            justifyContent: "justify-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <h1 style={{ color: "white" }}>Dashboard</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: isCollapsed
            ? "0"
            : window.innerWidth >= 992
            ? "200px"
            : "0",
        }}
      >
        <Header
          style={{
            padding: 12,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={handleLogout} variant="solid" color="danger">
            Logout
          </Button>
        </Header>
        <Content className="content-layout">
          <div className="content-layout-outlet">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
