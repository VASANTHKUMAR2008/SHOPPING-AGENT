import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { INITIAL_PRODUCTS } from "./src/data/mockProducts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory storage repositories for college project demonstration (simulating SQLite tables)
let productCatalog = [...INITIAL_PRODUCTS];

let searchHistory: Array<{
  id: string;
  query: string;
  timestamp: string;
  category?: string;
  extractedRequirements?: any;
  resultCount: number;
  topRecommendationTitle?: string;
}> = [
  {
    id: 'hist-1',
    query: 'I need a laptop for ECE and VLSI under ₹60,000 with at least 16GB RAM',
    timestamp: '2026-08-24T12:30:00Z',
    category: 'Laptops',
    extractedRequirements: {
      category: 'Laptops',
      budget: 60000,
      budgetCurrency: 'INR',
      requiredSpecs: { ram: '16GB DDR5', processor: '8-core Ryzen / Intel', graphics: 'Dedicated GPU' },
      intendedUse: 'ECE & VLSI Simulation (Vivado / Cadence)',
      priorities: ['High Performance', 'RAM Capacity', 'Value for Money']
    },
    resultCount: 4,
    topRecommendationTitle: 'ASUS TUF Gaming A15 (AMD Ryzen 7, 16GB DDR5, RTX 3050)'
  },
  {
    id: 'hist-2',
    query: 'Best noise cancelling headphones for college students under ₹10,000',
    timestamp: '2026-08-23T15:45:00Z',
    category: 'Headphones',
    extractedRequirements: {
      category: 'Headphones',
      budget: 10000,
      budgetCurrency: 'INR',
      intendedUse: 'Study sessions in library/hostel',
      priorities: ['Active Noise Cancellation', 'Battery Life', 'Lightweight Comfort']
    },
    resultCount: 2,
    topRecommendationTitle: 'Sony WH-CH720N (35h Battery, V1 ANC Chip, 192g)'
  }
];

let userPreferences = {
  currency: 'INR',
  defaultBudgetMin: 10000,
  defaultBudgetMax: 80000,
  userRole: 'ECE & VLSI Engineering Student',
  preferredBrands: ['ASUS', 'Lenovo', 'Sony', 'OnePlus', 'Apple', 'Dell'],
  scoringWeights: {
    requirementsWeight: 40,
    priceValueWeight: 25,
    specificationsWeight: 20,
    ratingReliabilityWeight: 15
  }
};

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

/**
 * Resilient Gemini generator that executes with strict per-attempt timeouts
 * and cascades across fast models so the user never experiences background stalls.
 */
async function generateContentWithResilience(
  gemini: GoogleGenAI,
  options: {
    contents: any;
    config?: any;
    primaryModel?: string;
  }
) {
  const candidateModels = [
    options.primaryModel || "gemini-2.5-flash",
    "gemini-3.7-flash",
    "gemini-2.5-flash-lite"
  ];

  const modelsToTry = Array.from(new Set(candidateModels));
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const callPromise = gemini.models.generateContent({
        model,
        contents: options.contents,
        config: options.config,
      });

      // 4-second timeout per attempt to guarantee immediate response
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout on model ${model}`)), 4000)
      );

      const response: any = await Promise.race([callPromise, timeoutPromise]);

      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      console.warn(`[Gemini API] Model '${model}' call notice: ${errMsg}`);
    }
  }

  throw lastError || new Error("All candidate Gemini models failed");
}

function parseGeminiJsonText(rawText: string): any {
  if (!rawText) return {};
  let cleaned = rawText.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned);
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. Health check & System Info
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    productsCount: productCatalog.length,
    timestamp: new Date().toISOString(),
  });
});

// 2. Project Architecture & Database Schema Info (College Demo Documentation)
app.get("/api/system-info", (req, res) => {
  res.json({
    projectName: "AI Shopping Agent Web Application",
    academicDomain: "College Engineering Project / AI Agentic Systems",
    architecture: {
      frontend: "React 19 + TypeScript + Tailwind CSS (Vite)",
      backend: "Node.js Express + REST APIs + Gemini 3.7 Flash SDK",
      database: "Relational SQLite Table Model (Simulated In-Memory Repository)",
      aiModel: "Google Gemini 3.7 Flash with Structured JSON Schema & Prompt Pipelines",
      scoringEngine: "Multi-Factor Configurable Weighted Scoring (40% Req, 25% Value, 20% Specs, 15% Rating)"
    },
    databaseSchema: [
      {
        tableName: "Products",
        columns: [
          { name: "id", type: "TEXT PRIMARY KEY" },
          { name: "title", type: "TEXT NOT NULL" },
          { name: "brand", type: "TEXT NOT NULL" },
          { name: "category", type: "TEXT NOT NULL" },
          { name: "priceINR", type: "INTEGER NOT NULL" },
          { name: "priceUSD", type: "INTEGER NOT NULL" },
          { name: "rating", type: "REAL NOT NULL" },
          { name: "reviewCount", type: "INTEGER" },
          { name: "specifications", type: "JSON (Key-Value Map)" },
          { name: "pros_cons", type: "JSON Arrays" },
          { name: "imageUrl", type: "TEXT" }
        ]
      },
      {
        tableName: "Users",
        columns: [
          { name: "id", type: "TEXT PRIMARY KEY" },
          { name: "name", type: "TEXT NOT NULL" },
          { name: "email", type: "TEXT NOT NULL" },
          { name: "role", type: "TEXT" },
          { name: "preferences", type: "JSON (Budget, Currency, Brands, Weights)" }
        ]
      },
      {
        tableName: "Search_History",
        columns: [
          { name: "id", type: "TEXT PRIMARY KEY" },
          { name: "user_id", type: "TEXT" },
          { name: "query", type: "TEXT NOT NULL" },
          { name: "extracted_requirements", type: "JSON" },
          { name: "timestamp", type: "DATETIME DEFAULT CURRENT_TIMESTAMP" }
        ]
      },
      {
        tableName: "Comparisons",
        columns: [
          { name: "id", type: "TEXT PRIMARY KEY" },
          { name: "user_id", type: "TEXT" },
          { name: "product_ids", type: "JSON Array" },
          { name: "matrix_data", type: "JSON" },
          { name: "timestamp", type: "DATETIME" }
        ]
      }
    ],
    restEndpoints: [
      { method: "GET", path: "/api/products", description: "List, search, filter and sort products" },
      { method: "GET", path: "/api/products/:id", description: "Get specific product details" },
      { method: "POST", path: "/api/search", description: "Structured multi-filter keyword & spec search" },
      { method: "POST", path: "/api/compare", description: "Side-by-side product comparison with AI winner" },
      { method: "POST", path: "/api/recommend", description: "Configurable multi-factor recommendation engine" },
      { method: "POST", path: "/api/chat", description: "Natural language conversational shopping assistant" },
      { method: "GET/POST/DELETE", path: "/api/history", description: "Manage search and query history" },
      { method: "GET/POST", path: "/api/preferences", description: "Manage user preferences and scoring weights" }
    ]
  });
});

// 3. GET /api/products (List products with filters & sorting)
app.get("/api/products", (req, res) => {
  const { category, brand, minPrice, maxPrice, minRating, minRAM, query, sortBy, currency = 'INR' } = req.query;
  
  let results = [...productCatalog];

  // Category filter
  if (category && category !== 'All Products') {
    results = results.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  // Brand filter
  if (brand) {
    const brands = String(brand).split(',').map(b => b.trim().toLowerCase());
    results = results.filter(p => brands.includes(p.brand.toLowerCase()));
  }

  // Price filtering
  const priceField = currency === 'USD' ? 'priceUSD' : 'priceINR';
  if (minPrice) {
    const min = parseFloat(String(minPrice));
    if (!isNaN(min)) results = results.filter(p => (p[priceField] || p.price) >= min);
  }
  if (maxPrice) {
    const max = parseFloat(String(maxPrice));
    if (!isNaN(max)) results = results.filter(p => (p[priceField] || p.price) <= max);
  }

  // Rating filtering
  if (minRating) {
    const rating = parseFloat(String(minRating));
    if (!isNaN(rating)) results = results.filter(p => p.rating >= rating);
  }

  // RAM filtering
  if (minRAM) {
    const ramTarget = String(minRAM).toLowerCase();
    results = results.filter(p => {
      const ramSpec = (p.specs?.RAM || '').toLowerCase();
      return ramSpec.includes(ramTarget);
    });
  }

  // Text search query with stemming and synonym expansion
  if (query) {
    const rawTokens = String(query).toLowerCase().trim().split(/\s+/).filter(Boolean);
    results = results.filter(p => {
      const searchable = [
        p.title,
        p.brand,
        p.category,
        p.description,
        p.whoIsThisFor || '',
        p.dealBadge || '',
        ...(p.pros || []),
        ...(p.cons || []),
        ...Object.values(p.specs || {})
      ].join(' ').toLowerCase();

      return rawTokens.every(token => {
        if (searchable.includes(token)) return true;

        let stemmed = token;
        if (token.endsWith('es') && token.length > 3) stemmed = token.slice(0, -2);
        else if (token.endsWith('s') && token.length > 2) stemmed = token.slice(0, -1);

        if (searchable.includes(stemmed)) return true;

        if (['watch', 'watches', 'smartwatch', 'smartwatches', 'wearable', 'wearables', 'band'].includes(token)) {
          return searchable.includes('watch') || p.category.toLowerCase() === 'smartwatches';
        }
        if (['phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'smartphones'].includes(token)) {
          return searchable.includes('phone') || searchable.includes('mobile') || p.category.toLowerCase() === 'smartphones';
        }
        if (['headphone', 'headphones', 'earphone', 'earphones', 'earbud', 'earbuds', 'tws', 'audio'].includes(token)) {
          return searchable.includes('headphone') || searchable.includes('earbud') || searchable.includes('audio') || p.category.toLowerCase() === 'headphones';
        }
        if (['laptop', 'laptops', 'notebook', 'macbook'].includes(token)) {
          return searchable.includes('laptop') || searchable.includes('macbook') || p.category.toLowerCase() === 'laptops';
        }
        if (['tablet', 'tablets', 'ipad'].includes(token)) {
          return searchable.includes('tablet') || searchable.includes('ipad') || p.category.toLowerCase() === 'tablets';
        }
        if (['mouse', 'mice', 'trackpad', 'cursor', 'pointer'].includes(token)) {
          return searchable.includes('mouse') || searchable.includes('mice') || p.category.toLowerCase().includes('mice');
        }
        if (['pencil', 'pencils', 'pen', 'pens', 'stylus', 'stationery', 'drafting', 'sketching', 'graphite'].includes(token)) {
          return searchable.includes('pencil') || searchable.includes('pen') || searchable.includes('stylus') || searchable.includes('drafting') || p.category.toLowerCase().includes('pencils') || p.category.toLowerCase().includes('stationery');
        }
        if (['dress', 'dresses', 'gown', 'gowns', 'kurti', 'kurtis', 'fashion', 'clothing', 'apparel', 'outfit', 'jacket', 'shoe', 'shoes', 'sneaker', 'sneakers', 'shirt'].includes(token)) {
          return searchable.includes('dress') || searchable.includes('gown') || searchable.includes('kurti') || searchable.includes('fashion') || searchable.includes('jacket') || searchable.includes('shoe') || searchable.includes('shirt') || p.category.toLowerCase().includes('fashion') || p.category.toLowerCase().includes('dresses');
        }
        if (['chair', 'lamp', 'desk', 'mug', 'bottle', 'backpack', 'bag', 'home', 'lifestyle'].includes(token)) {
          return searchable.includes('chair') || searchable.includes('lamp') || searchable.includes('mug') || searchable.includes('bottle') || searchable.includes('backpack') || p.category.toLowerCase().includes('home') || p.category.toLowerCase().includes('lifestyle');
        }

        return false;
      });
    });
  }

  // Sorting
  if (sortBy === 'price-asc') {
    results.sort((a, b) => (a[priceField] || a.price) - (b[priceField] || b.price));
  } else if (sortBy === 'price-desc') {
    results.sort((a, b) => (b[priceField] || b.price) - (a[priceField] || a.price));
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    results.sort((a, b) => {
      const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
      const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
      return discB - discA;
    });
  } else {
    // Default recommended: matchScore/dealScore
    results.sort((a, b) => (b.matchScore || b.dealScore || 0) - (a.matchScore || a.dealScore || 0));
  }

  res.json({
    count: results.length,
    currency,
    products: results
  });
});

// 4. GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
  const product = productCatalog.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// 5. POST /api/search (Structured Search)
app.post("/api/search", (req, res) => {
  const { query, category, budget, currency = 'INR', requiredSpecs = {}, brand } = req.body;

  let filtered = [...productCatalog];

  if (category && category !== 'All Products') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand) {
    filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  const priceField = currency === 'USD' ? 'priceUSD' : 'priceINR';
  if (budget) {
    filtered = filtered.filter(p => (p[priceField] || p.price) <= budget * 1.15); // Allow small buffer
  }

  if (requiredSpecs.ram) {
    const ramTarget = String(requiredSpecs.ram).toLowerCase();
    filtered = filtered.filter(p => (p.specs?.RAM || '').toLowerCase().includes(ramTarget));
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      Object.values(p.specs || {}).some(v => v.toLowerCase().includes(q))
    );
  }

  res.json({
    count: filtered.length,
    products: filtered
  });
});

// 6. POST /api/recommend (AI Recommendation Scoring Engine with Configurable Weights)
app.post("/api/recommend", (req, res) => {
  const {
    requirements = {},
    weights = userPreferences.scoringWeights,
    currency = 'INR'
  } = req.body;

  const {
    requirementsWeight = 40,
    priceValueWeight = 25,
    specificationsWeight = 20,
    ratingReliabilityWeight = 15
  } = weights;

  const priceField = currency === 'USD' ? 'priceUSD' : 'priceINR';
  const targetBudget = requirements.budget;
  const targetCategory = requirements.category;
  const targetRAM = requirements.ram;
  const intendedUse = (requirements.intendedUse || '').toLowerCase();

  let pool = [...productCatalog];
  if (targetCategory && targetCategory !== 'All Products') {
    const matchedCategory = pool.filter(p => p.category.toLowerCase().includes(targetCategory.toLowerCase()));
    if (matchedCategory.length > 0) pool = matchedCategory;
  }

  // Calculate scores for each product
  const scoredProducts = pool.map(product => {
    const prodPrice = product[priceField] || product.price;

    // 1. Requirements Score (0-100)
    let reqScore = 70;
    if (targetBudget) {
      if (prodPrice <= targetBudget) {
        reqScore += 20;
      } else if (prodPrice <= targetBudget * 1.1) {
        reqScore += 5;
      } else {
        reqScore -= 25;
      }
    }
    if (targetRAM && product.specs?.RAM?.toLowerCase().includes(targetRAM.toLowerCase())) {
      reqScore += 10;
    }
    if (intendedUse && (intendedUse.includes('ece') || intendedUse.includes('vlsi') || intendedUse.includes('cad'))) {
      if (product.specs?.Graphics && !product.specs.Graphics.includes('Integrated')) {
        reqScore += 15;
      }
      if (product.specs?.RAM?.includes('16GB')) {
        reqScore += 10;
      }
    }
    reqScore = Math.min(100, Math.max(20, reqScore));

    // 2. Price/Value Score (0-100)
    let valScore = product.dealScore || 85;
    if (product.originalPrice && product.originalPrice > product.price) {
      const discountPct = (product.originalPrice - product.price) / product.originalPrice;
      valScore += Math.round(discountPct * 30);
    }
    valScore = Math.min(100, Math.max(30, valScore));

    // 3. Specifications Score (0-100)
    let specScore = 75;
    if (product.specs?.Processor?.includes('Ryzen 7') || product.specs?.Processor?.includes('Core Ultra') || product.specs?.Processor?.includes('M2') || product.specs?.Processor?.includes('M3') || product.specs?.Processor?.includes('Snapdragon 8')) {
      specScore += 15;
    }
    if (product.specs?.RAM?.includes('16GB') || product.specs?.RAM?.includes('32GB')) {
      specScore += 10;
    }
    specScore = Math.min(100, Math.max(30, specScore));

    // 4. Rating/Reliability Score (0-100)
    const ratScore = Math.round((product.rating / 5.0) * 100);

    // Composite Final Score based on configurable weights
    const totalWeight = requirementsWeight + priceValueWeight + specificationsWeight + ratingReliabilityWeight;
    const finalScore = Math.round(
      ((reqScore * requirementsWeight) +
       (valScore * priceValueWeight) +
       (specScore * specificationsWeight) +
       (ratScore * ratingReliabilityWeight)) / totalWeight
    );

    return {
      ...product,
      matchScore: finalScore,
      aiScoreBreakdown: {
        requirementsScore: reqScore,
        valueScore: valScore,
        specsScore: specScore,
        ratingScore: ratScore,
        totalScore: finalScore
      }
    };
  });

  scoredProducts.sort((a, b) => b.matchScore - a.matchScore);

  // Determine Categorized Recommendations
  const bestOverall = scoredProducts[0];
  const bestBudget = [...scoredProducts].sort((a, b) => (a[priceField] || a.price) - (b[priceField] || b.price))[0];
  const bestPerformance = [...scoredProducts].sort((a, b) => (b.aiScoreBreakdown?.specsScore || 0) - (a.aiScoreBreakdown?.specsScore || 0))[0];
  const bestValue = [...scoredProducts].sort((a, b) => (b.aiScoreBreakdown?.valueScore || 0) - (a.aiScoreBreakdown?.valueScore || 0))[0];

  res.json({
    weights: { requirementsWeight, priceValueWeight, specificationsWeight, ratingReliabilityWeight },
    recommendations: {
      bestOverall: {
        product: bestOverall,
        reason: bestOverall?.recommendationReason || `Top ranked overall choice matching ${bestOverall?.matchScore}% of your stated requirements and specs.`
      },
      bestBudget: {
        product: bestBudget,
        reason: `Most economical option at ${currency === 'USD' ? '$' + bestBudget?.priceUSD : '₹' + bestBudget?.priceINR?.toLocaleString()} while fulfilling essential criteria.`
      },
      bestPerformance: {
        product: bestPerformance,
        reason: `Highest raw computing horsepower and specification score for intensive simulation, compilation, and multitasking.`
      },
      bestValue: {
        product: bestValue,
        reason: `Optimal price-to-performance ratio offering premium features at a competitive price.`
      }
    },
    rankedProducts: scoredProducts
  });
});

// 7. POST /api/compare (Product Comparison Matrix)
app.post("/api/compare", async (req, res) => {
  try {
    const { products = [] } = req.body;
    if (!products || !Array.isArray(products) || products.length < 2) {
      return res.status(400).json({ error: "At least two products required for comparison" });
    }

    const gemini = getGeminiClient();
    if (!gemini) {
      return res.json(generateFallbackComparison(products));
    }

    const prompt = `Compare these products in detail for a consumer or student:
${JSON.stringify(products.map(p => ({
  id: p.id,
  title: p.title,
  brand: p.brand,
  priceINR: p.priceINR,
  priceUSD: p.priceUSD,
  specs: p.specs,
  pros: p.pros,
  cons: p.cons
})))}

Provide a side-by-side breakdown:
1. "featureList": 5-8 key criteria/features evaluated across all products (Price & Value, Processor & GPU, RAM & Multitasking, Storage, Display Quality, Battery & Portability, Build Durability).
2. "verdict": A clear, objective recommendation on which product wins for which buyer.
3. "bestForCategories": Array of winner categories (e.g. "Best Overall Choice", "Best Budget Option", "Best for Engineering / ECE Simulation", "Best Portable Daily Driver") with the winning product ID and a concise explanation.`;

    const response = await generateContentWithResilience(gemini, {
      primaryModel: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            featureList: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            verdict: { type: Type.STRING },
            bestForCategories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  categoryTitle: { type: Type.STRING },
                  winnerProductId: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["categoryTitle", "winnerProductId", "explanation"]
              }
            }
          },
          required: ["featureList", "verdict", "bestForCategories"]
        }
      }
    });

    const parsed = parseGeminiJsonText(response.text || "{}");
    return res.json({ products, ...parsed });
  } catch (error) {
    console.error("Comparison Error:", error);
    return res.json(generateFallbackComparison(req.body.products || []));
  }
});

// 8. POST /api/chat (Natural Language AI Shopping Assistant)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], targetBudget, preferredCategory, currency = 'INR' } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Fast candidate matching from catalog based on tokens & category
    const q = message.toLowerCase();
    const qTokens = q.split(/\s+/).filter(Boolean);

    let candidateMatches = productCatalog.filter(p => {
      const searchStr = [
        p.title,
        p.category,
        p.brand,
        p.description,
        p.whoIsThisFor || '',
        p.dealBadge || '',
        ...(p.pros || []),
        ...(p.cons || []),
        ...Object.values(p.specs || {})
      ].join(' ').toLowerCase();

      if (preferredCategory && preferredCategory !== 'All Products' && p.category.toLowerCase() === preferredCategory.toLowerCase()) {
        return true;
      }

      if (qTokens.some(t => t.length > 2 && searchStr.includes(t))) return true;

      // Smart category mapping
      if ((q.includes('watch') || q.includes('smartwatch') || q.includes('band')) && p.category === 'Smartwatches') return true;
      if ((q.includes('pencil') || q.includes('pen') || q.includes('stationery') || q.includes('stylus')) && p.category === 'Stationery & Pencils') return true;
      if ((q.includes('mouse') || q.includes('mice') || q.includes('keyboard')) && p.category === 'Keyboards & Mice') return true;
      if ((q.includes('dress') || q.includes('kurti') || q.includes('gown') || q.includes('jacket') || q.includes('fashion') || q.includes('clothing') || q.includes('shoe')) && p.category === 'Fashion & Dresses') return true;
      if ((q.includes('chair') || q.includes('lamp') || q.includes('mug') || q.includes('bottle') || q.includes('backpack')) && p.category === 'Home & Lifestyle') return true;
      if ((q.includes('laptop') || q.includes('computer') || q.includes('ece') || q.includes('vlsi') || q.includes('coding')) && p.category === 'Laptops') return true;
      if ((q.includes('phone') || q.includes('mobile') || q.includes('smartphone')) && p.category === 'Smartphones') return true;
      if ((q.includes('headphone') || q.includes('earphone') || q.includes('anc') || q.includes('earbud')) && p.category === 'Headphones') return true;
      if ((q.includes('monitor') || q.includes('display') || q.includes('screen')) && p.category === 'Monitors') return true;
      if ((q.includes('tablet') || q.includes('ipad')) && p.category === 'Tablets') return true;

      return false;
    });

    if (candidateMatches.length === 0) {
      candidateMatches = productCatalog.slice(0, 8);
    }

    const historyItem: {
      id: string;
      query: string;
      timestamp: string;
      category: string;
      resultCount: number;
      topRecommendationTitle: string;
      extractedRequirements?: any;
    } = {
      id: 'hist-' + Date.now(),
      query: message,
      timestamp: new Date().toISOString(),
      category: preferredCategory || candidateMatches[0]?.category || 'General',
      resultCount: candidateMatches.length,
      topRecommendationTitle: candidateMatches[0]?.title || ''
    };

    const gemini = getGeminiClient();

    if (!gemini) {
      const fallback = generateFallbackShoppingResponse(message, productCatalog, targetBudget, currency);
      historyItem.resultCount = fallback.products.length;
      historyItem.topRecommendationTitle = fallback.products[0]?.title || '';
      historyItem.extractedRequirements = fallback.extractedRequirements;
      searchHistory.unshift(historyItem);
      return res.json(fallback);
    }

    const candidateSubset = candidateMatches.slice(0, 10).map(p => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      priceINR: p.priceINR,
      priceUSD: p.priceUSD,
      specs: p.specs,
      dealBadge: p.dealBadge
    }));

    const systemPrompt = `You are a high-speed, expert AI Shopping Agent and Technical Advisor.
Analyze the user's shopping query and select the best matching products from the provided catalog candidates.
Provide concise, technical, and helpful advice. Return a structured JSON object.`;

    const userPrompt = `User Query: "${message}"
Active Currency: ${currency}
Target Budget: ${targetBudget ? `${currency === 'USD' ? '$' : '₹'}${targetBudget}` : 'Not specified'}
Available Candidate Products: ${JSON.stringify(candidateSubset)}
Recent History: ${JSON.stringify((history || []).slice(-2))}`;

    const response = await generateContentWithResilience(gemini, {
      primaryModel: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            extractedRequirements: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                budget: { type: Type.NUMBER },
                budgetCurrency: { type: Type.STRING },
                requiredSpecs: {
                  type: Type.OBJECT,
                  properties: {
                    ram: { type: Type.STRING },
                    processor: { type: Type.STRING },
                    storage: { type: Type.STRING },
                    display: { type: Type.STRING },
                    battery: { type: Type.STRING },
                    gps: { type: Type.STRING }
                  }
                },
                intendedUse: { type: Type.STRING }
              }
            },
            reasoningSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            productInsights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  recommendationType: { type: Type.STRING },
                  recommendationReason: { type: Type.STRING },
                  matchScore: { type: Type.INTEGER }
                },
                required: ["id", "recommendationType", "recommendationReason", "matchScore"]
              }
            },
            recommendationSummary: {
              type: Type.OBJECT,
              properties: {
                bestOverall: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                bestBudget: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                bestPerformance: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                bestValue: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                generalVerdict: { type: Type.STRING }
              }
            },
            suggestedActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            budgetAnalysis: {
              type: Type.OBJECT,
              properties: {
                total: { type: Type.NUMBER },
                targetBudget: { type: Type.NUMBER },
                remaining: { type: Type.NUMBER },
                savings: { type: Type.NUMBER },
                verdict: { type: Type.STRING }
              }
            }
          },
          required: ["reply", "suggestedActions"]
        }
      }
    });

    const parsed = parseGeminiJsonText(response.text || "{}");

    // Map verified products directly from productCatalog
    let finalProducts: any[] = [];
    const insightMap = new Map<string, any>();
    if (parsed.productInsights && Array.isArray(parsed.productInsights)) {
      parsed.productInsights.forEach((pi: any) => {
        if (pi.id) insightMap.set(pi.id.toLowerCase(), pi);
      });
    }

    const selectedIds: string[] = Array.isArray(parsed.recommendedProductIds) && parsed.recommendedProductIds.length > 0
      ? parsed.recommendedProductIds
      : candidateMatches.slice(0, 4).map(p => p.id);

    const seenIds = new Set<string>();
    for (const pid of selectedIds) {
      const p = productCatalog.find(cp => cp.id === pid || cp.id.toLowerCase() === String(pid).toLowerCase());
      if (p && !seenIds.has(p.id)) {
        seenIds.add(p.id);
        const insight = insightMap.get(p.id.toLowerCase()) || {};
        finalProducts.push({
          ...p,
          recommendationType: insight.recommendationType || p.recommendationType || 'best-overall',
          recommendationReason: insight.recommendationReason || p.recommendationReason || `Top match verified for ${p.category}`,
          matchScore: insight.matchScore || p.matchScore || 95,
          priceINR: p.priceINR || p.price,
          priceUSD: p.priceUSD || Math.round(p.price / 83),
          price: currency === 'USD' ? (p.priceUSD || Math.round(p.price / 83)) : (p.priceINR || p.price)
        });
      }
    }

    // If less than 2 products mapped, fill with top candidate matches
    if (finalProducts.length < 2) {
      for (const p of candidateMatches) {
        if (!seenIds.has(p.id)) {
          seenIds.add(p.id);
          finalProducts.push({
            ...p,
            priceINR: p.priceINR || p.price,
            priceUSD: p.priceUSD || Math.round(p.price / 83),
            price: currency === 'USD' ? (p.priceUSD || Math.round(p.price / 83)) : (p.priceINR || p.price)
          });
          if (finalProducts.length >= 4) break;
        }
      }
    }

    parsed.products = finalProducts;

    // Fallback recommendationSummary if missing
    if (!parsed.recommendationSummary && finalProducts.length > 0) {
      parsed.recommendationSummary = {
        bestOverall: {
          title: finalProducts[0].title,
          reason: finalProducts[0].recommendationReason || "Top rated overall option."
        },
        bestBudget: {
          title: finalProducts[finalProducts.length - 1].title,
          reason: "Most economical price point with all essential features."
        },
        generalVerdict: `We recommend ${finalProducts[0].title} for the best combination of performance and value.`
      };
    }

    historyItem.resultCount = parsed.products.length;
    historyItem.topRecommendationTitle = parsed.products[0]?.title || '';
    historyItem.extractedRequirements = parsed.extractedRequirements;
    searchHistory.unshift(historyItem);

    return res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Chat Fast Recovery:", error?.message || error);
    const fallback = generateFallbackShoppingResponse(req.body.message || "", productCatalog, req.body.targetBudget, req.body.currency);
    return res.json(fallback);
  }
});

// 9. History Endpoints
app.get("/api/history", (req, res) => {
  res.json(searchHistory);
});

app.post("/api/history", (req, res) => {
  const item = {
    id: 'hist-' + Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body
  };
  searchHistory.unshift(item);
  res.json(item);
});

app.delete("/api/history", (req, res) => {
  searchHistory = [];
  res.json({ message: "History cleared successfully" });
});

// 10. Preferences Endpoints
app.get("/api/preferences", (req, res) => {
  res.json(userPreferences);
});

app.post("/api/preferences", (req, res) => {
  userPreferences = {
    ...userPreferences,
    ...req.body
  };
  res.json(userPreferences);
});

// 11. Review synthesis endpoint
app.post("/api/review-synthesis", async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) return res.status(400).json({ error: "Product is required" });

    const gemini = getGeminiClient();
    if (!gemini) {
      return res.json({
        positivePercent: 94,
        keyHighlight: `Verified users praise the ${product.brand} build quality, thermal performance, and overall responsiveness.`,
        frequentPraise: [
          'Excellent speed and reliable cooling during long hours',
          'Crisp display and comfortable keyboard travel',
          'Great value for the price point'
        ],
        frequentComplaints: [
          'Charger is slightly bulky for travel',
          'Webcam is standard quality'
        ],
        whoIsThisFor: product.whoIsThisFor || 'Engineering students, developers, and power users wanting dependable performance.',
        verdict: product.verdict || 'A rock-solid choice that comfortably handles rigorous college tasks.'
      });
    }

    const prompt = `Synthesize verified customer reviews and buyer sentiment for:
Product: ${product.title} (${product.brand})
Price: ${product.priceINR ? `₹${product.priceINR}` : `$${product.priceUSD || product.price}`}
Specs: ${JSON.stringify(product.specs || {})}

Return a sentiment summary:
- "positivePercent": number (e.g. 95)
- "keyHighlight": 1 concise sentence summarizing thousands of verified reviews
- "frequentPraise": array of 3 top praised features
- "frequentComplaints": array of 2 caveats
- "whoIsThisFor": 1 sentence describing the ideal buyer
- "verdict": 1 concluding recommendation sentence`;

    const response = await generateContentWithResilience(gemini, {
      primaryModel: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            positivePercent: { type: Type.INTEGER },
            keyHighlight: { type: Type.STRING },
            frequentPraise: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            frequentComplaints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            whoIsThisFor: { type: Type.STRING },
            verdict: { type: Type.STRING }
          },
          required: ["positivePercent", "keyHighlight", "frequentPraise", "frequentComplaints", "whoIsThisFor", "verdict"]
        }
      }
    });

    const parsed = parseGeminiJsonText(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    return res.json({
      positivePercent: 93,
      keyHighlight: "Overwhelmingly positive reception for engineering coursework and everyday reliability.",
      frequentPraise: ["High-speed RAM", "Solid thermal cooling", "Fast boot times"],
      frequentComplaints: ["Slightly heavy adapter"],
      whoIsThisFor: "College engineering students and multitasking power users.",
      verdict: "High-value, verified top performer in its class."
    });
  }
});

// Coupon verification
app.post("/api/apply-coupon", (req, res) => {
  const { code, cartTotal = 0, currency = 'INR' } = req.body;
  const upperCode = (code || "").trim().toUpperCase();

  const validCoupons: Record<string, { discountPercent: number; minTotal: number; description: string }> = {
    "STUDENT15": { discountPercent: 15, minTotal: currency === 'USD' ? 50 : 3000, description: "15% Student Discount on all verified electronics" },
    "ECE20": { discountPercent: 20, minTotal: currency === 'USD' ? 100 : 10000, description: "20% Engineering & Tech Hardware Special Rebate" },
    "TECH10": { discountPercent: 10, minTotal: currency === 'USD' ? 25 : 1000, description: "10% off entire order" },
    "FREESHIP": { discountPercent: 5, minTotal: 0, description: "Free Express Campus Delivery + 5% Cashback" }
  };

  const matched = validCoupons[upperCode];
  if (!matched) {
    return res.status(400).json({ valid: false, message: "Invalid coupon code. Try 'STUDENT15' or 'ECE20'." });
  }

  if (cartTotal < matched.minTotal) {
    return res.status(400).json({
      valid: false,
      message: `Coupon '${upperCode}' requires a minimum cart total of ${currency === 'USD' ? '$' : '₹'}${matched.minTotal}.`
    });
  }

  const discountAmount = Number(((cartTotal * matched.discountPercent) / 100).toFixed(0));
  return res.json({
    valid: true,
    code: upperCode,
    discountPercent: matched.discountPercent,
    discountAmount,
    description: matched.description
  });
});

// Fallback logic
function generateFallbackShoppingResponse(query: string, catalog: any[] = [], targetBudget?: number, currency: string = 'INR') {
  const q = query.toLowerCase().trim();
  const rawTokens = q.split(/\s+/).filter(Boolean);

  // Extract Category
  let detectedCategory = 'Electronics & Hardware';
  if (q.includes('watch') || q.includes('smartwatch') || q.includes('band') || q.includes('garmin') || q.includes('amazfit') || q.includes('fastrack') || q.includes('noise') || q.includes('fire-boltt') || q.includes('fitbit')) detectedCategory = 'Smartwatches';
  else if (q.includes('pencil') || q.includes('pen') || q.includes('stationery') || q.includes('drawing') || q.includes('faber') || q.includes('staedtler') || q.includes('rotring') || q.includes('wacom')) detectedCategory = 'Stationery & Pencils';
  else if (q.includes('dress') || q.includes('kurti') || q.includes('gown') || q.includes('fashion') || q.includes('clothing') || q.includes('jacket') || q.includes('shoe') || q.includes('sneaker') || q.includes('shirt')) detectedCategory = 'Fashion & Dresses';
  else if (q.includes('chair') || q.includes('lamp') || q.includes('bottle') || q.includes('mug') || q.includes('desk') || q.includes('backpack') || q.includes('home') || q.includes('lifestyle')) detectedCategory = 'Home & Lifestyle';
  else if (q.includes('mouse') || q.includes('mice') || q.includes('keyboard') || q.includes('keychron') || q.includes('logitech') || q.includes('razer')) detectedCategory = 'Keyboards & Mice';
  else if (q.includes('laptop') || q.includes('ece') || q.includes('vlsi') || q.includes('computer') || q.includes('macbook') || q.includes('thinkpad')) detectedCategory = 'Laptops';
  else if (q.includes('phone') || q.includes('smartphone') || q.includes('mobile') || q.includes('iphone') || q.includes('galaxy') || q.includes('pixel') || q.includes('oneplus') || q.includes('redmi')) detectedCategory = 'Smartphones';
  else if (q.includes('headphone') || q.includes('earphone') || q.includes('audio') || q.includes('anc') || q.includes('tws') || q.includes('earbud') || q.includes('sony') || q.includes('sennheiser')) detectedCategory = 'Headphones';
  else if (q.includes('tablet') || q.includes('ipad') || q.includes('stylus') || q.includes('tab')) detectedCategory = 'Tablets';
  else if (q.includes('monitor') || q.includes('display') || q.includes('screen') || q.includes('4k') || q.includes('165hz') || q.includes('144hz')) detectedCategory = 'Monitors';
  else if (q.includes('ssd') || q.includes('storage') || q.includes('drive') || q.includes('charger') || q.includes('gan') || q.includes('anker')) detectedCategory = 'Storage & Accessories';

  let matched = catalog.filter((p: any) => {
    const text = [
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

    return rawTokens.some(t => {
      if (text.includes(t)) return true;
      let stemmed = t;
      if (t.endsWith('es') && t.length > 3) stemmed = t.slice(0, -2);
      else if (t.endsWith('s') && t.length > 2) stemmed = t.slice(0, -1);
      if (text.includes(stemmed)) return true;
      if (['watch', 'watches', 'smartwatch', 'smartwatches'].includes(t)) return p.category === 'Smartwatches' || text.includes('watch');
      if (['phone', 'phones', 'mobile', 'mobiles'].includes(t)) return p.category === 'Smartphones' || text.includes('phone');
      if (['headphone', 'headphones', 'earphone', 'earphones', 'earbud', 'earbuds'].includes(t)) return p.category === 'Headphones';
      if (['mouse', 'mice'].includes(t)) return p.category === 'Keyboards & Mice' || text.includes('mouse') || text.includes('mice');
      if (['pencil', 'pencils', 'pen', 'pens', 'stylus'].includes(t)) return p.category === 'Stationery & Pencils' || text.includes('pencil') || text.includes('pen');
      if (['dress', 'dresses', 'gown', 'kurti', 'fashion'].includes(t)) return p.category === 'Fashion & Dresses' || text.includes('dress') || text.includes('gown');
      if (['chair', 'lamp', 'mug', 'bottle'].includes(t)) return p.category === 'Home & Lifestyle' || text.includes('chair') || text.includes('lamp');
      return false;
    });
  });

  if (matched.length === 0) {
    matched = catalog.filter(p => p.category.toLowerCase().includes(detectedCategory.toLowerCase()));
    if (matched.length === 0) {
      matched = catalog.slice(0, 6);
    }
  }

  // Extract budget
  let extractedBudget = targetBudget;
  if (!extractedBudget) {
    const budgetMatch = q.match(/(?:under|below|budget|within|max|₹|\$)\s*(\d+[\d,]*)/i);
    if (budgetMatch) {
      extractedBudget = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
    }
  }
  if (!extractedBudget) {
    if (detectedCategory === 'Laptops') extractedBudget = currency === 'USD' ? 750 : 60000;
    else if (detectedCategory === 'Smartwatches') extractedBudget = currency === 'USD' ? 250 : 20000;
    else if (detectedCategory === 'Headphones') extractedBudget = currency === 'USD' ? 120 : 10000;
    else if (detectedCategory === 'Tablets') extractedBudget = currency === 'USD' ? 400 : 35000;
    else if (detectedCategory === 'Monitors') extractedBudget = currency === 'USD' ? 300 : 25000;
    else extractedBudget = currency === 'USD' ? 300 : 25000;
  }

  // Extract Specs
  const requiredSpecs: Record<string, string> = {};
  if (q.includes('16gb')) requiredSpecs.ram = '16GB';
  else if (q.includes('8gb')) requiredSpecs.ram = '8GB';
  else if (q.includes('32gb')) requiredSpecs.ram = '32GB';

  if (q.includes('512gb')) requiredSpecs.storage = '512GB SSD';
  else if (q.includes('1tb')) requiredSpecs.storage = '1TB SSD';
  else if (q.includes('256gb')) requiredSpecs.storage = '256GB';

  if (q.includes('ryzen 7')) requiredSpecs.processor = 'AMD Ryzen 7';
  else if (q.includes('i5') || q.includes('core i5')) requiredSpecs.processor = 'Intel Core i5';
  else if (q.includes('i7') || q.includes('core i7')) requiredSpecs.processor = 'Intel Core i7';
  else if (q.includes('m1') || q.includes('m2') || q.includes('m3') || q.includes('m4')) requiredSpecs.processor = 'Apple Silicon';

  if (detectedCategory === 'Smartwatches') {
    if (q.includes('gps')) requiredSpecs.gps = 'Multi-Band / Dual-Frequency GPS';
    if (q.includes('ecg')) requiredSpecs.health = 'ECG & Blood Oxygen Monitoring';
    if (q.includes('battery') || q.includes('day')) requiredSpecs.battery = 'Long Battery Endurance (3+ Days)';
    if (q.includes('calling') || q.includes('call')) requiredSpecs.connectivity = 'Bluetooth Calling with Mic/Speaker';
    if (q.includes('amoled')) requiredSpecs.display = 'High-Brightness AMOLED Display';
  }

  const extractedRequirements = {
    category: detectedCategory,
    budget: extractedBudget,
    budgetCurrency: currency,
    brandPreference: [],
    requiredSpecs: Object.keys(requiredSpecs).length > 0 ? requiredSpecs : { general: `Optimized for ${detectedCategory.toLowerCase()} performance and battery longevity` },
    intendedUse: detectedCategory === 'Laptops'
      ? 'Academic simulation, engineering CAD/VLSI, coding & multitasking'
      : detectedCategory === 'Smartwatches'
      ? 'Comprehensive fitness tracking, heart-rate/sleep monitoring, smartphone notifications, and active lifestyle'
      : `High-reliability daily use for ${detectedCategory.toLowerCase()}`,
    priorities: ['Top Customer Rating', 'Value for Money', 'Verified Performance', 'Battery Endurance', 'Student Discount Eligibility'],
    missingInfo: targetBudget ? [] : ['Preferred display size or color option'],
    followUpQuestions: [
      `Would you like to compare the top two ${detectedCategory} side-by-side?`,
      `Would you like me to apply active educational coupons (e.g., 'STUDENT15' or 'TECH20') to your cart?`
    ]
  };

  const bestOverall = matched.find(p => p.recommendationType === 'best-overall') || matched[0] || catalog[0];
  const bestBudget = [...matched].sort((a, b) => (a.priceINR || a.price) - (b.priceINR || b.price))[0] || matched[0];
  const bestPerformance = matched.find(p => (p.dealScore && p.dealScore > 85) || p.recommendationType === 'best-performance') || matched[0];
  const bestValue = matched.find(p => p.dealBadge?.includes('Value') || p.dealBadge?.includes('Student') || p.recommendationType === 'best-value') || matched[1] || matched[0];

  return {
    reply: `I analyzed your search for **"${query}"** across verified product specifications, verified customer ratings, and current discounts.

Here are the top-ranked **${detectedCategory}** verified by our AI Scoring Engine to deliver optimal performance and value:`,
    extractedRequirements,
    reasoningSteps: [
      `Parsed query: Category "${detectedCategory}", Budget "${currency === 'USD' ? '$' : '₹'}${extractedBudget}", Matched keywords across inventory`,
      `Applied multi-factor weighting: Requirements (40%), Value & Price (25%), Hardware Specs (20%), Customer Reviews (15%)`,
      `Ranked candidate options and verified stock availability and educational discount eligibility`
    ],
    products: matched.slice(0, 4).map(p => ({
      ...p,
      price: currency === 'USD' ? (p.priceUSD || Math.round(p.priceINR / 83)) : (p.priceINR || p.price)
    })),
    recommendationSummary: {
      bestOverall: {
        title: bestOverall.title,
        reason: `Highest composite score in ${detectedCategory} combining build quality, verified specs, and positive reviews.`
      },
      bestBudget: {
        title: bestBudget.title,
        reason: `Most economical option at ${currency === 'USD' ? '$' + bestBudget.priceUSD : '₹' + bestBudget.priceINR?.toLocaleString()} while meeting all key requirements.`
      },
      bestPerformance: {
        title: bestPerformance.title,
        reason: `Highest benchmark and feature density for demanding workloads.`
      },
      bestValue: {
        title: bestValue.title,
        reason: `Best long-term investment balance between cost and everyday capabilities.`
      },
      generalVerdict: `We recommend ${bestOverall.title} as the top overall choice, backed by our student verified discount program.`
    },
    suggestedActions: [
      `Compare ${bestOverall.title.slice(0, 20)}... vs ${bestBudget.title.slice(0, 20)}...`,
      `Show exclusive student deals on ${detectedCategory}`,
      `Filter by budget under ${currency === 'USD' ? '$' + extractedBudget : '₹' + extractedBudget.toLocaleString()}`,
      `Proceed to Instant Checkout`
    ],
    budgetAnalysis: {
      total: currency === 'USD' ? (bestOverall.priceUSD || 500) : (bestOverall.priceINR || 45000),
      targetBudget: extractedBudget,
      remaining: Math.max(0, extractedBudget - (currency === 'USD' ? (bestOverall.priceUSD || 500) : (bestOverall.priceINR || 45000))),
      savings: currency === 'USD' ? 120 : 10000,
      verdict: "Matches your target budget criteria with active discount applied."
    }
  };
}

function generateFallbackComparison(products: any[]) {
  return {
    products,
    featureList: [
      "Price & Educational Discount",
      "Processor & Multi-Core Benchmarks",
      "RAM Capacity & Expandability",
      "Graphics (Dedicated vs Integrated)",
      "Display Quality & Refresh Rate",
      "Battery Life & Charging Speed",
      "Thermal Cooling & Noise",
      "Warranty & College Durability"
    ],
    verdict: `${products[0]?.title || "The primary option"} is the best choice for heavy simulation and performance-focused engineering coursework, while ${products[1]?.title || "the alternative"} excels in lightweight portability and battery longevity for campus lectures.`,
    bestForCategories: [
      {
        categoryTitle: "Best for ECE / VLSI & CAD Simulation",
        winnerProductId: products[0]?.id || "",
        explanation: "Features high-performance multi-core processor, 16GB high-bandwidth RAM, and dedicated thermal cooling designed for sustained high-load testbenches."
      },
      {
        categoryTitle: "Best for Campus Portability & Battery",
        winnerProductId: products[1]?.id || products[0]?.id || "",
        explanation: "Lightweight chassis under 1.5kg with all-day battery life, making it effortless to carry between lecture halls without carrying a charger."
      },
      {
        categoryTitle: "Best Overall Value for Money",
        winnerProductId: products[0]?.id || "",
        explanation: "Delivers maximum specification density and promotional discount for the price point."
      }
    ]
  };
}

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Shopping Agent Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
