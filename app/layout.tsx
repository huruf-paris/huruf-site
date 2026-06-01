import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Amiri } from 'next/font/google'
import '@/styles/globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'
import CookieBanner from '@/components/CookieBanner'
import AnnouncementBar from '@/components/AnnouncementBar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Hurûf Paris — Tableaux de Calligraphie Arabe Encadrés',
    template: '%s | Hurûf Paris',
  },
  description:
    "Hurûf Paris : tableaux de calligraphie arabe imprimés sur papier d'art, encadrés et livrés en France. Salam, Sabr, Hubb, Subhanallah — des compositions uniques pour votre intérieur. Livraison offerte.",
  keywords: [
    'calligraphie arabe',
    'tableau calligraphie arabe',
    'décoration islamique',
    'art islamique',
    'tableau arabe encadré',
    'cadeau islamique',
    'calligraphie islamique',
    'tableau musulman',
    'art arabe Paris',
    'décoration murale arabe',
    'tableau Salam',
    'tableau Sabr',
    'tableau Hubb',
    'tableau Subhanallah',
    'calligraphie tracée à la main',
  ],
  authors: [{ name: 'Hurûf Paris' }],
  creator: 'Hurûf Paris',
  publisher: 'Hurûf Paris',
  metadataBase: new URL('https://www.huruf-paris.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hurûf Paris — Tableaux de Calligraphie Arabe Encadrés',
    description: "Tableaux de calligraphie arabe tracés à la main, encadrés et livrés en France. Livraison offerte.",
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Hurûf Paris',
    url: 'https://www.huruf-paris.fr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hurûf Paris — Calligraphie Arabe Encadrée',
    description: 'Tableaux de calligraphie arabe tracés à la main. Livraison offerte en France.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hurûf Paris',
  url: 'https://www.huruf-paris.fr',
  logo: 'https://www.huruf-paris.fr/images/logo.png',
  description: "Tableaux de calligraphie arabe imprimés sur papier d'art, encadrés et livrés en France.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '60 Rue François Ier',
    addressLocality: 'Paris',
    postalCode: '75008',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'fashiontrendyfemme@gmail.com',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://www.instagram.com/huruf.paris',
    'https://www.pinterest.fr/hurufparis',
    'https://www.facebook.com/huruf.paris',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${cormorant.variable} ${amiri.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CartProvider>
          <CustomCursor />
          <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            <AnnouncementBar />
            <Navbar />
          </div>
          <CartDrawer />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}
