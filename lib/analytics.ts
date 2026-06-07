/**
 * Hurûf Paris — Google Analytics 4 e-commerce events
 * Référence : https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

const GA_ID = 'G-DEXY3DE20Q'

/** Envoie un événement GA4 de manière sécurisée */
function sendEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

/** Formatte un prix en nombre décimal (ex: 47.99) */
const fmt = (price: number) => Math.round(price * 100) / 100

// ─────────────────────────────────────────────
// view_item — quand un client voit une page produit
// ─────────────────────────────────────────────
export function trackViewItem(params: {
  productId: string
  productName: string
  format: string
  price: number
  category?: string
}) {
  sendEvent('view_item', {
    currency: 'EUR',
    value: fmt(params.price),
    items: [
      {
        item_id: params.productId,
        item_name: params.productName,
        item_category: params.category ?? 'Calligraphie arabe',
        item_variant: params.format,
        price: fmt(params.price),
        quantity: 1,
      },
    ],
  })
}

// ─────────────────────────────────────────────
// add_to_cart — quand un client ajoute au panier
// ─────────────────────────────────────────────
export function trackAddToCart(params: {
  productId: string
  productName: string
  format: string
  price: number
  quantity: number
  isLot: boolean
  frameColor?: string
}) {
  sendEvent('add_to_cart', {
    currency: 'EUR',
    value: fmt(params.price * params.quantity),
    items: [
      {
        item_id: params.productId,
        item_name: params.productName,
        item_category: 'Calligraphie arabe',
        item_variant: `${params.format}${params.isLot ? ' — Lot de 3' : ''}${params.frameColor ? ` · ${params.frameColor}` : ''}`,
        price: fmt(params.price),
        quantity: params.quantity,
      },
    ],
  })
}

// ─────────────────────────────────────────────
// begin_checkout — quand le client clique "Payer"
// ─────────────────────────────────────────────
export function trackBeginCheckout(params: {
  items: Array<{
    productId: string
    productName: string
    format: string
    price: number
    quantity: number
    isLot: boolean
  }>
  total: number
}) {
  sendEvent('begin_checkout', {
    currency: 'EUR',
    value: fmt(params.total),
    items: params.items.map((item) => ({
      item_id: item.productId,
      item_name: item.productName,
      item_category: 'Calligraphie arabe',
      item_variant: `${item.format}${item.isLot ? ' — Lot de 3' : ''}`,
      price: fmt(item.price),
      quantity: item.quantity,
    })),
  })
}

// ─────────────────────────────────────────────
// purchase — quand la commande est confirmée
// ─────────────────────────────────────────────
export function trackPurchase(params: {
  transactionId: string
  items: Array<{
    productId: string
    productName: string
    format: string
    price: number
    quantity: number
    isLot: boolean
  }>
  total: number
}) {
  sendEvent('purchase', {
    transaction_id: params.transactionId,
    currency: 'EUR',
    value: fmt(params.total),
    shipping: 0,
    items: params.items.map((item) => ({
      item_id: item.productId,
      item_name: item.productName,
      item_category: 'Calligraphie arabe',
      item_variant: `${item.format}${item.isLot ? ' — Lot de 3' : ''}`,
      price: fmt(item.price),
      quantity: item.quantity,
    })),
  })
}
