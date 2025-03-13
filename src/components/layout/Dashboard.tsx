import {
  ProductOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const items = [
  { key: "1", icon: <ProductOutlined />, label: "Cars", path: "cars" },
  { key: "2", icon: <ShoppingCartOutlined />, label: "Order", path: "order" },
  { key: "3", icon: <TeamOutlined />, label: "User", path: "user" },
].map((item) => ({
  key: item.key,
  icon: item.icon,
  label: <NavLink to={`/dashboard/${item.path}`}>{item.label}</NavLink>,
}));

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
            justifyContent: "center",
            alignItems: "center",
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
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
