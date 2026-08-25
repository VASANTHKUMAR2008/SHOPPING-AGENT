import { Currency } from '../types';

export function formatPrice(amount: number, currency: Currency = 'INR'): string {
  if (currency === 'USD') {
    return `$${Math.round(amount).toLocaleString('en-US')}`;
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function getProductDisplayPrice(
  product: { price: number; priceINR?: number; priceUSD?: number },
  currency: Currency = 'INR'
): number {
  if (currency === 'USD') {
    return product.priceUSD || Math.round((product.priceINR || product.price) / 83);
  }
  return product.priceINR || product.price;
}

export function getProductOriginalPrice(
  product: { originalPrice?: number; originalPriceINR?: number; originalPriceUSD?: number },
  currency: Currency = 'INR'
): number | undefined {
  if (!product.originalPrice && !product.originalPriceINR && !product.originalPriceUSD) return undefined;
  if (currency === 'USD') {
    return product.originalPriceUSD || (product.originalPriceINR ? Math.round(product.originalPriceINR / 83) : product.originalPrice);
  }
  return product.originalPriceINR || product.originalPrice;
}
