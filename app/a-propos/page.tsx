import { Metadata } from 'next'
import AProposClient from './AProposClient'

export const metadata: Metadata = {
  title: 'À Propos — L\'Histoire de Hurûf Paris',
  description:
    'Découvrez l\'histoire de Hurûf Paris, maison de calligraphie arabe artisanale. Chaque tableau est tracé à la main par un calligraphe formé à la tradition classique arabe.',
  keywords: [
    'à propos Hurûf Paris',
    'calligraphe arabe Paris',
    'histoire calligraphie islamique',
    'artisan calligraphie arabe',
  ],
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'À Propos — Hurûf Paris',
    description: 'L\'histoire de Hurûf Paris, maison de calligraphie arabe artisanale.',
    url: 'https://www.huruf-paris.fr/a-propos',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function AProposPage() {
  return <AProposClient />
}
