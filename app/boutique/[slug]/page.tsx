import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import ProductPageClient from './ProductPageClient'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}

  const price = product.prices['40x50'].single
  const title = `${product.nameFr} — Tableau Calligraphie Arabe`
  const description = `${product.description.slice(0, 150)}... Composition calligraphique arabe imprimée sur papier d'art, encadrée et livrée en France. À partir de ${price.toFixed(2).replace('.', ',')} €.`

  return {
    title,
    description,
    keywords: [
      `tableau ${product.nameFr}`,
      `calligraphie ${product.transliteration}`,
      `${product.meaning} calligraphie`,
      'tableau arabe encadré',
      'décoration islamique',
      'art calligraphie arabe',
      'Hurûf Paris',
    ],
    alternates: {
      canonical: `/boutique/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.huruf-paris.fr/boutique/${product.slug}`,
      siteName: 'Hurûf Paris',
      locale: 'fr_FR',
      images: product.images[0]
        ? [
            {
              url: `https://www.huruf-paris.fr${product.images[0]}`,
              width: 800,
              height: 1000,
              alt: `${product.nameFr} — Calligraphie arabe Hurûf Paris`,
            },
          ]
        : [],
    },
  }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const price = product.prices['40x50'].single

  // Schema.org JSON-LD pour le produit
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameFr,
    description: product.description,
    image: product.images.map((img) => `https://www.huruf-paris.fr${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Hurûf Paris',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '28',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      {
        '@type': 'Offer',
        name: '30 × 40 cm',
        priceCurrency: 'EUR',
        price: product.prices['30x40'].single.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: `https://www.huruf-paris.fr/boutique/${product.slug}`,
        seller: { '@type': 'Organization', name: 'Hurûf Paris' },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'FR',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY',
            },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'FR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
      {
        '@type': 'Offer',
        name: '40 × 50 cm',
        priceCurrency: 'EUR',
        price: product.prices['40x50'].single.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: `https://www.huruf-paris.fr/boutique/${product.slug}`,
        seller: { '@type': 'Organization', name: 'Hurûf Paris' },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'FR',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY',
            },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'FR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
      {
        '@type': 'Offer',
        name: '50 × 70 cm',
        priceCurrency: 'EUR',
        price: product.prices['50x70'].single.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: `https://www.huruf-paris.fr/boutique/${product.slug}`,
        seller: { '@type': 'Organization', name: 'Hurûf Paris' },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'FR',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY',
            },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'FR',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient params={params} />
    </>
  )
}
