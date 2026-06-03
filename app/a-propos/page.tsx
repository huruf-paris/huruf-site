import { Metadata } from 'next'
import AProposClient from './AProposClient'

export const metadata: Metadata = {
  title: 'À propos — Hurûf Paris | Calligraphie arabe encadrée',
  description:
    'Découvrez l\'histoire de Hurûf Paris : une marque française née pour partager la beauté de la calligraphie arabe. Tableaux encadrés, conçus avec soin, livrés partout en France.',
  keywords: [
    'à propos Hurûf Paris',
    'tableau calligraphie arabe',
    'décoration calligraphie islamique',
    'tableau arabe encadré France',
    'calligraphie arabe maison',
  ],
  alternates: { canonical: 'https://www.huruf-paris.fr/a-propos' },
  openGraph: {
    title: 'À propos — Hurûf Paris',
    description: 'Née pour partager la beauté de la calligraphie arabe, Hurûf Paris crée des tableaux encadrés qui subliment votre intérieur.',
    url: 'https://www.huruf-paris.fr/a-propos',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function AProposPage() {
  return <AProposClient />
}
