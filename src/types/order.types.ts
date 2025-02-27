export type TOrder = {
  id: string;
  user: string;
  car: string;
  totalPrice: number;
  quantity: number;
  estimatedDelivery: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
