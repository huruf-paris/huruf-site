import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { rateLimit } from '@/lib/rateLimit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Validation stricte côté serveur
interface CartItemPayload {
  name: string
  format: string
  isLot: boolean
  quantity: number
  unitPrice: number
  image?: string
}

function validateItems(items: unknown): CartItemPayload[] {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Panier invalide')
  }
  if (items.length > 20) {
    throw new Error('Trop d\'articles dans le panier')
  }

  return items.map((item, index) => {
    if (typeof item !== 'object' || item === null) throw new Error(`Article ${index} invalide`)

    const i = item as Record<string, unknown>

    if (typeof i.name !== 'string' || i.name.trim().length === 0) throw new Error('Nom manquant')
    if (typeof i.format !== 'string') throw new Error('Format manquant')
    if (typeof i.isLot !== 'boolean') throw new Error('isLot invalide')
    if (typeof i.quantity !== 'number' || i.quantity < 1 || i.quantity > 10 || !Number.isInteger(i.quantity)) {
      throw new Error('Quantité invalide')
    }
    if (typeof i.unitPrice !== 'number' || i.unitPrice <= 0 || i.unitPrice > 10000) {
      throw new Error('Prix invalide')
    }

    return {
      name: String(i.name).slice(0, 100),
      format: String(i.format).slice(0, 20),
      isLot: Boolean(i.isLot),
      quantity: Number(i.quantity),
      unitPrice: Number(i.unitPrice),
      image: typeof i.image === 'string' ? i.image : undefined,
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
    const items = validateItems(body.items)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.isLot
            ? `${item.name} — Lot de 3 (${item.format})`
            : `${item.name} — ${item.format}`,
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'fr',
      allow_promotion_codes: true,
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
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    // Ne pas exposer les détails d'erreur en production
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    const isValidationError = message.includes('invalide') || message.includes('manquant') || message.includes('Trop')

    console.error('Checkout error:', err)

    return NextResponse.json(
      { error: isValidationError ? message : 'Erreur lors de la création du paiement' },
      { status: isValidationError ? 400 : 500 }
    )
  }
}
