import { Metadata } from 'next'
import SurMesureClient from './SurMesureClient'

export const metadata: Metadata = {
  title: 'Commande Sur Mesure — Calligraphie Arabe Personnalisée',
  description:
    'Commandez votre tableau de calligraphie arabe sur mesure. Choisissez le mot, le style, le format. Tracé à la main, encadré, livré en France. Devis gratuit sous 48h.',
  keywords: [
    'calligraphie arabe sur mesure',
    'tableau personnalisé arabe',
    'commande calligraphie islamique',
    'cadeau personnalisé arabe',
    'calligraphie prénom arabe',
  ],
  alternates: { canonical: '/sur-mesure' },
  openGraph: {
    title: 'Commande Sur Mesure — Hurûf Paris',
    description: 'Tableau de calligraphie arabe personnalisé. Devis gratuit sous 48h.',
    url: 'https://www.huruf-paris.fr/sur-mesure',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function SurMesurePage() {
  return <SurMesureClient />
}
