'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Product } from '@/data/products'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const mainImage = product.images[0]
  const startingPrice = product.prices['40x50'].single

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link href={`/boutique/${product.slug}`} className="block group">
        <article className="product-card bg-night-deep">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-night-deep">
            {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            <Image
              src={mainImage}
              alt={`Tableau calligraphie arabe — ${product.nameFr}`}
              fill
              className={`object-cover product-image transition-opacity duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Badge bundle */}
            {product.isBundle && (
              <div className="absolute top-3 left-3 bg-gold/90 text-night px-2.5 py-1 font-cormorant text-xs tracking-widest uppercase font-semibold">
                {product.bundleSize === 2 ? 'Duo' : 'Trio'}
              </div>
            )}

            {/* Indicateur galerie */}
            {product.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-night/60 backdrop-blur-sm text-pearl/60 px-2 py-1 font-cormorant text-xs">
                +{product.images.length - 1}
              </div>
            )}

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Mot arabe en overlay (conservé sur les produits) */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
              <span className="font-amiri text-gold text-2xl">{product.nameAr}</span>
            </div>
          </div>

          {/* Infos */}
          <div className="p-5 border-t border-gold/10 group-hover:border-gold/30 transition-colors duration-300">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-playfair text-pearl text-base font-light group-hover:text-gold transition-colors duration-300 leading-snug">
                  {product.nameFr}
                </h3>
                <p className="font-cormorant text-pearl/35 text-xs tracking-widest uppercase mt-1">
                  {product.transliteration}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                {product.prixSurDemande ? (
                  <p className="font-cormorant text-gold/70 text-sm italic">
                    Sur demande
                  </p>
                ) : (
                  <>
                    <p className="font-cormorant text-pearl/40 text-xs tracking-widest uppercase mb-0.5">
                      40 × 50 cm
                    </p>
                    <p className="font-playfair text-gold text-lg">
                      {startingPrice.toFixed(2).replace('.', ',')} €
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold/5 group-hover:border-gold/15 transition-colors duration-300">
              <span className="font-cormorant text-pearl/30 group-hover:text-gold/70 text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2">
                Voir le tableau
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
