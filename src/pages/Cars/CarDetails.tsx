import { Layout, Breadcrumb, Row, Col, Table, Button } from "antd";
import "antd/dist/reset.css";
import "./CarDetails.css";
import carImage1 from "../../assets/image/toyotaCar.png";
import carImage2 from "../../assets/image/car.png";
import { useState } from "react";

const { Content } = Layout;
// const { Text } = Typography;

const CarDetails = () => {
  const car = {
    name: "TOYOTA-NOAH",
    code: "CHCa-1003221",
    modelYear: 2000,
    registrationYear: 2004,
    cc: 2000,
    ac: true,
    pst: true,
    mg: false,
    cng: false,
    price: 2695000,
    images: [carImage1, carImage2, carImage1],
  };
  const [mainImage, setMainImage] = useState(car.images[0]);

  return (
    <>
      <div className="cars-banner">
        <div className="banner-content">
          <h1>Car Details</h1>
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
              title: "Cars Details",
            },
            {
              title: "Car Name",
            },
          ]}
        />
      </div>
      <div style={{ backgroundColor: "#F0F3F8", borderTop: "1px solid #ddd" }}>
        <Layout style={{ maxWidth: "1280px", margin: "auto" }}>
          <Layout>
            <Content style={{ padding: "20px" }}>
              <Row gutter={[16, 16]} justify="center">
                <Col xs={24} lg={12} style={{ padding: "20px" }}>
                  <div className="main-image-container">
                    <img src={mainImage} alt="Car" className="main-image" />
                  </div>
                  <div className="thumbnails">
                    {car.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`thumbnail ${
                          mainImage === img ? "active" : ""
                        }`}
                        onClick={() => setMainImage(img)}
                      />
                    ))}
                  </div>
                </Col>
                <Col xs={24} lg={12} style={{ padding: "20px" }}>
                  <h2>{car.name}</h2>
                  <p>Car Code: {car.code}</p>
                  <Table
                    style={{
                      width: "100%",
                      marginBottom: "40px",
                      marginTop: "40px",
                    }}
                    bordered
                    dataSource={[
                      {
                        key: "1",
                        label: "Model Year",
                        value: car.modelYear,
                        label2: "Registration Year",
                        value2: car.registrationYear,
                      },
                      {
                        key: "2",
                        label: "CC",
                        value: car.cc,
                      },
                      {
                        key: "3",
                        label: "AC",
                        value: car.ac ? "✔" : "✖",
                        label2: "PST",
                        value2: car.pst ? "✔" : "✖",
                      },
                      {
                        key: "4",
                        label: "MG",
                        value: car.mg ? "✔" : "✖",
                        label2: "CNG",
                        value2: car.cng ? "✔" : "✖",
                      },
                    ]}
                    columns={[
                      {
                        title: "Feature",
                        dataIndex: "label",
                        key: "label",
                      },
                      {
                        title: "Value",
                        dataIndex: "value",
                        key: "value",
                      },
                      {
                        title: "Feature",
                        dataIndex: "label2",
                        key: "label2",
                      },
                      {
                        title: "Value",
                        dataIndex: "value2",
                        key: "value2",
                      },
                    ]}
                    pagination={false}
                  />
                  <h3>
                    Asking Price: <span className="price">{car.price} BDT</span>
                  </h3>
                  <Button
                    style={{
                      marginTop: "16px",
                      width: "50%",
                    }}
                    type="primary"
                  >
                    Buy Now
                  </Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default CarDetails;
