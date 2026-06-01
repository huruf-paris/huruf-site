import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')
  // Rate limiting : 3 messages / 10 minutes par IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'

  const limit = rateLimit(ip, { limit: 3, windowMs: 10 * 60_000 })
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Veuillez patienter.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const { nom, email, sujet, message } = body

    // Validation basique
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    if (nom.length > 100 || sujet.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: 'Contenu trop long' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Hurûf Contact <onboarding@resend.dev>',
      to: ['contact@huruf-paris.fr'],
      replyTo: email,
      subject: `[Hurûf] ${sujet}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0d0d0d; padding: 32px; text-align: center; margin-bottom: 32px;">
            <h1 style="color: #c9a84c; font-size: 28px; margin: 0; letter-spacing: 0.1em;">Hurûf</h1>
            <p style="color: #666; font-size: 12px; margin: 8px 0 0; letter-spacing: 0.3em; text-transform: uppercase;">Nouveau message de contact</p>
          </div>

          <div style="padding: 0 16px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px; background: #f8f8f8; width: 120px; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Nom</td>
                <td style="padding: 12px; background: #f8f8f8; font-size: 15px;">${nom}</td>
              </tr>
              <tr>
                <td style="padding: 12px; width: 120px; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Email</td>
                <td style="padding: 12px; font-size: 15px;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; background: #f8f8f8; width: 120px; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Sujet</td>
                <td style="padding: 12px; background: #f8f8f8; font-size: 15px;">${sujet}</td>
              </tr>
            </table>

            <div style="background: #f8f8f8; padding: 20px; margin-bottom: 32px;">
              <p style="font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; margin: 0 0 12px;">Message</p>
              <p style="font-size: 16px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="font-size: 13px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
              Répondre directement à cet email pour contacter ${nom}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
