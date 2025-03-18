import {
  Layout,
  Card,
  Slider,
  Typography,
  Checkbox,
  Button,
  Breadcrumb,
  Row,
  Col,
  Input,
  Skeleton,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

import "./Cars.css";
import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/car/carApi";
import CustomSelect from "../../components/ui/CustomSelect/CustomSelect";
import { useEffect, useState } from "react";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const AllCars = () => {
  const [brandData, setBrandData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inStock, setInStock] = useState<boolean>(false);

  const [range, setRange] = useState<number[]>([10000, 1000001]);

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      setRange(value);
    }
  };

  const queryParams = [
    searchQuery && { name: "searchTerm", value: searchQuery },
    selectedBrand && { name: "brand", value: selectedBrand },
    selectedModel && { name: "model", value: selectedModel },
    selectedCategory && { name: "category", value: selectedCategory },
    range[0] !== 10000 && { name: "minPrice", value: range[0].toString() },
    range[1] !== 1000001 && { name: "maxPrice", value: range[1].toString() },
    inStock && { name: "inStock", value: "true" },
  ].filter(Boolean);

  const { data: allCars, isLoading } = useGetAllCarsQuery(queryParams);

  useEffect(() => {
    if (allCars?.data) {
      const brands = allCars.data.map((item) => item.brand);
      const uniqueBrands = [...new Set(brands)];
      setBrandData(uniqueBrands);

      const models = allCars.data.map((item) => item.model);
      const uniqueModels = [...new Set(models)];
      setModelData(uniqueModels);

      const categories = allCars.data.map((item) => item.category);
      const uniqueCategories = [...new Set(categories)].filter(Boolean);
      setCategoryData(uniqueCategories);
    }
  }, [allCars]);

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
              <Button
                type="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrand(null);
                  setSelectedModel(null);
                  setSelectedCategory(null);
                  setRange([10000, 1000001]);
                }}
              >
                Reset All
              </Button>
            </div>
            <Checkbox
              style={{ marginBottom: "10px" }}
              onChange={(e) => setInStock(e.target.checked)}
            >
              Show Avilable Cars Only
            </Checkbox>
            <Input
              placeholder="Search cars"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <CustomSelect
              label="Brand"
              placeholder="Brand"
              options={brandData.map((item) => ({
                value: item,
                label: item.charAt(0).toUpperCase() + item.slice(1),
              }))}
              onChange={(value) => setSelectedBrand(value)}
              onSearch={(value) => console.log(value)}
            />

            <CustomSelect
              label="Model"
              placeholder="Model"
              options={modelData.map((item) => ({
                value: item,
                label: item.charAt(0).toUpperCase() + item.slice(1),
              }))}
              onChange={(value) => setSelectedModel(value)}
              onSearch={(value) => console.log(value)}
            />

            <CustomSelect
              label="Category"
              placeholder="Category"
              options={categoryData.map((item) => ({
                value: item,
                label: item.charAt(0).toUpperCase() + item.slice(1),
              }))}
              onChange={(value) => setSelectedCategory(value)}
              onSearch={(value) => console.log(value)}
            />

            <div style={{ marginBottom: "20px" }}>
              <Title level={5} style={{ fontWeight: "bold" }}>
                PRICE RANGE
              </Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  ৳ {range[0].toLocaleString()}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  ৳ {range[1].toLocaleString()}
                </span>
              </div>
              <Slider
                range
                min={10000}
                max={1000001}
                defaultValue={range}
                onChange={handleChange}
                styles={{
                  track: { backgroundColor: "green" },
                  handle: { borderColor: "red", backgroundColor: "white" },
                }}
              />
            </div>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#F0F3F8",
                padding: "20px",
              }}
            >
              <Title level={3}>
                {allCars?.data?.length} vehicles for sale in Bangladesh
              </Title>
            </Header>
            {isLoading ? (
              <>
                <Skeleton active />
              </>
            ) : (
              <>
                <Content style={{ padding: "20px" }}>
                  <Row gutter={[16, 16]}>
                    {allCars?.data?.map((item) => (
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item._id}>
                        <Card hoverable>
                          <img
                            alt={item.name}
                            src={item?.image[0]}
                            className="car-image zoom-effect"
                          />
                          <div style={{ padding: "10px" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Title level={5} style={{ margin: 0 }}>
                                {item?.name}
                              </Title>

                              <Text
                                type="secondary"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  padding: "4px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "4px",
                                }}
                              >
                                {item?.category}
                              </Text>
                            </div>
                            <div
                              style={{
                                marginBottom: "10px",
                              }}
                            >
                              <Text type="secondary">
                                {item?.brand} | {item?.model}
                              </Text>
                            </div>
                            <Text type="secondary">
                              <EnvironmentOutlined />{" "}
                              {item?.location || "Dhaka"}
                            </Text>
                            <p>
                              <b style={{ color: "#d32f2f" }}>Price:</b>
                              {item.price}
                            </p>
                            <p>
                              <b>Mileage:</b> {item?.Mileage || "N/A"}
                            </p>
                          </div>
                          <Link to={`/cars/${item._id}`}>
                            <Button block variant="solid" color="primary">
                              View Details
                            </Button>
                          </Link>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Content>
              </>
            )}
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default AllCars;
