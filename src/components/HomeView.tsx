import React from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Tablet, 
  Cpu, 
  Sliders, 
  Scale, 
  ShieldAlert,
  Zap,
  CheckCircle2,
  TrendingUp,
  Award,
  MousePointer,
  PenTool,
  Shirt,
  Home as HomeIcon,
  Tv
} from 'lucide-react';
import { Currency, Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface HomeViewProps {
  currency: Currency;
  onSearchPrompt?: (prompt: string) => void;
  onSelectPrompt?: (prompt: string) => void;
  onSelectCategory: (category: string) => void;
  onNavigateToAgent?: () => void;
  onStartChat?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToCompare?: () => void;
  onOpenArchitecture: () => void;
  onOpenPreferences?: () => void;
  featuredProducts?: Product[];
  onViewProduct?: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currency,
  onSearchPrompt,
  onSelectPrompt,
  onSelectCategory,
  onNavigateToAgent,
  onStartChat,
  onNavigateToSearch,
  onNavigateToCompare,
  onOpenArchitecture,
  featuredProducts = [],
  onViewProduct = (_p: Product) => {}
}) => {
  const [searchInput, setSearchInput] = React.useState('');

  const triggerSearch = (query: string) => {
    if (onSearchPrompt) {
      onSearchPrompt(query);
    } else if (onSelectPrompt) {
      onSelectPrompt(query);
    } else if (onNavigateToAgent) {
      onNavigateToAgent();
    } else if (onStartChat) {
      onStartChat();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      triggerSearch(searchInput.trim());
    }
  };

  const samplePrompts = [
    {
      title: "ECE & VLSI Engineering Laptop",
      query: "Find a laptop for ECE and VLSI under ₹60,000 with at least 16GB RAM",
      badge: "College Benchmark",
      icon: Cpu
    },
    {
      title: "Ergonomic & Wireless Mice",
      query: "Find the best wireless mouse for productivity and coding like Logitech MX Master 3S",
      badge: "Mice & Peripherals",
      icon: MousePointer
    },
    {
      title: "Drafting Pencils & Styluses",
      query: "Top mechanical drafting pencils and Apple Pencil for sketching & lecture notes",
      badge: "Stationery & Art",
      icon: PenTool
    },
    {
      title: "Fashion & Elegant Dresses",
      query: "Show elegant summer floral wrap dresses and casual linen shirt dresses",
      badge: "Apparel & Dresses",
      icon: Shirt
    },
    {
      title: "Compare Five Smartphones",
      query: "Compare top smartphones for students under ₹40,000",
      badge: "Side-by-Side Matrix",
      icon: Smartphone
    },
    {
      title: "Best Headphones for Students",
      query: "Best noise cancelling headphones for students under ₹10,000",
      badge: "ANC & Battery",
      icon: Headphones
    }
  ];

  const categoryCards = [
    { name: 'Laptops', count: '6 Models', icon: Laptop, desc: 'Ryzen 7, Core i5/Ultra, 16GB DDR5, RTX GPU' },
    { name: 'Smartphones', count: '4 Models', icon: Smartphone, desc: 'Snapdragon 8 Gen, 120Hz OLED, 100W SuperVOOC' },
    { name: 'Headphones', count: '3 Models', icon: Headphones, desc: 'Industry-Leading ANC, 35h-50h Battery' },
    { name: 'Smartwatches', count: '7 Models', icon: Watch, desc: 'AMOLED, GPS, Health Tracking, 100-Hour Battery' },
    { name: 'Tablets', count: '2 Models', icon: Tablet, desc: '144Hz 2.8K, Apple Pencil Pro, M2 & Snapdragon' },
    { name: 'Keyboards & Mice', count: '7 Models', icon: MousePointer, desc: 'MX Master 3S, Razer DeathAdder, Magic Mouse, Mechanical' },
    { name: 'Stationery & Pencils', count: '6 Sets', icon: PenTool, desc: 'Apple Pencil Pro, Faber-Castell, Staedtler, rOtring 600' },
    { name: 'Fashion & Dresses', count: '6 Outfits', icon: Shirt, desc: 'Summer Dresses, Evening Gowns, Kurtis, Denim, Sneakers' },
    { name: 'Home & Lifestyle', count: '5 Items', icon: HomeIcon, desc: 'Ergonomic Chairs, Eye-Care Lamps, Hydro Flask, Smart Mugs' },
    { name: 'Monitors', count: '2 Models', icon: Tv, desc: '4K IPS, 165Hz Gaming, USB-C 90W Power Delivery' }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#141414] to-[#0A0A0A] border border-white/10 p-6 sm:p-10 text-center shadow-2xl">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        
        {/* Project Tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Multi-Criteria Shopping Assistant</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-400">Gemini 3.7 Flash</span>
        </div>

        {/* Headings */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Your AI Shopping Agent
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
          Search smarter. Compare better. Buy with confidence.
        </p>

        {/* Search / Prompt Input */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto relative">
          <div className="relative flex items-center bg-zinc-900 border border-white/15 focus-within:border-white/40 rounded-2xl shadow-xl transition-all p-1.5">
            <Search className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. 'I need a laptop for ECE and VLSI under ₹60,000 with 16GB RAM'..."
              className="w-full bg-transparent border-0 px-3.5 py-3 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!searchInput.trim()}
              className="bg-white hover:bg-zinc-200 disabled:opacity-40 text-black font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shrink-0"
            >
              <span>Ask Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Fast Starter Queries */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Popular College & Engineering Searches:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
            {samplePrompts.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => triggerSearch(p.query)}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-white/5 hover:border-white/20 transition-all text-xs group"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div className="p-1.5 rounded-lg bg-white/5 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-white block truncate">{p.title}</span>
                      <span className="text-zinc-500 text-[11px] truncate block">«"{p.query}"»</span>
                    </div>
                  </div>
                  <span className="shrink-0 ml-2 px-2 py-0.5 text-[10px] font-bold text-zinc-400 bg-white/5 rounded border border-white/5">
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Data Disclaimer Badge */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400 text-[11px]">
            <ShieldAlert className="w-3 h-3 text-amber-400" /> Academic Project Demonstration Data
          </span>
          <span>• Pricing, specifications, and sentiment analysis are calibrated for college benchmarking.</span>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Explore by Category</h2>
            <p className="text-xs text-zinc-400">Curated hardware specifications verified for students & power users</p>
          </div>
          <button
            onClick={onNavigateToSearch}
            className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-white/20 hover:bg-zinc-900/60 cursor-pointer transition-all flex flex-col justify-between space-y-3 group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/5 text-zinc-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-snug">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works / Architectural Pillars */}
      <section className="p-6 rounded-3xl bg-[#0F0F0F] border border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Multi-Factor AI Recommendation Engine</span>
            </h2>
            <p className="text-xs text-zinc-400">Engineered with structured JSON schemas and customizable scoring weights</p>
          </div>
          <button
            onClick={onOpenArchitecture}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <span>View Architecture & Schema</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">1. Requirement Extraction</span>
              <span className="text-xs font-mono font-bold text-white bg-emerald-500/20 px-1.5 py-0.5 rounded">40% Wt</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Parses intended use (e.g. ECE/VLSI simulation), RAM thresholds (16GB), budget ceilings, and brand preferences from natural English.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">2. Price-to-Value Rating</span>
              <span className="text-xs font-mono font-bold text-white bg-blue-500/20 px-1.5 py-0.5 rounded">25% Wt</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Evaluates historical price drops, discount depth, and student educational promotions relative to competitors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">3. Technical Specs Score</span>
              <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-1.5 py-0.5 rounded">20% Wt</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scores multi-core CPU performance, dedicated GPU acceleration, memory bandwidth, and display color accuracy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">4. Rating & Reliability</span>
              <span className="text-xs font-mono font-bold text-white bg-purple-500/20 px-1.5 py-0.5 rounded">15% Wt</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Aggregates verified customer sentiment, thermal stability reports, and brand service network support.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Recommendations Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Top Benchmark Selections</h2>
            <p className="text-xs text-zinc-400">Highest rated recommendations across key student use cases</p>
          </div>
          <button
            onClick={onNavigateToCompare}
            className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Comparison Hub</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(featuredProducts || []).slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => onViewProduct?.(product)}
              className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between space-y-3 group shadow-xs"
            >
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-zinc-900 mb-3 border border-white/5">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.brand}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.dealBadge || 'Top Choice'}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm line-clamp-2">{product.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">{product.recommendationReason}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-base font-mono font-bold text-white">
                    {formatPrice(currency === 'USD' ? product.priceUSD : product.priceINR, currency)}
                  </span>
                  <span className="text-[11px] text-zinc-500 block">{product.specs?.RAM || '16GB RAM'}</span>
                </div>
                <span className="text-xs font-semibold text-zinc-300 group-hover:text-white flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
