import React from 'react';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Clock, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Layers,
  Cpu
} from 'lucide-react';
import { Currency, SearchHistoryItem } from '../types';

interface SearchHistoryViewProps {
  history: SearchHistoryItem[];
  currency: Currency;
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
  onNavigateToAgent: () => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({
  history,
  currency,
  onSelectQuery,
  onClearHistory,
  onNavigateToAgent
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 rounded-3xl bg-[#0F0F0F] border border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center">
            <History className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Search & Session History</h1>
            <p className="text-xs text-zinc-400">
              Persistent tracking of extracted requirements, queries, and past AI recommendations
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0F0F0F] border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 mx-auto flex items-center justify-center text-zinc-600">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">No search history recorded yet</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
              Any query you type into the AI Shopping Assistant or Search Bar will be logged here with extracted parameters.
            </p>
          </div>
          <button
            onClick={onNavigateToAgent}
            className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start an AI Search Session</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                {/* Top metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-zinc-500 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  {item.category && (
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/5 text-[10px] font-semibold">
                      {item.category}
                    </span>
                  )}
                  {item.resultCount > 0 && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                      {item.resultCount} Recommendations Generated
                    </span>
                  )}
                </div>

                {/* Query text */}
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  «"{item.query}"»
                </h3>

                {/* Extracted requirements pills */}
                {item.extractedRequirements && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.extractedRequirements.budget && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-zinc-900 text-zinc-300 border border-white/5">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        <span>Budget: {currency === 'USD' ? '$' : '₹'}{item.extractedRequirements.budget.toLocaleString()}</span>
                      </span>
                    )}
                    {item.extractedRequirements.intendedUse && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-zinc-900 text-zinc-300 border border-white/5">
                        <Cpu className="w-3 h-3 text-blue-400" />
                        <span>Use: {item.extractedRequirements.intendedUse}</span>
                      </span>
                    )}
                    {item.extractedRequirements.requiredSpecs?.ram && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-zinc-900 text-zinc-300 border border-white/5">
                        <CheckCircle2 className="w-3 h-3 text-purple-400" />
                        <span>RAM: {item.extractedRequirements.requiredSpecs.ram}</span>
                      </span>
                    )}
                  </div>
                )}

                {item.topRecommendationTitle && (
                  <p className="text-xs text-zinc-400">
                    <strong className="text-zinc-500">Top Result: </strong>
                    <span className="text-zinc-200">{item.topRecommendationTitle}</span>
                  </p>
                )}
              </div>

              {/* Re-run button */}
              <button
                onClick={() => onSelectQuery(item.query)}
                className="self-start md:self-center px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Re-run Query</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
