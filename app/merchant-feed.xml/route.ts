import { products, FORMATS, type Format } from '@/data/products'

const BASE_URL = 'https://www.huruf-paris.fr'

// Flux produit Google Merchant Center (RSS 2.0 + namespace g:)
// À coller dans Merchant Center → Produits → Flux : https://www.huruf-paris.fr/merchant-feed.xml
export const dynamic = 'force-static'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const items = products
    .flatMap((p) =>
      (Object.keys(FORMATS) as Format[]).map((fmt) => {
        const price = p.prices[fmt].single
        const link = `${BASE_URL}/boutique/${p.slug}`
        const imageLink = `${BASE_URL}${p.images[0]}`
        const additional = p.images
          .slice(1, 11)
          .map((img) => `<g:additional_image_link>${BASE_URL}${img}</g:additional_image_link>`)
          .join('')
        const title = escapeXml(`${p.nameFr} — ${FORMATS[fmt]}`)
        const description = escapeXml(p.description.replace(/\s+/g, ' ').trim())

        return `
    <item>
      <g:id>${p.id}-${fmt}</g:id>
      <g:item_group_id>${p.id}</g:item_group_id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <g:image_link>${imageLink}</g:image_link>${additional}
      <g:availability>in_stock</g:availability>
      <g:price>${price.toFixed(2)} EUR</g:price>
      <g:condition>new</g:condition>
      <g:brand>Hurûf Paris</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>500045</g:google_product_category>
      <g:product_type>Calligraphie arabe encadrée</g:product_type>
      <g:size>${escapeXml(FORMATS[fmt])}</g:size>
    </item>`
      })
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Hurûf Paris — Tableaux de calligraphie arabe</title>
    <link>${BASE_URL}</link>
    <description>Calligraphie arabe haut de gamme, encadrée et livrée prête à accrocher.</description>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
