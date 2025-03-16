import { Breadcrumb, Col, Layout, Row } from "antd";
import { CarOutlined, PhoneOutlined, SyncOutlined } from "@ant-design/icons";
import "./About.css";
import aboutCar from "../../assets/image/about_car.jpg";

const About = () => {
  return (
    <>
      <div className="about-banner">
        <div className="banner-content">
          <h1>About Auto Style</h1>
        </div>
      </div>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#ffffff",
          maxWidth: "1280px",
          margin: "auto",
        }}
      >
        <Breadcrumb
          separator=">"
          style={{ fontSize: "20px" }}
          items={[
            {
              title: "Home",
            },
            {
              title: "About Auto Style",
            },
          ]}
        />
      </div>
      <div style={{ backgroundColor: "#FFF", borderTop: "1px solid #ddd" }}>
        <Layout style={{ maxWidth: "1280px", margin: "auto" }}>
          <div className="about_banner">
            <div className="about-content">
              <h1>Our Story</h1>
              <p>
                Auto Style is a leading provider of quality services in
                Bangladesh's Car Market. We are engaged in car selling,
                displaying and purchasing market in Bangladesh. Today the
                company has grown into a leading provider of quality services in
                Bangladesh's Car Market.
              </p>
              <p>
                Auto Style is engaged in car selling, displaying and purchasing
                market in Bangladesh. Today the company has grown into a leading
                provider of quality services in Bangladesh's Car Market.
              </p>
              <p>
                Auto Style is engaged in car selling, displaying and purchasing
                market in Bangladesh. Today the company has grown into a leading
                provider of quality services in Bangladesh's Car Market.
              </p>
            </div>
            <div className="image_site">
              <img src={aboutCar} alt="about car" className="about_car" />
            </div>
          </div>
        </Layout>
      </div>
      <div className="features-wrapper">
        <Row gutter={[16, 16]} className="features">
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <CarOutlined className="feature-icon" />
              <h3>Sold Almost</h3>
              <p>14000+ Cars</p>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <PhoneOutlined className="feature-icon" />
              <h3>Support Center</h3>
              <p>Best Support System Onwards</p>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="feature-card">
              <SyncOutlined className="feature-icon" />
              <h3>Faster Service</h3>
              <p>You will get faster service than you imagined</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
