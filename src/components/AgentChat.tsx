import React from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  ArrowRight,
  TrendingDown,
  Scale,
  DollarSign,
  Layers,
  CheckCircle2,
  Trophy,
  Zap,
  Tag,
  HelpCircle,
  Cpu,
  Radio,
  Square,
  AlertCircle
} from 'lucide-react';
import { AgentChatMessage, Currency, Product } from '../types';
import { QUICK_SHOPPING_PROMPTS, CATEGORIES } from '../data/mockProducts';
import { formatPrice } from '../utils/formatters';

interface AgentChatProps {
  messages: AgentChatMessage[];
  isLoading: boolean;
  currency: Currency;
  onSendMessage: (text: string, budget?: number, category?: string) => void;
  onResetChat: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProductIds: string[];
  targetBudget: number | null;
  onSetBudget: (budget: number | null) => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({
  messages,
  isLoading,
  currency,
  onSendMessage,
  onResetChat,
  onProductClick,
  onAddToCart,
  onBuyNow,
  onToggleCompare,
  comparedProductIds,
  targetBudget,
  onSetBudget
}) => {
  const [inputText, setInputText] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All Products');
  const [expandedReasoning, setExpandedReasoning] = React.useState<Record<string, boolean>>({});
  
  // Voice Recognition states
  const [isListening, setIsListening] = React.useState(false);
  const [interimTranscript, setInterimTranscript] = React.useState('');
  const [voiceError, setVoiceError] = React.useState<string | null>(null);
  const [isVoiceSupported, setIsVoiceSupported] = React.useState(true);
  const [autoSpeak, setAutoSpeak] = React.useState(false);
  const [speakingMessageId, setSpeakingMessageId] = React.useState<string | null>(null);

  const recognitionRef = React.useRef<any>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Check voice support on mount
  React.useEffect(() => {
    const hasSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsVoiceSupported(hasSpeech);
  }, []);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean text for speech synthesis
  const cleanForSpeech = (text: string): string => {
    return text
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Speak a message aloud
  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const clean = cleanForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    // Choose natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak latest agent message if enabled
  React.useEffect(() => {
    if (!autoSpeak || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.sender === 'agent' && lastMsg.id !== speakingMessageId) {
      handleSpeak(lastMsg.content, lastMsg.id);
    }
  }, [messages, autoSpeak]);

  // Start / Stop Speech Recognition
  const startListening = () => {
    setVoiceError(null);
    setInterimTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsVoiceSupported(false);
      setVoiceError('Speech recognition is not supported in this browser. You can type or use quick prompts.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptSegment;
          } else {
            currentInterim += transcriptSegment;
          }
        }

        if (finalTranscript) {
          setInputText(prev => (prev ? `${prev} ${finalTranscript}` : finalTranscript).trim());
        }
        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          // Keep listening or ignore
        } else if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission was denied. Please allow microphone access in browser settings.');
          setIsListening(false);
        } else {
          setVoiceError(`Voice recognition notice: ${event.error}`);
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setVoiceError('Could not initialize microphone. Please check browser permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isListening) {
      stopListening();
    }
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim(), targetBudget || undefined, selectedCategory !== 'All Products' ? selectedCategory : undefined);
    setInputText('');
    setInterimTranscript('');
  };

  const handleVoiceSend = () => {
    stopListening();
    const finalQuery = (inputText + ' ' + interimTranscript).trim();
    if (!finalQuery || isLoading) return;
    onSendMessage(finalQuery, targetBudget || undefined, selectedCategory !== 'All Products' ? selectedCategory : undefined);
    setInputText('');
    setInterimTranscript('');
  };

  const toggleReasoning = (messageId: string) => {
    setExpandedReasoning(prev => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F0F] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-[#0F0F0F] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>Shopping Intelligence Agent</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </h2>
            <p className="text-[11px] text-zinc-500">Live Voice Recognition • Multi-Model Reasoning • Real-Time Catalog Match</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* TTS Auto-speak toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              autoSpeak 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Auto-read assistant answers with Voice"
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoSpeak ? 'Voice: On' : 'Voice: Off'}</span>
          </button>

          <button
            id="btn-reset-chat"
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setSpeakingMessageId(null);
              onResetChat();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
            title="Start new shopping session"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Session</span>
          </button>
        </div>
      </div>

      {/* Message history stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender bubble */}
            <div className={`flex items-start gap-2.5 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                msg.sender === 'user' 
                  ? 'bg-zinc-800 text-white border border-white/10' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5 text-zinc-300" /> : <Bot className="w-3.5 h-3.5 text-emerald-400" />}
              </div>

              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex-1 min-w-0`}>
                {/* Bubble Container */}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-zinc-800 text-white rounded-tr-xs border border-white/10'
                    : 'bg-zinc-900/90 text-[#E0E0E0] border border-white/5 rounded-tl-xs shadow-xs'
                }`}>
                  {/* Extracted Requirements Pills on Agent Message */}
                  {msg.extractedRequirements && (
                    <div className="mb-3 pb-2.5 border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Identified Needs:</span>
                      {msg.extractedRequirements.category && (
                        <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-white/10 text-[11px] font-medium">
                          {msg.extractedRequirements.category}
                        </span>
                      )}
                      {msg.extractedRequirements.budget && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold">
                          Budget: {formatPrice(msg.extractedRequirements.budget, currency)}
                        </span>
                      )}
                      {msg.extractedRequirements.intendedUse && (
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-medium flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          <span>{msg.extractedRequirements.intendedUse}</span>
                        </span>
                      )}
                      {msg.extractedRequirements.requiredSpecs?.ram && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-medium">
                          RAM: {msg.extractedRequirements.requiredSpecs.ram}
                        </span>
                      )}
                      {msg.extractedRequirements.requiredSpecs?.gps && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                          GPS: {msg.extractedRequirements.requiredSpecs.gps}
                        </span>
                      )}
                      {msg.extractedRequirements.requiredSpecs?.battery && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-medium">
                          Battery: {msg.extractedRequirements.requiredSpecs.battery}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Read Aloud TTS button for Agent responses */}
                  {msg.sender === 'agent' && (
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleSpeak(msg.content, msg.id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                          speakingMessageId === msg.id 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                        title={speakingMessageId === msg.id ? "Stop voice audio" : "Read response out loud"}
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <Square className="w-3 h-3 text-emerald-400 fill-emerald-400 animate-pulse" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-zinc-400" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Recommendation Category Badges Summary */}
                  {msg.recommendationSummary && (
                    <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {msg.recommendationSummary.bestOverall && (
                        <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-emerald-500/30 space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold text-emerald-400">
                            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Best Overall</span>
                          </div>
                          <span className="font-semibold text-white block truncate">{msg.recommendationSummary.bestOverall.title}</span>
                          <p className="text-[11px] text-zinc-400 leading-tight">{msg.recommendationSummary.bestOverall.reason}</p>
                        </div>
                      )}

                      {msg.recommendationSummary.bestPerformance && (
                        <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-purple-500/30 space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold text-purple-400">
                            <Zap className="w-3.5 h-3.5 text-purple-400" />
                            <span>Best Performance</span>
                          </div>
                          <span className="font-semibold text-white block truncate">{msg.recommendationSummary.bestPerformance.title}</span>
                          <p className="text-[11px] text-zinc-400 leading-tight">{msg.recommendationSummary.bestPerformance.reason}</p>
                        </div>
                      )}

                      {msg.recommendationSummary.bestBudget && (
                        <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-amber-500/30 space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold text-amber-400">
                            <Tag className="w-3.5 h-3.5 text-amber-400" />
                            <span>Best Budget</span>
                          </div>
                          <span className="font-semibold text-white block truncate">{msg.recommendationSummary.bestBudget.title}</span>
                          <p className="text-[11px] text-zinc-400 leading-tight">{msg.recommendationSummary.bestBudget.reason}</p>
                        </div>
                      )}

                      {msg.recommendationSummary.bestValue && (
                        <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-blue-500/30 space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold text-blue-400">
                            <TrendingDown className="w-3.5 h-3.5 text-blue-400" />
                            <span>Best Value</span>
                          </div>
                          <span className="font-semibold text-white block truncate">{msg.recommendationSummary.bestValue.title}</span>
                          <p className="text-[11px] text-zinc-400 leading-tight">{msg.recommendationSummary.bestValue.reason}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Agent reasoning accordion */}
                  {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <button
                        onClick={() => toggleReasoning(msg.id)}
                        className="text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Agent Reasoning ({msg.reasoningSteps.length} evaluation criteria)</span>
                        {expandedReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {expandedReasoning[msg.id] && (
                        <div className="mt-2 space-y-1.5 pl-2.5 border-l-2 border-emerald-500 bg-black/40 p-2.5 rounded-r-lg">
                          {msg.reasoningSteps.map((step, idx) => (
                            <div key={idx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Budget Analysis Card */}
                  {msg.budgetAnalysis && (
                    <div className="mt-3 p-3 bg-zinc-950/80 rounded-xl border border-emerald-500/20 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white mb-1">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                          Budget Assessment
                        </span>
                        <span className="text-emerald-400 font-mono">
                          {formatPrice(msg.budgetAnalysis.total, currency)} / {formatPrice(msg.budgetAnalysis.targetBudget, currency)}
                        </span>
                      </div>
                      <p className="text-zinc-300 mb-2">{msg.budgetAnalysis.verdict}</p>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                        <span>Remaining: <strong className="text-emerald-400 font-mono">{formatPrice(msg.budgetAnalysis.remaining, currency)}</strong></span>
                        <span>•</span>
                        <span>Discounts Found: <strong className="text-emerald-400 font-mono">{formatPrice(msg.budgetAnalysis.savings, currency)}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Embedded recommended products */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                    {msg.products.map((prod) => {
                      const displayPrice = currency === 'USD' ? (prod.priceUSD || Math.round(prod.priceINR / 83)) : (prod.priceINR || prod.price);
                      const origPrice = currency === 'USD' 
                        ? (prod.originalPriceUSD || (prod.originalPriceINR ? Math.round(prod.originalPriceINR / 83) : undefined))
                        : (prod.originalPriceINR || prod.originalPrice);

                      return (
                        <div 
                          key={prod.id}
                          className="bg-zinc-900/70 rounded-xl border border-white/5 hover:border-white/20 transition-all p-3 flex flex-col justify-between shadow-2xs group"
                        >
                          <div>
                            <div className="flex items-start space-x-3">
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 rounded-lg object-cover bg-zinc-800 shrink-0 cursor-pointer border border-white/5"
                                onClick={() => onProductClick(prod)}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">{prod.brand}</span>
                                  {prod.matchScore && (
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                                      {prod.matchScore}% Match
                                    </span>
                                  )}
                                </div>
                                <h4 
                                  onClick={() => onProductClick(prod)}
                                  className="text-xs font-semibold text-white line-clamp-1 hover:text-zinc-300 cursor-pointer mt-0.5"
                                >
                                  {prod.title}
                                </h4>
                                <div className="flex items-baseline space-x-1.5 mt-1">
                                  <span className="text-xs font-mono font-bold text-white">
                                    {formatPrice(displayPrice, currency)}
                                  </span>
                                  {origPrice && origPrice > displayPrice && (
                                    <span className="text-[10px] text-zinc-500 line-through">
                                      {formatPrice(origPrice, currency)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Why this is recommended */}
                            {prod.recommendationReason && (
                              <p className="mt-2 text-[11px] text-zinc-300 leading-snug bg-zinc-950/60 p-2 rounded-lg border border-white/5">
                                <strong className="text-emerald-400 font-semibold">Why Recommended: </strong>
                                <span>{prod.recommendationReason}</span>
                              </p>
                            )}
                          </div>

                          {/* Card bottom actions */}
                          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                            <button
                              onClick={() => onProductClick(prod)}
                              className="text-zinc-400 hover:text-white text-[11px] font-medium transition-colors"
                            >
                              View Specs →
                            </button>
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => onToggleCompare(prod)}
                                className={`p-1 rounded-md border text-[11px] transition-colors ${
                                  comparedProductIds.includes(prod.id)
                                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                                    : 'border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'
                                }`}
                                title="Add to comparison"
                              >
                                <Scale className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => onAddToCart(prod)}
                                className="px-2 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-semibold border border-white/10 transition-colors"
                              >
                                + Cart
                              </button>
                              <button
                                onClick={() => {
                                  if (onBuyNow) {
                                    onBuyNow(prod);
                                  } else {
                                    onAddToCart(prod);
                                  }
                                }}
                                className="px-2 py-1 rounded-md bg-white hover:bg-zinc-200 text-black text-[11px] font-bold transition-colors shadow-xs"
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Suggested Follow-up Actions / Missing Info Prompts */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 max-w-3xl">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => onSendMessage(action, targetBudget || undefined)}
                        className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading / Agent Thinking State */}
        {isLoading && (
          <div className="flex items-start gap-2.5 max-w-xl">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            </div>
            <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-xs p-4 shadow-xs space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Analyzing specs, matching collection & generating verdict...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-zinc-800 rounded-full w-48 animate-pulse" />
                <div className="h-2 bg-zinc-800 rounded-full w-64 animate-pulse" />
                <div className="h-2 bg-zinc-800 rounded-full w-36 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts if conversation is fresh */}
      {messages.length <= 1 && (
        <div className="px-4 py-2.5 bg-zinc-950/60 border-t border-white/5 overflow-x-auto">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Quick Benchmarks:
            </span>
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => onSendMessage("Show me smartwatches with calling and AMOLED display under ₹5,000", 5000, "Smartwatches")}
                className="whitespace-nowrap text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full transition-colors shrink-0 flex items-center gap-1 font-medium"
              >
                <span>⌚ Smartwatches under ₹5,000</span>
              </button>
              <button
                onClick={() => onSendMessage("What is the best running sports watch with GPS and long battery: Garmin vs Apple Watch?", undefined, "Smartwatches")}
                className="whitespace-nowrap text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1 rounded-full transition-colors shrink-0"
              >
                <span>🏃 Garmin vs Apple Watch</span>
              </button>
              {QUICK_SHOPPING_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(prompt, targetBudget || undefined)}
                  className="whitespace-nowrap text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1 rounded-full transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Voice Visualizer Overlay Banner */}
      {isListening && (
        <div className="mx-4 mb-2 p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-emerald-950/60 border border-emerald-500/40 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Pulsing Audio Waveform Indicator */}
            <div className="flex items-center space-x-1 shrink-0 px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0s]" />
              <span className="w-1 h-6 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Listening Live...</span>
                <span className="text-[10px] text-zinc-400">Speak your question clearly</span>
              </div>
              <p className="text-xs text-white font-medium truncate mt-0.5">
                {interimTranscript || inputText || "e.g. 'Show me the best smartwatch for sports under ₹20,000'..."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={handleVoiceSend}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
            <button
              onClick={stopListening}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
              title="Stop listening"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Voice Error notice if microphone was denied */}
      {voiceError && (
        <div className="mx-4 mb-2 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{voiceError}</span>
          </div>
          <button 
            onClick={() => setVoiceError(null)} 
            className="text-[10px] text-rose-400 hover:underline shrink-0 ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Input form */}
      <div className="p-3 sm:p-4 bg-[#0F0F0F] border-t border-white/5">
        {/* Category & Budget Sub-controls */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 focus:outline-hidden focus:border-white/30"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-zinc-500 hidden sm:inline">Budget Ceiling:</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-xs text-zinc-500">
                {currency === 'INR' ? '₹' : '$'}
              </span>
              <input
                type="number"
                placeholder={currency === 'INR' ? '60000' : '750'}
                value={targetBudget || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onSetBudget(!isNaN(val) && val > 0 ? val : null);
                }}
                className="w-24 pl-5 pr-2 py-0.5 text-xs bg-zinc-900 border border-white/10 rounded-lg text-white font-mono focus:outline-hidden focus:border-white/30"
              />
            </div>
          </div>
        </div>

        {/* Text & Voice Input Row */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id="agent-chat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? "Listening... (speech appearing here)" : "Ask by voice or text: e.g. 'Show me watches under ₹10,000 with AMOLED and calling'..."}
              disabled={isLoading}
              className={`w-full bg-zinc-900 border ${
                isListening ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-white/10 focus:border-white/30'
              } rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-hidden transition-all pr-12`}
            />

            {/* Voice input button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                isListening 
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.8)] scale-110' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              title={isListening ? "Stop Voice Recording" : "Start Voice Recognition"}
            >
              {isListening ? <Mic className="w-4 h-4 text-black animate-pulse" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            id="agent-send-button"
            type="submit"
            disabled={(!inputText.trim() && !interimTranscript) || isLoading}
            className="bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black p-2.5 rounded-xl font-bold transition-all shadow-xs shrink-0 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
