import React from 'react';
import { 
  X, 
  Scale, 
  Sparkles, 
  Check, 
  Trash2, 
  ShoppingBag, 
  Trophy,
  Loader2,
  TrendingDown,
  Zap
} from 'lucide-react';
import { Currency, Product, ComparisonMatrixData } from '../types';
import { formatPrice } from '../utils/formatters';

interface ComparisonModalProps {
  products: Product[];
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onClearAll: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  products,
  currency,
  isOpen,
  onClose,
  onRemoveProduct,
  onAddToCart,
  onBuyNow,
  onClearAll
}) => {
  const [comparisonData, setComparisonData] = React.useState<ComparisonMatrixData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && products.length >= 2) {
      fetchComparison();
    } else {
      setComparisonData(null);
    }
  }, [isOpen, products.length]);

  const fetchComparison = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
      });
      const data = await res.json();
      setComparisonData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Extract all unique spec keys across compared products
  const allSpecKeys: string[] = Array.from(
    new Set(products.flatMap(p => Object.keys(p.specs || {})))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        id="comparison-modal"
        className="bg-[#0F0F0F] rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-[#E0E0E0]"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Side-by-Side Comparison Matrix</span>
                <span className="text-xs font-normal text-zinc-500">({products.length} products selected)</span>
              </h2>
              <p className="text-xs text-zinc-500">Feature comparison table, specification delta & category winners</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {products.length < 2 ? (
            <div className="py-12 text-center space-y-3">
              <Scale className="w-12 h-12 text-zinc-700 mx-auto" />
              <h3 className="text-base font-semibold text-white">Select at least 2 products to compare</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Click the scale icon on any product card or in chat recommendations to add them here.
              </p>
            </div>
          ) : (
            <>
              {/* AI Winner / Verdict Banner */}
              {isLoading ? (
                <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 flex items-center justify-center space-x-2 text-xs font-medium text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Agent synthesizing side-by-side comparison matrix...</span>
                </div>
              ) : comparisonData ? (
                <div className="p-4 bg-zinc-900/80 rounded-2xl border border-emerald-500/20 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Agent Recommendation & Verdict</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                    {comparisonData.verdict}
                  </p>

                  {/* Best For Highlights */}
                  {comparisonData.bestForCategories && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                      {comparisonData.bestForCategories.map((cat, idx) => {
                        const winnerProd = products.find(p => p.id === cat.winnerProductId) || products[0];
                        return (
                          <div key={idx} className="p-2.5 bg-zinc-950/80 rounded-xl border border-white/10 text-xs space-y-1">
                            <div className="flex items-center space-x-1.5 font-bold text-white">
                              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{cat.categoryTitle}</span>
                            </div>
                            <p className="text-[11px] font-semibold text-emerald-400 line-clamp-1">
                              Winner: {winnerProd?.title}
                            </p>
                            <p className="text-[11px] text-zinc-400 leading-tight">
                              {cat.explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}

              {/* Product Cards Row */}
              <div className="overflow-x-auto pb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[600px]">
                  {products.map((prod) => {
                    const price = currency === 'USD' ? (prod.priceUSD || Math.round(prod.priceINR / 83)) : (prod.priceINR || prod.price);
                    const origPrice = currency === 'USD' 
                      ? (prod.originalPriceUSD || (prod.originalPriceINR ? Math.round(prod.originalPriceINR / 83) : undefined))
                      : (prod.originalPriceINR || prod.originalPrice);

                    return (
                      <div 
                        key={prod.id} 
                        className="bg-zinc-900/50 rounded-2xl p-4 border border-white/10 flex flex-col justify-between space-y-3 relative group"
                      >
                        <button
                          onClick={() => onRemoveProduct(prod.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-rose-400 transition-colors border border-white/10 shadow-xs"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <div className="aspect-4/3 rounded-xl overflow-hidden bg-zinc-900 mb-2.5 border border-white/10">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase">{prod.brand}</span>
                          <h4 className="text-xs font-semibold text-white line-clamp-2 mt-0.5">{prod.title}</h4>
                          <div className="flex items-baseline space-x-1.5 mt-2">
                            <span className="text-base font-mono font-bold text-white">
                              {formatPrice(price, currency)}
                            </span>
                            {origPrice && origPrice > price && (
                              <span className="text-xs font-mono text-zinc-500 line-through">
                                {formatPrice(origPrice, currency)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => onAddToCart(prod)}
                            className="py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-semibold border border-white/10 flex items-center justify-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Cart</span>
                          </button>
                          <button
                            onClick={() => {
                              if (onBuyNow) {
                                onBuyNow(prod);
                              } else {
                                onAddToCart(prod);
                              }
                            }}
                            className="py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-xs"
                          >
                            <Zap className="w-3 h-3 fill-black" />
                            <span>Order</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Specs Side-by-Side Table */}
                <div className="mt-6 border border-white/10 rounded-2xl overflow-hidden min-w-[600px] text-xs">
                  <div className="bg-zinc-900 p-3 font-bold text-zinc-300 uppercase tracking-wider text-[11px]">
                    Technical Specifications Comparison Matrix
                  </div>
                  <div className="divide-y divide-white/5 bg-zinc-950/40">
                    {allSpecKeys.map((key) => (
                      <div 
                        key={key} 
                        className="grid p-3 items-center hover:bg-white/5 transition-colors"
                        style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(140px, 1fr))` }}
                      >
                        <span className="font-semibold text-zinc-400">{key}</span>
                        {products.map(p => (
                          <span key={p.id} className="text-zinc-200 font-medium px-2">
                            {p.specs?.[key] || '—'}
                          </span>
                        ))}
                      </div>
                    ))}
                    {/* Rating row */}
                    <div 
                      className="grid p-3 items-center hover:bg-white/5 transition-colors bg-zinc-900/30"
                      style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(140px, 1fr))` }}
                    >
                      <span className="font-semibold text-zinc-400">Customer Rating</span>
                      {products.map(p => (
                        <span key={p.id} className="text-white font-bold px-2 flex items-center gap-1">
                          ★ {p.rating} ({p.reviewCount.toLocaleString()})
                        </span>
                      ))}
                    </div>
                    {/* Top Pro */}
                    <div 
                      className="grid p-3 items-center hover:bg-white/5 transition-colors"
                      style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(140px, 1fr))` }}
                    >
                      <span className="font-semibold text-zinc-400">Key Advantage</span>
                      {products.map(p => (
                        <span key={p.id} className="text-emerald-400 font-medium px-2 text-[11px]">
                          ✓ {p.pros?.[0] || 'High quality'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
