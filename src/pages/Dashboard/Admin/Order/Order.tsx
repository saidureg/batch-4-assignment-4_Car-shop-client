import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Select, DatePicker } from "antd";
import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../../../redux/features/order/orderApi";
import dayjs from "dayjs";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<any | null>(null);
  const [form] = Form.useForm();

  const { data: allOrders } = useGetAllOrdersQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const showModal = (order: any): void => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    form.resetFields();
    setCurrentOrder(null);
  };

  useEffect(() => {
    if (isModalOpen && currentOrder) {
      form.setFieldsValue({
        status: currentOrder.status,
        estimatedDelivery: currentOrder.estimatedDelivery
          ? dayjs(currentOrder.estimatedDelivery)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [isModalOpen, currentOrder, form]);

  const handleUpdateOrder = async (values: {
    status?: string;
    estimatedDelivery?: dayjs.Dayjs;
  }): Promise<void> => {
    if (!currentOrder) return;
    const res = await updateOrder({
      id: currentOrder._id,
      body: {
        status: values.status,
        estimatedDelivery: values.estimatedDelivery
          ? values.estimatedDelivery.toISOString()
          : currentOrder.estimatedDelivery,
      },
    });

    if (res.error) {
      toast.error("Error updating order");
      return;
    }
    toast.success("Order status updated!");
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const res = await deleteOrder(id);
      if (res.error) {
        toast.error("Error deleting order");
        return;
      }
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Error deleting order");
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: any) => user?.name,
    },
    {
      title: "Car",
      dataIndex: "car",
      key: "car",
      render: (car: any) => car?.name,
    },
    {
      title: "Brand",
      dataIndex: "car",
      key: "brand",
      render: (car: any) => car?.brand,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Delivery Date",
      dataIndex: "estimatedDelivery",
      key: "estimatedDelivery",
      render: (date: string) =>
        date ? dayjs(date).format("DD MMM YYYY") : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ fontWeight: "600", color: "green" }}>{status}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <span>
          <Button type="link" onClick={() => showModal(record)}>
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
      <Table
        style={{ width: "100%", height: "100vh" }}
        dataSource={allOrders?.data}
        columns={columns}
        bordered
        scroll={{ x: true }}
      />

      <Modal
        title="Update Order"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateOrder}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
              <Select.Option value="Delivered">Cancelled</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="estimatedDelivery" label="Delivery Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
