import { Button, Card, Badge, Skeleton, Descriptions } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import { useVerifyOrderQuery } from "../../redux/features/order/orderApi";
import { TOrderData } from "../../types";

import "./OrderVerification.css";

const OrderVerification = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id") || "",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: TOrderData = data?.data?.[0];

  return isLoading ? (
    <Skeleton active />
  ) : (
    <div className="order-container">
      <h1 className="order-title">Order Verification</h1>
      <div className="order-grid">
        <Card title="Order Details" variant="outlined">
          <Descriptions column={1}>
            <Descriptions.Item label="Order ID">
              {orderData?.order_id}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {orderData?.currency} {orderData?.amount?.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  orderData?.bank_status === "Success" ? "success" : "error"
                }
                text={orderData?.bank_status}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(orderData?.date_time)?.toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Payment Information" variant="outlined">
          <Descriptions column={1}>
            <Descriptions.Item label="Method">
              {orderData?.method}
            </Descriptions.Item>
            <Descriptions.Item label="Transaction ID">
              {orderData?.bank_trx_id}
            </Descriptions.Item>
            <Descriptions.Item label="Invoice No">
              {orderData?.invoice_no}
            </Descriptions.Item>
            <Descriptions.Item label="SP Code">
              {orderData?.sp_code}
            </Descriptions.Item>
            <Descriptions.Item label="SP Message">
              {orderData?.sp_message}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Customer Information" variant="outlined">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              {orderData?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {orderData?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {orderData?.phone_no}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {orderData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {orderData?.city}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Verification Status" variant="outlined">
          <div className="verification-status">
            {orderData?.is_verify === 1 ? (
              <>
                <CheckCircleOutlined style={{ color: "green" }} />
                <span>Verified</span>
              </>
            ) : (
              <>
                <ExclamationCircleOutlined style={{ color: "orange" }} />
                <span>Not Verified</span>
              </>
            )}
          </div>
          <Link to="/dashboard/myorder">
            <Button color="primary" variant="solid">
              View Orders
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default OrderVerification;
