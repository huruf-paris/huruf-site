/**
 * Promotion automatique — expire le 2026-06-17 à minuit
 * Modifier PROMO_END ou PROMO_DISCOUNT pour ajuster
 */

export const PROMO_DISCOUNT = 0.10 // 10%
export const PROMO_END = new Date('2026-06-17T23:59:59')
export const PROMO_CODE = 'HURUF10'

export function isPromoActive(): boolean {
  return new Date() < PROMO_END
}

export function promoPrice(originalPrice: number): number {
  if (!isPromoActive()) return originalPrice
  return Math.round(originalPrice * (1 - PROMO_DISCOUNT) * 100) / 100
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',')
}
