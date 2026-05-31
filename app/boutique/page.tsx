'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { SectionDivider } from '@/components/IslamicOrnament'
import { products, type Format } from '@/data/products'

const ALL_FORMATS: { value: Format | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous les formats' },
  { value: '30x40', label: '30 × 40 cm' },
  { value: '40x50', label: '40 × 50 cm' },
  { value: '50x70', label: '50 × 70 cm' },
]

export default function BoutiquePage() {
  const [activeFormat, setActiveFormat] = useState<Format | 'all'>('all')

  const singles = products.filter((p) => !p.isBundle)
  const bundles = products.filter((p) => p.isBundle)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-night text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-pearl text-5xl md:text-6xl font-light mb-4"
          >
            La Boutique
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="font-cormorant text-pearl/55 text-xl italic leading-relaxed"
          >
            Tableaux de calligraphie arabe tracés à la main, encadrés avec soin.
            <br />
            Choisissez l'oeuvre qui vous ressemble.
          </motion.p>
        </div>
      </section>

      {/* Filtres */}
      <div className="sticky top-[60px] z-30 bg-night/95 backdrop-blur-md border-b border-gold/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="font-cormorant text-pearl/40 text-sm tracking-widest uppercase flex-shrink-0 mr-2">
              Format :
            </span>
            {ALL_FORMATS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveFormat(value)}
                className={`flex-shrink-0 px-5 py-2 font-cormorant text-sm tracking-wider uppercase border transition-all duration-300 ${
                  activeFormat === value
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold/20 text-pearl/50 hover:border-gold/40 hover:text-pearl/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ───── Tableaux simples ───── */}
      <section className="pt-14 pb-6 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-playfair text-pearl text-2xl font-light mb-8 border-b border-gold/10 pb-4"
          >
            Tableaux individuels
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {singles.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ───── Packs / Bundles ───── */}
      <section className="py-14 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8 border-b border-gold/10 pb-4"
          >
            <h2 className="font-playfair text-pearl text-2xl font-light">
              Packs &amp; Collections
            </h2>
            <p className="font-cormorant text-pearl/45 text-base mt-1 italic">
              Des associations choisies pour créer une composition murale harmonieuse.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Bloc sur mesure */}
      <section className="py-16 px-6 bg-night">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center py-16 border border-gold/10"
          >
            <h2 className="font-playfair text-pearl text-2xl md:text-3xl font-light mb-3">
              Vous cherchez un mot précis ?
            </h2>
            <p className="font-cormorant text-pearl/55 text-lg italic mb-8 max-w-md mx-auto">
              Faites une commande sur mesure — nous calligraphierons le mot de votre choix en 3 à 4 semaines.
            </p>
            <a
              href="/sur-mesure"
              className="inline-flex items-center gap-3 font-cormorant text-gold border border-gold/40 px-8 py-3.5 tracking-widest uppercase text-sm hover:bg-gold/5 hover:border-gold transition-all duration-300"
            >
              Demander une création personnalisée
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
