import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { rateLimit } from '@/lib/rateLimit'
import { products, FORMATS, type Format } from '@/data/products'
import { aovDiscountActive, aovPercent } from '@/lib/aov'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const VALID_FORMATS = Object.keys(FORMATS) as Format[]

/**
 * Coupon Stripe réutilisable pour la remise multi-tableaux.
 * On le récupère s'il existe déjà, sinon on le crée une seule fois.
 */
async function getAovCoupon(): Promise<string> {
  const id = `AOV${aovPercent()}`
  try {
    await stripe.coupons.retrieve(id)
  } catch {
    await stripe.coupons.create({
      id,
      percent_off: aovPercent(),
      duration: 'once',
      name: `Remise multi-tableaux -${aovPercent()}%`,
    })
  }
  return id
}

/**
 * Article résolu côté serveur. Le prix N'EST JAMAIS lu depuis le client :
 * on identifie le produit par son `id` + `format` + `isLot`, puis on
 * recalcule le prix depuis le catalogue (data/products.ts). Cela empêche
 * toute manipulation du montant payé depuis le navigateur.
 */
interface ResolvedItem {
  name: string
  format: Format
  isLot: boolean
  quantity: number
  unitPrice: number
  image?: string
  frameColor?: string
}

function resolveItems(raw: unknown): ResolvedItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error('Panier invalide')
  }
  if (raw.length > 20) {
    throw new Error('Trop d\'articles dans le panier')
  }

  return raw.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null) throw new Error(`Article ${index} invalide`)
    const i = entry as Record<string, unknown>

    // ── Produit (identifié par id, jamais par le prix client) ──
    if (typeof i.id !== 'string') throw new Error('Produit manquant')
    const product = products.find((p) => p.id === i.id)
    if (!product) throw new Error('Produit introuvable')

    // ── Format ──
    if (typeof i.format !== 'string' || !VALID_FORMATS.includes(i.format as Format)) {
      throw new Error('Format invalide')
    }
    const format = i.format as Format

    // ── Lot ──
    const isLot = Boolean(i.isLot)

    // ── Quantité ──
    if (typeof i.quantity !== 'number' || i.quantity < 1 || i.quantity > 10 || !Number.isInteger(i.quantity)) {
      throw new Error('Quantité invalide')
    }

    // ── PRIX : recalculé côté serveur depuis le catalogue ──
    const unitPrice = isLot ? product.prices[format].lot3 : product.prices[format].single
    if (typeof unitPrice !== 'number' || unitPrice <= 0) {
      throw new Error('Prix indisponible')
    }

    return {
      name: product.nameFr,
      format,
      isLot,
      quantity: i.quantity,
      unitPrice,
      image: product.images[0],
      frameColor: typeof i.frameColor === 'string' ? i.frameColor.slice(0, 30) : undefined,
    }
  })
}

export async function POST(req: NextRequest) {
  // ── Rate limiting : 5 tentatives de paiement / minute par IP ──
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const limit = rateLimit(ip, { limit: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Veuillez patienter une minute.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      }
    )
  }

  // ── Vérification clé Stripe ──
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY manquante')
    return NextResponse.json({ error: 'Configuration paiement manquante' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const items = resolveItems(body.items)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.isLot
            ? `${item.name} — Lot de 3 (${FORMATS[item.format]})${item.frameColor ? ` · Cadre ${item.frameColor}` : ''}`
            : `${item.name} — ${FORMATS[item.format]}${item.frameColor ? ` · Cadre ${item.frameColor}` : ''}`,
          images: item.image ? [`${siteUrl}${item.image}`] : [],
          metadata: {
            format: item.format,
            isLot: String(item.isLot),
          },
        },
        unit_amount: Math.round(item.unitPrice * 100),
      },
      quantity: item.quantity,
    }))

    // ── Remise automatique multi-tableaux (nb d'articles calculé serveur) ──
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0)

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'fr',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Livraison offerte',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      success_url: `${siteUrl}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/boutique`,
      metadata: {
        source: 'huruf-site',
        ip: ip.slice(0, 45), // anonymisé
      },
    }

    // Remise auto si éligible ; sinon champ code promo. Si le coupon échoue,
    // on NE casse PAS le paiement (repli sans remise).
    let discountApplied = false
    if (aovDiscountActive(totalQty)) {
      try {
        sessionParams.discounts = [{ coupon: await getAovCoupon() }]
        discountApplied = true
      } catch (couponErr) {
        console.error('Remise AOV non appliquée:', couponErr)
      }
    }
    if (!discountApplied) {
      sessionParams.allow_promotion_codes = true
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    // Ne pas exposer les détails d'erreur en production
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    const isValidationError =
      message.includes('invalide') ||
      message.includes('manquant') ||
      message.includes('introuvable') ||
      message.includes('indisponible') ||
      message.includes('Trop')

    console.error('Checkout error:', err)

    return NextResponse.json(
      { error: isValidationError ? message : 'Erreur lors de la création du paiement' },
      { status: isValidationError ? 400 : 500 }
    )
  }
}
