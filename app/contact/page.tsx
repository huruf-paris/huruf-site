import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Hurûf Paris',
  description:
    'Contactez Hurûf Paris pour toute question sur nos tableaux de calligraphie arabe. Réponse sous 48h. Email : contact@huruf-paris.fr',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Hurûf Paris',
    description: 'Contactez-nous pour toute question. Réponse sous 48h.',
    url: 'https://www.huruf-paris.fr/contact',
    siteName: 'Hurûf Paris',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
