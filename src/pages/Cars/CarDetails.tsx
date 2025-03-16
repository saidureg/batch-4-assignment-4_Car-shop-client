import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import "antd/dist/reset.css";
import "./CarDetails.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/car/carApi";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";
import { TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Content } = Layout;

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: singleCar } = useGetCarByIdQuery(id ?? "");

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const {
    name,
    brand,
    model,
    year,
    CC,
    price,
    category,
    description,
    quantity,
    Mileage,
    image,
    AC,
    PST,
    MG,
    CNG,
    inStock,
  } = singleCar?.data ?? {};

  const [mainImage, setMainImage] = useState(singleCar?.data?.image[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [useremail, setUseremail] = useState<string>("");

  useEffect(() => {
    setMainImage(singleCar?.data?.image[0]);
  }, [singleCar]);

  const showModal = () => {
    if (!useremail) {
      toast.error("Please login to order");
      navigate("/login", { replace: true });
      return;
    }

    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrder = async (values: { quantity: number }) => {
    await createOrder({ car: id, quantity: values.quantity });
  };

  const toastId = "order";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token) as TUser;
      setUseremail(user.userEmail);
    }
  }, []);

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
              title: name,
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
                    {Array.isArray(image) &&
                      image.map((img: string, index: number) => (
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
                  <h2>{name}</h2>
                  <p>Car Code: {brand}</p>
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
                        value: model,
                        label2: "Registration Year",
                        value2: year,
                      },

                      {
                        key: "2",
                        label: "Category",
                        value: category,
                        label2: "CC",
                        value2: CC,
                      },
                      {
                        key: "3",
                        label: "AC",
                        value: AC ? "✔" : "✖",
                        label2: "PST",
                        value2: PST ? "✔" : "✖",
                      },
                      {
                        key: "4",
                        label: "MG",
                        value: MG ? "✔" : "✖",
                        label2: "CNG",
                        value2: CNG ? "✔" : "✖",
                      },
                      {
                        key: "5",
                        label: "Mileage",
                        value: Mileage + "KM",
                        label2: "Stock",
                        value2: quantity,
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
                  <p style={{ font: "1rem", fontWeight: 500, color: "gray" }}>
                    {description ?? ""}
                  </p>
                  <h3>
                    Asking Price: <span className="price">{price} BDT</span>
                  </h3>
                  {inStock ? (
                    <>
                      <Button
                        onClick={showModal}
                        style={{
                          marginTop: "16px",
                          width: "50%",
                        }}
                        type="primary"
                      >
                        Buy Now
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="cyan"
                        variant="solid"
                        style={{
                          marginTop: "16px",
                          width: "50%",
                        }}
                      >
                        Pre Order
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
        <Modal
          title="Order Form"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={handleOrder}
            initialValues={{
              name: name,
              useremail: useremail,
              quantity: 1,
            }}
          >
            <Form.Item
              name="name"
              label="Car Name"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="useremail"
              label="Email"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Quantity" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Order Now
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default CarDetails;
