'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log silencieux en production
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-amiri text-gold/30 text-6xl mb-6">حروف</p>
        <h1 className="font-playfair text-pearl text-3xl font-light mb-3">
          Une erreur est survenue
        </h1>
        <p className="font-cormorant text-pearl/50 text-lg italic mb-8">
          La page n'a pas pu se charger correctement. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="font-cormorant text-sm tracking-widest uppercase bg-gold text-night px-6 py-3 hover:bg-gold/90 transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="font-cormorant text-sm tracking-widest uppercase border border-gold/30 text-pearl/70 px-6 py-3 hover:border-gold/60 hover:text-pearl transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
