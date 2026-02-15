import apiClient from "@/lib/api";
import { Product } from "@/store/useCartStore";

const defaultImage = "https://i.ebayimg.com/images/g/NtwAAeSw1khoGv4e/s-l1600.webp";

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
  const rawImage = apiProduct.image_url || apiProduct.product_image;
  const mainImageUrl = resolveImageUrl(rawImage);

  // Map all images if provide in the images array, otherwise fallback to main image
  const images = Array.isArray(apiProduct.images) && apiProduct.images.length > 0
    ? apiProduct.images.map((img: string) => resolveImageUrl(img))
    : [mainImageUrl];

  const price = Number(apiProduct.price) || 0;
  const salePrice = apiProduct.sale_price != null && apiProduct.sale_price !== "" ? Number(apiProduct.sale_price) : null;
  const displayPrice = salePrice != null ? salePrice : price;
  const originalPrice = salePrice != null ? price : undefined;
  const rating = apiProduct.rating != null ? Number(apiProduct.rating) : undefined;
  const reviews = apiProduct.reviews || [];
  const reviewCount = reviews.length;

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

  return {
    id: Number(apiProduct.id),
    slug: apiProduct.slug || apiProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: apiProduct.name,
    category: apiProduct.category_name || "Product",
    price: displayPrice,
    originalPrice,
    discount:
      originalPrice != null && originalPrice > displayPrice
        ? {
          percentage: Math.round(((originalPrice - displayPrice) / originalPrice) * 100),
          amount: originalPrice - displayPrice,
          label: `Save ${Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}%`,
        }
        : undefined,
    shortDescription: apiProduct.description || "No description available.",
    fullDescription: apiProduct.description || "No detailed description available.",
    images,
    image: images[0],
    stock: stockQty,
    specifications: {},
    features,
    benefits: apiProduct.benefits ?? undefined,
    howToUse: apiProduct.how_to_use ?? undefined,
    badgeText: apiProduct.badge_text ?? undefined,
    badges,
    stockNote: apiProduct.stock_note ?? undefined,
    stockDetails: {
      status: stockStatus,
      threshold: 5,
    },
    socialProof: {
      rating: rating ?? 4.8,
      reviewCount: reviewCount || 0,
      purchaseCount: 0,
      viewingNow: 0,
    },
    reviews: reviewsMapped.length ? reviewsMapped : undefined,
    contentSections: Array.isArray(apiProduct.content_sections)
      ? apiProduct.content_sections.map((section: any) => {
        const resolvedSection = { ...section };
        if (resolvedSection.image_url) resolvedSection.image_url = resolveImageUrl(resolvedSection.image_url);
        if (Array.isArray(resolvedSection.media)) resolvedSection.media = resolvedSection.media.map((m: string) => resolveImageUrl(m));
        if (resolvedSection.url) resolvedSection.url = resolveImageUrl(resolvedSection.url);
        if (Array.isArray(resolvedSection.items)) {
          resolvedSection.items = resolvedSection.items.map((item: any) => ({
            ...item,
            url: resolveImageUrl(item.url)
          }));
        }
        return resolvedSection;
      })
      : undefined,
  } as Product;
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
    // Backend doesn't support slug-based lookup, so we fetch all products
    // and find the one with matching slug
    const response = await apiClient.get<any>('/products');
    let rawData = response.data;
    if (response.data && response.data.data) {
      rawData = response.data.data;
    }

    // Ensure rawData is an array
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid products data');
    }

    // Transform all products and find the simple one by slug
    const products = rawData.map(transformProduct);
    const productBrief = products.find(p => p.slug === slug);

    if (!productBrief) {
      throw new Error(`Product with slug "${slug}" not found`);
    }

    // Crucial: Fetch full detail (reviews, content sections) by ID
    return this.getProductById(productBrief.id);
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
