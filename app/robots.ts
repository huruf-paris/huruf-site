import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/panier'],
      },
    ],
    sitemap: 'https://www.huruf-paris.fr/sitemap.xml',
    host: 'https://www.huruf-paris.fr',
  }
}
