'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { FORMATS } from '@/data/products'
import Button from './Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()

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
            <div className="flex items-center justify-between p-6 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-gold" />
                <h2 className="font-playfair text-pearl text-lg">
                  Panier{' '}
                  {itemCount > 0 && (
                    <span className="text-gold/70 text-base">({itemCount})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-pearl/50 hover:text-gold transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <span className="font-amiri text-gold/20 text-6xl">حروف</span>
                  <p className="font-cormorant text-pearl/40 text-lg">
                    Votre panier est vide.
                  </p>
                  <Button variant="outline" size="sm" onClick={closeCart}>
                    Découvrir la collection
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-gold/10">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.format}-${item.isLot}`}
                      className="flex gap-4 p-5"
                    >
                      {/* Image */}
                      <div className="relative w-16 h-20 flex-shrink-0 bg-night overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.nameFr}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      {/* Détails */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-playfair text-pearl text-sm">
                              {item.product.nameFr}
                            </p>
                            <p className="font-amiri text-gold/70 text-base">
                              {item.product.nameAr}
                            </p>
                            <p className="font-cormorant text-pearl/40 text-xs tracking-wide mt-0.5">
                              {FORMATS[item.format]} — {item.isLot ? 'Lot de 3' : 'Affiche seule'}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.format, item.isLot)
                            }
                            className="text-pearl/25 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Quantité & prix */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2 border border-gold/20">
                            <button
                              onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(
                                  item.product.id,
                                  item.format,
                                  item.isLot,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 text-pearl/50 hover:text-gold flex items-center justify-center font-cormorant text-lg transition-colors"
                            >
                              −
                            </button>
                            <span className="font-cormorant text-pearl text-sm w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.format,
                                  item.isLot,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 text-pearl/50 hover:text-gold flex items-center justify-center font-cormorant text-lg transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-playfair text-gold text-sm">
                            {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')} €
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold/10 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-cormorant text-pearl/60 text-base tracking-wide">
                    Sous-total
                  </span>
                  <span className="font-playfair text-pearl text-xl">
                    {subtotal.toFixed(2).replace('.', ',')} €
                  </span>
                </div>
                <p className="font-cormorant text-pearl/30 text-sm">
                  Frais de port calculés à la commande
                </p>
                <Link href="/panier" onClick={closeCart}>
                  <Button variant="primary" fullWidth size="lg">
                    Voir le panier & payer
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
