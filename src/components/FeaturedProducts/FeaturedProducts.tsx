import { Button, Card, Col, Flex, Row } from "antd";
import "./FeaturedProducts.css";
import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/car/carApi";

const { Meta } = Card;

const FeaturedProducts = () => {
  const { data: allCars } = useGetAllCarsQuery(undefined);
  return (
    <div className="featured-products">
      <h2 className="featured-section-title">Featured Products</h2>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="card-container"
        style={{ maxWidth: "1280px", margin: "48px auto" }}
      >
        {allCars?.data?.slice(0, 6).map((item, index) => (
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
              cover={
                <img
                  alt="example"
                  src={item.image[0]}
                  className="FeaturedCar-image"
                />
              }
            >
              <Meta
                style={{
                  textAlign: "center",
                  fontSize: "1.1rem",
                  fontFamily: '"Hind Siliguri", sans-serif',
                }}
                title={<h3 style={{ fontSize: "1.4rem" }}>T{item.name}</h3>}
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
                        Model: <span className="text-primary">{item.year}</span>
                      </p>
                      <p
                        style={{
                          border: "1px solid #dedede",
                          padding: "5px 10px",
                        }}
                      >
                        CC: <span className="text-primary">{item.CC}</span>
                      </p>
                    </Flex>

                    <p>
                      Asking Price:{" "}
                      <span className="text-primary">{item.price} BDT</span>
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/cars">
        <Button
          color="primary"
          variant="solid"
          size="large"
          style={{ margin: "0 auto", display: "block" }}
        >
          View All
        </Button>
      </Link>
    </div>
  );
};

export default FeaturedProducts;
