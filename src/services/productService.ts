import apiClient from "@/lib/api";
import { Product } from "@/utils/productsData";

const transformProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    category: apiProduct.category_name || "Hardware", // Use category_name if available, else default
    price: apiProduct.price ? `₦${apiProduct.price}` : "Inquire", // Format price
    description: apiProduct.description || "No description available.",
    image: apiProduct.product_image || "https://i.ebayimg.com/images/g/NtwAAeSw1khoGv4e/s-l1600.webp",
    specs: apiProduct.specs || ["High Performance", "Premium Build", "Smart Integration"], // Fallback specs
    slug: apiProduct.slug,
  };
};

export const productService = {
  async getProducts() {
    const response = await apiClient.get<any>("/products");

    let rawData = response.data;
    if (response.data && Array.isArray(response.data.data)) {
      rawData = response.data.data;
    }

    // Ensure rawData is an array before mapping
    if (!Array.isArray(rawData)) return [];

    return rawData.map(transformProduct);
  },

  async getProductBySlug(slug: string) {
    const response = await apiClient.get<any>(`/products/${slug}`);
    let rawData = response.data;
    if (response.data && response.data.data) {
      rawData = response.data.data;
    }
    return transformProduct(rawData);
  },
};
