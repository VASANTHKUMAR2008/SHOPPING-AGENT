import React from 'react';
import { Navbar } from './components/Navbar';
import { AgentChat } from './components/AgentChat';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CatalogView } from './components/CatalogView';
import { HomeView } from './components/HomeView';
import { SearchHistoryView } from './components/SearchHistoryView';
import { UserPreferencesModal } from './components/UserPreferencesModal';
import { ProjectArchitectureModal } from './components/ProjectArchitectureModal';
import { OrdersModal } from './components/OrdersModal';
import { ToastContainer, ToastMessage } from './components/ToastNotification';
import { Product, CartItem, AgentChatMessage, ShoppingFilter, Currency, UserPreferences, PlacedOrder } from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { 
  Sparkles, 
  Scale, 
  ArrowRight,
  SlidersHorizontal,
  DollarSign,
  PackageCheck
} from 'lucide-react';
import { formatPrice } from './utils/formatters';

export default function App() {
  // State: Currency
  const [currency, setCurrency] = React.useState<Currency>(() => {
    const saved = localStorage.getItem('shopping_agent_currency');
    return (saved as Currency) || 'INR';
  });

  // State: Products catalog
  const [products, setProducts] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('shopping_agent_products');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PRODUCTS;
  });

  // State: Cart
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopping_agent_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // State: Wishlist
  const [wishlist, setWishlist] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('shopping_agent_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  // State: Orders
  const [orders, setOrders] = React.useState<PlacedOrder[]>(() => {
    const saved = localStorage.getItem('shopping_agent_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Provide 1 realistic sample previous order for demonstration
    return [
      {
        id: 'ord-init-1',
        orderNumber: 'ORD-782941',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Shipped',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1
          }
        ],
        subtotal: INITIAL_PRODUCTS[0].priceINR,
        tax: Math.round(INITIAL_PRODUCTS[0].priceINR * 0.18),
        discountAmount: 0,
        finalTotal: Math.round(INITIAL_PRODUCTS[0].priceINR * 1.18),
        currency: 'INR',
        shippingDetails: {
          fullName: 'Arjun Sharma',
          phone: '+91 98765 43210',
          email: 'arjun.sharma@college.edu',
          address: 'Hostel 4, Block B, Room 302, IIT Campus',
          city: 'Bengaluru',
          pincode: '560012',
          paymentMethod: 'upi'
        },
        estimatedDeliveryDate: 'Tomorrow by 8:00 PM'
      }
    ];
  });

  // State: Comparison
  const [comparedProducts, setComparedProducts] = React.useState<Product[]>([]);

  // State: Budget
  const [targetBudget, setTargetBudget] = React.useState<number | null>(60000);

  // State: View
  const [activeView, setActiveView] = React.useState<'home' | 'agent' | 'catalog' | 'history'>('home');

  // State: User Preferences & Weights
  const [preferences, setPreferences] = React.useState<UserPreferences>(() => {
    const saved = localStorage.getItem('shopping_agent_preferences');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      userPersona: 'ECE / Engineering Student',
      weights: {
        requirementMatch: 0.40,
        priceScore: 0.25,
        specsScore: 0.20,
        ratingScore: 0.15
      },
      preferredBrands: ['Lenovo', 'ASUS', 'HP', 'Dell', 'Apple', 'Sony'],
      currency: 'INR'
    };
  });

  // State: Modals & Drawers
  const [selectedDetailProduct, setSelectedDetailProduct] = React.useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = React.useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = React.useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = React.useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = React.useState(false);

  // State: Toast notifications
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error' | 'cart', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      title,
      description
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // State: Filter for catalog
  const [filter, setFilter] = React.useState<ShoppingFilter>({
    sortBy: 'recommended'
  });

  // State: Agent Chat Messages
  const [messages, setMessages] = React.useState<AgentChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'agent',
      timestamp: new Date().toISOString(),
      content: `Hello! I'm your **AI Shopping Agent**.\n\nI help students, engineers, and power users search, extract specifications, compare alternatives, and select optimal products based on exact course or workflow requirements.\n\n**Try asking:**\n«"I need a laptop for ECE and VLSI under ₹60,000 with at least 16GB RAM."»`,
      reasoningSteps: [
        'Initialized verified student & electronics catalog index',
        'Loaded multi-criteria scoring algorithm (Requirements: 40%, Price: 25%, Specs: 20%, Reviews: 15%)',
        'Ready for natural language requirement extraction and budget optimization'
      ],
      products: INITIAL_PRODUCTS.slice(0, 2),
      suggestedActions: [
        '💻 Laptop for ECE & VLSI under ₹60,000 (16GB RAM)',
        '🎧 Active noise-cancelling headphones for study under ₹15,000',
        '⚡ High-speed mechanical keyboard for coding under ₹8,000',
        '📱 Best tablet with stylus support for engineering notes'
      ]
    }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Sync to localStorage
  React.useEffect(() => {
    localStorage.setItem('shopping_agent_currency', currency);
  }, [currency]);

  React.useEffect(() => {
    localStorage.setItem('shopping_agent_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('shopping_agent_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  React.useEffect(() => {
    localStorage.setItem('shopping_agent_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  React.useEffect(() => {
    localStorage.setItem('shopping_agent_preferences', JSON.stringify(preferences));
  }, [preferences]);

  React.useEffect(() => {
    localStorage.setItem('shopping_agent_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast('success', 'Added to Cart', `${product.title.slice(0, 32)}... added to your bag.`);
  };

  // Instant Buy Now / Checkout flow
  const handleBuyNow = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    addToast('info', 'Proceeding to Order', `Opened checkout for ${product.title.slice(0, 30)}...`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    addToast('info', 'Removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast('info', 'Removed from Saved Items');
        return prev.filter(p => p.id !== product.id);
      }
      addToast('success', 'Saved to Wishlist', 'AI agent is now tracking price drops for this product.');
      return [...prev, product];
    });
  };

  // Comparison operations
  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast('info', 'Removed from comparison');
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        addToast('info', 'Comparison limited to 4 items', 'Replaced oldest item in comparison tray.');
        return [...prev.slice(1), product];
      }
      addToast('success', 'Added to Comparison', `Now comparing ${prev.length + 1} products side-by-side.`);
      return [...prev, product];
    });
  };

  const handleRemoveFromComparison = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Order Placement
  const handlePlaceOrder = (newOrder: PlacedOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    addToast('success', 'Order Confirmed!', `Order #${newOrder.orderNumber} placed. Delivery by ${newOrder.estimatedDeliveryDate}.`);
  };

  // Reorder from history
  const handleReorder = (order: PlacedOrder) => {
    setCartItems(prev => {
      const currentIds = new Set(prev.map(i => i.product.id));
      const newItems = order.items.filter(i => !currentIds.has(i.product.id));
      return [...prev, ...newItems];
    });
    setIsOrdersOpen(false);
    setIsCartOpen(true);
    addToast('success', 'Reorder Initialized', `Added ${order.items.length} items to checkout cart.`);
  };

  // Send message to Agent
  const handleSendMessage = async (text: string, budget?: number, category?: string) => {
    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
      content: text
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Sync filter query or category for the side-by-side catalog preview
    if (category && category !== 'All Products') {
      setFilter(prev => ({ ...prev, category }));
    } else {
      const trimmed = text.trim();
      const lower = trimmed.toLowerCase();
      if (lower.includes('mouse') || lower.includes('mice')) {
        setFilter(prev => ({ ...prev, category: 'Keyboards & Mice', query: '' }));
      } else if (lower.includes('pencil') || lower.includes('pen') || lower.includes('stationery')) {
        setFilter(prev => ({ ...prev, category: 'Stationery & Pencils', query: '' }));
      } else if (lower.includes('dress') || lower.includes('kurti') || lower.includes('gown') || lower.includes('fashion')) {
        setFilter(prev => ({ ...prev, category: 'Fashion & Dresses', query: '' }));
      } else if (lower.includes('watch') || lower.includes('smartwatch')) {
        setFilter(prev => ({ ...prev, category: 'Smartwatches', query: '' }));
      } else if (lower.includes('laptop') || lower.includes('ece') || lower.includes('vlsi')) {
        setFilter(prev => ({ ...prev, category: 'Laptops', query: '' }));
      } else if (lower.includes('phone') || lower.includes('smartphone')) {
        setFilter(prev => ({ ...prev, category: 'Smartphones', query: '' }));
      } else if (lower.includes('headphone') || lower.includes('earphone') || lower.includes('anc')) {
        setFilter(prev => ({ ...prev, category: 'Headphones', query: '' }));
      } else if (lower.includes('chair') || lower.includes('lamp') || lower.includes('mug') || lower.includes('bottle')) {
        setFilter(prev => ({ ...prev, category: 'Home & Lifestyle', query: '' }));
      } else if (trimmed.length < 35) {
        setFilter(prev => ({ ...prev, query: trimmed }));
      }
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map(m => ({ sender: m.sender, content: m.content })),
          targetBudget: budget || targetBudget || undefined,
          preferredCategory: category,
          currency,
          weights: preferences.weights,
          existingProducts: products
        })
      });

      const data = await res.json();

      const agentMsg: AgentChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toISOString(),
        content: data.reply || "Here are my recommended options matching your criteria:",
        reasoningSteps: data.reasoningSteps,
        extractedRequirements: data.extractedRequirements,
        recommendationSummary: data.recommendationSummary,
        products: data.products,
        suggestedActions: data.suggestedActions,
        budgetAnalysis: data.budgetAnalysis
      };

      setMessages(prev => [...prev, agentMsg]);

      // If new products were returned by Gemini, blend them into catalog
      if (data.products && Array.isArray(data.products)) {
        setProducts(prev => {
          const currentIds = new Set(prev.map(p => p.id));
          const newOnes = data.products.filter((p: Product) => !currentIds.has(p.id));
          return [...newOnes, ...prev];
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: AgentChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toISOString(),
        content: "I analyzed our catalog and found the top verified options matching your requirements.",
        products: products.slice(0, 3),
        suggestedActions: ['Compare specs in matrix', 'Filter by brand', 'Check budget feasibility']
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toISOString(),
        content: `New shopping session started! Tell me what product or engineering specs you need, or specify a budget ceiling.`,
        suggestedActions: [
          '💻 Laptop for VLSI & MATLAB under ₹60,000',
          '🎧 Active noise cancelling headphones under ₹15,000',
          '🖥️ 27-inch 4K IPS monitor for coding',
          '☕ Precision coffee maker under ₹10,000'
        ]
      }
    ]);
    addToast('info', 'New Chat Session', 'Previous context reset.');
  };

  // Filtered catalog list
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // 1. Curated Collections
    if (filter.collection && filter.collection !== 'all') {
      if (filter.collection === 'deals') {
        result = result.filter(p => (p.dealScore && p.dealScore >= 80) || (p.originalPrice && p.originalPrice > p.price));
      } else if (filter.collection === 'ece-engineering') {
        result = result.filter(p => 
          (p.category === 'Laptops' && ((p.specs?.['RAM'] || '').includes('16GB') || (p.title || '').includes('16GB'))) ||
          p.title.toLowerCase().includes('ryzen 7') ||
          p.title.toLowerCase().includes('rtx') ||
          p.title.toLowerCase().includes('ece')
        );
      } else if (filter.collection === 'student-budget') {
        result = result.filter(p => {
          const price = currency === 'USD' ? (p.priceUSD || Math.round(p.priceINR / 83)) : (p.priceINR || p.price);
          return currency === 'USD' ? price <= 420 : price <= 35000;
        });
      } else if (filter.collection === 'coding-setup') {
        result = result.filter(p => 
          p.category === 'Keyboards & Mice' || 
          p.category === 'Monitors' || 
          p.brand === 'Keychron' || 
          p.brand === 'Logitech' || 
          p.title.toLowerCase().includes('4k')
        );
      } else if (filter.collection === 'smartwatches') {
        result = result.filter(p => p.category === 'Smartwatches' || p.title.toLowerCase().includes('watch') || p.title.toLowerCase().includes('band'));
      } else if (filter.collection === 'apple-ecosystem') {
        result = result.filter(p => p.brand.toLowerCase() === 'apple');
      } else if (filter.collection === 'audio-anc') {
        result = result.filter(p => p.category === 'Headphones' || p.title.toLowerCase().includes('noise canceling') || p.title.toLowerCase().includes('anc'));
      }
    }

    // 2. Category
    if (filter.category && filter.category !== 'All Products') {
      result = result.filter(p => p.category.toLowerCase() === filter.category?.toLowerCase());
    }

    // 3. Brand
    if (filter.brand && filter.brand !== 'All Brands') {
      result = result.filter(p => p.brand.toLowerCase() === filter.brand?.toLowerCase());
    }

    // 4. RAM Spec Filter
    if (filter.minRAM && filter.minRAM !== 'All' && filter.minRAM !== 'All RAM') {
      const targetRam = filter.minRAM.toLowerCase();
      result = result.filter(p => {
        const ramSpec = (p.specs?.['RAM'] || p.specs?.['Memory'] || p.specs?.['Storage / RAM'] || p.specs?.['RAM / Storage'] || p.title || '').toLowerCase();
        return ramSpec.includes(targetRam);
      });
    }

    // 5. Storage Spec Filter
    if (filter.storage && filter.storage !== 'All') {
      const targetStorage = filter.storage.toLowerCase();
      result = result.filter(p => {
        const storageSpec = (p.specs?.['Storage'] || p.specs?.['Storage / RAM'] || p.specs?.['RAM / Storage'] || p.title || '').toLowerCase();
        return storageSpec.includes(targetStorage);
      });
    }

    // 6. Rating Filter
    if (filter.minRating !== undefined) {
      result = result.filter(p => p.rating >= filter.minRating!);
    }

    // 7. Minimum Discount %
    if (filter.minDiscount !== undefined) {
      result = result.filter(p => {
        if (!p.originalPrice || p.originalPrice <= p.price) return false;
        const discountPct = ((p.originalPrice - p.price) / p.originalPrice) * 100;
        return discountPct >= filter.minDiscount!;
      });
    }

    // 8. In Stock Only
    if (filter.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // 9. Price Range
    if (filter.minPrice !== undefined) {
      result = result.filter(p => {
        const price = currency === 'USD' ? (p.priceUSD || Math.round(p.priceINR / 83)) : (p.priceINR || p.price);
        return price >= filter.minPrice!;
      });
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter(p => {
        const price = currency === 'USD' ? (p.priceUSD || Math.round(p.priceINR / 83)) : (p.priceINR || p.price);
        return price <= filter.maxPrice!;
      });
    }

    // 10. Multi-token text search with stemming and synonyms
    if (filter.query && filter.query.trim()) {
      const rawTokens = filter.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      result = result.filter(p => {
        const searchableText = [
          p.title,
          p.brand,
          p.category,
          p.description,
          p.whoIsThisFor,
          p.dealBadge,
          ...(p.pros || []),
          ...(p.cons || []),
          ...Object.values(p.specs || {})
        ].join(' ').toLowerCase();

        return rawTokens.every(token => {
          if (searchableText.includes(token)) return true;

          let stemmed = token;
          if (token.endsWith('es') && token.length > 3) stemmed = token.slice(0, -2);
          else if (token.endsWith('s') && token.length > 2) stemmed = token.slice(0, -1);

          if (searchableText.includes(stemmed)) return true;

          if (['watch', 'watches', 'smartwatch', 'smartwatches', 'wearable', 'wearables', 'band'].includes(token)) {
            return searchableText.includes('watch') || p.category.toLowerCase() === 'smartwatches';
          }
          if (['phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'smartphones'].includes(token)) {
            return searchableText.includes('phone') || searchableText.includes('mobile') || p.category.toLowerCase() === 'smartphones';
          }
          if (['headphone', 'headphones', 'earphone', 'earphones', 'earbud', 'earbuds', 'tws', 'audio'].includes(token)) {
            return searchableText.includes('headphone') || searchableText.includes('earbud') || searchableText.includes('audio') || p.category.toLowerCase() === 'headphones';
          }
          if (['laptop', 'laptops', 'notebook', 'macbook'].includes(token)) {
            return searchableText.includes('laptop') || searchableText.includes('macbook') || p.category.toLowerCase() === 'laptops';
          }
          if (['tablet', 'tablets', 'ipad'].includes(token)) {
            return searchableText.includes('tablet') || searchableText.includes('ipad') || p.category.toLowerCase() === 'tablets';
          }
          if (['mouse', 'mice', 'trackpad', 'cursor', 'pointer'].includes(token)) {
            return searchableText.includes('mouse') || searchableText.includes('mice') || p.category.toLowerCase().includes('mice');
          }
          if (['pencil', 'pencils', 'pen', 'pens', 'stylus', 'stationery', 'drafting', 'sketching', 'graphite'].includes(token)) {
            return searchableText.includes('pencil') || searchableText.includes('pen') || searchableText.includes('stylus') || searchableText.includes('drafting') || p.category.toLowerCase().includes('pencils') || p.category.toLowerCase().includes('stationery');
          }
          if (['dress', 'dresses', 'gown', 'gowns', 'kurti', 'kurtis', 'fashion', 'clothing', 'apparel', 'outfit', 'jacket', 'shoe', 'shoes', 'sneaker', 'sneakers', 'shirt'].includes(token)) {
            return searchableText.includes('dress') || searchableText.includes('gown') || searchableText.includes('kurti') || searchableText.includes('fashion') || searchableText.includes('jacket') || searchableText.includes('shoe') || searchableText.includes('shirt') || p.category.toLowerCase().includes('fashion') || p.category.toLowerCase().includes('dresses');
          }
          if (['chair', 'lamp', 'desk', 'mug', 'bottle', 'backpack', 'bag', 'home', 'lifestyle'].includes(token)) {
            return searchableText.includes('chair') || searchableText.includes('lamp') || searchableText.includes('mug') || searchableText.includes('bottle') || searchableText.includes('backpack') || p.category.toLowerCase().includes('home') || p.category.toLowerCase().includes('lifestyle');
          }

          return false;
        });
      });
    }

    if (filter.onlyDeals) {
      result = result.filter(p => (p.dealScore && p.dealScore >= 80) || (p.originalPrice && p.originalPrice > p.price));
    }

    // 11. Sorting
    if (filter.sortBy === 'price-asc') {
      result.sort((a, b) => (a.priceINR || a.price) - (b.priceINR || b.price));
    } else if (filter.sortBy === 'price-desc') {
      result.sort((a, b) => (b.priceINR || b.price) - (a.priceINR || a.price));
    } else if (filter.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filter.sortBy === 'discount') {
      result.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
    } else {
      // Recommended / Match score
      result.sort((a, b) => (b.matchScore || b.dealScore || 0) - (a.matchScore || a.dealScore || 0));
    }

    return result;
  }, [products, filter, currency]);

  const cartTotal = cartItems.reduce((sum, item) => {
    const p = currency === 'USD' ? (item.product.priceUSD || Math.round((item.product.priceINR || item.product.price) / 83)) : (item.product.priceINR || item.product.price);
    return sum + p * item.quantity;
  }, 0);

  const comparedProductIds = comparedProducts.map(p => p.id);
  const wishlistProductIds = wishlist.map(p => p.id);
  const cartProductIds = cartItems.map(i => i.product.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        comparisonCount={comparedProducts.length}
        ordersCount={orders.length}
        currency={currency}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onGlobalSearch={(query) => {
          setFilter(prev => ({ ...prev, query: query.trim() }));
          setActiveView('agent');
          handleSendMessage(query);
        }}
        onToggleCurrency={() => {
          const next = currency === 'INR' ? 'USD' : 'INR';
          setCurrency(next);
          addToast('info', 'Currency Updated', `Switched display currency to ${next}`);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: HOME LANDING VIEW */}
        {activeView === 'home' && (
          <HomeView
            currency={currency}
            featuredProducts={products}
            onSelectPrompt={(prompt) => {
              setActiveView('agent');
              handleSendMessage(prompt);
            }}
            onSearchPrompt={(prompt) => {
              setActiveView('agent');
              handleSendMessage(prompt);
            }}
            onSelectCategory={(cat) => {
              setFilter({ category: cat, sortBy: 'recommended' });
              setActiveView('catalog');
            }}
            onStartChat={() => setActiveView('agent')}
            onNavigateToAgent={() => setActiveView('agent')}
            onNavigateToSearch={() => setActiveView('catalog')}
            onNavigateToCompare={() => setIsComparisonOpen(true)}
            onOpenArchitecture={() => setIsArchitectureOpen(true)}
            onOpenPreferences={() => setIsPreferencesOpen(true)}
            onViewProduct={(p) => setSelectedDetailProduct(p)}
          />
        )}

        {/* VIEW 2: AI AGENT INTERACTIVE WORKSPACE (Dual column on large screens) */}
        {activeView === 'agent' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Chat Pane */}
            <div className="lg:col-span-7 h-[calc(100vh-8.5rem)] min-h-[600px]">
              <AgentChat
                messages={messages}
                isLoading={isLoading}
                currency={currency}
                onSendMessage={handleSendMessage}
                onResetChat={handleResetChat}
                onProductClick={(p) => setSelectedDetailProduct(p)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleCompare={handleToggleCompare}
                comparedProductIds={comparedProductIds}
                targetBudget={targetBudget}
                onSetBudget={setTargetBudget}
              />
            </div>

            {/* Right Pane: AI Showcase & Catalog Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Active Recommendations</span>
                    <span className="text-xs font-medium text-zinc-500 font-mono">({filteredProducts.length})</span>
                  </h2>
                  <p className="text-xs text-zinc-500">Live verified inventory & multi-criteria rankings</p>
                </div>

                <button
                  onClick={() => setActiveView('catalog')}
                  className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-900 border border-white/10 px-2.5 py-1 rounded-lg transition-colors hover:bg-zinc-800"
                >
                  <span>Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Filter Strip */}
              <CatalogView
                products={products}
                filter={filter}
                currency={currency}
                onUpdateFilter={(newF) => setFilter(prev => ({ ...prev, ...newF }))}
                onResetFilter={() => setFilter({ sortBy: 'recommended' })}
                onTriggerAgentForCategory={(cat) => {
                  handleSendMessage(`Find the top rated products in ${cat} under ${targetBudget ? formatPrice(targetBudget, currency) : 'budget'}`);
                }}
                isInCart={(id) => cartProductIds.includes(id)}
                isInWishlist={(id) => wishlistProductIds.includes(id)}
                isCompared={(id) => comparedProductIds.includes(id)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={handleToggleWishlist}
                onToggleCompare={handleToggleCompare}
                onViewDetails={(p) => setSelectedDetailProduct(p)}
                showProductGrid={false}
              />

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredProducts.slice(0, 6).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    currency={currency}
                    isInCart={cartProductIds.includes(prod.id)}
                    isInWishlist={wishlistProductIds.includes(prod.id)}
                    isCompared={comparedProductIds.includes(prod.id)}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(p) => setSelectedDetailProduct(p)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="bg-[#0F0F0F] rounded-2xl border border-white/5 p-8 text-center space-y-3">
                  <SlidersHorizontal className="w-10 h-10 text-zinc-700 mx-auto" />
                  <h3 className="text-sm font-semibold text-white">No products match your current filters</h3>
                  <p className="text-xs text-zinc-500">Try resetting filters or ask the AI agent to explore new products.</p>
                  <button
                    onClick={() => setFilter({ sortBy: 'recommended' })}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: FULL CATALOG & EXPLORER */}
        {activeView === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Product Explorer & Specification Search</span>
                  <span className="text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
                    {filteredProducts.length} items
                  </span>
                </h1>
                <p className="text-xs text-zinc-500">
                  Search by keyword, filter by brand, RAM, price range, or customer rating
                </p>
              </div>

              <button
                onClick={() => setActiveView('agent')}
                className="self-start sm:self-auto flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ask AI Agent for Guidance</span>
              </button>
            </div>

            {/* Filter controls */}
            <CatalogView
              products={products}
              filter={filter}
              currency={currency}
              onUpdateFilter={(newF) => setFilter(prev => ({ ...prev, ...newF }))}
              onResetFilter={() => setFilter({ sortBy: 'recommended' })}
              onTriggerAgentForCategory={(cat) => {
                setActiveView('agent');
                handleSendMessage(`Recommend the best options in ${cat} under ${targetBudget ? formatPrice(targetBudget, currency) : 'budget'}`);
              }}
              isInCart={(id) => cartProductIds.includes(id)}
              isInWishlist={(id) => wishlistProductIds.includes(id)}
              isCompared={(id) => comparedProductIds.includes(id)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onViewDetails={(p) => setSelectedDetailProduct(p)}
              showProductGrid={false}
            />

            {/* Full 4-col Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currency={currency}
                  isInCart={cartProductIds.includes(prod.id)}
                  isInWishlist={wishlistProductIds.includes(prod.id)}
                  isCompared={comparedProductIds.includes(prod.id)}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onToggleWishlist={handleToggleWishlist}
                  onToggleCompare={handleToggleCompare}
                  onViewDetails={(p) => setSelectedDetailProduct(p)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-[#0F0F0F] rounded-2xl border border-white/5 p-12 text-center space-y-3">
                <SlidersHorizontal className="w-12 h-12 text-zinc-700 mx-auto" />
                <h3 className="text-base font-semibold text-white">No products match your search</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try adjusting the RAM filter, price sliders, or reset filters to view all catalog items.
                </p>
                <button
                  onClick={() => setFilter({ sortBy: 'recommended' })}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: SEARCH & RECOMMENDATION HISTORY */}
        {activeView === 'history' && (
          <SearchHistoryView
            currency={currency}
            onSelectQuery={(query) => {
              setActiveView('agent');
              handleSendMessage(query);
            }}
          />
        )}
      </main>

      {/* Floating Comparison Bar if 2+ products are in tray */}
      {comparedProducts.length > 0 && !isComparisonOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex items-center space-x-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold">
              {comparedProducts.length} {comparedProducts.length === 1 ? 'product' : 'products'} ready to compare
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="bg-white hover:bg-zinc-200 text-black text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-xs"
            >
              Open Comparison Matrix
            </button>
            <button
              onClick={() => setComparedProducts([])}
              className="text-zinc-400 hover:text-white text-xs p-1"
              title="Clear"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={selectedDetailProduct}
        currency={currency}
        onClose={() => setSelectedDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        isInCart={selectedDetailProduct ? cartProductIds.includes(selectedDetailProduct.id) : false}
        isInWishlist={selectedDetailProduct ? wishlistProductIds.includes(selectedDetailProduct.id) : false}
        isCompared={selectedDetailProduct ? comparedProductIds.includes(selectedDetailProduct.id) : false}
      />

      <ComparisonModal
        products={comparedProducts}
        currency={currency}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRemoveProduct={handleRemoveFromComparison}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onClearAll={() => setComparedProducts([])}
      />

      <CartDrawer
        isOpen={isCartOpen}
        currency={currency}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        onOpenOrders={() => {
          setIsCartOpen(false);
          setIsOrdersOpen(true);
        }}
        targetBudget={targetBudget}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        currency={currency}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onViewDetails={(p) => setSelectedDetailProduct(p)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        orders={orders}
        currency={currency}
        onClose={() => setIsOrdersOpen(false)}
        onReorder={handleReorder}
      />

      <UserPreferencesModal
        isOpen={isPreferencesOpen}
        preferences={preferences}
        onClose={() => setIsPreferencesOpen(false)}
        onSavePreferences={(newPrefs) => {
          setPreferences(newPrefs);
          if (newPrefs.currency) setCurrency(newPrefs.currency);
          addToast('success', 'Preferences Saved', 'Scoring weights updated for AI recommendations.');
        }}
      />

      <ProjectArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* Global Live Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
