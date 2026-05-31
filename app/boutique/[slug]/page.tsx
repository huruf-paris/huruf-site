'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Frame, ShoppingBag, ArrowLeft, Mail } from 'lucide-react'
import { getProductBySlug, FORMATS, type Format, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import Button from '@/components/Button'
import Lightbox, { LightboxTrigger } from '@/components/Lightbox'
import { SectionDivider } from '@/components/IslamicOrnament'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: { slug: string }
}

const FORMAT_ORDER: Format[] = ['30x40', '40x50', '50x70']

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const [selectedFormat, setSelectedFormat] = useState<Format>('40x50')
  const [isLot, setIsLot] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [added, setAdded] = useState(false)

  const { addItem, toggleCart } = useCart()

  const currentPrice = isLot
    ? product.prices[selectedFormat].lot3
    : product.prices[selectedFormat].single

  const handleAddToCart = () => {
    addItem({
      product,
      format: selectedFormat,
      isLot,
      quantity: qty,
      unitPrice: currentPrice,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      toggleCart()
    }, 800)
  }

  const related = products
    .filter((p) => p.id !== product.id && !p.isBundle)
    .slice(0, 3)

  return (
    <>
      <div className="pt-24 pb-16 px-6 bg-night min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Fil d'Ariane */}
          <nav className="mb-10">
            <Link
              href="/boutique"
              className="flex items-center gap-2 font-cormorant text-pearl/40 hover:text-gold text-sm tracking-wider uppercase transition-colors duration-300"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Retour à la boutique
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ───── COLONNE IMAGES ───── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Image principale */}
              <div className="relative aspect-[3/4] overflow-hidden bg-night-deep border border-gold/10 group mb-3">
                <Image
                  src={product.images[activeImg]}
                  alt={`${product.nameFr} — tableau de calligraphie arabe`}
                  fill
                  className="object-cover product-image"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <LightboxTrigger onClick={() => setLightboxOpen(true)} />

                {/* Badge bundle */}
                {product.isBundle && (
                  <div className="absolute top-4 left-4 bg-gold/90 text-night px-3 py-1.5 font-cormorant text-sm tracking-widest uppercase font-semibold">
                    {product.bundleSize === 2 ? 'Duo' : 'Trio'}
                  </div>
                )}
              </div>

              {/* Miniatures galerie */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative w-16 h-20 overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                        activeImg === i ? 'border-gold' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Vue ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ───── COLONNE INFOS ───── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="flex flex-col justify-start pt-2"
            >
              {/* En-tête */}
              <div className="mb-8">
                <p className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-2">
                  {product.isBundle ? (product.bundleSize === 2 ? 'Pack duo' : 'Pack trio') : 'Tableau calligraphie'}
                </p>
                <h1 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-3 leading-tight">
                  {product.nameFr}
                </h1>
                {/* Mot arabe + phonétique — conservés sur les pages produit */}
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="font-amiri text-gold text-4xl">{product.nameAr}</span>
                  <span className="font-cormorant text-pearl/40 text-lg italic">
                    {product.transliteration}
                  </span>
                </div>
                <p className="font-cormorant text-teal/70 text-base italic">{product.meaning}</p>
              </div>

              <div className="section-divider mb-8" />

              {/* ── Prix sur demande (duo) ── */}
              {product.prixSurDemande ? (
                <div className="mb-8 bg-night-deep border border-gold/15 p-6">
                  <p className="font-playfair text-pearl text-lg mb-2">Prix sur demande</p>
                  <p className="font-cormorant text-pearl/55 text-base leading-relaxed mb-5">
                    Ce pack duo est vendu à un tarif personnalisé selon le format souhaité. Contactez-nous pour recevoir un devis sous 48h.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" size="md" fullWidth>
                      <Mail size={15} strokeWidth={1.5} className="mr-2" />
                      Demander un devis
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* ── Sélecteur format ── */}
                  {!product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">
                        Format
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {FORMAT_ORDER.map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setSelectedFormat(fmt)}
                            className={`px-5 py-2.5 border font-cormorant text-sm tracking-wider transition-all duration-300 ${
                              selectedFormat === fmt
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-gold/20 text-pearl/60 hover:border-gold/50'
                            }`}
                          >
                            {FORMATS[fmt]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Format pour bundle trio ── */}
                  {product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">
                        Format du pack
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {FORMAT_ORDER.map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setSelectedFormat(fmt)}
                            className={`px-5 py-2.5 border font-cormorant text-sm tracking-wider transition-all duration-300 ${
                              selectedFormat === fmt
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-gold/20 text-pearl/60 hover:border-gold/50'
                            }`}
                          >
                            {FORMATS[fmt]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Affiche seule / Lot de 3 (tableaux simples uniquement) ── */}
                  {!product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">
                        Option
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsLot(false)}
                          className={`flex-1 px-5 py-3 border font-cormorant text-sm tracking-wide transition-all duration-300 ${
                            !isLot
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gold/20 text-pearl/60 hover:border-gold/40'
                          }`}
                        >
                          Affiche seule
                          <span className="block text-xs mt-0.5 opacity-70">
                            {product.prices[selectedFormat].single.toFixed(2).replace('.', ',')} €
                          </span>
                        </button>
                        <button
                          onClick={() => setIsLot(true)}
                          className={`flex-1 px-5 py-3 border font-cormorant text-sm tracking-wide transition-all duration-300 relative ${
                            isLot
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gold/20 text-pearl/60 hover:border-gold/40'
                          }`}
                        >
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold text-night text-[10px] px-2 py-0.5 font-semibold tracking-wider uppercase whitespace-nowrap">
                            Économie
                          </span>
                          Lot de 3
                          <span className="block text-xs mt-0.5 opacity-70">
                            {product.prices[selectedFormat].lot3.toFixed(2).replace('.', ',')} €
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Quantité ── */}
                  <div className="mb-8">
                    <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">
                      Quantité
                    </p>
                    <div className="flex items-center gap-0 border border-gold/20 w-fit">
                      <button
                        onClick={() => qty > 1 && setQty((q) => q - 1)}
                        className="w-11 h-11 font-cormorant text-xl text-pearl/50 hover:text-gold transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-cormorant text-pearl text-lg">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-11 h-11 font-cormorant text-xl text-pearl/50 hover:text-gold transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* ── Prix total ── */}
                  <div className="flex items-end justify-between mb-7">
                    <div>
                      <p className="font-cormorant text-pearl/40 text-sm tracking-widest uppercase mb-1">
                        Total
                      </p>
                      <p className="font-playfair text-gold text-4xl">
                        {(currentPrice * qty).toFixed(2).replace('.', ',')} €
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-pearl/50">
                      <Check size={14} strokeWidth={2} className="text-teal" />
                      <span className="font-cormorant text-sm">Cadre inclus</span>
                    </div>
                  </div>

                  {/* ── Bouton panier ── */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    loading={added}
                  >
                    {added ? (
                      <span className="flex items-center gap-2">
                        <Check size={16} strokeWidth={2} />
                        Ajouté au panier
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingBag size={16} strokeWidth={1.5} />
                        Ajouter au panier
                      </span>
                    )}
                  </Button>
                </>
              )}

              {/* Réassurance */}
              <div className="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-gold/10">
                {[
                  { icon: '✦', label: 'Tracé à la main' },
                  { icon: '✦', label: 'Cadre inclus' },
                  { icon: '✦', label: 'Livraison soignée' },
                ].map(({ icon, label }) => (
                  <div key={label} className="text-center">
                    <span className="text-gold/40 text-xs block mb-1">{icon}</span>
                    <span className="font-cormorant text-pearl/40 text-xs tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ───── DESCRIPTION ───── */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <h2 className="font-playfair text-pearl text-2xl font-light mb-5">
                À propos de cette oeuvre
              </h2>
              <p className="font-cormorant text-pearl/65 text-lg leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            >
              <h2 className="font-playfair text-pearl text-2xl font-light mb-5">
                La calligraphie
              </h2>
              <p className="font-cormorant text-pearl/65 text-lg leading-relaxed mb-6">
                {product.calligraphyDescription}
              </p>
              {/* Mot arabe en grand — uniquement sur les pages produit */}
              <div className="bg-night-deep border border-gold/10 p-6 text-center">
                <p className="font-amiri text-gold text-5xl mb-2">{product.nameAr}</p>
                <p className="font-cormorant text-pearl/40 text-sm tracking-widest uppercase">
                  {product.transliteration} — {product.meaning}
                </p>
              </div>
            </motion.div>
          </div>

          <SectionDivider />

          {/* ───── PRODUITS SIMILAIRES ───── */}
          {related.length > 0 && (
            <div className="mt-4">
              <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-12">
                Vous aimerez aussi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        src={product.images[activeImg]}
        alt={product.nameFr}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
