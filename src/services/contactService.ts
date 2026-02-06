import apiClient from "@/lib/api";

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  async submitContact(data: ContactData) {
    const response = await apiClient.post("/contact", data);
    return response.data;
  },
};
