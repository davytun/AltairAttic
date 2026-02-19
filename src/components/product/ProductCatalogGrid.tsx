import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import { Product } from "../../store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check, Loader2 } from "lucide-react";
import { productService } from "@/services/productService";

type SortOption = "recommended" | "price-low" | "price-high" | "newest";

interface ProductCatalogGridProps {
  variant?: "business" | "shop";
}

const ProductCatalogGrid: React.FC<ProductCatalogGridProps> = ({
  variant = "shop",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        // Since useCartStore's Product has slightly different fields than what the API might return after transformation,
        // we might need to ensure compatibility. But productService.transformProduct should handle it.
        // We'll cast to any for now to avoid strict type issues if they differ slightly.
        setProducts(data as any);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range],
    );
  };

  const toggleOffer = (offer: string) => {
    setSelectedOffers((prev) =>
      prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRanges([]);
    setSelectedOffers([]);
    setSortBy("recommended");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedPriceRanges.length > 0 ||
    selectedOffers.length > 0;

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // 1. Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // 2. Price Range Filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPriceRanges.some((range) => {
          if (range === "Under ₦75,000") return p.price < 75000;
          if (range === "₦75,000 - ₦150,000")
            return p.price >= 75000 && p.price < 150000;
          if (range === "₦150,000 - ₦300,000")
            return p.price >= 150000 && p.price < 300000;
          if (range === "₦300,000+") return p.price >= 300000;
          return false;
        });
      });
    }

    // 3. Special Offers Filter
    if (selectedOffers.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedOffers.every((offer) => {
          if (offer === "On Sale") return !!p.discount;
          if (offer === "Best Sellers")
            return p.badges?.some(
              (b) =>
                b.type === "bestseller" ||
                b.text.toLowerCase().includes("bestseller"),
            );
          if (offer === "New Arrivals")
            return p.badges?.some(
              (b) => b.type === "new" || b.text.toLowerCase().includes("new"),
            );
          return true;
        });
      });
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return b.id - a.id;
        default:
          return b.stock < 5 ? -1 : 0;
      }
    });
  }, [products, selectedCategory, selectedPriceRanges, selectedOffers, sortBy]);

  return (
    <section className="py-12 bg-obsidian min-h-screen [html[data-theme='light']_&]:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Desktop Sort Bar */}
            <div className="flex justify-between items-center mb-6 border-b border-border-dim pb-4 [html[data-theme='light']_&]:border-black/10">
              <p className="text-text-muted">
                Showing{" "}
                <span className="text-silk-white font-bold">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Sort by:</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-silk-white bg-white/5 border border-border-dim px-4 py-2 rounded-lg hover:border-white/30 transition-all [html[data-theme='light']_&]:bg-black/5 [html[data-theme='light']_&]:border-black/10 [html[data-theme='light']_&:hover]:border-black/30">
                    {sortBy === "recommended"
                      ? "Recommended"
                      : sortBy === "price-low"
                        ? "Price: Low to High"
                        : sortBy === "price-high"
                          ? "Price: High to Low"
                          : "Newest"}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-obsidian-surface border border-border-dim rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/10">
                    {[
                      { label: "Recommended", value: "recommended" },
                      { label: "Price: Low to High", value: "price-low" },
                      { label: "Price: High to Low", value: "price-high" },
                      { label: "Newest Arrivals", value: "newest" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as SortOption)}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl [html[data-theme='light']_&:hover]:bg-black/5 ${sortBy === option.value ? "text-accent" : "text-silk-white"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-silk-white/50">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p className="uppercase tracking-widest text-xs font-bold">
                    Loading Products...
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} variant={variant} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-silk-white/50 text-lg">
                    No products found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogGrid;
