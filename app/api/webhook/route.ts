import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Désactiver le body parsing automatique de Next.js (Stripe a besoin du raw body)
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature invalide:', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  // On écoute uniquement les paiements réussis
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || 'Client'
    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '—'
    const orderRef = session.id.slice(-12).toUpperCase()

    // Adresse de livraison
    const shipping = session.shipping_details
    const adresseLivraison = shipping
      ? [
          shipping.address?.line1,
          shipping.address?.line2,
          `${shipping.address?.postal_code} ${shipping.address?.city}`,
          shipping.address?.country,
        ]
          .filter(Boolean)
          .join(', ')
      : 'Non renseignée'

    // Récupérer les articles commandés
    let articlesHtml = ''
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 })
      articlesHtml = lineItems.data
        .map(
          (item) => `
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0e8d0; font-size: 15px; color: #1a1a1a;">${item.description}</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0e8d0; font-size: 15px; color: #1a1a1a; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #f0e8d0; font-size: 15px; color: #1a1a1a; text-align: right;">${item.amount_total ? (item.amount_total / 100).toFixed(2) : '—'} €</td>
          </tr>`
        )
        .join('')
    } catch {
      articlesHtml = `<tr><td colspan="3" style="padding: 12px 16px; color: #999;">Détail non disponible</td></tr>`
    }

    // ── Email au CLIENT ──
    if (customerEmail) {
      await resend.emails.send({
        from: 'Hurûf Paris <contact@huruf-paris.fr>',
        to: [customerEmail],
        subject: `Votre commande Hurûf Paris est confirmée — Réf. ${orderRef}`,
        html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin: 0; padding: 0; background: #f7f4ee; font-family: Georgia, 'Times New Roman', serif;">
            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

              <!-- Header -->
              <div style="background: #0d0d0d; padding: 40px 32px; text-align: center;">
                <h1 style="color: #c9a84c; font-size: 32px; margin: 0; letter-spacing: 0.15em; font-weight: normal;">Hurûf</h1>
                <p style="color: #c9a84c; font-size: 16px; margin: 6px 0 0; font-style: italic; opacity: 0.7;">حروف</p>
                <p style="color: #ffffff; font-size: 11px; margin: 16px 0 0; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.5;">Paris</p>
              </div>

              <!-- Corps -->
              <div style="padding: 40px 40px 32px;">
                <p style="font-size: 11px; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 12px;">Commande confirmée</p>
                <h2 style="font-size: 26px; color: #1a1a1a; font-weight: normal; margin: 0 0 16px;">Merci, ${customerName} !</h2>
                <p style="font-size: 16px; color: #555; line-height: 1.7; margin: 0 0 32px;">
                  Votre paiement a bien été reçu. Votre tableau de calligraphie arabe sera soigneusement emballé
                  et expédié sous <strong>3 à 5 jours ouvrés</strong>.
                </p>

                <!-- Récapitulatif commande -->
                <div style="background: #faf8f4; border: 1px solid #f0e8d0; margin-bottom: 28px;">
                  <div style="padding: 16px 20px; border-bottom: 1px solid #f0e8d0; background: #f5f0e8;">
                    <p style="margin: 0; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #8a7a5a; font-weight: bold;">Récapitulatif de commande</p>
                  </div>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="background: #f5f0e8;">
                        <th style="padding: 10px 16px; text-align: left; font-size: 11px; color: #8a7a5a; letter-spacing: 0.15em; text-transform: uppercase; font-weight: normal;">Article</th>
                        <th style="padding: 10px 16px; text-align: center; font-size: 11px; color: #8a7a5a; letter-spacing: 0.15em; text-transform: uppercase; font-weight: normal;">Qté</th>
                        <th style="padding: 10px 16px; text-align: right; font-size: 11px; color: #8a7a5a; letter-spacing: 0.15em; text-transform: uppercase; font-weight: normal;">Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${articlesHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding: 14px 16px; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em;">Total</td>
                        <td style="padding: 14px 16px; font-size: 18px; color: #c9a84c; font-weight: bold; text-align: right;">${amountTotal} €</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="padding: 0 16px 14px; font-size: 12px; color: #999; text-align: right;">Livraison offerte incluse</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <!-- Adresse livraison -->
                <div style="background: #faf8f4; border: 1px solid #f0e8d0; padding: 20px; margin-bottom: 28px;">
                  <p style="font-size: 11px; color: #8a7a5a; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 8px; font-weight: bold;">Adresse de livraison</p>
                  <p style="font-size: 15px; color: #1a1a1a; margin: 0; line-height: 1.6;">${adresseLivraison}</p>
                </div>

                <!-- Étapes -->
                <div style="margin-bottom: 36px;">
                  <p style="font-size: 11px; color: #8a7a5a; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 16px; font-weight: bold;">Les prochaines étapes</p>
                  <div style="display: flex; align-items: flex-start; margin-bottom: 14px;">
                    <div style="width: 24px; height: 24px; background: #c9a84c; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 14px; font-size: 11px; color: #0d0d0d; font-weight: bold; text-align: center; line-height: 24px;">1</div>
                    <div>
                      <p style="font-size: 14px; color: #1a1a1a; margin: 0 0 3px; font-weight: bold;">Préparation de votre commande</p>
                      <p style="font-size: 13px; color: #888; margin: 0;">Votre tableau est imprimé sur papier d'art et encadré avec soin.</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start; margin-bottom: 14px;">
                    <div style="width: 24px; height: 24px; background: #c9a84c; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 14px; font-size: 11px; color: #0d0d0d; font-weight: bold; text-align: center; line-height: 24px;">2</div>
                    <div>
                      <p style="font-size: 14px; color: #1a1a1a; margin: 0 0 3px; font-weight: bold;">Expédition sous 3 à 5 jours ouvrés</p>
                      <p style="font-size: 13px; color: #888; margin: 0;">Vous recevrez un email avec votre numéro de suivi dès l'envoi.</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start;">
                    <div style="width: 24px; height: 24px; background: #c9a84c; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-right: 14px; font-size: 11px; color: #0d0d0d; font-weight: bold; text-align: center; line-height: 24px;">3</div>
                    <div>
                      <p style="font-size: 14px; color: #1a1a1a; margin: 0 0 3px; font-weight: bold;">Livraison à votre domicile</p>
                      <p style="font-size: 13px; color: #888; margin: 0;">Emballage soigné, protection renforcée pour votre tableau.</p>
                    </div>
                  </div>
                </div>

                <!-- Contact -->
                <div style="border-top: 1px solid #f0e8d0; padding-top: 24px; text-align: center;">
                  <p style="font-size: 14px; color: #888; margin: 0 0 8px;">Une question ? Nous vous répondons sous 48h.</p>
                  <a href="mailto:contact@huruf-paris.fr" style="color: #c9a84c; font-size: 14px; text-decoration: none;">contact@huruf-paris.fr</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #0d0d0d; padding: 24px 32px; text-align: center;">
                <p style="color: #c9a84c; font-size: 18px; margin: 0 0 4px; font-style: italic;">حروف</p>
                <p style="color: #ffffff; font-size: 11px; margin: 0 0 12px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.4;">huruf-paris.fr</p>
                <p style="color: #ffffff; font-size: 11px; margin: 0; opacity: 0.3;">Réf. commande : ${orderRef}</p>
              </div>

            </div>
          </body>
          </html>
        `,
      })
    }

    // ── Email à VOUS (notification interne) ──
    await resend.emails.send({
      from: 'Hurûf Paris <contact@huruf-paris.fr>',
      to: ['fashiontrendyfemme@gmail.com'],
      subject: `🛍️ Nouvelle commande — ${amountTotal} € — ${customerName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0d0d0d; padding: 24px 32px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: #c9a84c; font-size: 24px; margin: 0; letter-spacing: 0.1em;">Nouvelle commande reçue</h1>
          </div>

          <div style="padding: 0 16px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px; background: #f8f8f8; width: 140px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Référence</td>
                <td style="padding: 12px; background: #f8f8f8; font-size: 15px; font-weight: bold;">${orderRef}</td>
              </tr>
              <tr>
                <td style="padding: 12px; width: 140px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Client</td>
                <td style="padding: 12px; font-size: 15px;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f8f8f8; width: 140px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Email</td>
                <td style="padding: 12px; background: #f8f8f8; font-size: 15px;">${customerEmail || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; width: 140px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Montant</td>
                <td style="padding: 12px; font-size: 18px; color: #c9a84c; font-weight: bold;">${amountTotal} €</td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f8f8f8; width: 140px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Livraison</td>
                <td style="padding: 12px; background: #f8f8f8; font-size: 14px;">${adresseLivraison}</td>
              </tr>
            </table>

            <div style="background: #f8f8f8; padding: 16px 20px; margin-bottom: 24px;">
              <p style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; margin: 0 0 10px;">Articles commandés</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${articlesHtml}
              </table>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://dashboard.stripe.com/payments" style="display: inline-block; background: #c9a84c; color: #0d0d0d; padding: 12px 28px; font-size: 13px; text-decoration: none; letter-spacing: 0.15em; text-transform: uppercase; font-weight: bold;">
                Voir sur Stripe
              </a>
            </div>

            <p style="font-size: 12px; color: #aaa; border-top: 1px solid #eee; padding-top: 16px; text-align: center;">
              Session Stripe : ${session.id}
            </p>
          </div>
        </div>
      `,
    })
  }

  return NextResponse.json({ received: true })
}
