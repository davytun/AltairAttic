import apiClient from "@/lib/api";

export interface CreateOrderData {
  product_id: number;
  quantity: number;
  unit?: string;
  first_name: string;
  last_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
}

export const orderService = {
  async createOrder(data: CreateOrderData) {
    const response = await apiClient.post("/order", data);
    return response.data;
  },
};
