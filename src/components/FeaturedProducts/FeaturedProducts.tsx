import { Button, Card, Col, Flex, Row } from "antd";
import "./FeaturedProducts.css";
import carImage from "../../assets/image/toyotaCar.png";

const { Meta } = Card;

const FeaturedProducts = () => {
  return (
    <div className="featured-products">
      <h2
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Featured Products
      </h2>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="card-container"
        style={{ maxWidth: "1280px", margin: "48px auto" }}
      >
        {[...Array(6)].map((_, index) => (
          <Col
            key={index}
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={8}
            style={{ marginBottom: "20px" }}
          >
            <Card
              hoverable
              style={{ minWidth: "200px" }}
              cover={<img alt="example" src={carImage} />}
            >
              <Meta
                style={{
                  textAlign: "center",
                  fontSize: "1.1rem",
                  fontFamily: '"Hind Siliguri", sans-serif',
                }}
                title={
                  <h3 style={{ fontSize: "1.4rem" }}>
                    Toyota Corolla Axio X 2015
                  </h3>
                }
                description={
                  <>
                    <Flex
                      justify="center"
                      align="center"
                      gap="10px"
                      style={{ marginBottom: "16px" }}
                    >
                      <p
                        style={{
                          border: "1px solid #dedede",
                          padding: "5px 10px",
                        }}
                      >
                        Model: <span className="text-primary">2015</span>
                      </p>
                      <p
                        style={{
                          border: "1px solid #dedede",
                          padding: "5px 10px",
                        }}
                      >
                        CC: <span className="text-primary">1500</span>
                      </p>
                    </Flex>

                    <p>
                      Asking Price:{" "}
                      <span className="text-primary">25,00,000 BDT</span>
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Button
        color="primary"
        variant="solid"
        size="large"
        style={{ margin: "0 auto", display: "block" }}
      >
        View All
      </Button>
    </div>
  );
};

export default FeaturedProducts;
