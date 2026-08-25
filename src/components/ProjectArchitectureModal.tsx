import React from 'react';
import { 
  X, 
  Database, 
  Server, 
  Cpu, 
  Code2, 
  Layers, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Terminal,
  Activity,
  Workflow
} from 'lucide-react';

interface ProjectArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'database' | 'endpoints' | 'prompt-flow' | 'formula'>('overview');

  if (!isOpen) return null;

  const tables = [
    {
      name: "Products",
      description: "Stores core hardware catalog with multi-currency pricing, specs, and reviews.",
      columns: [
        { name: "id", type: "TEXT PRIMARY KEY", desc: "Unique product identifier" },
        { name: "title", type: "TEXT NOT NULL", desc: "Full product naming" },
        { name: "brand", type: "TEXT NOT NULL", desc: "Manufacturer brand" },
        { name: "category", type: "TEXT NOT NULL", desc: "Laptops, Smartphones, Headphones, etc." },
        { name: "priceINR", type: "INTEGER NOT NULL", desc: "Indian Rupee retail price" },
        { name: "priceUSD", type: "INTEGER NOT NULL", desc: "US Dollar retail price" },
        { name: "specs", type: "JSON", desc: "RAM, Processor, Storage, GPU, Battery" },
        { name: "pros_cons", type: "JSON", desc: "Verified customer sentiment feedback" },
        { name: "dealScore", type: "INTEGER", desc: "Price-to-value index (1-100)" }
      ]
    },
    {
      name: "Users",
      description: "Stores student role, budget constraints, and custom scoring weight configuration.",
      columns: [
        { name: "id", type: "TEXT PRIMARY KEY", desc: "Unique user UUID" },
        { name: "role", type: "TEXT", desc: "e.g. ECE & VLSI Student, CS Developer" },
        { name: "currency", type: "TEXT", desc: "INR or USD" },
        { name: "scoring_weights", type: "JSON", desc: "{ req: 40%, val: 25%, spec: 20%, rat: 15% }" },
        { name: "preferred_brands", type: "JSON", desc: "Array of selected brand filters" }
      ]
    },
    {
      name: "Search_History",
      description: "Logs all user natural language queries, extracted parameters, and recommendations.",
      columns: [
        { name: "id", type: "TEXT PRIMARY KEY", desc: "Session query ID" },
        { name: "query", type: "TEXT NOT NULL", desc: "Natural English user prompt" },
        { name: "extracted_requirements", type: "JSON", desc: "Category, Budget, RAM, Intended Use" },
        { name: "timestamp", type: "DATETIME", desc: "ISO 8601 creation time" }
      ]
    },
    {
      name: "Comparisons",
      description: "Persists multi-product comparison matrix sessions with side-by-side spec arrays.",
      columns: [
        { name: "id", type: "TEXT PRIMARY KEY", desc: "Comparison session ID" },
        { name: "product_ids", type: "JSON Array", desc: "Selected products (min 2, max 4)" },
        { name: "matrix_data", type: "JSON", desc: "Feature breakdown, category winners, verdict" },
        { name: "timestamp", type: "DATETIME", desc: "Session creation date" }
      ]
    }
  ];

  const endpoints = [
    { method: "GET", path: "/api/products", desc: "Query product catalog with category, price, RAM, and rating filters", sample: "?category=Laptops&minRAM=16GB&maxPrice=60000" },
    { method: "POST", path: "/api/chat", desc: "Natural language requirement extractor & recommendation agent (Gemini 3.7 Flash)", sample: '{ "message": "I need a laptop for ECE and VLSI under ₹60,000" }' },
    { method: "POST", path: "/api/compare", desc: "Side-by-side multi-product feature matrix and category winner synthesis", sample: '{ "products": [prod1, prod2] }' },
    { method: "POST", path: "/api/recommend", desc: "Calculates weighted multi-factor ranking scores based on user weights", sample: '{ "weights": { "requirementsWeight": 40 } }' },
    { method: "GET/POST/DELETE", path: "/api/history", desc: "Full CRUD persistence for user search query sessions", sample: "GET /api/history" },
    { method: "GET/POST", path: "/api/preferences", desc: "Retrieve or update student role and scoring weights", sample: "POST /api/preferences" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        id="architecture-modal"
        className="bg-[#0F0F0F] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-[#E0E0E0]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">College Project Architecture & Engineering Specification</h2>
              <p className="text-xs text-zinc-500">AI Shopping Agent Web Application • Technical Documentation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/5 px-6 gap-6 bg-zinc-950/50 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>System Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`py-3 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'database' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Relational Schema (SQLite)</span>
          </button>

          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-3 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'endpoints' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>REST API Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt-flow')}
            className={`py-3 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'prompt-flow' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gemini Prompt & JSON Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('formula')}
            className={`py-3 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'formula' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Scoring Engine Formula</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Tab 1: System Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3">
                <h3 className="font-bold text-white text-sm">Application Architecture Summary</h3>
                <p>
                  The <strong>AI Shopping Agent</strong> is a full-stack web application designed for students and power users to parse natural language shopping queries, extract engineering specifications, compute multi-criteria recommendation scores, and compare hardware alternatives side-by-side.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-zinc-950/80 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-emerald-400 block">Frontend</span>
                    <span>React 19, TypeScript, Tailwind CSS, Lucide icons, responsive dark interface.</span>
                  </div>
                  <div className="p-3 bg-zinc-950/80 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-blue-400 block">Backend Server</span>
                    <span>Express.js REST APIs with Vite middleware for dev and CommonJS production build.</span>
                  </div>
                  <div className="p-3 bg-zinc-950/80 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-purple-400 block">AI Intelligence</span>
                    <span>Gemini 3.7 Flash with strict JSON schema, natural language extraction & sentiment synthesis.</span>
                  </div>
                </div>
              </div>

              {/* Core Features Verified */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
                <h3 className="font-bold text-white text-sm">Key Functional Modules Implemented</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Natural Language Requirement Extraction: </strong>
                      <span>Parses budget (₹60,000 / $750), category (Laptops), intended use (ECE & VLSI), and RAM specs (16GB) from everyday conversational prompts.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Reasoned Explanations & Badge Assignment: </strong>
                      <span>Explains why a laptop like ASUS TUF Gaming A15 excels for ECE CAD simulation with dedicated GPU & 8-core CPU, alongside Best Budget, Best Performance, and Best Value badges.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Side-by-Side Comparison Matrix: </strong>
                      <span>Evaluates specs, ratings, and feature lists across multiple products simultaneously with an AI verdict and winner breakdown.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white">Configurable Multi-Factor Scoring Engine: </strong>
                      <span>Allows students to customize scoring weights (Requirements 40%, Value 25%, Specs 20%, Rating 15%).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Database Schema */}
          {activeTab === 'database' && (
            <div className="space-y-6 text-xs">
              <p className="text-zinc-400">
                Relational schema designed for SQLite database tables:
              </p>
              <div className="space-y-4">
                {tables.map((table) => (
                  <div key={table.name} className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-white text-sm font-mono">Table: {table.name}</h4>
                      </div>
                      <span className="text-zinc-500 text-[11px]">{table.description}</span>
                    </div>

                    <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden bg-zinc-950/60">
                      {table.columns.map((col) => (
                        <div key={col.name} className="p-2.5 grid grid-cols-3 sm:grid-cols-4 items-center">
                          <span className="font-mono font-bold text-zinc-200">{col.name}</span>
                          <span className="font-mono text-emerald-400 text-[11px]">{col.type}</span>
                          <span className="col-span-2 text-zinc-400 text-[11px]">{col.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: REST Endpoints */}
          {activeTab === 'endpoints' && (
            <div className="space-y-4 text-xs">
              <p className="text-zinc-400">
                Exposed backend REST endpoints running on the Node.js Express server:
              </p>
              <div className="space-y-3">
                {endpoints.map((ep, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/20 text-[11px]">
                        {ep.method}
                      </span>
                      <span className="font-mono font-bold text-white">{ep.path}</span>
                    </div>
                    <p className="text-zinc-400">{ep.desc}</p>
                    <div className="p-2 rounded-lg bg-zinc-950 font-mono text-[11px] text-zinc-300 border border-white/5">
                      <span className="text-zinc-500">Sample: </span>{ep.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Prompt Flow */}
          {activeTab === 'prompt-flow' && (
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
                <h3 className="font-bold text-white text-sm">Gemini 3.7 Flash JSON Schema Configuration</h3>
                <p>
                  The backend uses <code className="text-emerald-400 font-mono">@google/genai</code> with <code className="text-emerald-400 font-mono">responseMimeType: "application/json"</code> and a strictly enforced TypeScript schema.
                </p>
                <div className="p-3 bg-zinc-950 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto border border-white/5">
{`responseSchema = {
  type: Type.OBJECT,
  properties: {
    reply: { type: Type.STRING },
    extractedRequirements: {
      category: Type.STRING,
      budget: Type.NUMBER,
      requiredSpecs: { ram: Type.STRING, processor: Type.STRING },
      intendedUse: Type.STRING,
      priorities: Type.ARRAY
    },
    reasoningSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    products: { type: Type.ARRAY, items: ProductSchema },
    recommendationSummary: {
      bestOverall: { title: Type.STRING, reason: Type.STRING },
      bestBudget: { title: Type.STRING, reason: Type.STRING },
      bestPerformance: { title: Type.STRING, reason: Type.STRING },
      bestValue: { title: Type.STRING, reason: Type.STRING }
    }
  }
}`}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Formula */}
          {activeTab === 'formula' && (
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4">
                <h3 className="font-bold text-white text-sm">Multi-Criteria Weighted Scoring Algorithm</h3>
                <div className="p-4 bg-zinc-950 rounded-xl border border-emerald-500/30 text-center font-mono text-sm text-emerald-400 font-bold">
                  Score = (w_req · S_req + w_val · S_val + w_spec · S_spec + w_rat · S_rat) / (w_req + w_val + w_spec + w_rat)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-white block">S_req (Requirements Match - Default 40%):</strong>
                    <span>Evaluates RAM capacity (≥16GB), budget ceiling adherence, and intended domain (ECE CAD).</span>
                  </div>
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-white block">S_val (Price-to-Value - Default 25%):</strong>
                    <span>Assesses promotional discounts, MSRP reduction, and price per gigabyte of memory.</span>
                  </div>
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-white block">S_spec (Hardware Specs - Default 20%):</strong>
                    <span>Measures multi-core CPU performance (Ryzen 7 / Core i5), GPU TGP wattage, display refresh.</span>
                  </div>
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-white block">S_rat (Rating & Reviews - Default 15%):</strong>
                    <span>Derived from aggregate verified customer stars (Score = (Rating / 5.0) * 100).</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
