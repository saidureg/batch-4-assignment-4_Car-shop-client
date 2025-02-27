import {
  Layout,
  Card,
  Select,
  Slider,
  Typography,
  Checkbox,
  Button,
  Breadcrumb,
  Row,
  Col,
} from "antd";
import { EnvironmentOutlined, FilterOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

import "./Cars.css";
import carImage from "../../assets/image/toyotaCar.png";
import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/car/carApi";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const vehicles = [
  {
    id: 1,
    title: "2007 Nissan Sunny",
    location: "Dhaka",
    price: "BDT 650,000",
    mileage: "200,000 KM",
    image: carImage,
  },
  {
    id: 2,
    title: "2009 Toyota Corolla 2005",
    location: "Rangpur",
    price: "NEGOTIABLE",
    mileage: "120,000 KM",
    image: carImage,
  },
  {
    id: 3,
    title: "2013 BMW 525-i",
    location: "Dhaka",
    price: "NEGOTIABLE",
    mileage: "18,741 KM",
    image: carImage,
  },
  {
    id: 4,
    title: "2007 Nissan Sunny",
    location: "Dhaka",
    price: "BDT 650,000",
    mileage: "200,000 KM",
    image: carImage,
  },
  {
    id: 5,
    title: "2009 Toyota Corolla 2005",
    location: "Rangpur",
    price: "NEGOTIABLE",
    mileage: "120,000 KM",
    image: carImage,
  },
  {
    id: 6,
    title: "2013 BMW 525-i",
    location: "Dhaka",
    price: "NEGOTIABLE",
    mileage: "18,741 KM",
    image: carImage,
  },
  {
    id: 7,
    title: "2007 Nissan Sunny",
    location: "Dhaka",
    price: "BDT 650,000",
    mileage: "200,000 KM",
    image: carImage,
  },
  {
    id: 8,
    title: "2009 Toyota Corolla 2005",
    location: "Rangpur",
    price: "NEGOTIABLE",
    mileage: "120,000 KM",
    image: carImage,
  },
  {
    id: 9,
    title: "2013 BMW 525-i",
    location: "Dhaka",
    price: "NEGOTIABLE",
    mileage: "18,741 KM",
    image: "https://i.ibb.co.com/S796G2qz/desktop-bg2.jpg",
  },
];

const AllCars = () => {
  const { data: allCars } = useGetAllCarsQuery(undefined);

  console.log("Cars:", allCars);
  return (
    <>
      <div className="cars-banner">
        <div className="banner-content">
          <h1>Car Collections</h1>
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
              title: "Cars Collections",
            },
          ]}
        />
      </div>
      <div style={{ backgroundColor: "#F0F3F8", borderTop: "1px solid #ddd" }}>
        <Layout style={{ maxWidth: "1280px", margin: "auto" }}>
          <Sider
            width={320}
            breakpoint="lg"
            collapsedWidth="0"
            style={{ background: "#fff", maxHeight: "96vh", padding: "20px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title level={4}>Filters</Title>
              <Button type="link">Reset All</Button>
            </div>
            <Checkbox style={{ marginBottom: "10px" }}>Show Sold Cars</Checkbox>
            <Select
              placeholder="Brand"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <Option value="all">All</Option>
            </Select>
            <Select
              placeholder="Model"
              style={{ width: "100%", marginBottom: "10px" }}
              disabled
            />
            <Title level={5}>Price Range</Title>
            <Slider
              range
              min={10000}
              max={100000001}
              defaultValue={[10000, 500000]}
              style={{ marginBottom: "10px" }}
            />
            <Title level={5}>Year</Title>
            <Slider
              range
              min={1970}
              max={2025}
              defaultValue={[2000, 2025]}
              style={{ marginBottom: "10px" }}
            />
            <Button type="primary" icon={<FilterOutlined />} block>
              Apply Filters
            </Button>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#F0F3F8",
                padding: "20px",
              }}
            >
              <Title level={3}>25,536 vehicles for sale in Bangladesh</Title>
            </Header>
            <Content style={{ padding: "20px" }}>
              <Row gutter={[16, 16]}>
                {vehicles.map((item) => (
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item.id}>
                    <Link to={`/cars/${item.id}`}>
                      <Card hoverable>
                        <img
                          alt={item.title}
                          src={item.image}
                          className="car-image zoom-effect"
                        />
                        <div style={{ padding: "10px" }}>
                          <Title level={5} style={{ margin: 0 }}>
                            {item.title}
                          </Title>
                          <Text type="secondary">
                            <EnvironmentOutlined /> {item.location}
                          </Text>
                          <p>
                            <b style={{ color: "#d32f2f" }}>Price:</b>{" "}
                            {item.price}
                          </p>
                          <p>
                            <b>Mileage:</b> {item.mileage}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default AllCars;
