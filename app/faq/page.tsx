import { Metadata } from 'next'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
  title: 'FAQ — Questions Fréquentes sur nos Tableaux',
  description:
    'Toutes les réponses à vos questions sur les tableaux Hurûf Paris : livraison, retours, formats, cadres, commandes sur mesure et paiement sécurisé.',
  keywords: ['FAQ calligraphie arabe', 'questions tableau islamique', 'livraison tableau arabe', 'retour tableau'],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Hurûf Paris',
    description: 'Toutes les réponses à vos questions sur nos tableaux de calligraphie arabe.',
    url: 'https://www.huruf-paris.fr/faq',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function FAQPage() {
  return <FAQClient />
}
