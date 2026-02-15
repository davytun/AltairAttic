import apiClient from "@/lib/api";

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  notes?: string;
  items: OrderItem[];
}

export const orderService = {
  async createOrder(data: CreateOrderData) {
    const response = await apiClient.post("/orders", data);
    return response.data;
  },

  async getOrderByNumber(orderNumber: string) {
    const response = await apiClient.get(`/orders/${orderNumber}`);
    return response.data;
  },
};
