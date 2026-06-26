'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldenParticles from '@/components/GoldenParticles'
import { SectionDivider } from '@/components/IslamicOrnament'
import SectionTitle from '@/components/SectionTitle'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import VideoShowcase, { type ShowcaseVideo } from '@/components/VideoShowcase'
import { getProductBySlug, getFeaturedProducts } from '@/data/products'

const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    src: '/videos/deballage.mp4',
    poster: '/videos/deballage-poster.webp',
    label: 'Le déballage',
    caption: 'Un emballage soigné et protecteur, pensé pour le transport.',
  },
  {
    src: '/videos/avant-apres.mp4',
    poster: '/videos/avant-apres-poster.webp',
    label: 'Le rendu sur votre mur',
    caption: 'Du carton à la décoration : le tableau prend vie chez vous.',
  },
]

const TESTIMONIALS = [
  { quote: "Très beau tableau, rapport qualité prix très intéressant.", author: 'N.', location: 'France', date: 'Il y a 2 jours', stars: 5, initial: 'N' },
  { quote: "Parfait, très satisfait, professionnel et soigné, envoi rapide.", author: 'Naomie P.', location: 'France', date: 'Il y a 4 mois', stars: 5, initial: 'N' },
  { quote: "Merci parfait et très bien emballé !", author: 'Z.', location: 'France', date: 'Il y a 3 mois', stars: 5, initial: 'Z' },
  { quote: "Impec, arrivé avant le délai prévu. Je recommande !", author: 'P.', location: 'France', date: 'Il y a 4 mois', stars: 5, initial: 'P' },
  { quote: "Magnifique tableau, le cadre est de très bonne qualité. Un cadeau parfait !", author: 'Fatima A.', location: 'France', date: 'Il y a 1 mois', stars: 5, initial: 'F' },
  { quote: "Acheté en cadeau pour ma mère, elle a adoré. La calligraphie est vraiment belle.", author: 'Karim M.', location: 'France', date: 'Il y a 2 semaines', stars: 5, initial: 'K' },
  { quote: "Jolie tableau, livraison rapide, très contente de ma commande. Je vous le recommande…", author: 'Anlabati Moussa', location: 'France', date: 'Juin 2026', stars: 5, initial: 'A', source: 'Google' as const, verified: true },
  { quote: "Parfait, merci pour l’envoi rapide.", author: 'sewiwine95', location: 'France', date: '2025', stars: 5, initial: 'S', source: 'Vinted' as const, verified: true },
  { quote: "Vendeur sympa et réactif. Produit parfaitement conforme.", author: 'clem4475', location: 'France', date: '2025', stars: 5, initial: 'C', source: 'Vinted' as const, verified: true },
  { quote: "Alles super 😊", author: 'resahe1', location: 'Allemagne', date: '2025', stars: 5, initial: 'R', source: 'Vinted' as const, verified: true },
]

const VALUES = [
  {
    title: 'Authenticité',
    desc: "Chaque composition s'inspire de la beauté de la calligraphie arabe et de son héritage.",
  },
  {
    title: 'Qualité',
    desc: "Impression premium, cadre inclus, emballage soigné et protecteur.",
  },
  {
    title: 'Élégance',
    desc: "Des œuvres pensées pour s'intégrer naturellement dans les intérieurs modernes.",
  },
]

const REASSURANCE = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="5" width="10" height="7" rx="0.6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7"/>
        <path d="M11 8l3-2v6l-3-2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7" strokeLinejoin="round"/>
        <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Livraison offerte en Europe'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="13" height="13" rx="0.6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7"/>
        <rect x="4" y="4" width="8" height="8" rx="0.3" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.4"/>
        <path d="M1.5 1.5l2.5 2.5M14.5 1.5l-2.5 2.5M1.5 14.5l2.5-2.5M14.5 14.5l-2.5-2.5" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Cadre inclus'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="6" width="14" height="9" rx="0.6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7"/>
        <path d="M4 6V5a4 4 0 0 1 8 0v1" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <path d="M1 9h14M8 6v9" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.4"/>
      </svg>
    ),
    label: 'Expédié sous 3 à 5 jours ouvrés'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="7" width="11" height="8" rx="0.6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7"/>
        <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <circle cx="8" cy="11" r="1" fill="#D4AF37" fillOpacity="0.7"/>
      </svg>
    ),
    label: 'Paiement sécurisé'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13 8A5 5 0 1 1 5.5 4.2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <path d="M5 2l0.5 2.2 2.3-0.5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Retour 14 jours'
  },
]

const COLLECTIONS = [
  { title: 'Collection Dorée', desc: 'Fond doré, calligraphie noire', image: '/images/products/bismillah-dore-1.webp', href: '/boutique' },
  { title: 'Collection Minimaliste', desc: 'Épuré, sobre, élégant', image: '/images/products/sabr.png', href: '/boutique' },
  { title: 'Collection Aquarelle', desc: 'Douceur et couleurs', image: '/images/products/bismillah-aquarelle-1.webp', href: '/boutique' },
  { title: 'Commande sur mesure', desc: 'Votre texte, votre style', image: '/images/products/duo-bismi-3.png', href: '/sur-mesure' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()

  // Les 3 meilleures ventes
  const bestSellers = [
    getProductBySlug('allahu-akbar-fond-dore'),
    getProductBySlug('bismillah-fond-dore'),
    getProductBySlug('sabr-patience'),
  ].filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex overflow-hidden bg-night">
        <GoldenParticles />

        {/* ── Image de fond sur mobile, colonne droite sur desktop ── */}
        <div className="absolute inset-0 lg:relative lg:w-[46%] lg:min-h-screen lg:flex-shrink-0">
          <Image
            src="/images/products/duo-bismi-3.png"
            alt="Tableaux Hurûf dans un intérieur contemporain"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-night/70 lg:bg-night/15" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-night to-transparent z-10" />
          <div className="hidden lg:block absolute bottom-12 right-12 w-24 h-24 border border-gold/20 z-10 pointer-events-none" />
        </div>

        {/* ── Contenu texte ── */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[54%] lg:order-first px-8 sm:px-14 lg:px-20 xl:px-28 pt-32 pb-10 lg:pt-0 lg:pb-0 min-h-screen">

          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-40 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          {/* Signature */}
          <p className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-5 italic">
            Quand les mots deviennent art.
          </p>

          {/* Titre principal — clair et vendeur */}
          <h1 className="font-playfair text-pearl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight mb-5">
            Calligraphie arabe<br />
            <span className="text-gold">haut de gamme</span><br />
            pour sublimer<br className="sm:hidden" /> votre intérieur.
          </h1>

          {/* Ligne dorée */}
          <div className="w-16 h-px bg-gold/50 mb-6" />

          {/* Sous-titre */}
          <p className="font-cormorant text-pearl/70 text-xl font-light italic mb-2 max-w-md leading-relaxed">
            Des tableaux encadrés, inspirés par la beauté des mots arabes, livrés prêts à accrocher.
          </p>
          <p className="font-cormorant text-gold/80 text-lg mb-8">
            À partir de <strong>35,99 €</strong> · Cadre inclus · Livraison offerte
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/boutique">
              <Button variant="primary" size="lg">
                Découvrir la collection
              </Button>
            </Link>
            <Link href="/sur-mesure">
              <Button variant="ghost" size="lg">
                Commande sur mesure
              </Button>
            </Link>
          </div>

          {/* Indicateur scroll */}
          <div className="absolute bottom-8 left-8 sm:left-14 lg:left-20 xl:left-28 flex items-center gap-3">
            <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
            <span className="font-cormorant text-pearl/30 text-xs tracking-widest uppercase">
              Défiler
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ BARRE RÉASSURANCE ═══════════════════════ */}
      <div className="bg-night-deep border-y border-gold/10 py-3 overflow-hidden">
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2 px-6">
          {REASSURANCE.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 flex-shrink-0">
              <span className="flex-shrink-0">{icon}</span>
              <span className="font-cormorant text-pearl/55 text-sm tracking-wide whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ MEILLEURES VENTES ═══════════════════════ */}
      <section className="py-20 bg-night">
        <div className="max-w-7xl mx-auto">
          <div className="px-6 text-center mb-12">
            <p className="font-cormorant text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">Bestsellers</p>
            <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-4">
              Nos tableaux les plus demandés
            </h2>
            <p className="font-cormorant text-pearl/50 text-lg max-w-lg mx-auto leading-relaxed">
              Des œuvres prêtes à accrocher, pensées pour apporter élégance, sens et sérénité à votre intérieur.
            </p>
          </div>

          {/* Mobile : carrousel */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-6 pr-6 pb-4">
              {bestSellers.map((product, i) => (
                <div key={product.id} className="flex-none w-[78vw] snap-center">
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
            <p className="text-center font-cormorant text-pearl/25 text-xs tracking-widest uppercase mt-3 px-6">
              Glisser pour découvrir →
            </p>
          </div>

          {/* Desktop : grille 3 colonnes */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6 px-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12 px-6">
            <Link href="/boutique">
              <Button variant="outline" size="lg">
                Voir toute la collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ LE PRODUIT EN VRAI (VIDÉOS) ═══════════════════════ */}
      <section className="py-20 px-6 bg-night">
        <div className="text-center mb-12">
          <p className="font-cormorant text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">En vidéo</p>
          <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-4">
            Le produit en vrai
          </h2>
          <p className="font-cormorant text-pearl/50 text-lg max-w-lg mx-auto leading-relaxed">
            Au-delà des photos, découvrez la qualité réelle de nos tableaux : l'emballage, le cadre et le rendu une fois accroché.
          </p>
        </div>

        <VideoShowcase videos={SHOWCASE_VIDEOS} />
      </section>

      <SectionDivider />

      {/* ═══════════════════════ COLLECTIONS ═══════════════════════ */}
      <section className="py-20 bg-night">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-cormorant text-gold/60 text-xs tracking-[0.35em] uppercase mb-3">Collections</p>
            <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-4">
              Explorer par collection
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={col.href} className="group block relative overflow-hidden border border-gold/10 hover:border-gold/30 transition-colors duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-night/50 group-hover:bg-night/35 transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-playfair text-pearl text-sm font-light leading-snug">{col.title}</p>
                    <p className="font-cormorant text-pearl/45 text-xs mt-0.5">{col.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ NOTRE ART (compact) ═══════════════════════ */}
      <section className="py-20 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            frenchTitle="Notre art"
            subtitle="Trois piliers qui fondent chaque tableau Hurûf"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10 border border-gold/10">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
                className="bg-night p-8 group hover:bg-night-deep transition-colors duration-400"
              >
                <div className="w-8 h-px bg-gold/40 mb-5 group-hover:w-12 group-hover:bg-gold/70 transition-all duration-400" />
                <h3 className="font-playfair text-pearl text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="font-cormorant text-pearl/55 text-lg leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ AVIS CLIENTS ═══════════════════════ */}
      <section className="py-24 px-6 bg-night">
        <div className="max-w-4xl mx-auto">
          {/* Note globale */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 12 12" className="w-5 h-5 fill-gold">
                  <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z" />
                </svg>
              ))}
            </div>
            <p className="font-cormorant text-gold text-lg tracking-wide">★★★★★ 4,9/5 — Avis clients</p>
          </div>

          <SectionTitle
            frenchTitle="Ils ont choisi Hurûf"
            subtitle="Des premiers clients satisfaits par la qualité, l'emballage et le rendu des tableaux."
          />

          <TestimonialsCarousel testimonials={TESTIMONIALS} twoColumns interval={5000} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href="https://g.page/r/CQlXNwRFGLZKEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cormorant text-pearl/35 text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              Vous avez commandé ? Laissez un avis Google →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SECTION ÉMOTIONNELLE ═══════════════════════ */}
      <section className="py-24 bg-night-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-amiri text-[20rem] text-gold leading-none select-none pointer-events-none">
            حروف
          </div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="w-12 h-px bg-gold/40 mx-auto mb-10" />
            <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-6 leading-snug">
              Un rappel précieux,<br />chaque jour sous vos yeux.
            </h2>
            <p className="font-cormorant text-pearl/60 text-xl italic leading-relaxed mb-10">
              Chaque tableau Hurûf est pensé comme une œuvre décorative, mais aussi comme un rappel discret et élégant : patience, gratitude, paix, confiance et beauté des mots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/boutique">
                <Button variant="primary" size="lg">
                  Choisir mon tableau
                </Button>
              </Link>
              <Link href="/sur-mesure">
                <Button variant="outline" size="lg">
                  Créer mon tableau sur mesure
                </Button>
              </Link>
            </div>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-10" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
