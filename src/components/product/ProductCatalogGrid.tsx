import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import { Product } from "../../store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check } from "lucide-react";

type SortOption = "recommended" | "price-low" | "price-high" | "newest";

const ProductCatalogGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Cast JSON data
  const products = productsData as unknown as Product[];

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
    <section className="py-12 bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 text-white border border-white/10 px-4 py-2 rounded-lg"
          >
            <Filter size={18} /> Filters
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg p-2 outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside
            className={`lg:w-64 shrink-0 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="sticky top-24 space-y-8">
              {/* Sidebar Header with Clear All */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Filter size={20} className="text-accent" /> Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-400 hover:text-white transition-colors uppercase font-bold tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {category}
                      {selectedCategory === category && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {[
                    "Under ₦75,000",
                    "₦75,000 - ₦150,000",
                    "₦150,000 - ₦300,000",
                    "₦300,000+",
                  ].map((range, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() => togglePriceRange(range)}
                        className="form-checkbox bg-transparent border-white/20 rounded text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Offers */}
              <div>
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
                  Special Offers
                </h3>
                <div className="space-y-2">
                  {["On Sale", "Best Sellers", "New Arrivals"].map(
                    (offer, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOffers.includes(offer)}
                          onChange={() => toggleOffer(offer)}
                          className="form-checkbox bg-transparent border-white/20 rounded text-blue-600 focus:ring-0 w-4 h-4"
                        />
                        <span>{offer}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Desktop Sort Bar */}
            <div className="hidden lg:flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <p className="text-gray-400">
                Showing{" "}
                <span className="text-white font-bold">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Sort by:</span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:border-white/30 transition-all">
                    {sortBy === "recommended"
                      ? "Recommended"
                      : sortBy === "price-low"
                        ? "Price: Low to High"
                        : sortBy === "price-high"
                          ? "Price: High to Low"
                          : "Newest"}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#151925] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                    {[
                      { label: "Recommended", value: "recommended" },
                      { label: "Price: Low to High", value: "price-low" },
                      { label: "Price: High to Low", value: "price-high" },
                      { label: "Newest Arrivals", value: "newest" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as SortOption)}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl ${sortBy === option.value ? "text-blue-400" : "text-white"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-white/50 text-lg">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-blue-400 hover:text-blue-300 underline"
                  >
                    Clear Filters
                  </button>
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
