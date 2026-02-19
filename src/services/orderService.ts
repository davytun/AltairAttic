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

/** Build a strict JSON-serializable body (no undefined) so the backend receives valid JSON */
function toOrderBody(data: CreateOrderData): Record<string, string | number> {
  const body: Record<string, string | number> = {
    product_id: data.product_id,
    quantity: data.quantity,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
    city: data.city ?? "",
    state: data.state ?? "",
  };
  if (data.unit != null && data.unit !== "") body.unit = data.unit;
  if (data.whatsapp != null && data.whatsapp !== "") body.whatsapp = data.whatsapp;
  if (data.email != null && data.email !== "") body.email = data.email;
  if (data.notes != null && data.notes !== "") body.notes = data.notes;
  return body;
}

export const orderService = {
  async createOrder(data: CreateOrderData) {
    const body = toOrderBody(data);
    const response = await apiClient.post("/order", body, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
};
