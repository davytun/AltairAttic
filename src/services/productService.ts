import apiClient from "@/lib/api";
import { Product } from "@/store/useCartStore";
import productsData from "../data/products.json";

const defaultImage = "https://i.ebayimg.com/images/g/NtwAAeSw1khoGv4e/s-l1600.webp";

function generateFallbackId(slug?: string): number {
  if (!slug) return Date.now();
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || Date.now();
}

function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return defaultImage;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base = import.meta.env.VITE_API_BASE_URL || "";
  const normalizedUrl = url.startsWith("/") ? url : "/" + url;

  if (!base) return normalizedUrl;

  const normalizedBase = base.replace(/\/$/, "");

  // Avoid double prefixing if the url already starts with the base
  if (normalizedUrl.startsWith(normalizedBase + "/") || normalizedUrl === normalizedBase) {
    return normalizedUrl;
  }

  return `${normalizedBase}${normalizedUrl}`;
}

const transformProduct = (apiProduct: any): Product => {
  const mainImageUrl = resolveImageUrl(apiProduct.product_image || apiProduct.image_url);

  // Map all images if provide in the images array, otherwise fallback to main image
  const images = Array.isArray(apiProduct.images) && apiProduct.images.length > 0
    ? apiProduct.images.map((img: string) => resolveImageUrl(img))
    : [mainImageUrl];

  const price = Number(apiProduct.price) || 0;
  const originalPrice = apiProduct.original_price != null ? Number(apiProduct.original_price) : undefined;

  const rating = apiProduct.rating != null ? Number(apiProduct.rating) : undefined;
  const reviews = apiProduct.reviews || [];

  const reviewsMapped = reviews.map((r: any) => ({
    id: r.id,
    author: r.author_name || r.author,
    verified: Boolean(r.is_verified),
    rating: Number(r.rating) || 5,
    date: r.created_at || "",
    title: "",
    content: r.comment || r.content || "",
    helpfulVotes: 0,
  }));

  const features = Array.isArray(apiProduct.features)
    ? apiProduct.features
    : Array.isArray(apiProduct.specs)
      ? apiProduct.specs
      : [];

  const stockQty = Number(apiProduct.stock_quantity) ?? 10;
  const stockStatus: "in-stock" | "low" | "out-of-stock" =
    stockQty === 0 ? "out-of-stock" : stockQty <= 5 ? "low" : "in-stock";

  const badges = apiProduct.badges || [];
  if (apiProduct.badge_text) {
    badges.push({ text: apiProduct.badge_text, color: "accent" });
  }

  // Merge with local data if available (for funnel content, etc.)
  const localProduct = (productsData as any[]).find(p => p.id === Number(apiProduct.id) || p.slug === apiProduct.slug);

  return {
    id: Number(apiProduct.id) || generateFallbackId(apiProduct.slug),
    slug: apiProduct.slug || localProduct?.slug,
    name: apiProduct.name,
    category: apiProduct.category?.name || apiProduct.category_name || "Product",
    price,
    originalPrice,
    discount:
      originalPrice != null && originalPrice > price
        ? {
          percentage: Math.round(((originalPrice - price) / originalPrice) * 100),
          amount: originalPrice - price,
          label: `Save ${Math.round(((originalPrice - price) / originalPrice) * 100)}%`,
        }
        : undefined,
    shortDescription: apiProduct.short_description || apiProduct.description || "No description available.",
    fullDescription: apiProduct.description || "No detailed description available.",
    images,
    image: images[0],
    stock: stockQty,
    specifications: apiProduct.specifications || {},
    features,
    badges,
    socialProof: {
      rating: rating ?? 4.8,
      reviewCount: apiProduct.socialProof?.reviewCount || reviewsMapped.length || 0,
      purchaseCount: 0,
      viewingNow: (Math.floor(Math.random() * 21) + 12),
    },
    reviews: reviewsMapped.length ? reviewsMapped : undefined,
    contentSections: apiProduct.content_sections || localProduct?.contentSections,
  } as Product;
};

export const productService = {
  async getProducts() {
    const response = await apiClient.get<any>("/products");
    let rawData = response.data;
    if (response.data && Array.isArray(response.data.data)) {
      rawData = response.data.data;
    }
    if (!Array.isArray(rawData)) return [];
    return rawData.map(transformProduct);
  },

  async getProductBySlug(slug: string) {
    try {
      const response = await apiClient.get<any>(`/products/${slug}`);
      let rawData = response.data;
      if (response.data && response.data.data) {
        rawData = response.data.data;
      }
      return transformProduct(rawData);
    } catch (err: any) {
      // If API has no single-product-by-slug endpoint (e.g. 404), fall back to list + find by slug
      if (err?.response?.status === 404) {
        const listRes = await apiClient.get<any>("/products");
        const rawList = Array.isArray(listRes.data) ? listRes.data : Array.isArray(listRes.data?.data) ? listRes.data.data : [];
        const found = rawList.find((p: any) => (p.slug || "").toLowerCase() === slug.toLowerCase());
        if (found) return transformProduct(found);
      }
      throw err;
    }
  },

  async getCatalogue() {
    const response = await apiClient.get<any>("/catalogue");
    let rawData = response.data;
    if (response.data && Array.isArray(response.data.data)) {
      rawData = response.data.data;
    }
    if (!Array.isArray(rawData)) return [];
    return rawData.map((item: any) =>
      transformProduct({
        ...item,
        id: item.id ?? generateFallbackId(item.slug),
        image_url: item.image_url || item.product_image,
        stock_quantity: item.stock_quantity ?? 10,
        specifications: item.specifications || {},
        features: item.features || [],
      }),
    );
  },

  async getCatalogueBySlug(slug: string) {
    const response = await apiClient.get<any>(`/catalogue/${slug}`);
    let rawData = response.data;
    if (response.data && response.data.data) {
      rawData = response.data.data;
    }
    return transformProduct(rawData);
  },

  async getProductById(id: number | string) {
    const response = await apiClient.get<any>(`/products/${id}`);
    let rawData = response.data;
    if (response.data && response.data.data) {
      rawData = response.data.data;
    }
    return transformProduct(rawData);
  },
};
