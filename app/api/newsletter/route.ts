import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const limit = rateLimit(ip, { limit: 3, windowMs: 60 * 60_000 })
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Trop de tentatives.' }, { status: 429 })
  }

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const sanitizedEmail = email.trim().slice(0, 254)

    // ── Email au CLIENT avec le code -10% ──
    await resend.emails.send({
      from: 'Hurûf Paris <contact@huruf-paris.fr>',
      to: [sanitizedEmail],
      subject: 'Votre code −10% Hurûf Paris',
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8"></head>
        <body style="margin: 0; padding: 0; background: #f7f4ee; font-family: Georgia, serif;">
          <div style="max-width: 600px; margin: 40px auto; background: #ffffff; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #0d0d0d; padding: 40px 32px; text-align: center;">
              <h1 style="color: #c9a84c; font-size: 32px; margin: 0; letter-spacing: 0.15em; font-weight: normal;">Hurûf</h1>
              <p style="color: #c9a84c; font-size: 16px; margin: 6px 0 0; font-style: italic; opacity: 0.7;">حروف</p>
              <p style="color: #ffffff; font-size: 11px; margin: 16px 0 0; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.5;">Paris</p>
            </div>

            <!-- Corps -->
            <div style="padding: 48px 40px 40px; text-align: center;">
              <p style="font-size: 11px; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 12px;">Bienvenue</p>
              <h2 style="font-size: 28px; color: #1a1a1a; font-weight: normal; margin: 0 0 16px;">Votre cadeau de bienvenue</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.7; margin: 0 0 36px;">
                Merci de rejoindre la famille Hurûf Paris. Voici votre code de réduction exclusif pour
                <strong>−10%</strong> sur votre première commande.
              </p>

              <!-- Code promo -->
              <div style="background: #0d0d0d; padding: 28px 32px; margin: 0 0 36px; display: inline-block; width: 100%; box-sizing: border-box;">
                <p style="font-size: 11px; color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 12px; opacity: 0.8;">Votre code exclusif</p>
                <p style="font-size: 36px; color: #c9a84c; font-weight: bold; letter-spacing: 0.2em; margin: 0 0 8px;">HURUF10</p>
                <p style="font-size: 13px; color: #ffffff; opacity: 0.4; margin: 0;">Valable sur votre première commande</p>
              </div>

              <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 32px;">
                Utilisez ce code lors de votre commande sur <strong>huruf-paris.fr</strong><br>
                pour bénéficier de <strong>−10%</strong> sur l'ensemble de votre panier.
              </p>

              <!-- CTA -->
              <a href="https://www.huruf-paris.fr/boutique" style="display: inline-block; background: #c9a84c; color: #0d0d0d; padding: 16px 40px; font-size: 13px; text-decoration: none; letter-spacing: 0.2em; text-transform: uppercase; font-weight: bold; margin-bottom: 40px;">
                Découvrir la boutique
              </a>

              <!-- Séparateur -->
              <div style="border-top: 1px solid #f0e8d0; padding-top: 28px;">
                <p style="font-size: 14px; color: #888; margin: 0 0 8px;">Des questions ? Nous sommes là pour vous.</p>
                <a href="mailto:contact@huruf-paris.fr" style="color: #c9a84c; font-size: 14px; text-decoration: none;">contact@huruf-paris.fr</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #0d0d0d; padding: 24px 32px; text-align: center;">
              <p style="color: #c9a84c; font-size: 18px; margin: 0 0 4px; font-style: italic;">حروف</p>
              <p style="color: #ffffff; font-size: 11px; margin: 0; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.3;">huruf-paris.fr</p>
            </div>

          </div>
        </body>
        </html>
      `,
    })

    // ── Notification interne ──
    await resend.emails.send({
      from: 'Hurûf Paris <contact@huruf-paris.fr>',
      to: ['fashiontrendyfemme@gmail.com'],
      subject: `📧 Nouvel abonné newsletter — ${sanitizedEmail}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto;">
          <div style="background: #0d0d0d; padding: 20px 24px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: #c9a84c; font-size: 20px; margin: 0;">Nouvel abonné newsletter</h1>
          </div>
          <div style="padding: 0 16px;">
            <p style="font-size: 16px; color: #1a1a1a;">Email : <strong>${sanitizedEmail}</strong></p>
            <p style="font-size: 14px; color: #888;">Le code <strong>HURUF10</strong> lui a été envoyé automatiquement.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
