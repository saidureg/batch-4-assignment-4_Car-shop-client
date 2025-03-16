import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox, Row, Col } from "antd";
import { TCar } from "../../../../types";
import { useGetAllCarsQuery } from "../../../../redux/features/car/carApi";
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} from "../../../../redux/features/admin/carManagement.api";
import { toast } from "sonner";

const Car = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<TCar | null>(null);

  const [form] = Form.useForm();

  const { data: allCars } = useGetAllCarsQuery(undefined);
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  const showModal = (car?: TCar): void => {
    setIsUpdateMode(!!car);
    setCurrentCar(car || null);
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    form.resetFields();
    setCurrentCar(null);
  };

  useEffect(() => {
    if (isModalOpen && currentCar) {
      form.setFieldsValue(currentCar);
    } else {
      form.resetFields();
    }
  }, [isModalOpen, currentCar, form]);

  const dataSource = allCars?.data?.map((car: TCar) => ({
    key: car._id,
    ...car,
  }));

  const handleAddProduct = async (values: Omit<TCar, "_id">): Promise<void> => {
    const toastId = toast.loading("Adding new product...");
    const imageUrls =
      typeof values.image === "string"
        ? values.image.split(",").map((url) => url.trim())
        : [];

    const newProduct: TCar = {
      ...values,
      inStock: values.quantity > 0,
      description: values.description || "",
      image: imageUrls,
      location: values.location || "",
      Mileage: values.Mileage || 0,
      AC: values.AC || false,
      PST: values.PST || false,
      MG: values.MG || false,
      CNG: values.CNG || false,
    };

    await createCar(newProduct);
    toast.success("Added new product!", { id: toastId, duration: 2000 });
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleUpdateProduct = async (
    values: Omit<TCar, "carId">
  ): Promise<void> => {
    if (!currentCar) return;

    const imageUrls =
      typeof values.image === "string"
        ? values.image.split(",").map((url) => url.trim())
        : [];

    const updatedProduct = {
      ...currentCar,
      ...values,
      inStock: values.quantity > 0,
      description: values.description || "",
      image: imageUrls,
      location: values.location || "",
      Mileage: values.Mileage || 0,
      AC: values.AC || false,
      PST: values.PST || false,
      MG: values.MG || false,
      CNG: values.CNG || false,
    };

    await updateCar({ id: currentCar._id, body: updatedProduct });
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteCar(id);
      toast.success("Product deleted successfully!", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to delete product.", { duration: 2000 });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TCar) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              form.resetFields();
              showModal(record);
            }}
          >
            Update
          </Button>
          <Button
            type="link"
            danger
            onClick={() => record._id && handleDelete(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => showModal()}>
          Add Product
        </Button>
      </div>
      <Table
        style={{ width: "100%", height: "100vh" }}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: true }}
        bordered
      />

      <Modal
        title={isUpdateMode ? "Update Product" : "Add Product"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={isUpdateMode ? handleUpdateProduct : handleAddProduct}
          initialValues={{
            ...currentCar,
            AC: currentCar?.AC ?? false,
            PST: currentCar?.PST ?? false,
            MG: currentCar?.MG ?? false,
            CNG: currentCar?.CNG ?? false,
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="model" label="Model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="CC" label="CC" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item name="Mileage" label="Mileage">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URLs (comma separated)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Features">
            <Row>
              <Col span={12}>
                <Form.Item name="AC" valuePropName="checked">
                  <Checkbox>AC</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="PST" valuePropName="checked">
                  <Checkbox>PST</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="MG" valuePropName="checked">
                  <Checkbox>MG</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="CNG" valuePropName="checked">
                  <Checkbox>CNG</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Car;
