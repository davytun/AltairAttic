import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore, Product } from "../../store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FALLBACK_PRODUCT_IMAGE =
  "https://i.ebayimg.com/images/g/NtwAAeSw1khoGv4e/s-l1600.webp";

interface ProductCardProps {
  product: Product;
  variant?: "business" | "shop";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "shop",
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 2000);
  };
  const productLink =
    variant === "shop"
      ? `/shop/${product.slug || product.id}`
      : `/catalogue/${product.slug || product.id}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-obsidian-surface rounded-2xl border border-border-dim hover:border-accent/30 overflow-hidden transition-all duration-300 flex flex-col h-full [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/10 [html[data-theme='light']_&:hover]:border-accent/40 [html[data-theme='light']_&]:shadow-sm"
      >
        {/* Image & Badges */}
        <Link
          to={productLink}
          className="block relative aspect-square overflow-hidden bg-obsidian [html[data-theme='light']_&]:bg-black/5"
        >
          <img
            src={product.images[0]}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
            }}
            alt={product.name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />

          {/* Top-Left: Urgency/Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.stockDetails?.status === "low" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-orange-500 text-white shadow-lg shadow-orange-900/40 animate-pulse">
                ⚡ Only {product.stock} Left
              </span>
            )}
            {product.badges?.map((badge, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white shadow-lg ${badge.color === "red" ? "bg-red-600" : badge.color === "green" ? "bg-green-600" : "bg-accent"}`}
              >
                {badge.text}
              </span>
            ))}
          </div>

          {/* Top-Right: Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3">
              <div className="flex flex-col items-center bg-yellow-400 text-black font-bold px-2 py-1 rounded-lg shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                <span className="text-xs">SAVE</span>
                <span className="text-sm">{product.discount.percentage}%</span>
              </div>
            </div>
          )}

          {/* Bottom: Social Proof Overlay (on hover) */}
          {product.socialProof && product.socialProof.viewingNow > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-[10px] text-white flex items-center justify-center gap-1 font-bold uppercase tracking-widest">
                🔥 {product.socialProof.viewingNow} people watching now
              </p>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col grow">
          {/* Category */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-silk-white/40">
              {product.category}
            </span>
          </div>

          <Link
            to={productLink}
            className="block group-hover:text-accent transition-colors mb-2"
          >
            <h3 className="text-lg font-bold text-silk-white line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating - Moved to next line */}
          {product.socialProof && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`text-[10px] ${star <= Math.round(product.socialProof?.rating ?? 0) ? "text-yellow-400" : "text-silk-white/10"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-silk-white/40 text-[10px] font-mono">
                ({product.socialProof.rating} /{" "}
                {product.socialProof.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Price Section */}
          <div className="mt-auto pt-4">
            <div className="flex items-end gap-2 mb-1">
              <div className="text-2xl font-bold text-silk-white">
                {formatCurrency(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-silk-white/30 line-through mb-1">
                  {formatCurrency(product.originalPrice)}
                </div>
              )}
            </div>
            {product.discount && (
              <p className="text-xs text-green-400 font-medium mb-4">
                You save: {formatCurrency(product.discount.amount)}
              </p>
            )}

            {/* CTA */}
            {variant === "shop" ? (
              <div className="flex gap-2">
                <Link
                  to={productLink}
                  className="flex-1 flex items-center justify-center px-3 py-2.5 bg-white/5 border border-white/10 text-silk-white text-[10px] font-bold uppercase tracking-wide rounded-lg hover:bg-white/10 transition-colors [html[data-theme='light']_&]:bg-black/5 [html[data-theme='light']_&]:border-black/10"
                >
                  View
                </Link>
                <button
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-accent/20",
                    isAdding
                      ? "bg-green-500 text-white"
                      : "bg-accent text-white hover:bg-accent/80",
                  )}
                >
                  {isAdding ? (
                    <>
                      <CheckCircle2 size={14} />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} />
                      Add
                    </>
                  )}
                </button>
              </div>
            ) : (
              <Link
                to={productLink}
                className="w-full flex items-center justify-center px-3 py-4 bg-accent/10 border border-accent/30 text-accent text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-accent hover:text-obsidian transition-all duration-500 [html[data-theme='light']_&]:bg-accent/5 [html[data-theme='light']_&]:border-accent/20"
              >
                Learn More
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
