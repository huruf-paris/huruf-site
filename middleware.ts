import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Bloquer les routes d'administration WordPress/PHP tentées par les bots ──
  const blockedPaths = [
    '/wp-admin', '/wp-login', '/xmlrpc', '/.env',
    '/admin', '/phpmyadmin', '/config.php', '/.git',
  ]
  if (blockedPaths.some((p) => pathname.startsWith(p))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // ── Forcer HTTPS en production ──
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') === 'http'
  ) {
    return NextResponse.redirect(
      `https://${req.headers.get('host')}${pathname}`,
      301
    )
  }

  // ── Protection des routes API : interdire les méthodes non autorisées ──
  if (pathname.startsWith('/api/checkout')) {
    if (req.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 })
    }
    // Vérifier Content-Type
    const contentType = req.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      return new NextResponse('Unsupported Media Type', { status: 415 })
    }
  }

  const response = NextResponse.next()

  // ── Headers de sécurité supplémentaires sur les réponses API ──
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('X-Robots-Tag', 'noindex')
  }

  return response
}

export const config = {
  matcher: [
    // Toutes les routes sauf les fichiers statiques Next.js
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
