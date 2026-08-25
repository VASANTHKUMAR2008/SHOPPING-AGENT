import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Heart, 
  Bell,
  Zap
} from 'lucide-react';
import { Currency, Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  products: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  currency,
  onClose,
  products,
  onRemoveWishlist,
  onAddToCart,
  onBuyNow,
  onViewDetails
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end">
      <div 
        id="wishlist-drawer"
        className="w-full max-w-md bg-[#0F0F0F] text-[#E0E0E0] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 border-l border-white/10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-bold text-white">Saved Wishlist</h2>
            <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-medium font-mono">
              {products.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {products.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-3">
            <Heart className="w-12 h-12 text-zinc-700" />
            <h3 className="text-base font-semibold text-white">Your wishlist is empty</h3>
            <p className="text-xs text-zinc-500 max-w-xs">
              Click the heart icon on any product card or AI recommendation to save it for price tracking.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 flex items-center gap-2 text-xs text-rose-300">
              <Bell className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Your Shopping Agent monitors price drops on all saved items.</span>
            </div>

            <div className="divide-y divide-white/5">
              {products.map((product) => {
                const currentPrice = currency === 'USD' ? (product.priceUSD || Math.round(product.priceINR / 83)) : (product.priceINR || product.price);
                const origPrice = currency === 'USD' 
                  ? (product.originalPriceUSD || (product.originalPriceINR ? Math.round(product.originalPriceINR / 83) : undefined))
                  : (product.originalPriceINR || product.originalPrice);

                return (
                  <div key={product.id} className="py-3 flex items-start space-x-3">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-zinc-900 shrink-0 border border-white/10 cursor-pointer"
                      onClick={() => onViewDetails(product)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.brand}</span>
                      <h4 
                        onClick={() => onViewDetails(product)}
                        className="text-xs font-semibold text-white line-clamp-2 cursor-pointer hover:text-emerald-400"
                      >
                        {product.title}
                      </h4>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-xs font-mono font-bold text-white">
                          {formatPrice(currentPrice, currency)}
                        </span>
                        {origPrice && origPrice > currentPrice && (
                          <span className="text-[10px] font-mono text-zinc-500 line-through">
                            {formatPrice(origPrice, currency)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-2.5">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-white/10 flex items-center gap-1 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>+ Cart</span>
                        </button>

                        <button
                          onClick={() => {
                            if (onBuyNow) {
                              onBuyNow(product);
                            } else {
                              onAddToCart(product);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <Zap className="w-3 h-3 fill-black" />
                          <span>Order</span>
                        </button>

                        <button
                          onClick={() => onRemoveWishlist(product)}
                          className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
