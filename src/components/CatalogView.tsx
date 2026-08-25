import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  TrendingDown, 
  Star, 
  ArrowUpDown,
  RotateCcw,
  Cpu,
  HardDrive,
  CheckCircle2,
  Tag,
  DollarSign,
  Flame,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Tablet,
  Tv,
  Keyboard,
  HardDriveDownload,
  X,
  Sliders,
  PenTool,
  Shirt,
  Home,
  MousePointer
} from 'lucide-react';
import { Currency, Product, ShoppingFilter } from '../types';
import { CATEGORIES, BRANDS_LIST, CURATED_COLLECTIONS } from '../data/mockProducts';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/formatters';

interface CatalogViewProps {
  products: Product[];
  filter: ShoppingFilter;
  currency: Currency;
  onUpdateFilter: (filter: Partial<ShoppingFilter>) => void;
  onResetFilter: () => void;
  onTriggerAgentForCategory: (cat: string) => void;
  isInCart?: (productId: string) => boolean;
  isInWishlist?: (productId: string) => boolean;
  isCompared?: (productId: string) => boolean;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  showProductGrid?: boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  filter,
  currency,
  onUpdateFilter,
  onResetFilter,
  onTriggerAgentForCategory,
  isInCart = (_id: string) => false,
  isInWishlist = (_id: string) => false,
  isCompared = (_id: string) => false,
  onAddToCart = (_p: Product) => {},
  onBuyNow = (_p: Product) => {},
  onToggleWishlist = (_p: Product) => {},
  onToggleCompare = (_p: Product) => {},
  onViewDetails = (_p: Product) => {},
  showProductGrid = false
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  // Active filter count calculation
  const activeFilterCount = [
    filter.category && filter.category !== 'All Products',
    filter.collection && filter.collection !== 'all',
    filter.brand && filter.brand !== 'All Brands',
    filter.minPrice !== undefined,
    filter.maxPrice !== undefined,
    filter.minRating !== undefined,
    filter.minRAM !== undefined,
    filter.storage !== undefined,
    filter.minDiscount !== undefined,
    filter.onlyDeals,
    filter.inStockOnly,
    filter.query && filter.query.trim().length > 0
  ].filter(Boolean).length;

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'laptops': return <Laptop className="w-3.5 h-3.5" />;
      case 'smartphones': return <Smartphone className="w-3.5 h-3.5" />;
      case 'headphones': return <Headphones className="w-3.5 h-3.5" />;
      case 'smartwatches': return <Watch className="w-3.5 h-3.5" />;
      case 'tablets': return <Tablet className="w-3.5 h-3.5" />;
      case 'monitors': return <Tv className="w-3.5 h-3.5" />;
      case 'keyboards & mice': return <MousePointer className="w-3.5 h-3.5" />;
      case 'stationery & pencils': return <PenTool className="w-3.5 h-3.5" />;
      case 'fashion & dresses': return <Shirt className="w-3.5 h-3.5" />;
      case 'home & lifestyle': return <Home className="w-3.5 h-3.5" />;
      case 'storage & accessories': return <HardDriveDownload className="w-3.5 h-3.5" />;
      default: return <SlidersHorizontal className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Curated Collections Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Curated Student & Tech Collections
          </span>
          {filter.collection && filter.collection !== 'all' && (
            <button
              onClick={() => onUpdateFilter({ collection: 'all' })}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear collection
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-none">
          {CURATED_COLLECTIONS.map((col) => {
            const isSelected = (col.id === 'all' && (!filter.collection || filter.collection === 'all')) || filter.collection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => onUpdateFilter({ collection: col.id })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white'
                }`}
                title={col.description}
              >
                <span>{col.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Pills & Quick AI Agent Trigger */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center space-x-2">
          {CATEGORIES.map((cat) => {
            const isSelected = (cat === 'All Products' && (!filter.category || filter.category === 'All Products')) || filter.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onUpdateFilter({ category: cat === 'All Products' ? undefined : cat })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {filter.category && filter.category !== 'All Products' && (
          <button
            onClick={() => onTriggerAgentForCategory(filter.category!)}
            className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Ask AI Agent for {filter.category}</span>
            <span className="sm:hidden">Ask AI</span>
          </button>
        )}
      </div>

      {/* 3. Main Search & Advanced Filter Controls Bar */}
      <div className="bg-[#0F0F0F] p-4 rounded-2xl border border-white/5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, brand, processor, RAM, 4K, 120Hz, or keywords..."
              value={filter.query || ''}
              onChange={(e) => onUpdateFilter({ query: e.target.value })}
              className="w-full pl-9 pr-8 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-white/30"
            />
            {filter.query && (
              <button
                onClick={() => onUpdateFilter({ query: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Toggles & Sorting */}
          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {/* Deals Only Button */}
            <button
              onClick={() => onUpdateFilter({ onlyDeals: !filter.onlyDeals })}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-colors ${
                filter.onlyDeals
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deals Only</span>
            </button>

            {/* Brand Filter Selector */}
            <select
              value={filter.brand || 'All Brands'}
              onChange={(e) => onUpdateFilter({ brand: e.target.value === 'All Brands' ? undefined : e.target.value })}
              className="bg-zinc-900 border border-white/10 text-zinc-300 rounded-xl px-2.5 py-2 text-xs font-medium focus:outline-hidden"
            >
              {BRANDS_LIST.map(b => (
                <option key={b} value={b} className="bg-zinc-900 text-white">{b}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1 border border-white/10 bg-zinc-900 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={filter.sortBy || 'recommended'}
                onChange={(e) => onUpdateFilter({ sortBy: e.target.value as any })}
                className="bg-transparent focus:outline-hidden text-xs font-medium text-zinc-300"
              >
                <option value="recommended" className="bg-zinc-900 text-white">Best Match / AI Ranked</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900 text-white">Top Rated (4.7+)</option>
                <option value="discount" className="bg-zinc-900 text-white">Biggest Discount %</option>
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                showAdvancedFilters || activeFilterCount > 0
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Toggle Multi-Specification Filters"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 4. Multi-Specification Expanded Filters (RAM, Storage, Ratings, Budget Presets) */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-white/5 space-y-3.5 text-xs">
            {/* RAM & Storage filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* RAM Filter */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-emerald-400" /> RAM Memory:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['All', '8GB', '16GB', '24GB', '32GB'].map(ram => (
                    <button
                      key={ram}
                      onClick={() => onUpdateFilter({ minRAM: ram === 'All' ? undefined : ram })}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-all ${
                        (ram === 'All' && !filter.minRAM) || filter.minRAM === ram
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {ram === 'All' ? 'Any' : `${ram}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Filter */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-blue-400" /> Storage Capacity:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['All', '128GB', '256GB', '512GB', '1TB'].map(st => (
                    <button
                      key={st}
                      onClick={() => onUpdateFilter({ storage: st === 'All' ? undefined : st })}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-all ${
                        (st === 'All' && !filter.storage) || filter.storage === st
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                          : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {st === 'All' ? 'Any' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400" /> Customer Rating:
                </span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Any', val: undefined },
                    { label: '4.5+ ★', val: 4.5 },
                    { label: '4.7+ ★', val: 4.7 },
                    { label: '4.8+ ★', val: 4.8 }
                  ].map(r => (
                    <button
                      key={r.label}
                      onClick={() => onUpdateFilter({ minRating: r.val })}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-all ${
                        filter.minRating === r.val
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3 text-rose-400" /> Minimum Discount:
                </span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Any', val: undefined },
                    { label: '15%+ OFF', val: 15 },
                    { label: '25%+ OFF', val: 25 },
                    { label: '35%+ OFF', val: 35 }
                  ].map(d => (
                    <button
                      key={d.label}
                      onClick={() => onUpdateFilter({ minDiscount: d.val })}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border transition-all ${
                        filter.minDiscount === d.val
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Presets & In Stock Toggle */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Budget Presets:
                </span>
                {currency === 'INR' ? (
                  <>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: undefined, maxPrice: 30000 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.maxPrice === 30000 && !filter.minPrice ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      &lt; ₹30k (Budget)
                    </button>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: undefined, maxPrice: 60000 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.maxPrice === 60000 && !filter.minPrice ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      &lt; ₹60k (ECE Benchmark)
                    </button>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: 60000, maxPrice: 100000 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.minPrice === 60000 ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      ₹60k - ₹1L (Creator / Pro)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: undefined, maxPrice: 400 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.maxPrice === 400 && !filter.minPrice ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      &lt; $400
                    </button>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: undefined, maxPrice: 750 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.maxPrice === 750 && !filter.minPrice ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      &lt; $750 (Benchmark)
                    </button>
                    <button
                      onClick={() => onUpdateFilter({ minPrice: 750, maxPrice: 1500 })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                        filter.minPrice === 750 ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      $750 - $1,500
                    </button>
                  </>
                )}
              </div>

              {/* In Stock toggle */}
              <label className="flex items-center space-x-1.5 cursor-pointer text-[11px] text-zinc-300">
                <input
                  type="checkbox"
                  checked={!!filter.inStockOnly}
                  onChange={(e) => onUpdateFilter({ inStockOnly: e.target.checked ? true : undefined })}
                  className="rounded bg-zinc-900 border-white/10 text-emerald-500 focus:ring-0"
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>
          </div>
        )}

        {/* 5. Active Filters Ribbon & Reset */}
        {activeFilterCount > 0 && (
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-zinc-500 font-semibold">Active:</span>
              {filter.category && filter.category !== 'All Products' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  Category: {filter.category}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ category: undefined })} />
                </span>
              )}
              {filter.collection && filter.collection !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  Collection: {filter.collection}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ collection: 'all' })} />
                </span>
              )}
              {filter.brand && filter.brand !== 'All Brands' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  Brand: {filter.brand}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ brand: undefined })} />
                </span>
              )}
              {filter.minRAM && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  RAM: {filter.minRAM}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ minRAM: undefined })} />
                </span>
              )}
              {filter.storage && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  Storage: {filter.storage}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ storage: undefined })} />
                </span>
              )}
              {filter.maxPrice && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  Max: {formatPrice(filter.maxPrice, currency)}
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ maxPrice: undefined, minPrice: undefined })} />
                </span>
              )}
              {filter.minRating && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-white text-[10px] font-mono border border-white/10">
                  {filter.minRating}+ Stars
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ minRating: undefined })} />
                </span>
              )}
              {filter.onlyDeals && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Deals Only
                  <X className="w-2.5 h-2.5 cursor-pointer hover:text-rose-400" onClick={() => onUpdateFilter({ onlyDeals: false })} />
                </span>
              )}
            </div>

            <button
              onClick={onResetFilter}
              className="text-zinc-400 hover:text-rose-400 flex items-center gap-1 text-[11px] font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All ({activeFilterCount})</span>
            </button>
          </div>
        )}
      </div>

      {/* 6. Product Grid (When showProductGrid is true) */}
      {showProductGrid && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Showing <strong className="text-white font-semibold">{products.length}</strong> matching products</span>
            <span className="text-zinc-500">All prices in {currency === 'INR' ? '₹ INR' : '$ USD'} with student warranty</span>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#0F0F0F] border border-white/5 space-y-3">
              <Search className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-base font-semibold text-white">No products found matching your filters</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try adjusting your search query, price ceiling, or RAM filter to see our full catalog.
              </p>
              <button
                onClick={onResetFilter}
                className="px-4 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  isInCart={typeof isInCart === 'function' ? isInCart(product.id) : false}
                  isInWishlist={typeof isInWishlist === 'function' ? isInWishlist(product.id) : false}
                  isCompared={typeof isCompared === 'function' ? isCompared(product.id) : false}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onToggleWishlist={onToggleWishlist}
                  onToggleCompare={onToggleCompare}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
