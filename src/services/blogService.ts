import apiClient from "@/lib/api";
import { BlogPost } from "@/utils/blogData";

const transformBlog = (apiBlog: any): BlogPost => {
  return {
    id: apiBlog.id.toString(),
    title: apiBlog.title,
    slug: apiBlog.slug,
    content: apiBlog.content || "",
    excerpt: apiBlog.content
      ? apiBlog.content.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."
      : "No description available.",
    date: new Date(apiBlog.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: "5 min read", // Estimate or default
    category: apiBlog.category_name || "Insight",
    author: "Altair Attic", // Default author as it's not in API
    image: apiBlog.featured_image || "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?auto=format&fit=crop&q=80&w=2600", // Fallback image
    featured: false,
  };
};

export const blogService = {
  async getBlogs(category?: string) {
    const response = await apiClient.get<any>("/blogs", {
      params: { category },
    });

    let rawData = response.data;
    if (response.data && Array.isArray(response.data.data)) {
      rawData = response.data.data;
    }

    // Ensure rawData is an array before mapping
    if (!Array.isArray(rawData)) return [];

    return rawData.map(transformBlog);
  },

  async getBlogBySlug(slug: string) {
    const response = await apiClient.get<any>(`/blogs/${slug}`);
    let rawData = response.data;
    if (response.data && response.data.data) {
      rawData = response.data.data;
    }
    return transformBlog(rawData);
  },
};
