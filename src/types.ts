export type Currency = 'INR' | 'USD';

export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number; // Primary display price
  priceINR: number; // Indian Rupee price
  priceUSD: number; // US Dollar price
  originalPrice?: number;
  originalPriceINR?: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  category: string; // 'Laptops' | 'Smartphones' | 'Headphones' | 'Smartwatches' | 'Tablets' | 'Audio & Tech' etc.
  description: string;
  imageUrl: string;
  images?: string[];
  specs: Record<string, string>; // e.g. RAM, Processor, Storage, Display, Battery, Graphics, Ports, OS
  pros: string[];
  cons: string[];
  inStock: boolean;
  shipping: string;
  dealScore?: number; // 1-100 score on how good this deal is
  matchScore?: number; // 1-100 score relative to user's prompt/criteria
  aiScoreBreakdown?: {
    requirementsScore: number; // 40%
    valueScore: number; // 25%
    specsScore: number; // 20%
    ratingScore: number; // 15%
    totalScore: number; // 1-100 composite
  };
  dealBadge?: string; // e.g. "Best Overall", "Best Budget", "Best Performance", "Best Value", "Editor's Choice"
  recommendationType?: 'best-overall' | 'best-budget' | 'best-performance' | 'best-value' | 'runner-up';
  recommendationReason?: string; // Clear explanation why this is recommended
  priceHistory?: { date: string; price: number; priceINR?: number }[];
  retailer?: string;
  url?: string;
  whoIsThisFor?: string;
  verdict?: string;
  sentimentSummary?: {
    positivePercent: number;
    keyHighlight: string;
    frequentPraise: string[];
    frequentComplaints: string[];
  };
}

export interface ExtractedRequirements {
  category?: string;
  budget?: number;
  budgetCurrency?: Currency;
  brandPreference?: string[];
  requiredSpecs?: {
    ram?: string;
    processor?: string;
    storage?: string;
    display?: string;
    battery?: string;
    graphics?: string;
    [key: string]: string | undefined;
  };
  intendedUse?: string; // e.g. "ECE and VLSI Simulation", "Computer Science Coding", "Gaming", "Student General"
  priorities?: string[]; // e.g. "Performance", "Value for Money", "Battery Life", "Portability"
  missingInfo?: string[]; // e.g. ["Specific budget range", "Preferred brand"]
  followUpQuestions?: string[];
}

export interface AIRecommendationSummary {
  bestOverall?: { product: Product; reason: string };
  bestBudget?: { product: Product; reason: string };
  bestPerformance?: { product: Product; reason: string };
  bestValue?: { product: Product; reason: string };
  generalVerdict?: string;
}

export interface ScoringWeights {
  requirementsWeight: number; // default 40
  priceValueWeight: number; // default 25
  specificationsWeight: number; // default 20
  ratingReliabilityWeight: number; // default 15
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedOption?: string;
}

export interface ShoppingFilter {
  query?: string;
  category?: string;
  collection?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minRAM?: string;
  storage?: string;
  processor?: string;
  minDiscount?: number;
  onlyDeals?: boolean;
  inStockOnly?: boolean;
  sortBy?: 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: string;
  content: string;
  extractedRequirements?: ExtractedRequirements;
  recommendationSummary?: AIRecommendationSummary;
  reasoningSteps?: string[];
  products?: Product[];
  suggestedActions?: string[];
  comparisonProducts?: Product[];
  budgetAnalysis?: {
    total: number;
    targetBudget: number;
    remaining: number;
    savings: number;
    verdict: string;
  };
}

export interface ComparisonMatrixData {
  products: Product[];
  featureList: string[];
  verdict: string;
  bestForCategories: {
    categoryTitle: string;
    winnerProductId: string;
    explanation: string;
  }[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  extractedRequirements?: ExtractedRequirements;
  resultCount: number;
  topRecommendationTitle?: string;
  category?: string;
}

export interface UserPreferences {
  currency: Currency;
  defaultBudgetMin: number;
  defaultBudgetMax: number;
  userRole: string; // "ECE / VLSI Engineering Student", "Computer Science Student", "General Engineering", "Creative Pro", etc.
  preferredBrands: string[];
  scoringWeights: ScoringWeights;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  tax: number;
  finalTotal: number;
  currency: Currency;
  shippingDetails: ShippingDetails;
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error' | 'cart';
  title: string;
  description?: string;
}

export type ActivePageView = 'home' | 'agent' | 'search' | 'compare' | 'history' | 'preferences' | 'architecture' | 'orders';
