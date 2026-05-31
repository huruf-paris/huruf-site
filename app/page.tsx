'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import GoldenParticles from '@/components/GoldenParticles'
import { SectionDivider } from '@/components/IslamicOrnament'
import SectionTitle from '@/components/SectionTitle'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import { getFeaturedProducts } from '@/data/products'

const VALUES = [
  {
    title: 'Authenticité',
    desc: "Chaque tableau est tracé à la main par un calligraphe formé à la tradition arabe classique. Aucune impression numérique — uniquement l'encre, le papier et le geste.",
  },
  {
    title: 'Artisanat',
    desc: "Papier d'art de qualité musée, encre permanente, cadre noble inclus. Un soin minutieux à chaque étape, de la plume jusqu'au clou dans votre mur.",
  },
  {
    title: 'Élégance',
    desc: "La calligraphie arabe est l'un des arts les plus raffinés du monde. Nos tableaux apportent cette élégance millénaire dans les intérieurs contemporains.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Un cadeau pour ma mère — elle a pleuré en voyant le tableau. La qualité est exceptionnelle, le cadre est magnifique. Je recommande les yeux fermés.",
    author: 'Yasmine B.',
    location: 'Lyon',
  },
  {
    quote:
      "J'avais commandé Sabr pour mon bureau. Chaque matin, ce mot m'aide à aborder la journée différemment. L'art peut vraiment changer une pièce.",
    author: 'Karim M.',
    location: 'Paris',
  },
  {
    quote:
      "La qualité de la calligraphie est bluffante. On sent que c'est tracé à la main. Livraison soignée, emballage impeccable.",
    author: 'Leila A.',
    location: 'Bordeaux',
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const featured = getFeaturedProducts()

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-night" />
        <GoldenParticles />

        {/* Ornement géométrique subtil */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            className="opacity-[0.025]"
            aria-hidden="true"
          >
            <circle cx="300" cy="300" r="280" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="300" cy="300" r="220" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="300" cy="300" r="160" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="300"
                y1="20"
                x2="300"
                y2="580"
                stroke="#D4AF37"
                strokeWidth="0.4"
                transform={`rotate(${deg} 300 300)`}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Titre */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-playfair text-pearl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
                Hurûf
              </h1>
            </motion.div>
          </div>

          {/* Identité de marque — arabe conservé car c'est le nom de marque */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <span className="font-amiri text-gold text-4xl sm:text-5xl md:text-6xl">حروف</span>
          </motion.div>

          {/* Ligne dorée animée */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center my-6"
          >
            <svg width="300" height="2" viewBox="0 0 300 2" aria-hidden="true">
              <line x1="0" y1="1" x2="300" y2="1" className="golden-line" />
            </svg>
          </motion.div>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
            className="font-cormorant text-pearl/70 text-xl sm:text-2xl md:text-3xl font-light italic mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            L'art de la calligraphie arabe, encadré pour votre intérieur
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15, ease: 'easeOut' }}
          >
            <Link href="/boutique">
              <Button variant="primary" size="lg">
                Découvrir la collection
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cormorant text-pearl/30 text-xs tracking-widest uppercase">
            Défiler
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════ NOS VALEURS ═══════════════════════ */}
      <section className="py-28 px-6 bg-night">
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
                className="bg-night p-10 group hover:bg-night-deep transition-colors duration-400"
              >
                <div className="w-8 h-px bg-gold/40 mb-6 group-hover:w-12 group-hover:bg-gold/70 transition-all duration-400" />
                <h3 className="font-playfair text-pearl text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="font-cormorant text-pearl/55 text-lg leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ TABLEAUX PHARES ═══════════════════════ */}
      <section className="py-20 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            frenchTitle="Oeuvres phares"
            subtitle="Une sélection de nos tableaux les plus demandés"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mt-14"
          >
            <Link href="/boutique">
              <Button variant="outline" size="lg">
                Voir toute la collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ BANDE CITATION ═══════════════════════ */}
      <section className="py-24 bg-night-deep relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
            <p className="font-cormorant text-pearl/70 text-2xl md:text-3xl italic leading-relaxed mb-6">
              « Un mot bien tracé vaut mille paroles. »
            </p>
            <p className="font-cormorant text-pearl/30 text-sm tracking-widest uppercase">
              Proverbe de la tradition calligraphique
            </p>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ TÉMOIGNAGES ═══════════════════════ */}
      <section className="py-24 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            frenchTitle="Ils nous font confiance"
            subtitle="Ce que disent nos clients"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
                className="bg-night-deep border border-gold/10 p-8 relative hover:border-gold/25 transition-colors duration-400"
              >
                <span className="absolute top-5 left-6 font-playfair text-gold/20 text-6xl leading-none">
                  "
                </span>
                <blockquote className="font-cormorant text-pearl/70 text-lg leading-relaxed mt-6">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 pt-5 border-t border-gold/10">
                  <p className="font-playfair text-pearl text-sm">{t.author}</p>
                  <p className="font-cormorant text-pearl/40 text-sm">{t.location}</p>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA FINAL ═══════════════════════ */}
      <section className="py-28 px-6 bg-night-deep text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl mx-auto"
        >
          <div className="w-12 h-px bg-gold/40 mx-auto mb-10" />
          <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-4">
            Un mot qui change une pièce.
          </h2>
          <p className="font-cormorant text-pearl/55 text-xl italic mb-10 leading-relaxed">
            Offrez ou offrez-vous un tableau Hurûf. Chaque oeuvre est livrée encadrée, prête à être accrochée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique">
              <Button variant="primary" size="lg">
                Commander maintenant
              </Button>
            </Link>
            <Link href="/sur-mesure">
              <Button variant="outline" size="lg">
                Commande sur mesure
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
