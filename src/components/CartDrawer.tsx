import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  DollarSign,
  CreditCard,
  Truck,
  MapPin,
  PackageCheck,
  ArrowLeft,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency, PlacedOrder, ShippingDetails } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  targetBudget: number | null;
  onPlaceOrder?: (order: PlacedOrder) => void;
  onOpenOrders?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  currency,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  targetBudget,
  onPlaceOrder,
  onOpenOrders
}) => {
  const [checkoutStep, setCheckoutStep] = React.useState<'cart' | 'shipping' | 'payment' | 'complete'>('cart');
  const [couponCode, setCouponCode] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; percent: number; discount: number } | null>(null);
  const [couponError, setCouponError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = React.useState<PlacedOrder | null>(null);

  // Shipping details form
  const [shippingForm, setShippingForm] = React.useState<ShippingDetails>({
    fullName: 'Aditya Sharma',
    phone: '+91 98765 43210',
    email: 'aditya.student@bits.ac.in',
    address: 'Room 304, Hostel 4, University Campus',
    city: 'Bangalore',
    pincode: '560064',
    paymentMethod: 'upi'
  });

  const getItemPrice = (item: CartItem) => {
    if (currency === 'USD') {
      return item.product.priceUSD || Math.round((item.product.priceINR || item.product.price) / 83);
    }
    return item.product.priceINR || item.product.price;
  };

  const subtotal = items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  const discountAmount = appliedCoupon ? Number(((subtotal * appliedCoupon.percent) / 100).toFixed(2)) : 0;
  const tax = Number(((subtotal - discountAmount) * 0.05).toFixed(2));
  const finalTotal = Math.max(0, subtotal - discountAmount + tax);

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;
    setCouponError('');

    try {
      const res = await fetch('/api/apply-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: subtotal })
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({
          code: data.code,
          percent: data.discountPercent,
          discount: data.discountAmount
        });
        setCouponCode('');
      } else {
        setCouponError(data.message || 'Invalid coupon code');
      }
    } catch {
      if (code === 'STUDENT15' || code === 'AGENT15') {
        setAppliedCoupon({ code: code, percent: 15, discount: Number((subtotal * 0.15).toFixed(2)) });
        setCouponCode('');
      } else if (code === 'TECH20') {
        setAppliedCoupon({ code: code, percent: 20, discount: Number((subtotal * 0.20).toFixed(2)) });
        setCouponCode('');
      } else {
        setCouponError('Invalid coupon. Try STUDENT15 or TECH20');
      }
    }
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const newOrder: PlacedOrder = {
        id: 'order-' + Date.now(),
        orderNumber,
        date: new Date().toISOString(),
        items: [...items],
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        tax,
        finalTotal,
        currency,
        shippingDetails: { ...shippingForm },
        status: 'Confirmed',
        estimatedDeliveryDate: deliveryDate
      };

      setLastPlacedOrder(newOrder);
      if (onPlaceOrder) {
        onPlaceOrder(newOrder);
      }

      setIsProcessing(false);
      setCheckoutStep('complete');
      onClearCart();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleResetAfterOrder = () => {
    setCheckoutStep('cart');
    setLastPlacedOrder(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end">
      <div 
        id="cart-drawer"
        className="w-full max-w-lg bg-[#0F0F0F] text-[#E0E0E0] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 border-l border-white/10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center space-x-2">
            {checkoutStep !== 'cart' && checkoutStep !== 'complete' && (
              <button
                onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'shipping' : 'cart')}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 mr-1"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              {checkoutStep === 'cart' && 'Shopping Cart'}
              {checkoutStep === 'shipping' && 'Delivery & Contact Information'}
              {checkoutStep === 'payment' && 'Payment & Review'}
              {checkoutStep === 'complete' && 'Order Confirmation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Breadcrumb */}
        {checkoutStep !== 'complete' && items.length > 0 && (
          <div className="px-6 py-2.5 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${checkoutStep === 'cart' ? 'text-emerald-400' : 'text-zinc-500'}`}>
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">1</span>
              <span>Cart ({items.length})</span>
            </div>
            <span className="text-zinc-700">→</span>
            <div className={`flex items-center gap-1.5 ${checkoutStep === 'shipping' ? 'text-emerald-400' : 'text-zinc-500'}`}>
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">2</span>
              <span>Shipping</span>
            </div>
            <span className="text-zinc-700">→</span>
            <div className={`flex items-center gap-1.5 ${checkoutStep === 'payment' ? 'text-emerald-400' : 'text-zinc-500'}`}>
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Body based on Step */}
        {checkoutStep === 'complete' && lastPlacedOrder ? (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Confirmed & Placed!</h3>
            <p className="text-xs text-zinc-400 max-w-xs">
              Your order is locked in with verified student discounts. Estimated delivery on <strong className="text-white">{lastPlacedOrder.estimatedDeliveryDate}</strong>.
            </p>

            <div className="p-4 bg-zinc-900/90 rounded-2xl border border-white/10 w-full text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Reference:</span>
                <span className="font-mono font-bold text-white">{lastPlacedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-zinc-200 text-right truncate max-w-[200px]">{lastPlacedOrder.shippingDetails.address}, {lastPlacedOrder.shippingDetails.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Method:</span>
                <span className="text-emerald-400 uppercase font-semibold">{lastPlacedOrder.shippingDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/5">
                <span className="text-zinc-400">Total Paid:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{formatPrice(lastPlacedOrder.finalTotal, currency)}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenOrders) onOpenOrders();
                }}
                className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors border border-white/10 flex items-center justify-center gap-1.5"
              >
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Track Order</span>
              </button>
              <button
                onClick={handleResetAfterOrder}
                className="py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : items.length === 0 && checkoutStep === 'cart' ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-zinc-700" />
            <h3 className="text-base font-semibold text-white">Your cart is empty</h3>
            <p className="text-xs text-zinc-500 max-w-xs">
              Ask your Shopping Agent for recommendations or add items from the catalog.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* STEP 1: CART ITEMS & COUPONS */}
            {checkoutStep === 'cart' && (
              <>
                {/* Target Budget Progress Bar */}
                {targetBudget && (
                  <div className="p-3.5 bg-zinc-900/80 rounded-2xl border border-white/5 text-xs space-y-2">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-zinc-300 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        Target Budget Tracker
                      </span>
                      <span className={`font-mono ${subtotal > targetBudget ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {formatPrice(subtotal, currency)} / {formatPrice(targetBudget, currency)}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          subtotal > targetBudget ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, (subtotal / targetBudget) * 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      {subtotal <= targetBudget 
                        ? `🎉 You are ${formatPrice(targetBudget - subtotal, currency)} under your target budget!` 
                        : `⚠️ Cart exceeds target budget by ${formatPrice(subtotal - targetBudget, currency)}.`}
                    </p>
                  </div>
                )}

                {/* Items List */}
                <div className="divide-y divide-white/5">
                  {items.map(({ product, quantity }) => {
                    const itemPrice = getItemPrice({ product, quantity });
                    return (
                      <div key={product.id} className="py-3 flex items-center space-x-3">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover bg-zinc-900 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-zinc-500 uppercase">{product.brand}</span>
                          <h4 className="text-xs font-semibold text-white line-clamp-1">{product.title}</h4>
                          <div className="text-xs font-mono font-bold text-white mt-0.5">{formatPrice(itemPrice, currency)}</div>

                          {/* Quantity controls */}
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center border border-white/10 rounded-lg bg-zinc-900">
                              <button
                                onClick={() => onUpdateQuantity(product.id, -1)}
                                className="p-1 text-zinc-400 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono font-semibold text-white">{quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(product.id, 1)}
                                className="p-1 text-zinc-400 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(product.id)}
                              className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code Section */}
                <div className="p-3.5 bg-zinc-900/80 rounded-2xl border border-emerald-500/20 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Educational Coupons & Deals
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleApplyCoupon('STUDENT15')}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 text-emerald-400 border border-emerald-500/30 font-mono text-[11px] font-semibold hover:bg-zinc-800 transition-colors"
                    >
                      STUDENT15 (15% off)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('TECH20')}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 text-emerald-400 border border-emerald-500/30 font-mono text-[11px] font-semibold hover:bg-zinc-800 transition-colors"
                    >
                      TECH20 (20% off)
                    </button>
                  </div>

                  <div className="flex gap-1.5 mt-1">
                    <input
                      type="text"
                      placeholder="Enter coupon code..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder:text-zinc-600 focus:outline-hidden focus:border-white/30"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-3 py-1 bg-white hover:bg-zinc-200 text-black rounded-lg font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      Applied: {appliedCoupon.code} (-{appliedCoupon.percent}%)
                    </p>
                  )}
                </div>
              </>
            )}

            {/* STEP 2: SHIPPING DETAILS */}
            {checkoutStep === 'shipping' && (
              <div className="space-y-4">
                <div className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 space-y-3 text-xs">
                  <h3 className="font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Shipping Address</span>
                  </h3>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Email</label>
                      <input
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Hostel / Street Address</label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">City</label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Pincode / Zip</label>
                      <input
                        type="text"
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-hidden focus:border-white/30 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <div className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 space-y-3 text-xs">
                  <h3 className="font-semibold text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Select Payment Option</span>
                  </h3>

                  <div className="space-y-2">
                    <label 
                      onClick={() => setShippingForm({ ...shippingForm, paymentMethod: 'upi' })}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        shippingForm.paymentMethod === 'upi' ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950 border-white/5 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        <div>
                          <strong className="text-white block">UPI / Google Pay / PhonePe</strong>
                          <span className="text-[11px] text-zinc-400">Instant verification & zero fee</span>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={shippingForm.paymentMethod === 'upi'} 
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'upi' })} 
                      />
                    </label>

                    <label 
                      onClick={() => setShippingForm({ ...shippingForm, paymentMethod: 'card' })}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        shippingForm.paymentMethod === 'card' ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950 border-white/5 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-blue-400" />
                        <div>
                          <strong className="text-white block">Credit / Debit Card</strong>
                          <span className="text-[11px] text-zinc-400">Visa, Mastercard, RuPay</span>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={shippingForm.paymentMethod === 'card'} 
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'card' })} 
                      />
                    </label>

                    <label 
                      onClick={() => setShippingForm({ ...shippingForm, paymentMethod: 'cod' })}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        shippingForm.paymentMethod === 'cod' ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950 border-white/5 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <div>
                          <strong className="text-white block">Cash on Delivery (COD)</strong>
                          <span className="text-[11px] text-zinc-400">Pay when order arrives</span>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={shippingForm.paymentMethod === 'cod'} 
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'cod' })} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono font-semibold text-white">{formatPrice(subtotal, currency)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Tax (5%)</span>
                <span className="font-mono font-semibold text-white">{formatPrice(tax, currency)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Student Express Delivery</span>
                <span className="text-emerald-400 font-semibold">FREE (Secured)</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between text-sm font-bold text-white">
                <span>Total Amount</span>
                <span className="text-base font-mono text-emerald-400">{formatPrice(finalTotal, currency)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout Action */}
        {checkoutStep !== 'complete' && items.length > 0 && (
          <div className="p-4 border-t border-white/5 bg-[#0F0F0F]">
            {checkoutStep === 'cart' && (
              <button
                id="btn-proceed-shipping"
                onClick={() => setCheckoutStep('shipping')}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-xs"
              >
                <span>Proceed to Shipping ({formatPrice(finalTotal, currency)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {checkoutStep === 'shipping' && (
              <button
                id="btn-proceed-payment"
                onClick={() => setCheckoutStep('payment')}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-xs"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {checkoutStep === 'payment' && (
              <button
                id="btn-confirm-order"
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-xs disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {isProcessing ? (
                  <span>Securing Order & Dispatches...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Pay {formatPrice(finalTotal, currency)}</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[11px] text-center text-zinc-500 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              30-day money back guarantee & student verification protection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
