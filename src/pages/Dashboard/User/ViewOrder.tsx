import { Table } from "antd";

import dayjs from "dayjs";
import { useGetOrderByUserIdQuery } from "../../../redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { verifyToken } from "../../../utils/verifyToken";
import { TUser } from "../../../redux/features/auth/authSlice";

const ViewOrder = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = verifyToken(token) as TUser;
      if (user.id) {
        setUserId(user.id);
      }
    }
  }, []);

  const { data: orderData } = useGetOrderByUserIdQuery(userId!, {
    skip: !userId,
  });

  const columns = [
    { title: "Car Name", dataIndex: ["car", "name"], key: "carName" },
    { title: "Brand", dataIndex: ["car", "brand"], key: "brand" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Total Price ($)", dataIndex: "totalPrice", key: "totalPrice" },
    {
      title: "Delivery Date",
      dataIndex: "estimatedDelivery",
      key: "deliveryDate",
      render: (date: string) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Paymnet Date",
      dataIndex: ["transaction", "date_time"],
      key: "transactionDate",
      render: (date: string) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Transaction Method",
      dataIndex: ["transaction", "method"],
      key: "method",
    },
  ];

  return (
    <div style={{ padding: "0 8px" }}>
      <Table
        style={{ width: "100%", height: "100vh" }}
        dataSource={
          Array.isArray(orderData?.data)
            ? orderData.data
            : orderData
            ? [orderData.data]
            : []
        }
        columns={columns}
        bordered
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ViewOrder;
