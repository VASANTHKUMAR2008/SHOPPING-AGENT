import React from 'react';
import { X, Package, Clock, CheckCircle2, Truck, ArrowRight, ShoppingBag, ExternalLink, RefreshCw } from 'lucide-react';
import { PlacedOrder, Currency, Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PlacedOrder[];
  currency: Currency;
  onReorder: (order: PlacedOrder) => void;
  onViewProduct?: (product: Product) => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
  onReorder,
  onViewProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#0F0F0F] text-[#E0E0E0] rounded-3xl border border-white/10 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>My Orders & Delivery Tracking</span>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-medium">
                  {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </h2>
              <p className="text-[11px] text-zinc-500">Live order status, dispatched tracking & verified student receipts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-zinc-700 mx-auto" />
              <h3 className="text-base font-semibold text-white">No Orders Placed Yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Use the AI Shopping Agent or browse the catalog to find deals and place your first order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-xl transition-colors"
              >
                Browse & Shop
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-900/60 rounded-2xl border border-white/5 p-5 space-y-4 shadow-sm"
                >
                  {/* Order meta bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5 text-xs">
                    <div>
                      <span className="text-zinc-500">Order ID: </span>
                      <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                      <span className="text-zinc-600 mx-2">•</span>
                      <span className="text-zinc-400">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="p-3.5 bg-zinc-950/70 rounded-xl border border-white/5 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-zinc-300 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        Estimated Delivery: <strong className="text-white">{order.estimatedDeliveryDate}</strong>
                      </span>
                      <span className="text-emerald-400">On Schedule</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 pt-1">
                      <div className="h-1.5 rounded-full bg-emerald-500" />
                      <div className="h-1.5 rounded-full bg-emerald-500" />
                      <div className="h-1.5 rounded-full bg-emerald-500/60" />
                      <div className="h-1.5 rounded-full bg-zinc-800" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500">
                      <span className="text-emerald-400 font-medium">Order Placed</span>
                      <span className="text-emerald-400 font-medium">Packed</span>
                      <span className="text-zinc-300 font-medium">In Transit</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ordered Items ({order.items.length})</h4>
                    <div className="divide-y divide-white/5">
                      {order.items.map(({ product, quantity }) => {
                        const itemPrice = order.currency === 'USD' 
                          ? (product.priceUSD || Math.round(product.priceINR / 83))
                          : (product.priceINR || product.price);
                        
                        return (
                          <div key={product.id} className="py-2.5 flex items-center justify-between gap-3">
                            <div className="flex items-center space-x-3 min-w-0">
                              <img
                                src={product.imageUrl}
                                alt={product.title}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-lg object-cover bg-zinc-800 border border-white/5 shrink-0"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                                }}
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.brand}</span>
                                <h5 
                                  onClick={() => onViewProduct?.(product)}
                                  className="text-xs font-semibold text-white truncate hover:text-zinc-300 cursor-pointer"
                                >
                                  {product.title}
                                </h5>
                                <span className="text-[11px] text-zinc-400">Qty: {quantity}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono text-xs font-bold text-white">
                                {formatPrice(itemPrice * quantity, order.currency)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary & Actions Footer */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400">
                      <span>Delivery Address: </span>
                      <strong className="text-zinc-200">{order.shippingDetails.address}, {order.shippingDetails.city} ({order.shippingDetails.pincode})</strong>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-500 block">Total Paid</span>
                        <span className="text-sm font-mono font-bold text-emerald-400">
                          {formatPrice(order.finalTotal, order.currency)}
                        </span>
                      </div>
                      <button
                        onClick={() => onReorder(order)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
