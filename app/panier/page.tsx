'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, ShoppingBag, Package, CreditCard, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { FORMATS } from '@/data/products'
import Button from '@/components/Button'
import { SectionDivider } from '@/components/IslamicOrnament'

// TODO: Importer et configurer Stripe : voir /lib/stripe.ts
// TODO: Importer et configurer PayPal : voir /lib/paypal.ts

export default function PanierPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [loadingStripe, setLoadingStripe] = useState(false)
  const [loadingPaypal, setLoadingPaypal] = useState(false)

  const handleStripeCheckout = async () => {
    setLoadingStripe(true)
    try {
      // TODO: Appeler votre API route /api/checkout/stripe
      // const stripe = await getStripe()
      // const res = await fetch('/api/checkout/stripe', { method: 'POST', body: JSON.stringify({ items }) })
      // const { sessionId } = await res.json()
      // await stripe?.redirectToCheckout({ sessionId })
      alert('Intégration Stripe à configurer — voir /lib/stripe.ts et NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY dans .env.local')
    } finally {
      setLoadingStripe(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-night flex flex-col items-center justify-center px-6 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-sm"
        >
          <span className="font-amiri text-gold/20 text-8xl block mb-6">حروف</span>
          <ShoppingBag size={48} strokeWidth={1} className="text-gold/30 mx-auto mb-5" />
          <h1 className="font-playfair text-pearl text-3xl font-light mb-3">
            Votre panier est vide
          </h1>
          <p className="font-cormorant text-pearl/50 text-lg italic mb-10">
            Découvrez nos tableaux de calligraphie arabe et trouvez l'œuvre qui vous parle.
          </p>
          <Link href="/boutique">
            <Button variant="primary" size="lg">
              Voir la collection
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-night pt-40 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/boutique"
            className="flex items-center gap-2 font-cormorant text-pearl/40 hover:text-gold text-sm tracking-wider uppercase transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Continuer mes achats
          </Link>
          <h1 className="font-playfair text-pearl text-4xl md:text-5xl font-light">
            Mon Panier
          </h1>
          <p className="font-cormorant text-pearl/40 text-lg mt-1 italic">
            {items.length} article{items.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===== LISTE ARTICLES ===== */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.format}-${item.isLot}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                className="flex gap-5 bg-night-deep border border-gold/10 p-5 hover:border-gold/20 transition-colors duration-300"
              >
                {/* Image */}
                <div className="relative w-20 h-26 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.nameFr}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-playfair text-pearl text-lg">
                        {item.product.nameFr}
                      </h3>
                      <p className="font-amiri text-gold/70 text-xl">{item.product.nameAr}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="font-cormorant text-pearl/40 text-sm tracking-wide">
                          {FORMATS[item.format]}
                        </span>
                        <span className="text-pearl/20">·</span>
                        <span className="font-cormorant text-pearl/40 text-sm">
                          {item.isLot ? 'Lot de 3' : 'Tableau encadré'}
                        </span>
                        <span className="text-pearl/20">·</span>
                        <span className="font-cormorant text-teal/60 text-sm flex items-center gap-1">
                          <Package size={12} strokeWidth={1.5} />
                          Cadre inclus
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.format, item.isLot)}
                      className="text-pearl/20 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantité */}
                    <div className="flex items-center border border-gold/20">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.product.id, item.format, item.isLot, item.quantity - 1)
                        }
                        className="w-9 h-9 text-pearl/40 hover:text-gold transition-colors font-cormorant text-lg flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-cormorant text-pearl">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.format, item.isLot, item.quantity + 1)
                        }
                        className="w-9 h-9 text-pearl/40 hover:text-gold transition-colors font-cormorant text-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    {/* Prix */}
                    <p className="font-playfair text-gold text-xl">
                      {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')} €
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="font-cormorant text-pearl/25 hover:text-pearl/50 text-sm tracking-wide transition-colors duration-300 mt-2"
            >
              Vider le panier
            </button>
          </div>

          {/* ===== RÉCAPITULATIF ===== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="lg:sticky lg:top-28 h-fit bg-night-deep border border-gold/15 p-7"
          >
            <h2 className="font-playfair text-pearl text-xl mb-6">Récapitulatif</h2>

            {/* Lignes */}
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.format}-${item.isLot}`}
                  className="flex justify-between"
                >
                  <span className="font-cormorant text-pearl/55 text-sm flex-1 pr-3">
                    {item.product.nameFr} ({FORMATS[item.format]}) × {item.quantity}
                  </span>
                  <span className="font-cormorant text-pearl/70 text-sm flex-shrink-0">
                    {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              ))}
            </div>

            <div className="section-divider mb-5" />

            <div className="flex justify-between items-center mb-3">
              <span className="font-cormorant text-pearl/60 tracking-wide">Sous-total</span>
              <span className="font-playfair text-pearl text-lg">
                {subtotal.toFixed(2).replace('.', ',')} €
              </span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-cormorant text-pearl/60 tracking-wide">Livraison</span>
              <span className="font-cormorant text-teal/70 text-sm font-semibold">
                Offerte 🎁
              </span>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-b border-gold/15 mb-7">
              <span className="font-playfair text-pearl text-lg">Total</span>
              <span className="font-playfair text-gold text-3xl">
                {subtotal.toFixed(2).replace('.', ',')} €
              </span>
            </div>

            {/* Boutons paiement */}
            <div className="space-y-3">
              {/* Stripe */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                loading={loadingStripe}
                onClick={handleStripeCheckout}
              >
                <CreditCard size={18} strokeWidth={1.5} className="mr-2" />
                Payer par carte
              </Button>

              {/* PayPal */}
              {/* TODO: Remplacer par le vrai bouton PayPal une fois NEXT_PUBLIC_PAYPAL_CLIENT_ID configuré */}
              <button
                onClick={() => alert('Intégration PayPal à configurer — voir /lib/paypal.ts')}
                className="w-full py-3.5 bg-[#0070ba] hover:bg-[#003087] text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 124 33" className="h-5" aria-label="PayPal">
                  <path fill="#ffffff" d="M46.2 10.2h-5.1c-.4 0-.7.3-.8.6l-2 12.9c0 .3.2.5.5.5h2.4c.4 0 .7-.3.8-.6l.5-3.3c.1-.4.4-.6.8-.6h1.6c3.3 0 5.2-1.6 5.7-4.8.2-1.4 0-2.5-.6-3.2-.7-.8-1.9-1.5-3.8-1.5zm.6 4.7c-.3 1.8-1.6 1.8-2.9 1.8h-.7l.5-3.2c0-.2.2-.4.4-.4h.3c.9 0 1.7 0 2.1.5.3.3.4.8.3 1.3z"/>
                </svg>
                Payer avec PayPal
              </button>
            </div>

            {/* Sécurité */}
            <p className="font-cormorant text-pearl/25 text-xs text-center mt-4 leading-relaxed">
              Paiement 100% sécurisé · Données chiffrées SSL
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
