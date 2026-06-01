'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="relative z-50 bg-gold text-night py-2 px-4">
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
