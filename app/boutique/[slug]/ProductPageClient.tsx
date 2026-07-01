'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ShoppingBag, ArrowLeft, Mail, Lock, RotateCcw, Package } from 'lucide-react'
import { getProductBySlug, FORMATS, type Format, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import Button from '@/components/Button'
import Lightbox, { LightboxTrigger } from '@/components/Lightbox'
import { SectionDivider } from '@/components/IslamicOrnament'
import ProductCard from '@/components/ProductCard'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { trackViewItem, trackAddToCart } from '@/lib/analytics'
import { isPromoActive, promoPrice, formatPrice, PROMO_DISCOUNT, PROMO_END } from '@/lib/promo'

const FRAMES = [
  { id: 'bois',  label: 'Bois naturel', bg: '#C4A06A', ring: 'ring-[#C4A06A]' },
  { id: 'noir',  label: 'Noir',          bg: '#1C1C1C', ring: 'ring-[#1C1C1C]' },
  { id: 'dore',  label: 'Doré',          bg: '#C9A030', ring: 'ring-[#C9A030]' },
  { id: 'blanc', label: 'Blanc',         bg: '#F0EDE8', ring: 'ring-[#F0EDE8]' },
] as const

type FrameId = typeof FRAMES[number]['id']

const PRODUCT_TESTIMONIALS = [
  { quote: "Magnifique tableau, le cadre est de très bonne qualité. Livraison rapide et bien emballé. Je recommande !", author: 'Fatima A.', location: 'France', date: 'Juin 2026', stars: 5, initial: 'F' },
  { quote: "Acheté en cadeau pour ma mère, elle a adoré. La calligraphie est vraiment belle.", author: 'Karim M.', location: 'France', date: 'Juin 2026', stars: 5, initial: 'K' },
  { quote: "Parfait, très satisfait, professionnel et soigné, envoi rapide.", author: 'Naomie P.', location: 'France', date: 'Mars 2026', stars: 5, initial: 'N' },
  { quote: "Impec, arrivé avant le délai prévu. Très beau rendu, ça fait un super cadeau !", author: 'P.', location: 'France', date: 'Avril 2026', stars: 5, initial: 'P' },
  { quote: "Jolie tableau, livraison rapide, très contente de ma commande. Je vous le recommande…", author: 'Anlabati Moussa', location: 'France', date: 'Juin 2026', stars: 5, initial: 'A', source: 'Google' as const },
]

interface PageProps {
  params: { slug: string }
}

const FORMAT_ORDER: Format[] = ['30x40', '40x50', '50x70']

export default function ProductPageClient({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const [selectedFormat, setSelectedFormat] = useState<Format>('40x50')
  const [isLot, setIsLot] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [frameColor, setFrameColor] = useState<FrameId>('bois')

  const { addItem, toggleCart } = useCart()

  const basePrice = isLot
    ? product.prices[selectedFormat].lot3
    : product.prices[selectedFormat].single
  const promoActive = isPromoActive()
  const currentPrice = promoActive ? promoPrice(basePrice) : basePrice

  // ── view_item au chargement de la page produit ──
  useEffect(() => {
    trackViewItem({
      productId: product.id,
      productName: product.nameFr,
      format: FORMATS[selectedFormat],
      price: currentPrice,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddToCart = () => {
    const frame = FRAMES.find(f => f.id === frameColor)
    // ── add_to_cart ──
    trackAddToCart({
      productId: product.id,
      productName: product.nameFr,
      format: FORMATS[selectedFormat],
      price: currentPrice,
      quantity: qty,
      isLot,
      frameColor: frame?.label,
    })
    addItem({
      product,
      format: selectedFormat,
      isLot,
      quantity: qty,
      unitPrice: currentPrice,
      frameColor: frame?.label,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      toggleCart()
    }, 800)
  }

  // Produits liés — on prend les 3 suivants dans le catalogue (en bouclant),
  // pour que CHAQUE produit (y compris les packs) reçoive des liens internes.
  // Maillage homogène = meilleure découverte/indexation par Google.
  const relatedStart = products.findIndex((p) => p.id === product.id)
  const related = [1, 2, 3].map((k) => products[(relatedStart + k) % products.length])

  return (
    <>
      {/* ── Barre sticky mobile — toujours visible ── */}
      {!product.prixSurDemande && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-night-deep border-t border-gold/20 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex-1 min-w-0">
            <p className="font-cormorant text-pearl/50 text-xs tracking-widest uppercase truncate">
              {FORMATS[selectedFormat]} · {isLot ? 'Lot de 3' : 'Tableau encadré'}
            </p>
            <p className="font-playfair text-gold text-xl leading-tight">
              {(currentPrice * qty).toFixed(2).replace('.', ',')} €
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-shrink-0 bg-gold text-night font-cormorant text-sm tracking-widest uppercase px-5 py-3 flex items-center gap-2 hover:bg-gold/90 transition-colors duration-200"
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={2} />
                Ajouté
              </>
            ) : (
              <>
                <ShoppingBag size={14} strokeWidth={1.5} />
                Ajouter au panier
              </>
            )}
          </button>
        </div>
      )}

      {/* Padding bottom sur mobile pour compenser la barre sticky */}
      <div className="pt-40 pb-24 lg:pb-16 px-6 bg-night min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Fil d'Ariane */}
          <nav className="mb-10" aria-label="Fil d'Ariane">
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
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5] overflow-hidden bg-night-deep border border-gold/10 group mb-3">
                <Image
                  src={product.images[activeImg]}
                  alt={`${product.nameFr} — tableau de calligraphie arabe encadré`}
                  fill
                  className="object-cover product-image"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <LightboxTrigger onClick={() => setLightboxOpen(true)} />

                {product.isBundle && (
                  <div className="absolute top-4 left-4 bg-gold/90 text-night px-3 py-1.5 font-cormorant text-sm tracking-widest uppercase font-semibold">
                    {product.bundleSize === 2 ? 'Duo' : 'Trio'}
                  </div>
                )}
              </div>

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
                        alt={`Vue ${i + 1} — ${product.nameFr}`}
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
              <div className="mb-5">
                <h1 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-1 leading-tight">
                  {product.nameFr}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-amiri text-gold text-3xl">{product.nameAr}</span>
                  <span className="font-cormorant text-pearl/40 text-base italic">{product.transliteration} — {product.meaning}</span>
                </div>
                {/* Étoiles avis */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-gold"><path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z" /></svg>
                    ))}
                  </div>
                  <span className="font-cormorant text-pearl/40 text-sm">24 avis clients</span>
                </div>
              </div>

              <div className="section-divider mb-5" />

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
                  {/* ── Couleur du cadre ── */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase">Couleur du cadre</p>
                      <p className="font-cormorant text-gold text-sm">
                        {FRAMES.find(f => f.id === frameColor)?.label}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      {FRAMES.map((frame) => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameColor(frame.id)}
                          title={frame.label}
                          className={`relative w-10 h-10 transition-all duration-300 ${
                            frameColor === frame.id
                              ? 'ring-2 ring-gold ring-offset-2 ring-offset-night-deep scale-110'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          } ${frame.id === 'blanc' ? 'border border-gold/20' : ''}`}
                          style={{ backgroundColor: frame.bg }}
                          aria-label={frame.label}
                          aria-pressed={frameColor === frame.id}
                        >
                          {frameColor === frame.id && (
                            <span className={`absolute inset-0 flex items-center justify-center`}>
                              <Check size={14} strokeWidth={2.5} className={frame.id === 'blanc' || frame.id === 'bois' ? 'text-night' : 'text-white'} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="font-cormorant text-pearl/25 text-xs mt-2 tracking-wide">
                      Cadre en bois, prêt à accrocher — livré avec le tableau
                    </p>
                  </div>

                  {!product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">Format</p>
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

                  {product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">Format du pack</p>
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

                  {!product.isBundle && (
                    <div className="mb-7">
                      <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">Option</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsLot(false)}
                          className={`flex-1 px-5 py-3 border font-cormorant text-sm tracking-wide transition-all duration-300 ${
                            !isLot
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gold/20 text-pearl/60 hover:border-gold/40'
                          }`}
                        >
                          Tableau encadré
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
                            Économisez {((product.prices[selectedFormat].single * 3) - product.prices[selectedFormat].lot3).toFixed(0)} €
                          </span>
                          Lot de 3
                          <span className="block text-xs mt-0.5 opacity-70">
                            {product.prices[selectedFormat].lot3.toFixed(2).replace('.', ',')} € <span className="line-through opacity-50">{(product.prices[selectedFormat].single * 3).toFixed(2).replace('.', ',')} €</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Prix + stock */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      {promoActive && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-red-500 text-white text-xs font-cormorant tracking-widest uppercase px-2 py-0.5">
                            -{Math.round(PROMO_DISCOUNT * 100)}% cette semaine
                          </span>
                          <span className="font-cormorant text-pearl/35 text-xs line-through">
                            {formatPrice(basePrice)} €
                          </span>
                        </div>
                      )}
                      <p className={`font-playfair text-5xl leading-none ${promoActive ? 'text-red-400' : 'text-gold'}`}>
                        {formatPrice(currentPrice)} €
                      </p>
                      <p className="font-cormorant text-pearl/35 text-xs tracking-wide mt-1">Cadre inclus · Livraison offerte en Europe</p>
                      {promoActive && (
                        <p className="font-cormorant text-red-400/70 text-xs mt-1">
                          Offre valable jusqu'au {PROMO_END.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 bg-teal/10 border border-teal/20 px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal/70 animate-pulse" />
                      <span className="font-cormorant text-teal/80 text-xs tracking-wide">En stock</span>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart} loading={added}>
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

                  {/* ── Réassurance ── */}
                  <div className="mt-3 flex items-center justify-center gap-6 flex-wrap border-t border-gold/10 pt-3">
                    {[
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <rect x="3" y="6" width="8" height="6" rx="0.5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75"/>
                            <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" strokeLinecap="round"/>
                            <circle cx="7" cy="9" r="0.8" fill="#D4AF37" fillOpacity="0.75"/>
                          </svg>
                        ),
                        text: 'Paiement sécurisé'
                      },
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M11 7A4 4 0 1 1 4.5 3.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" strokeLinecap="round"/>
                            <path d="M4 1.5 4.5 3.8 6.8 3.3" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ),
                        text: 'Retour 14 jours'
                      },
                      {
                        icon: (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <rect x="1.5" y="5.5" width="11" height="7" rx="0.5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75"/>
                            <path d="M4.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" strokeLinecap="round"/>
                            <path d="M1.5 8h11" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.5"/>
                            <path d="M7 5.5v7" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.5"/>
                          </svg>
                        ),
                        text: 'Expédié sous 3–5 jours'
                      },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-1.5">
                        {icon}
                        <span className="font-cormorant text-pearl/45 text-xs tracking-wide">{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* ── Témoignages auto-défilants ── */}
                  <div className="mt-5 pt-4 border-t border-gold/10">
                    <TestimonialsCarousel testimonials={PRODUCT_TESTIMONIALS} interval={3800} />
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* ───── POURQUOI CETTE PIÈCE ───── */}
          <div className="mt-20 mb-16 max-w-4xl mx-auto">
            <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-10">
              Pourquoi cette pièce se distingue
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      {/* Feuille / impression — calligraphie sur parchemin */}
                      <rect x="4" y="2" width="12" height="15" rx="0.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.85"/>
                      <path d="M7 6h8M7 9h8M7 12h5" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.6" strokeLinecap="round"/>
                      <path d="M13 16l2.5 3.5" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.5" strokeLinecap="round"/>
                      <path d="M4 19h6" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round"/>
                    </svg>
                  ),
                  titre: "Impression de qualité supérieure",
                  texte: "Imprimé sur papier d\"art épais, les couleurs sont profondes et durables. Un rendu premium visible dès la réception."
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      {/* Cadre géométrique */}
                      <rect x="2" y="2" width="18" height="18" rx="0.8" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.85"/>
                      <rect x="5" y="5" width="12" height="12" rx="0.4" stroke="#D4AF37" strokeWidth="0.7" strokeOpacity="0.45"/>
                      <path d="M2 2l3 3M20 2l-3 3M2 20l3-3M20 20l-3-3" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round"/>
                    </svg>
                  ),
                  titre: "Cadre inclus, prêt à accrocher",
                  texte: "Chaque tableau est livré encadré avec son système d\"accroche. Aucun accessoire supplémentaire nécessaire."
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      {/* Étoile islamique à 8 branches — motif géométrique */}
                      <polygon points="11,2 12.8,9.2 20,11 12.8,12.8 11,20 9.2,12.8 2,11 9.2,9.2" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.85" fill="none"/>
                      <polygon points="11,5 12.2,9.8 17,11 12.2,12.2 11,17 9.8,12.2 5,11 9.8,9.8" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.4" fill="none"/>
                      <circle cx="11" cy="11" r="1.5" fill="#D4AF37" fillOpacity="0.7"/>
                    </svg>
                  ),
                  titre: "Composition raffinée",
                  texte: "Contraste soigné, équilibre visuel travaillé — chaque détail est pensé pour sublimer votre intérieur sans l\"alourdir."
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      {/* Cadeau / boîte ornée */}
                      <rect x="3" y="9" width="16" height="11" rx="0.6" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.85"/>
                      <path d="M3 12h16" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
                      <path d="M11 9v11" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5"/>
                      <path d="M11 9c0 0-3-4 0-6 1.5-1 3 0 3 2s-3 4-3 4z" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.75" fill="none"/>
                      <path d="M11 9c0 0 3-4 0-6-1.5-1-3 0-3 2s3 4 3 4z" stroke="#D4AF37" strokeWidth="0.9" strokeOpacity="0.75" fill="none"/>
                    </svg>
                  ),
                  titre: "Idéal en cadeau",
                  texte: "Emballage soigné, livraison protégée. Un cadeau islamique unique et mémorable pour toutes les occasions."
                },
              ].map(({ icon, titre, texte }) => (
                <div key={titre} className="bg-night-deep border border-gold/10 p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 rotate-45 border border-gold/25 bg-gold/5 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.08)]">
                    <div className="-rotate-45">{icon}</div>
                  </div>
                  <div>
                    <p className="font-playfair text-pearl text-base mb-2">{titre}</p>
                    <p className="font-cormorant text-pearl/55 text-base leading-relaxed">{texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* ───── DESCRIPTION ───── */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <h2 className="font-playfair text-pearl text-2xl font-light mb-5">À propos de cette oeuvre</h2>
              <p className="font-cormorant text-pearl/65 text-lg leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            >
              <h2 className="font-playfair text-pearl text-2xl font-light mb-5">La calligraphie</h2>
              <p className="font-cormorant text-pearl/65 text-lg leading-relaxed mb-6">
                {product.calligraphyDescription}
              </p>
              <div className="bg-night-deep border border-gold/10 p-6 text-center">
                <p className="font-amiri text-gold text-5xl mb-2">{product.nameAr}</p>
                <p className="font-cormorant text-pearl/40 text-sm tracking-widest uppercase">
                  {product.transliteration} — {product.meaning}
                </p>
              </div>
            </motion.div>
          </div>

          <SectionDivider />

          {/* ───── FAQ ───── */}
          <div className="mt-4 mb-16">
            <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-10">
              Questions fréquentes
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-gold/10">
              {[
                {
                  q: "Le cadre est-il inclus dans le prix ?",
                  a: "Oui, chaque tableau est livré encadré, prêt à accrocher. Le cadre en bois naturel est inclus dans le prix affiché — aucun frais supplémentaire.",
                },
                {
                  q: "Quels sont les délais de livraison ?",
                  a: "Les commandes sont expédiées sous 3 à 5 jours ouvrés. La livraison en France métropolitaine prend ensuite 2 à 4 jours. Vous recevez un email de suivi dès l'expédition.",
                },
                {
                  q: "Quelle est la différence entre les formats ?",
                  a: "Le 30×40 cm est idéal pour une petite surface ou un bureau. Le 40×50 cm est notre format le plus populaire — parfait au-dessus d'un canapé ou dans un couloir. Le 50×70 cm crée un effet statement dans un salon ou une chambre.",
                },
                {
                  q: "Puis-je retourner mon tableau si je ne suis pas satisfait ?",
                  a: "Oui, vous disposez de 14 jours après réception pour retourner votre commande. Le tableau doit être dans son emballage d'origine, non endommagé. Le remboursement est effectué sous 7 jours.",
                },
                {
                  q: "Le paiement est-il sécurisé ?",
                  a: "Absolument. Le paiement est traité par Stripe, l'un des leaders mondiaux du paiement en ligne. Toutes vos données bancaires sont chiffrées et sécurisées — nous n'y avons jamais accès.",
                },
                {
                  q: "Puis-je commander un tableau avec un mot personnalisé ?",
                  a: "Oui ! Notre service sur mesure vous permet de commander la calligraphie du mot ou de la phrase de votre choix. Délai de création : 2 à 3 semaines. Demandez un devis gratuit sur notre page Sur Mesure.",
                },
              ].map(({ q, a }, i) => (
                <details key={i} className="group py-5 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none">
                    <span className="font-playfair text-pearl text-base">{q}</span>
                    <span className="text-gold/50 group-open:rotate-45 transition-transform duration-300 flex-shrink-0 text-xl">+</span>
                  </summary>
                  <p className="font-cormorant text-pearl/55 text-base leading-relaxed mt-3 pr-8">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <SectionDivider />

          {related.length > 0 && (
            <div className="mt-4">
              <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-12">Vous aimerez aussi</h2>
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
