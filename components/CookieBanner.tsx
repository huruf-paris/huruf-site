'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'huruf_cookies_accepted'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY)
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-[80] bg-night-deep/98 backdrop-blur-md border-t border-gold/15"
          role="dialog"
          aria-label="Bandeau cookies"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3 flex-1">
              {/* Icône cookie */}
              <svg
                className="w-5 h-5 text-gold/50 flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
                <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
                <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
                <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
              </svg>
              <p className="font-cormorant text-pearl/60 text-base leading-relaxed">
                Ce site utilise des cookies essentiels au bon fonctionnement du panier et à l'analyse
                de fréquentation.{' '}
                <Link
                  href="/mentions-legales"
                  className="text-gold/60 hover:text-gold underline underline-offset-2 transition-colors"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={accept}
                className="font-cormorant text-sm tracking-widest uppercase px-6 py-2 bg-gold text-night hover:bg-gold/90 transition-colors duration-300 font-semibold"
              >
                Accepter
              </button>
              <button
                onClick={accept}
                className="font-cormorant text-sm tracking-widest uppercase px-4 py-2 text-pearl/40 hover:text-pearl/70 transition-colors duration-300 border border-gold/15 hover:border-gold/30"
              >
                Continuer sans accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
