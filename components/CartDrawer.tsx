'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2, ShoppingBag, Lock, Tag, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { FORMATS } from '@/data/products'
import Button from './Button'
import { trackBeginCheckout } from '@/lib/analytics'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    // ── begin_checkout ──
    trackBeginCheckout({
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.nameFr,
        format: FORMATS[item.format],
        price: item.unitPrice,
        quantity: item.quantity,
        isLot: item.isLot,
      })),
      total: subtotal,
    })
    try {
      // On n'envoie QUE de quoi identifier l'article — le prix est
      // recalculé côté serveur depuis le catalogue (sécurité).
      const payload = items.map((item) => ({
        id: item.product.id,
        format: item.format,
        isLot: item.isLot,
        quantity: item.quantity,
        frameColor: item.frameColor,
      }))

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  // Articles éligibles à l'upsell lot de 3 (tableau simple, non-bundle)
  const upsellItems = items.filter((item) => !item.isLot && !item.product.isBundle && !item.product.prixSurDemande)
  const hasUpsell = upsellItems.length > 0

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-night/70 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-night-deep border-l border-gold/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-gold" />
                <h2 className="font-playfair text-pearl text-base">
                  Mon panier{' '}
                  {itemCount > 0 && (
                    <span className="text-gold/60 text-sm">({itemCount})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-pearl/40 hover:text-gold transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Code promo HURUF10 ── */}
            {items.length > 0 && (
              <div className="mx-4 mt-3 flex items-center gap-3 bg-gold/8 border border-gold/25 px-4 py-2.5">
                <Tag size={14} strokeWidth={1.5} className="text-gold flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-gold text-sm tracking-wide">
                    Code <span className="font-semibold">HURUF10</span> — −10% sur votre commande
                  </p>
                  <p className="font-cormorant text-pearl/35 text-xs">À saisir lors du paiement</p>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <span className="font-amiri text-gold/20 text-6xl">حروف</span>
                  <p className="font-cormorant text-pearl/40 text-lg italic">
                    Votre panier est vide.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-cormorant text-sm tracking-widest uppercase border border-gold/30 text-pearl/60 px-5 py-2.5 hover:border-gold/60 hover:text-pearl transition-all duration-300"
                  >
                    Découvrir la collection
                  </button>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gold/8">
                    {items.map((item) => (
                      <li
                        key={`${item.product.id}-${item.format}-${item.isLot}`}
                        className="flex gap-4 px-5 py-4"
                      >
                        {/* Image */}
                        <div className="relative w-14 h-18 flex-shrink-0 bg-night overflow-hidden border border-gold/10" style={{ height: '4.5rem' }}>
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.nameFr}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>

                        {/* Détails */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="font-playfair text-pearl text-sm leading-snug">
                                {item.product.nameFr}
                              </p>
                              <p className="font-cormorant text-pearl/35 text-xs tracking-wide mt-0.5">
                                {FORMATS[item.format]} · {item.isLot ? 'Lot de 3' : 'Tableau encadré'}
                                {item.frameColor && ` · Cadre ${item.frameColor}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.format, item.isLot)}
                              className="text-pearl/20 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                              aria-label="Supprimer"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Quantité & prix */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-0 border border-gold/20">
                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  updateQuantity(item.product.id, item.format, item.isLot, item.quantity - 1)
                                }
                                className="w-6 h-6 text-pearl/40 hover:text-gold flex items-center justify-center font-cormorant text-base transition-colors"
                              >−</button>
                              <span className="font-cormorant text-pearl text-sm w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.format, item.isLot, item.quantity + 1)
                                }
                                className="w-6 h-6 text-pearl/40 hover:text-gold flex items-center justify-center font-cormorant text-base transition-colors"
                              >+</button>
                            </div>
                            <p className="font-playfair text-gold text-sm">
                              {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')} €
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* ── Upsell : Lot de 3 ── */}
                  {hasUpsell && (
                    <div className="mx-4 mt-3 bg-night border border-gold/20 p-4">
                      <p className="font-cormorant text-gold text-xs tracking-widest uppercase mb-1">
                        Offre groupée
                      </p>
                      <p className="font-playfair text-pearl text-sm mb-1">
                        Prenez 3 tableaux et économisez
                      </p>
                      <p className="font-cormorant text-pearl/50 text-xs leading-relaxed mb-3">
                        Le lot de 3 tableaux est disponible à prix réduit sur chaque page produit.
                        Parfait pour décorer un mur ou offrir en cadeau.
                      </p>
                      <Link
                        href="/boutique"
                        onClick={closeCart}
                        className="flex items-center justify-between font-cormorant text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors"
                      >
                        Voir les offres groupées
                        <ChevronRight size={13} strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold/10 px-5 pt-4 pb-5 space-y-3">

                {/* Sous-total */}
                <div className="flex justify-between items-center">
                  <span className="font-cormorant text-pearl/55 text-base tracking-wide">Sous-total</span>
                  <span className="font-playfair text-pearl text-xl">
                    {subtotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>

                {/* Livraison */}
                <div className="flex justify-between items-center">
                  <span className="font-cormorant text-pearl/40 text-sm">Livraison</span>
                  <span className="font-cormorant text-teal/70 text-sm font-semibold">Offerte</span>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-gold/10" />

                {/* Garanties */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: '🔒', text: 'Paiement\nsécurisé' },
                    { icon: '📦', text: 'Livraison\nofferte' },
                    { icon: '↩', text: 'Retour\n14 jours' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex flex-col items-center gap-1 bg-night/60 border border-gold/8 py-2 px-1">
                      <span className="text-base">{icon}</span>
                      <span className="font-cormorant text-pearl/40 text-[10px] tracking-wide text-center leading-tight whitespace-pre-line">{text}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="font-cormorant text-red-400 text-sm text-center">{error}</p>
                )}

                {/* CTA */}
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleCheckout}
                  loading={loading}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Lock size={14} strokeWidth={1.5} />
                    {loading ? 'Redirection...' : 'Payer en sécurité'}
                  </span>
                </Button>

                {/* Logos paiement */}
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-white/30 text-[11px] tracking-wider italic border border-white/10 px-2 py-1 rounded">VISA</span>
                  <span className="font-bold text-white/30 text-[11px] tracking-wider border border-white/10 px-2 py-1 rounded">CB</span>
                  <span className="text-white/30 text-[11px] border border-white/10 px-2 py-1 rounded font-cormorant">Mastercard</span>
                  <span className="text-white/25 text-[11px] border border-white/10 px-2 py-1 rounded font-cormorant italic">stripe</span>
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
