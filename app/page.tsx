'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldenParticles from '@/components/GoldenParticles'
import { SectionDivider } from '@/components/IslamicOrnament'
import SectionTitle from '@/components/SectionTitle'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import { getFeaturedProducts } from '@/data/products'

const VALUES = [
  {
    title: 'Authenticité',
    desc: "Chaque composition est créée avec soin, en s'inspirant des grands styles classiques de la calligraphie arabe — Naskh, Thuluth, Diwani. Un travail de design ancré dans une tradition millénaire.",
  },
  {
    title: 'Qualité',
    desc: "Imprimé sur papier d'art de qualité premium, cadre noble inclus. Un soin minutieux à chaque étape, de la composition jusqu'au clou dans votre mur.",
  },
  {
    title: 'Élégance',
    desc: "La calligraphie arabe est l'un des arts les plus raffinés du monde. Nos tableaux apportent cette élégance millénaire dans les intérieurs contemporains.",
  },
]


export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-night"
      >
        <GoldenParticles />

        {/* ── Colonne gauche : contenu brand ── */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[54%] px-8 sm:px-14 lg:px-20 xl:px-28 pt-32 pb-10 lg:pt-0 lg:pb-0 lg:min-h-screen">

          {/* Ligne verticale dorée décorative */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-40 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          {/* Catégorie */}
          <p className="hero-tag font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-6">
            Calligraphie arabe encadrée · Paris
          </p>

          {/* Titre — LCP element, rendu immédiatement */}
          <h1 className="hero-title font-playfair text-pearl text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none mb-3">
            Hurûf
          </h1>

          {/* Nom arabe de marque */}
          <div className="hero-ar mb-8">
            <span className="font-amiri text-gold text-3xl sm:text-4xl">حروف</span>
          </div>

          {/* Ligne dorée */}
          <div className="hero-line w-16 h-px bg-gold/50 mb-8" />

          {/* Sous-titre */}
          <p className="hero-sub font-cormorant text-pearl/65 text-xl sm:text-2xl font-light italic mb-10 max-w-sm leading-relaxed">
            L'art de la calligraphie arabe,<br className="hidden sm:block" /> encadré pour votre intérieur.
          </p>

          {/* CTA */}
          <div className="hero-cta flex flex-col sm:flex-row gap-3">
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
          <div className="hero-scroll absolute bottom-10 left-8 sm:left-14 lg:left-20 xl:left-28 flex items-center gap-3">
            <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
            <span className="font-cormorant text-pearl/25 text-xs tracking-widest uppercase">
              Défiler
            </span>
          </div>
        </div>

        {/* ── Colonne droite : image ── */}
        <div className="w-full aspect-[4/3] lg:aspect-auto lg:w-[46%] lg:min-h-screen relative">
          <Image
            src="/images/products/duo-bismi-3.png"
            alt="Tableaux Hurûf dans un intérieur contemporain"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            quality={75}
          />
          {/* Fondu gauche pour fusionner avec le fond dark */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-night to-transparent z-10" />
          {/* Léger voile pour les contrastes */}
          <div className="absolute inset-0 bg-night/15" />
          {/* Cadre subtil doré en bas à droite */}
          <div className="absolute bottom-12 right-12 w-24 h-24 border border-gold/20 z-10 pointer-events-none" />
        </div>
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
      <section className="py-20 bg-night">
        <div className="max-w-7xl mx-auto">
          <div className="px-6">
            <SectionTitle
              frenchTitle="Oeuvres phares"
              subtitle="Une sélection de nos tableaux les plus demandés"
            />
          </div>

          {/* ── Mobile : carrousel horizontal snap ── */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pl-6 pr-6 pb-4">
              {featured.map((product, i) => (
                <div
                  key={product.id}
                  className="flex-none w-[78vw] snap-center"
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
            {/* Indicateur de swipe */}
            <div className="flex justify-center gap-1.5 mt-4 px-6">
              {featured.map((_, i) => (
                <div
                  key={i}
                  className={`h-px transition-all duration-300 ${i === 0 ? 'w-6 bg-gold/60' : 'w-3 bg-gold/20'}`}
                />
              ))}
            </div>
            <p className="text-center font-cormorant text-pearl/25 text-xs tracking-widest uppercase mt-3 px-6">
              Glisser pour découvrir →
            </p>
          </div>

          {/* ── Tablette / Desktop : grille ── */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mt-14 px-6"
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

      {/* ═══════════════════════ AVIS CLIENTS ═══════════════════════ */}
      <section className="py-24 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            frenchTitle="Ils ont choisi Hurûf"
            subtitle="Ce que nos premiers clients en disent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                quote: "Très beau tableau, rapport qualité prix très intéressant.",
                author: 'N.',
                location: 'France',
                date: 'Il y a 2 jours',
                stars: 5,
                initial: 'N',
              },
              {
                quote: "Parfait, très satisfait, professionnel et soigné, envoi rapide.",
                author: 'Naomie P.',
                location: 'France',
                date: 'Il y a 4 mois',
                stars: 5,
                initial: 'N',
              },
              {
                quote: "Merci parfait et très bien emballé !",
                author: 'Z.',
                location: 'France',
                date: 'Il y a 3 mois',
                stars: 5,
                initial: 'Z',
              },
              {
                quote: "Impec, arrivé avant le délai prévu. Je recommande !",
                author: 'P.',
                location: 'France',
                date: 'Il y a 4 mois',
                stars: 5,
                initial: 'P',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="bg-night-deep border border-gold/10 p-6 flex flex-col gap-4 hover:border-gold/25 transition-colors duration-400"
              >
                {/* Étoiles */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <svg key={s} viewBox="0 0 12 12" className="w-3 h-3 fill-gold">
                      <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z" />
                    </svg>
                  ))}
                </div>
                {/* Citation */}
                <blockquote className="font-cormorant text-pearl/70 text-base leading-relaxed flex-1 italic">
                  "{t.quote}"
                </blockquote>
                {/* Auteur */}
                <div className="border-t border-gold/8 pt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-gold text-sm font-semibold">{t.initial}</span>
                  </div>
                  <div>
                    <p className="font-playfair text-pearl text-sm">{t.author}</p>
                    <p className="font-cormorant text-pearl/35 text-xs">{t.location} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lien vers Google */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <a
              href="/contact"
              className="font-cormorant text-pearl/35 text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              Vous avez commandé ? Partagez votre avis →
            </a>
          </motion.div>
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
