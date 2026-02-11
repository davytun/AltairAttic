import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "../../store/useCartStore";
import AddToCartModal from "../cart/AddToCartModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-[#0B0F19] rounded-2xl border border-white/5 hover:border-blue-500/30 overflow-hidden transition-all duration-300 flex flex-col h-full"
      >
        {/* Image & Badges */}
        <Link
          to={`/product/${product.id}`}
          className="block relative aspect-square overflow-hidden bg-[#151925]"
        >
          <img
            src={product.images[0]}
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
                className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white shadow-lg ${badge.color === "red" ? "bg-red-600" : badge.color === "green" ? "bg-green-600" : "bg-blue-600"}`}
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
          {product.socialProof && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-[10px] text-white flex items-center justify-center gap-1">
                🔥 {product.socialProof.viewingNow} people viewing now
              </p>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-4 flex flex-col grow">
          {/* Category & Rating */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              {product.category}
            </span>
            {product.socialProof && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-white/80 text-xs font-medium">
                  {product.socialProof.rating}
                </span>
                <span className="text-white/30 text-[10px]">
                  ({product.socialProof.reviewCount})
                </span>
              </div>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block group-hover:text-blue-400 transition-colors mb-2"
          >
            <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="mt-auto pt-4">
            <div className="flex items-end gap-2 mb-1">
              <div className="text-2xl font-bold text-white">
                ₦{product.price.toFixed(2)}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-white/30 line-through mb-1">
                  ₦{product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>
            {product.discount && (
              <p className="text-xs text-green-400 font-medium mb-4">
                You save: ₦{product.discount.amount.toFixed(2)}
              </p>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link
                to={`/product/${product.id}`}
                className="flex items-center justify-center px-3 py-2.5 border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-white/10 transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-3 py-2.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
