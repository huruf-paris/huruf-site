/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Force HTTPS pendant 2 ans
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Empêche le clickjacking (iframe malveillante)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Empêche le sniffing de type MIME
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Contrôle les informations envoyées au referrer
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Désactive les fonctionnalités navigateur inutiles
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")',
  },
  // Précharge DNS pour la performance
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Content Security Policy — autorise uniquement les ressources connues
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts : Next.js nécessite unsafe-inline/eval + Stripe JS
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles : Tailwind + Framer Motion inline + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images : local + Unsplash + Google Analytics + Pinterest
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://i.pinimg.com https://media.canva.com",
      // Polices Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Connexions API autorisées
      "connect-src 'self' https://api.stripe.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      // Iframes Stripe (3DS, checkout)
      "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
      // Interdit les plugins Flash/Java
      "object-src 'none'",
      // Empêche l'injection de base href
      "base-uri 'self'",
      // Les formulaires ne peuvent soumettre qu'au site lui-même
      "form-action 'self' https://checkout.stripe.com",
    ].join('; '),
  },
]

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 430, 640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Applique les headers à toutes les pages et routes API
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
