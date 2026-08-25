import React from 'react';
import { 
  Heart, 
  Plus, 
  Check, 
  Scale, 
  Sparkles, 
  Star, 
  Truck, 
  TrendingDown,
  Info,
  Zap
} from 'lucide-react';
import { Currency, Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency?: Currency;
  isInCart: boolean;
  isInWishlist: boolean;
  isCompared: boolean;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency = 'INR',
  isInCart,
  isInWishlist,
  isCompared,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onToggleCompare,
  onViewDetails,
}) => {
  const activeCurrency: Currency = (currency as Currency) || 'INR';
  const currentPrice = activeCurrency === 'USD' ? (product.priceUSD || Math.round(product.priceINR / 83)) : (product.priceINR || product.price);
  const origPrice = activeCurrency === 'USD' 
    ? (product.originalPriceUSD || (product.originalPriceINR ? Math.round(product.originalPriceINR / 83) : undefined))
    : (product.originalPriceINR || product.originalPrice);

  const discount = origPrice && origPrice > currentPrice
    ? Math.round(((origPrice - currentPrice) / origPrice) * 100)
    : null;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-[#0F0F0F] rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
    >
      <div>
        {/* Top Media Container */}
        <div className="relative aspect-4/3 bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
          <img
            src={product.imageUrl}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
            }}
          />

          {/* Deal Badge / Tag */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.dealBadge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-950/90 text-white border border-white/10 backdrop-blur-xs shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300 mr-1" />
                {product.dealBadge}
              </span>
            )}
            {discount && discount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-xs">
                <TrendingDown className="w-3 h-3 mr-0.5" />
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isInWishlist
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-white/10'
            }`}
            title={isInWishlist ? "Remove from saved" : "Save to wishlist"}
          >
            <Heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
          </button>

          {/* Match / Deal Score indicator */}
          {(product.matchScore || product.dealScore) && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-950/90 text-emerald-400 backdrop-blur-xs border border-emerald-500/30 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                {product.matchScore ? `${product.matchScore}% Match` : `${product.dealScore}/100 Value`}
              </span>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-4 space-y-2.5 bg-[#0F0F0F]">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-zinc-500 text-[10px]">{product.brand}</span>
            <span className="text-zinc-600 text-[11px]">{product.category}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-semibold text-white text-sm leading-snug line-clamp-2 hover:text-zinc-300 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-2 text-xs text-zinc-400">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 font-semibold text-white">{product.rating}</span>
            </div>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-500">{product.reviewCount.toLocaleString()} reviews</span>
          </div>

          {/* Key Specs Pills */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                <span 
                  key={key} 
                  className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-900 text-zinc-300 border border-white/5"
                >
                  <span className="text-zinc-500">{key}:</span> {val}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price & Action Section */}
      <div className="p-4 pt-3 border-t border-white/5 bg-[#0F0F0F] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-mono font-bold text-white">
                {formatPrice(currentPrice, activeCurrency)}
              </span>
              {origPrice && origPrice > currentPrice && (
                <span className="text-xs font-mono text-zinc-500 line-through">
                  {formatPrice(origPrice, activeCurrency)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-zinc-500 flex items-center">
              <Truck className="w-3 h-3 mr-1 text-emerald-400" />
              {product.shipping || 'Free Delivery'}
            </span>
          </div>

          {/* Utilities: Compare & Details */}
          <div className="flex items-center space-x-1">
            <button
              id={`btn-compare-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isCompared
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                  : 'border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to side-by-side comparison"}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              id={`btn-details-${product.id}`}
              onClick={() => onViewDetails(product)}
              className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              title="AI synthesized reviews & deep analysis"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dual Actions: Buy Now & Add to Cart */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id={`btn-cart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all ${
              isInCart
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            id={`btn-buynow-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onBuyNow) {
                onBuyNow(product);
              } else {
                onAddToCart(product);
              }
            }}
            className="py-2 px-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center space-x-1 transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
