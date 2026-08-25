import React from 'react';
import { 
  X, 
  Sliders, 
  Settings, 
  Save, 
  RotateCcw, 
  Sparkles, 
  User, 
  DollarSign, 
  Check, 
  Layers 
} from 'lucide-react';
import { Currency, ScoringWeights, UserPreferences } from '../types';
import { STUDENT_ROLES } from '../data/mockProducts';

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

const AVAILABLE_BRANDS = [
  'ASUS', 'Lenovo', 'Dell', 'HP', 'Acer', 'Apple', 
  'Samsung', 'OnePlus', 'Sony', 'Xiaomi', 'Bose'
];

export const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences
}) => {
  const [formState, setFormState] = React.useState<UserPreferences>(preferences);

  React.useEffect(() => {
    setFormState(preferences);
  }, [preferences, isOpen]);

  if (!isOpen) return null;

  const handleWeightChange = (key: keyof ScoringWeights, value: number) => {
    setFormState(prev => ({
      ...prev,
      scoringWeights: {
        ...prev.scoringWeights,
        [key]: value
      }
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setFormState(prev => {
      const exists = prev.preferredBrands.includes(brand);
      return {
        ...prev,
        preferredBrands: exists 
          ? prev.preferredBrands.filter(b => b !== brand)
          : [...prev.preferredBrands, brand]
      };
    });
  };

  const handleResetDefaults = () => {
    setFormState({
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
    });
  };

  const handleSave = () => {
    onSavePreferences(formState);
    onClose();
  };

  const totalWeights = 
    formState.scoringWeights.requirementsWeight +
    formState.scoringWeights.priceValueWeight +
    formState.scoringWeights.specificationsWeight +
    formState.scoringWeights.ratingReliabilityWeight;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        id="preferences-modal"
        className="bg-[#0F0F0F] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-[#E0E0E0]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/5 text-emerald-400 border border-white/10 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">User Preferences & Scoring Weights</h2>
              <p className="text-xs text-zinc-500">Configure how the AI agent calculates recommendations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* User Persona / Student Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Engineering Role / Profile</span>
            </label>
            <select
              value={formState.userRole}
              onChange={(e) => setFormState({ ...formState, userRole: e.target.value })}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-white/30"
            >
              {STUDENT_ROLES.map(role => (
                <option key={role} value={role} className="bg-zinc-900 text-white">{role}</option>
              ))}
            </select>
            <p className="text-[11px] text-zinc-500">
              The agent uses your persona to prioritize relevant hardware (e.g. multi-core CPU & dedicated RAM for ECE/VLSI).
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Default Display Currency</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormState({ ...formState, currency: 'INR' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  formState.currency === 'INR'
                    ? 'bg-white text-black border-white shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>₹ Indian Rupee (INR)</span>
                {formState.currency === 'INR' && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setFormState({ ...formState, currency: 'USD' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  formState.currency === 'USD'
                    ? 'bg-white text-black border-white shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>$ US Dollar (USD)</span>
                {formState.currency === 'USD' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* AI Scoring Weights Sliders */}
          <div className="space-y-4 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recommendation Scoring Weights ($S = \sum w_i S_i$)</span>
                </label>
                <p className="text-[11px] text-zinc-500">Fine-tune how heavily each criterion affects product ranking</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Sum: {totalWeights}%
              </span>
            </div>

            {/* Slider 1: Requirements */}
            <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">1. Stated User Requirements Match</span>
                <span className="font-mono text-emerald-400 font-bold">{formState.scoringWeights.requirementsWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={formState.scoringWeights.requirementsWeight}
                onChange={(e) => handleWeightChange('requirementsWeight', parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-[10px] text-zinc-500">Exact match for RAM, intended use, and budget threshold.</p>
            </div>

            {/* Slider 2: Price / Value */}
            <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">2. Price-to-Value & Educational Discount</span>
                <span className="font-mono text-blue-400 font-bold">{formState.scoringWeights.priceValueWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={formState.scoringWeights.priceValueWeight}
                onChange={(e) => handleWeightChange('priceValueWeight', parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <p className="text-[10px] text-zinc-500">Discount depth, student pricing, and deal score.</p>
            </div>

            {/* Slider 3: Specifications */}
            <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">3. Raw Hardware Specifications</span>
                <span className="font-mono text-amber-400 font-bold">{formState.scoringWeights.specificationsWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={formState.scoringWeights.specificationsWeight}
                onChange={(e) => handleWeightChange('specificationsWeight', parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[10px] text-zinc-500">CPU core count, dedicated GPU horsepower, memory bandwidth.</p>
            </div>

            {/* Slider 4: Rating / Reliability */}
            <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">4. Customer Rating & Build Reliability</span>
                <span className="font-mono text-purple-400 font-bold">{formState.scoringWeights.ratingReliabilityWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={formState.scoringWeights.ratingReliabilityWeight}
                onChange={(e) => handleWeightChange('ratingReliabilityWeight', parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <p className="text-[10px] text-zinc-500">Verified reviews, thermal stability, brand warranty network.</p>
            </div>
          </div>

          {/* Preferred Brands */}
          <div className="space-y-2 pt-3 border-t border-white/5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              <span>Preferred Brands</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BRANDS.map(brand => {
                const isSelected = formState.preferredBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleBrandToggle(brand)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-zinc-200 text-black transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
