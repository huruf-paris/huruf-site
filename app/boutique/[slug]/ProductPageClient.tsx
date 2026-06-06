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

export default function ProductPageClient({ params }: PageProps) {
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
              <div className="relative aspect-[3/4] overflow-hidden bg-night-deep border border-gold/10 group mb-3">
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
              <div className="mb-8">
                <p className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-2">
                  {product.isBundle ? (product.bundleSize === 2 ? 'Pack duo' : 'Pack trio') : 'Tableau calligraphie'}
                </p>
                <h1 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-2 leading-tight">
                  {product.nameFr}
                </h1>
                <p className="font-cormorant text-pearl/50 text-lg italic mb-3">
                  Tableau calligraphique encadré, imprimé sur papier d'art premium.
                </p>
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="font-amiri text-gold text-4xl">{product.nameAr}</span>
                  <span className="font-cormorant text-pearl/40 text-lg italic">
                    {product.transliteration}
                  </span>
                </div>
                <p className="font-cormorant text-teal/70 text-base italic mb-4">{product.meaning}</p>

                {/* 3 puces bénéfices visibles immédiatement */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { icon: '✦', text: 'Cadre inclus' },
                    { icon: '✦', text: 'Papier d\'art premium' },
                    { icon: '✦', text: 'Livraison offerte en France' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-gold/5 border border-gold/20 px-3 py-1.5">
                      <span className="text-gold text-xs">{icon}</span>
                      <span className="font-cormorant text-pearl/70 text-sm tracking-wide">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-divider mb-8" />

              {!product.isBundle && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                  className="mb-7 bg-gold/5 border-l-2 border-gold/40 pl-5 py-4 pr-4"
                >
                  <p className="font-cormorant text-gold/60 text-xs tracking-[0.3em] uppercase mb-2">
                    Signification
                  </p>
                  <p className="font-cormorant text-pearl/75 text-lg leading-relaxed italic">
                    {product.description.split('.')[0]}.
                  </p>
                </motion.div>
              )}

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

                  <div className="mb-8">
                    <p className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase mb-3">Quantité</p>
                    <div className="flex items-center gap-0 border border-gold/20 w-fit">
                      <button
                        onClick={() => qty > 1 && setQty((q) => q - 1)}
                        className="w-11 h-11 font-cormorant text-xl text-pearl/50 hover:text-gold transition-colors flex items-center justify-center"
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-cormorant text-pearl text-lg">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-11 h-11 font-cormorant text-xl text-pearl/50 hover:text-gold transition-colors flex items-center justify-center"
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-7">
                    <div>
                      <p className="font-cormorant text-pearl/40 text-sm tracking-widest uppercase mb-1">Total</p>
                      <p className="font-playfair text-gold text-4xl">
                        {(currentPrice * qty).toFixed(2).replace('.', ',')} €
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-pearl/50">
                      <Check size={14} strokeWidth={2} className="text-teal" />
                      <span className="font-cormorant text-sm">Cadre inclus</span>
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

                  {/* ── Réassurance sous le bouton ── */}
                  <div className="mt-4 pt-4 border-t border-gold/10 space-y-3">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {[
                        { icon: '🔒', text: 'Paiement sécurisé' },
                        { icon: '↩', text: 'Retour sous 14 jours' },
                        { icon: '📦', text: 'Emballage soigné' },
                      ].map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5">
                          <span className="text-sm">{icon}</span>
                          <span className="font-cormorant text-pearl/50 text-xs tracking-wide">{text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="font-cormorant text-pearl/30 text-xs text-center tracking-wide">
                      Préparé avec soin à la commande · Expédié sous 3 à 5 jours ouvrés
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                        <span className="font-bold text-white/60 text-xs tracking-wider italic">VISA</span>
                      </div>
                      <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 px-2 py-1.5 rounded">
                        <div className="w-4 h-4 rounded-full bg-red-500/70" />
                        <div className="w-4 h-4 rounded-full bg-yellow-500/70 -ml-1.5" />
                      </div>
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                        <span className="font-bold text-white/60 text-xs tracking-wider">CB</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                        <span className="font-cormorant text-white/60 text-xs font-semibold tracking-wide">stripe</span>
                      </div>
                    </div>
                  </div>

                  {/* ── Témoignages clients ── */}
                  <div className="mt-6 space-y-3">
                    {[
                      { name: 'Fatima A.', note: '⭐⭐⭐⭐⭐', texte: '"Magnifique tableau, le cadre est de très bonne qualité. Livraison rapide et bien emballé. Je recommande !"' },
                      { name: 'Karim M.', note: '⭐⭐⭐⭐⭐', texte: '"Acheté en cadeau pour ma mère, elle a adoré. La calligraphie est vraiment belle."' },
                    ].map(({ name, note, texte }) => (
                      <div key={name} className="bg-gold/5 border border-gold/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-playfair text-pearl/80 text-sm">{name}</span>
                          <span className="text-xs">{note}</span>
                        </div>
                        <p className="font-cormorant text-pearl/55 text-sm leading-relaxed italic">{texte}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-gold/10">
                {[
                  { icon: '✦', label: 'Cadre inclus' },
                  { icon: '✦', label: 'Papier d\'art' },
                  { icon: '✦', label: 'Livraison soignée' },
                ].map(({ icon, label }) => (
                  <div key={label} className="text-center">
                    <span className="text-gold/40 text-xs block mb-1">{icon}</span>
                    <span className="font-cormorant text-pearl/40 text-xs tracking-wide">{label}</span>
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

          {/* ───── POURQUOI CETTE PIÈCE ───── */}
          <div className="mt-4 mb-16 max-w-4xl mx-auto">
            <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-10">
              Pourquoi cette pièce se distingue
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: '🎨', titre: 'Impression de qualité supérieure', texte: 'Imprimé sur papier d\'art épais, les couleurs sont profondes et durables. Un rendu premium visible dès la réception.' },
                { icon: '🖼️', titre: 'Cadre inclus, prêt à accrocher', texte: 'Chaque tableau est livré encadré avec son système d\'accroche. Aucun accessoire supplémentaire nécessaire.' },
                { icon: '✦', titre: 'Composition raffinée', texte: 'Contraste soigné, équilibre visuel travaillé — chaque détail est pensé pour sublimer votre intérieur sans l\'alourdir.' },
                { icon: '🎁', titre: 'Idéal en cadeau', texte: 'Emballage soigné, livraison protégée. Un cadeau islamique unique et mémorable pour toutes les occasions.' },
              ].map(({ icon, titre, texte }) => (
                <div key={titre} className="bg-night-deep border border-gold/10 p-6 flex gap-4">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="font-playfair text-pearl text-base mb-2">{titre}</p>
                    <p className="font-cormorant text-pearl/55 text-base leading-relaxed">{texte}</p>
                  </div>
                </div>
              ))}
            </div>
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
