import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import logo from "../../assets/car_logo.png";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer
      style={{ background: "#14181D", color: "#ffffff", padding: "40px 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "auto", padding: "0 20px" }}>
        <Row gutter={[32, 32]} justify="space-between">
          {/* Left Section */}
          <Col xs={24} sm={12} md={8}>
            <div style={{ height: "50px", marginBottom: "24px" }}>
              <img src={logo} alt="Auto Car" style={{ height: "100%" }} />
            </div>
            <Text
              style={{ color: "#aaa", display: "block", marginBottom: "16px" }}
            >
              Auto Car is engaged in car selling, displaying and purchasing
              market in Bangladesh. Today the company has grown into a leading
              provider of quality services in Bangladesh's Car Market.
            </Text>
            <Space size="middle">
              <FacebookOutlined style={iconStyle} />
              <YoutubeOutlined style={iconStyle} />
              <InstagramOutlined style={iconStyle} />
            </Space>
          </Col>

          {/* Middle Section */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={headingStyle}>
              HEAD OFFICE
            </Title>
            <Text style={textStyle}>
              Haque Chamber, Level - 12 (Beside Samarita Hospital)
              <br />
              89/2, West Panthapath, Dhaka-1215, Bangladesh
              <br />
              Phone: (+88) 02-4102-5178, (+88) 02-4102-5179
            </Text>
          </Col>

          {/* Right Section*/}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={headingStyle}>
              HAAT ADDRESS
            </Title>
            <Text style={textStyle}>
              Rajdhani High School, Manik Miah Avenue
              <br />
              Sher-e-Bangla Nagar, Dhaka-1215, Bangladesh
              <br />
              Mob: 01919-777999
            </Text>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            borderTop: "1px solid #333",
            paddingTop: "16px",
          }}
        >
          <Text style={{ color: "#aaa" }}>© Copyright 2022</Text>
          <br />
          <Text style={{ color: "#aaa" }}>
            Design & Developed With <span style={{ color: "#007bff" }}>💙</span>{" "}
            By Briom IT
          </Text>
        </div>
      </div>
    </Footer>
  );
};

// Styles
const headingStyle = {
  color: "#ffffff",
  borderBottom: "3px solid #007bff",
  display: "block",
  paddingBottom: "5px",
  marginBottom: "12px",
  maxWidth: "120px",
};

const textStyle = { color: "#aaa", lineHeight: "1.6" };

const iconStyle = { fontSize: "20px", color: "#aaa", cursor: "pointer" };

export default AppFooter;
