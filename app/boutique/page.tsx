import { Metadata } from 'next'
import BoutiqueClient from './BoutiqueClient'

export const metadata: Metadata = {
  title: 'Boutique — Tableaux de Calligraphie Arabe Encadrés',
  description:
    'Découvrez notre collection de tableaux de calligraphie arabe tracés à la main : Salam, Sabr, Hubb, Subhanallah, Allahu Akbar. Encadrés, livrés en France. Livraison offerte.',
  keywords: [
    'boutique calligraphie arabe',
    'tableau islamique encadré',
    'acheter tableau arabe',
    'décoration islamique Paris',
    'Salam Sabr Hubb tableau',
    'calligraphie arabe encadrée',
  ],
  alternates: { canonical: '/boutique' },
  openGraph: {
    title: 'Boutique Hurûf Paris — Calligraphie Arabe Encadrée',
    description: 'Collection de tableaux de calligraphie arabe tracés à la main. Livraison offerte en France.',
    url: 'https://www.huruf-paris.fr/boutique',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function BoutiquePage() {
  return <BoutiqueClient />
}
