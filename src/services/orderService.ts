import apiClient from "@/lib/api";

export interface OrderProductItem {
  id: number;
  quantity: number;
}

interface OrderCustomerFields {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  whatsapp?: string;
  email?: string;
  notes?: string;
  unit?: string;
}

export interface CreateSingleOrderData extends OrderCustomerFields {
  product_id: number;
  quantity: number;
}

export interface CreateCartOrderData extends OrderCustomerFields {
  products: OrderProductItem[];
}

export type CreateOrderData = CreateSingleOrderData | CreateCartOrderData;

export interface CreateOrderResponse {
  message: string;
  is_cart_order: boolean;
  item_count: number;
  order_ids: Array<number | string>;
  order_id: number | string;
  order_number?: string;
  data?: {
    order_number?: string;
  };
}

function sanitizeOrderProduct(item: OrderProductItem): OrderProductItem {
  return {
    id: Number(item.id),
    quantity: Math.max(1, Number(item.quantity) || 1),
  };
}

function isCartOrderData(data: CreateOrderData): data is CreateCartOrderData {
  return "products" in data;
}

/** Build a strict JSON-serializable body (no undefined) so the backend receives valid JSON */
function toOrderBody(
  data: CreateOrderData,
): Record<string, string | number | OrderProductItem[]> {
  const body: Record<string, string | number | OrderProductItem[]> = {
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
    city: data.city ?? "",
    state: data.state ?? "",
  };

  if (isCartOrderData(data)) {
    body.products = data.products.map(sanitizeOrderProduct);
  } else {
    body.product_id = Number(data.product_id);
    body.quantity = Math.max(1, Number(data.quantity) || 1);
  }

  if (data.unit != null && data.unit !== "") body.unit = data.unit;
  if (data.whatsapp != null && data.whatsapp !== "") body.whatsapp = data.whatsapp;
  if (data.email != null && data.email !== "") body.email = data.email;
  if (data.notes != null && data.notes !== "") body.notes = data.notes;
  return body;
}

function normalizeOrderResponse(data: any): CreateOrderResponse {
  const orderIds = Array.isArray(data?.order_ids)
    ? data.order_ids
    : data?.order_id != null
      ? [data.order_id]
      : [];

  return {
    message: data?.message ?? "Order submitted",
    is_cart_order: Boolean(data?.is_cart_order),
    item_count: Number(data?.item_count) || orderIds.length || 1,
    order_ids: orderIds,
    order_id: data?.order_id ?? orderIds[0] ?? "",
    order_number: data?.order_number,
    data: data?.data,
  };
}

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<CreateOrderResponse> {
    const body = toOrderBody(data);
    const response = await apiClient.post("/order", body, {
      headers: { "Content-Type": "application/json" },
    });
    return normalizeOrderResponse(response.data);
  },
};
