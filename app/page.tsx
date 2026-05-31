'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
        className="relative h-screen flex overflow-hidden bg-night"
      >
        <GoldenParticles />

        {/* ── Colonne gauche : contenu brand ── */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[54%] px-8 sm:px-14 lg:px-20 xl:px-28">

          {/* Ligne verticale dorée décorative */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-40 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          {/* Catégorie */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-6"
          >
            Calligraphie arabe encadrée · Paris
          </motion.p>

          {/* Titre */}
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-playfair text-pearl text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none">
                Hurûf
              </h1>
            </motion.div>
          </div>

          {/* Nom arabe de marque */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            className="mb-8"
          >
            <span className="font-amiri text-gold text-3xl sm:text-4xl">حروف</span>
          </motion.div>

          {/* Ligne dorée */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className="w-16 h-px bg-gold/50 mb-8"
          />

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
            className="font-cormorant text-pearl/65 text-xl sm:text-2xl font-light italic mb-10 max-w-sm leading-relaxed"
          >
            L'art de la calligraphie arabe,<br className="hidden sm:block" /> encadré pour votre intérieur.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3"
          >
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
          </motion.div>

          {/* Indicateur scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-10 left-8 sm:left-14 lg:left-20 xl:left-28 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
            />
            <span className="font-cormorant text-pearl/25 text-xs tracking-widest uppercase">
              Défiler
            </span>
          </motion.div>
        </div>

        {/* ── Colonne droite : image nette ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block lg:w-[46%] relative"
        >
          <Image
            src="/images/products/duo-bismi-3.png"
            alt="Tableaux Hurûf dans un intérieur contemporain"
            fill
            className="object-cover object-center"
            priority
            sizes="46vw"
            quality={90}
          />
          {/* Fondu gauche pour fusionner avec le fond dark */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-night to-transparent z-10" />
          {/* Léger voile pour les contrastes */}
          <div className="absolute inset-0 bg-night/15" />
          {/* Cadre subtil doré en bas à droite */}
          <div className="absolute bottom-12 right-12 w-24 h-24 border border-gold/20 z-10 pointer-events-none" />
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

      {/* ═══════════════════════ LIVRAISON & GARANTIES ═══════════════════════ */}
      <section className="py-16 px-6 bg-night border-t border-gold/8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold/60">
                    <path d="M5 8h14M5 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4" />
                  </svg>
                ),
                title: 'Livraison soignée',
                desc: 'France & Belgique, emballage protecteur renforcé',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold/60">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: '3 à 5 jours ouvrés',
                desc: "Expédition sous 24h après confirmation de commande",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold/60">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                ),
                title: 'Cadre inclus',
                desc: 'Chaque tableau est livré encadré, prêt à accrocher',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-gold/60">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.053-.16-2.072-.455-3.016z" />
                  </svg>
                ),
                title: 'Retour 14 jours',
                desc: 'Satisfait ou remboursé, sans condition',
              },
            ].map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 border border-gold/15 flex items-center justify-center">
                  {icon}
                </div>
                <p className="font-playfair text-pearl text-sm font-light">{title}</p>
                <p className="font-cormorant text-pearl/40 text-sm leading-snug">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════ PREUVE SOCIALE ═══════════════════════ */}
      <section className="py-24 px-6 bg-night">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            frenchTitle="Partagez votre expérience"
            subtitle="Hurûf est une marque jeune — vos retours nous sont précieux"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Google */}
            <motion.a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group bg-night-deep border border-gold/10 hover:border-gold/30 p-8 flex flex-col items-center gap-4 transition-all duration-400"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 opacity-50 group-hover:opacity-80 transition-opacity duration-300" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="none"/>
                <path d="M21.35 11.1H12v2.8h5.35c-.23 1.24-.93 2.29-1.98 2.99l3.19 2.48C20.45 17.64 21.5 15 21.5 12c0-.62-.06-1.23-.15-1.9z" fill="#4285F4"/>
                <path d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.19-2.48C15.09 17.56 13.62 18 12 18c-2.88 0-5.32-1.96-6.19-4.61L2.5 15.87C4.3 19.43 7.87 22 12 22z" fill="#34A853"/>
                <path d="M5.81 13.39C5.59 12.74 5.46 12.04 5.46 11.3s.13-1.44.35-2.09L2.5 6.73C1.85 8.06 1.5 9.5 1.5 11s.35 2.94 1 4.27l3.31-1.88z" fill="#FBBC05"/>
                <path d="M12 5.7c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.87 1 4.3 3.57 2.5 7.13l3.31 1.88C6.68 6.76 9.12 5.7 12 5.7z" fill="#EA4335"/>
              </svg>
              <div>
                <p className="font-playfair text-pearl text-base font-light mb-1">Laisser un avis Google</p>
                <p className="font-cormorant text-pearl/40 text-sm">Votre retour aide d'autres clients à nous découvrir</p>
              </div>
              <span className="font-cormorant text-gold/60 text-xs tracking-widest uppercase group-hover:text-gold transition-colors duration-300">
                Laisser un avis →
              </span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com/huruf.fr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
              className="group bg-night-deep border border-gold/10 hover:border-gold/30 p-8 flex flex-col items-center gap-4 transition-all duration-400"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-pearl/50 group-hover:text-pearl/80 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              <div>
                <p className="font-playfair text-pearl text-base font-light mb-1">Partagez votre tableau</p>
                <p className="font-cormorant text-pearl/40 text-sm">Taguez <span className="text-gold/60">@huruf.fr</span> sur Instagram pour nous montrer votre intérieur</p>
              </div>
              <span className="font-cormorant text-gold/60 text-xs tracking-widest uppercase group-hover:text-gold transition-colors duration-300">
                Suivre @huruf.fr →
              </span>
            </motion.a>
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
                Choisir mon tableau
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
