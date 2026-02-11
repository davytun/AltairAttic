import React from "react";
import { Link } from "react-router-dom";
import {
  CartItem as CartItemType,
  useCartStore,
} from "../../store/useCartStore";
import QuantitySelector from "./QuantitySelector";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-8 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors duration-300 rounded-xl px-4 -mx-4">
      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-obsidian-muted rounded-xl overflow-hidden border border-white/5 shadow-lg">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="flex-1 ml-0 sm:ml-8 mt-6 sm:mt-0 flex flex-col justify-between self-stretch w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-medium text-white mb-1">
              <Link
                to={`/product/${item.id}`}
                className="hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            </h3>
            <p className="text-xs text-accent uppercase tracking-wider font-bold">
              {item.category}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrease={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              max={item.stock}
            />
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="group flex items-center gap-2 text-sm font-medium text-white/40 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Remove
            </button>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-white/40 mb-1">
              ₦{item.price.toFixed(2)} / unit
            </div>
            <div className="text-2xl font-display font-bold text-white">
              ₦{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
