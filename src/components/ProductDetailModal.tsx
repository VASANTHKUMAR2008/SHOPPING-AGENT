import React from 'react';
import { 
  X, 
  Star, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  TrendingDown, 
  Heart, 
  ShoppingBag,
  Scale,
  Store,
  Clock,
  Zap
} from 'lucide-react';
import { Currency, Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isInCart: boolean;
  isInWishlist: boolean;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onToggleCompare,
  isInCart,
  isInWishlist,
  isCompared
}) => {
  const [activeTab, setActiveTab] = React.useState<'ai-synthesis' | 'specs' | 'price-history' | 'sellers'>('ai-synthesis');
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      setActiveTab('ai-synthesis');
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = currency === 'USD' ? (product.priceUSD || Math.round(product.priceINR / 83)) : (product.priceINR || product.price);
  const origPrice = currency === 'USD' 
    ? (product.originalPriceUSD || (product.originalPriceINR ? Math.round(product.originalPriceINR / 83) : undefined))
    : (product.originalPriceINR || product.originalPrice);

  const discount = origPrice && origPrice > currentPrice
    ? Math.round(((origPrice - currentPrice) / origPrice) * 100)
    : null;

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        id="product-detail-modal"
        className="bg-[#0F0F0F] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-[#E0E0E0]"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{product.brand}</span>
            <span className="text-zinc-700">•</span>
            <span className="text-xs text-zinc-400 font-medium">{product.category}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCompare(product)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isCompared
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-xl border transition-colors ${
                isInWishlist
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Main Grid: Gallery & Quick Purchase Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-4/3 rounded-2xl bg-zinc-900 overflow-hidden border border-white/10">
                <img
                  src={selectedImage || product.imageUrl}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {/* Thumbnails */}
              {imagesList.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img ? 'border-white ring-2 ring-white/20' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Buy Box */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                {/* Badges */}
                <div className="flex items-center gap-2 mb-2">
                  {product.dealBadge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-zinc-900 border border-white/10 text-white">
                      <Sparkles className="w-3 h-3 text-amber-300 mr-1" />
                      {product.dealBadge}
                    </span>
                  )}
                  {product.dealScore && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                      {product.dealScore}/100 Deal Score
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-bold text-white leading-snug">{product.title}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-3 mt-2 text-sm">
                  <div className="flex items-center text-amber-400 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 mr-1" />
                    <span className="text-white">{product.rating}</span>
                  </div>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{product.reviewCount.toLocaleString()} verified reviews</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-3.5 bg-zinc-900/80 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-mono font-black text-white">
                        {formatPrice(currentPrice, currency)}
                      </span>
                      {origPrice && origPrice > currentPrice && (
                        <span className="text-sm font-mono text-zinc-500 line-through">
                          {formatPrice(origPrice, currency)}
                        </span>
                      )}
                      {discount && (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          Save {discount}%
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 flex items-center mt-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      {product.shipping || 'Free 2-Day Delivery'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Brief description */}
                <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                <button
                  id="modal-add-to-cart"
                  onClick={() => onAddToCart(product)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs ${
                    isInCart
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isInCart ? 'Added in Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  id="modal-buy-now"
                  onClick={() => {
                    if (onBuyNow) {
                      onBuyNow(product);
                    } else {
                      onAddToCart(product);
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-zinc-200 text-black flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Deep Tabs Section */}
          <div className="pt-4 border-t border-white/5">
            {/* Tab navigation */}
            <div className="flex border-b border-white/5 gap-6">
              <button
                onClick={() => setActiveTab('ai-synthesis')}
                className={`pb-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'ai-synthesis'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Review & Sentiment</span>
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>Full Specifications</span>
              </button>

              <button
                onClick={() => setActiveTab('price-history')}
                className={`pb-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'price-history'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <TrendingDown className="w-4 h-4 text-blue-400" />
                <span>Price Trend & History</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className={`pb-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
                  activeTab === 'sellers'
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Store className="w-4 h-4 text-zinc-400" />
                <span>Retailer Comparison</span>
              </button>
            </div>

            {/* Tab 1: AI Review Synthesis */}
            {activeTab === 'ai-synthesis' && (
              <div className="pt-5 space-y-5 animate-in fade-in duration-150">
                {/* Sentiment Meter */}
                <div className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-mono font-black text-white">
                        {product.sentimentSummary?.positivePercent || 94}%
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Positive Customer Consensus
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {product.sentimentSummary?.keyHighlight || product.verdict}
                    </p>
                  </div>
                  <div className="w-full sm:w-48 bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${product.sentimentSummary?.positivePercent || 94}%` }} 
                    />
                  </div>
                </div>

                {/* Pros & Cons Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Praise / Pros */}
                  <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      What Buyers Love (Verified Praise)
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {(product.sentimentSummary?.frequentPraise || product.pros || []).map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Caveats / Cons */}
                  <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      Caveats & Things to Consider
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {(product.sentimentSummary?.frequentComplaints || product.cons || []).map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ideal Buyer & Verdict */}
                <div className="p-4 bg-zinc-900/60 rounded-2xl border border-white/5 space-y-2 text-xs text-zinc-300">
                  <div>
                    <strong className="text-white font-semibold">Who is this best for? </strong>
                    <span>{product.whoIsThisFor || 'Ideal for students, power users, and engineers seeking dependable performance.'}</span>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Agent Verdict: </strong>
                    <span>{product.verdict || 'A high-performance recommendation with strong value retention.'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Full Specifications */}
            {activeTab === 'specs' && (
              <div className="pt-5 animate-in fade-in duration-150">
                <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5 text-xs">
                  {Object.entries(product.specs || {}).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-3 sm:px-4">
                      <span className="font-semibold text-zinc-400">{key}</span>
                      <span className="col-span-2 text-white font-medium">{val}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 p-3 sm:px-4">
                    <span className="font-semibold text-zinc-400">Model Brand</span>
                    <span className="col-span-2 text-white font-medium">{product.brand}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 sm:px-4">
                    <span className="font-semibold text-zinc-400">Category</span>
                    <span className="col-span-2 text-white font-medium">{product.category}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Price History Trend */}
            {activeTab === 'price-history' && (
              <div className="pt-5 space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">90-Day Price Tracker</h4>
                      <p className="text-xs text-zinc-500">Track historical sales dips & discounts</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Great Time to Buy
                    </span>
                  </div>

                  {/* Sparkline Points */}
                  <div className="space-y-2">
                    {(product.priceHistory || [
                      { date: '60 Days Ago', price: origPrice || currentPrice + 50 },
                      { date: '30 Days Ago', price: currentPrice + 20 },
                      { date: 'Current Best Price', price: currentPrice }
                    ]).map((pt, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          {pt.date}
                        </span>
                        <span className="font-mono font-bold text-white">
                          {formatPrice(pt.price, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Retailer Comparison */}
            {activeTab === 'sellers' && (
              <div className="pt-5 animate-in fade-in duration-150">
                <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5 text-xs">
                  <div className="grid grid-cols-4 p-3 bg-zinc-900 font-semibold text-zinc-400">
                    <span>Retailer</span>
                    <span>Price</span>
                    <span>Shipping</span>
                    <span className="text-right">Status</span>
                  </div>
                  <div className="grid grid-cols-4 p-3 items-center">
                    <span className="font-bold text-white">{product.retailer || 'Authorized Retailer'}</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatPrice(currentPrice, currency)}
                    </span>
                    <span className="text-zinc-400">Free 2-Day</span>
                    <span className="text-right text-emerald-400 font-semibold">In Stock (Best)</span>
                  </div>
                  <div className="grid grid-cols-4 p-3 items-center">
                    <span className="font-medium text-zinc-300">Official Brand Store</span>
                    <span className="font-mono font-semibold text-zinc-300">
                      {formatPrice(origPrice || currentPrice, currency)}
                    </span>
                    <span className="text-zinc-400">Standard (3-5d)</span>
                    <span className="text-right text-zinc-400">In Stock</span>
                  </div>
                  <div className="grid grid-cols-4 p-3 items-center">
                    <span className="font-medium text-zinc-300">Certified Refurbished</span>
                    <span className="font-mono font-semibold text-zinc-300">
                      {formatPrice(Math.round(currentPrice * 0.82), currency)}
                    </span>
                    <span className="text-zinc-400">Free (5-7d)</span>
                    <span className="text-right text-zinc-500">2 Left</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
