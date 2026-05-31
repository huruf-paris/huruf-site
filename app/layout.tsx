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
    default: 'Hurûf — حروف | Calligraphie arabe encadrée',
    template: '%s | Hurûf — حروف',
  },
  description:
    "Hurûf propose des tableaux de calligraphie arabe encadrés, tracés à la main. Chaque œuvre apporte l'élégance de l'écriture arabe dans votre intérieur. Livraison en France.",
  keywords: ['calligraphie arabe', 'tableau arabe', 'décoration islamique', 'art arabe', 'cadeau oriental'],
  authors: [{ name: 'Hurûf' }],
  openGraph: {
    title: 'Hurûf — حروف | Calligraphie arabe encadrée',
    description: "L'art de la calligraphie arabe, encadré pour votre intérieur.",
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Hurûf',
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${cormorant.variable} ${amiri.variable}`}>
      <body>
        <CartProvider>
          <CustomCursor />
          <Navbar />
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
