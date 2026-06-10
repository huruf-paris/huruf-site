'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { isPromoActive, PROMO_END, PROMO_DISCOUNT } from '@/lib/promo'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        maxHeight: scrolled ? '0px' : '60px',
        opacity: scrolled ? 0 : 1,
        paddingTop: scrolled ? '0px' : '8px',
        paddingBottom: scrolled ? '0px' : '8px',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, opacity 0.35s ease, padding 0.4s ease',
      }}
      className="relative bg-gold text-night px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="font-cormorant text-sm font-semibold tracking-widest uppercase">
            {isPromoActive()
              ? `🎉 -${Math.round(PROMO_DISCOUNT * 100)}% sur toute la boutique — jusqu'au ${PROMO_END.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`
              : '🚚 Livraison offerte en Europe'}
          </span>
          <span className="hidden sm:inline text-night/40">·</span>
          <span className="font-cormorant text-sm tracking-wide hidden sm:inline">
            Retour 14 jours sans condition
          </span>
          <span className="hidden sm:inline text-night/40">·</span>
          <Link
            href="/boutique"
            className="font-cormorant text-sm font-semibold tracking-widest uppercase underline underline-offset-2 hover:opacity-70 transition-opacity hidden sm:inline"
          >
            Découvrir la collection →
          </Link>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-night/50 hover:text-night transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}
