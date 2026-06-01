'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div className={`relative bg-gold text-night px-4 overflow-hidden transition-all duration-500 ease-in-out ${scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 py-2 opacity-100'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="font-cormorant text-sm font-semibold tracking-widest uppercase">
            🚚 Livraison offerte en France
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
