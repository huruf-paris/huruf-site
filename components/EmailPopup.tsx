'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Afficher après 30 secondes si pas déjà fermé
    const dismissed = localStorage.getItem('popup-dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setVisible(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    localStorage.setItem('popup-dismissed', '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // On affiche le succès même en cas d'erreur réseau
    }
    setSubmitted(true)
    localStorage.setItem('popup-dismissed', '1')
    setTimeout(() => setVisible(false), 3000)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div className="relative bg-night border border-gold/20 max-w-md w-full p-8 md:p-10 shadow-2xl">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-pearl/30 hover:text-pearl transition-colors"
          aria-label="Fermer"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Décor arabe */}
        <p className="font-amiri text-gold/20 text-5xl text-center mb-2">حروف</p>

        {submitted ? (
          <div className="text-center py-4">
            <p className="font-playfair text-pearl text-2xl mb-2">Merci !</p>
            <p className="font-cormorant text-pearl/60 text-lg">
              Votre code de réduction vous sera envoyé par email.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-playfair text-pearl text-2xl md:text-3xl font-light text-center mb-2">
              −10% sur votre première commande
            </h2>
            <p className="font-cormorant text-pearl/55 text-lg text-center italic mb-6">
              Inscrivez-vous et recevez votre code de réduction immédiatement.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="w-full bg-night-deep border border-gold/20 text-pearl font-cormorant text-base px-4 py-3 placeholder:text-pearl/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gold text-night font-cormorant text-sm tracking-widest uppercase py-3.5 hover:bg-gold/90 transition-colors font-semibold"
              >
                Obtenir mon −10%
              </button>
            </form>

            <p className="font-cormorant text-pearl/25 text-xs text-center mt-4">
              Pas de spam · Désinscription en un clic
            </p>
          </>
        )}
      </div>
    </div>
  )
}
