import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <div className="inline-flex items-center gap-1 bg-silk-white/5 rounded-full p-1 border border-border-dim backdrop-blur-sm">
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-silk-white/10 text-silk-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className="w-3 h-3" />
      </button>
      <div className="w-10 h-8 flex items-center justify-center text-silk-white text-sm font-display font-medium">
        {quantity}
      </div>
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-silk-white/10 text-silk-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default QuantitySelector;
