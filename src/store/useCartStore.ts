import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discount?: {
    percentage: number;
    amount: number;
    label: string;
  };
  images: string[];
  video?: {
    url: string;
    thumbnail: string;
    duration: string;
  };
  stock: number;
  stockDetails?: {
    status: 'in-stock' | 'low' | 'out-of-stock';
    threshold: number;
  };
  specifications: Record<string, string>;
  features: string[]; // Keeping as string[] for now, will migrate or dual-support
  badges?: {
    type: string;
    text: string;
    color: string;
  }[];
  socialProof?: {
    rating: number;
    reviewCount: number;
    purchaseCount: number;
    viewingNow: number;
    recentPurchase?: {
      name: string;
      time: string;
    };
  };
  trustSignals?: string[];
  urgency?: {
    type: 'stock' | 'time' | 'demand';
    message: string;
    countdown?: string | null;
  };
  shipping?: {
    free: boolean;
    sameDay: boolean;
    sameDayDeadline?: string;
    estimatedDays: string;
  };
  bundles?: {
    name: string;
    products: number[];
    discount: number;
    savings: number;
  }[];
  frequentlyBoughtWith?: number[];
  relatedProducts?: number[];
  reviews?: {
    id: number;
    author: string;
    verified: boolean;
    rating: number;
    date: string;
    title: string;
    content: string;
    helpfulVotes: number;
    images?: string[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product | CartItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, quantity }],
            };
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    }
  )
);
