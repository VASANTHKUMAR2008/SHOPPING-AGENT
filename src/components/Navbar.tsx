import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Scale, 
  SlidersHorizontal,
  Bot,
  History,
  Home,
  Sliders,
  BookOpen,
  DollarSign,
  Package,
  Search,
  X
} from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  comparisonCount: number;
  ordersCount?: number;
  currency: Currency;
  activeView: 'home' | 'agent' | 'catalog' | 'history';
  onSelectView: (view: 'home' | 'agent' | 'catalog' | 'history') => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenComparison: () => void;
  onOpenPreferences: () => void;
  onOpenArchitecture: () => void;
  onOpenOrders?: () => void;
  onToggleCurrency?: () => void;
  onGlobalSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  comparisonCount,
  ordersCount = 0,
  currency,
  activeView,
  onSelectView,
  onOpenCart,
  onOpenWishlist,
  onOpenComparison,
  onOpenPreferences,
  onOpenArchitecture,
  onOpenOrders,
  onToggleCurrency,
  onGlobalSearch
}) => {
  const [navSearch, setNavSearch] = useState('');

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim() && onGlobalSearch) {
      onGlobalSearch(navSearch.trim());
      setNavSearch('');
    }
  };
  return (
    <header className="sticky top-0 z-30 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            onClick={() => onSelectView('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center shadow-xs group-hover:border-emerald-500/40 transition-colors">
              <Bot className="w-5 h-5 text-white group-hover:text-emerald-400 transition-colors" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-base tracking-tight">Shopping Agent</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  Gemini 3.7
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 hidden sm:block">Intelligent multi-criteria product discovery</p>
            </div>
          </div>

          {/* Center: Search & Navigation Tabs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Search Bar */}
            {onGlobalSearch && (
              <form onSubmit={handleNavSearchSubmit} className="relative w-56 xl:w-72">
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder="Search mouse, pencil, dress, laptop..."
                  className="w-full bg-zinc-900/90 border border-white/10 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-emerald-500/50 transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {navSearch && (
                  <button
                    type="button"
                    onClick={() => setNavSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>
            )}

            <nav className="flex items-center bg-zinc-900 p-1 rounded-xl border border-white/5 text-xs font-semibold">
              <button
                id="nav-home-tab"
                onClick={() => onSelectView('home')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'home'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                id="nav-agent-tab"
                onClick={() => onSelectView('agent')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'agent'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>AI Assistant</span>
              </button>

              <button
                id="nav-catalog-tab"
                onClick={() => onSelectView('catalog')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'catalog'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Search & Catalog</span>
              </button>

              <button
                id="nav-history-tab"
                onClick={() => onSelectView('history')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'history'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
              </button>
            </nav>
          </div>

          {/* Right actions: Currency toggle, Orders, Architecture, Preferences, Compare, Wishlist, Cart */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Direct Currency Toggle */}
            {onToggleCurrency && (
              <button
                id="btn-currency-toggle"
                onClick={onToggleCurrency}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-zinc-900 border border-white/10 text-emerald-400 hover:border-emerald-500/40 hover:bg-zinc-800 transition-colors"
                title="Switch currency (INR ₹ / USD $)"
              >
                <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
              </button>
            )}

            {/* Orders Tracker Button */}
            {onOpenOrders && (
              <button
                id="btn-nav-orders"
                onClick={onOpenOrders}
                className={`relative p-2 rounded-lg border transition-colors ${
                  ordersCount > 0
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
                title="My Orders & Tracking"
              >
                <Package className="w-4 h-4" />
                {ordersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {ordersCount}
                  </span>
                )}
              </button>
            )}

            {/* Architecture Docs Button */}
            <button
              id="btn-nav-architecture"
              onClick={onOpenArchitecture}
              className="hidden xl:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              title="View Architecture & Verification Metrics"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Docs</span>
            </button>

            {/* User Preferences / Weights Button */}
            <button
              id="btn-nav-preferences"
              onClick={onOpenPreferences}
              className="p-2 rounded-lg border bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              title="Scoring weights & preferences"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Comparison Tray Button */}
            <button
              id="btn-nav-compare"
              onClick={onOpenComparison}
              className={`relative p-2 rounded-lg border transition-colors ${
                comparisonCount > 0
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title="Compare Products"
            >
              <Scale className="w-4 h-4" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="btn-nav-wishlist"
              onClick={onOpenWishlist}
              className={`relative p-2 rounded-lg border transition-colors ${
                wishlistCount > 0
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                  : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="btn-nav-cart"
              onClick={onOpenCart}
              className="flex items-center space-x-2 bg-white hover:bg-zinc-200 text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-mono">{formatPrice(cartTotal, currency)}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-white/5 text-xs font-semibold">
          <button
            onClick={() => onSelectView('home')}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-md ${activeView === 'home' ? 'text-white bg-white/10' : 'text-zinc-500'}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => onSelectView('agent')}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-md ${activeView === 'agent' ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agent</span>
          </button>
          <button
            onClick={() => onSelectView('catalog')}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-md ${activeView === 'catalog' ? 'text-white bg-white/10' : 'text-zinc-500'}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </button>
          {onOpenOrders && (
            <button
              onClick={onOpenOrders}
              className="flex items-center gap-1 py-1 px-2.5 rounded-md text-zinc-500"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Orders ({ordersCount})</span>
            </button>
          )}
          <button
            onClick={() => onSelectView('history')}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-md ${activeView === 'history' ? 'text-white bg-white/10' : 'text-zinc-500'}`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>
        </div>
      </div>
    </header>
  );
};
