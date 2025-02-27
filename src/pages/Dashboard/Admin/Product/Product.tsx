import { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";

interface Product {
  key: string;
  name: string;
  price: string;
  category: string;
}

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([
    { key: "1", name: "Product 1", price: "$100", category: "Category 1" },
    { key: "2", name: "Product 2", price: "$200", category: "Category 2" },
  ]);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (values: Omit<Product, "key">): void => {
    const newProduct: Product = {
      key: String(products.length + 1),
      ...values,
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const handleDelete = (key: string): void => {
    setProducts(products.filter((product) => product.key !== key));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <span>
          <Button type="link" onClick={() => console.log("Update", record.key)}>
            Update
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
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
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <Table
        style={{ width: "100%", height: "100vh" }}
        dataSource={products}
        columns={columns}
        scroll={{ x: true }}
        bordered
      />

      <Modal
        title="Add Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddProduct}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
