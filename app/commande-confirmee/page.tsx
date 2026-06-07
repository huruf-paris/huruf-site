'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, ArrowRight, Star } from 'lucide-react'
import { trackPurchase } from '@/lib/analytics'

// 👉 Remplace ce lien par ton vrai lien Google Reviews une fois ta fiche créée
// Va sur business.google.com → ton établissement → "Demander des avis"
const GOOGLE_REVIEWS_URL = 'https://g.page/r/CQlXNwRFGLZKEBM/review'

function StarRating({ onSelect, selected }: { onSelect: (n: number) => void; selected: number }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onSelect(n)}
          className="transition-transform hover:scale-110"
          aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
        >
          <Star
            size={32}
            strokeWidth={1.2}
            className={`transition-colors duration-150 ${
              n <= (hovered || selected) ? 'fill-gold text-gold' : 'text-gold/25'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function CommandeConfirmeeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [visible, setVisible] = useState(false)
  const [stars, setStars] = useState(0)
  const [reviewSent, setReviewSent] = useState(false)

  useEffect(() => {
    setVisible(true)
    // ── purchase — utilise le session_id Stripe comme transaction_id ──
    if (sessionId) {
      trackPurchase({
        transactionId: sessionId,
        items: [], // items non disponibles côté client après redirect Stripe
        total: 0,  // total non disponible côté client — à améliorer via webhook Stripe
      })
    }
  }, [sessionId])

  const handleStarSelect = (n: number) => {
    setStars(n)
    if (n >= 4) {
      // Redirige vers Google Reviews pour les clients satisfaits
      setTimeout(() => {
        window.open(GOOGLE_REVIEWS_URL, '_blank')
        setReviewSent(true)
      }, 400)
    } else {
      // Pour les clients moins satisfaits, on propose de contacter par email
      setReviewSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-xl w-full text-center"
      >
        {/* Icône succès */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center">
            <CheckCircle className="text-gold" size={40} strokeWidth={1} />
          </div>
        </motion.div>

        <p className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">
          Commande confirmée
        </p>
        <h1 className="font-playfair text-pearl text-4xl font-light mb-4">
          Merci pour votre commande
        </h1>
        <p className="font-cormorant text-pearl/55 text-lg leading-relaxed mb-10">
          Votre paiement a bien été reçu. Un email de confirmation vous a été envoyé.
          Votre tableau sera soigneusement emballé et expédié sous 3 à 5 jours ouvrés.
        </p>

        {/* Infos commande */}
        <div className="bg-night-deep border border-gold/10 p-6 mb-8 text-left space-y-4">
          {[
            {
              icon: <Mail size={16} strokeWidth={1.5} className="text-gold/60" />,
              title: 'Email de confirmation',
              text: 'Vérifiez votre boîte mail (et vos spams) pour le récapitulatif de commande.',
            },
            {
              icon: <Package size={16} strokeWidth={1.5} className="text-gold/60" />,
              title: 'Préparation & expédition',
              text: 'Votre tableau est préparé avec soin. Livraison sous 3 à 5 jours ouvrés, cadre inclus.',
            },
          ].map(({ icon, title, text }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="mt-0.5 flex-shrink-0">{icon}</div>
              <div>
                <p className="font-playfair text-pearl text-sm mb-0.5">{title}</p>
                <p className="font-cormorant text-pearl/50 text-base leading-snug">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bloc demande d'avis ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-night-deep border border-gold/20 p-6 mb-8"
        >
          {!reviewSent ? (
            <>
              <p className="font-cormorant text-gold/70 text-xs tracking-[0.25em] uppercase mb-2">
                Votre avis compte
              </p>
              <p className="font-playfair text-pearl text-lg font-light mb-1">
                Comment s'est passée votre expérience ?
              </p>
              <p className="font-cormorant text-pearl/40 text-sm mb-5">
                2 minutes suffisent — cela aide énormément d'autres personnes à nous découvrir.
              </p>
              <StarRating onSelect={handleStarSelect} selected={stars} />
              {stars > 0 && stars < 4 && (
                <p className="font-cormorant text-pearl/40 text-sm mt-4">
                  Nous sommes désolés. Contactez-nous à{' '}
                  <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold underline underline-offset-2">
                    contact@huruf-paris.fr
                  </a>{' '}
                  pour que nous puissions arranger ça.
                </p>
              )}
            </>
          ) : stars >= 4 ? (
            <div className="space-y-2">
              <p className="text-2xl">⭐⭐⭐⭐⭐</p>
              <p className="font-playfair text-pearl text-base">Merci infiniment !</p>
              <p className="font-cormorant text-pearl/45 text-sm">
                La page Google s'est ouverte dans un nouvel onglet.
                Votre avis aide toute la communauté à nous trouver.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-playfair text-pearl text-base">Merci pour votre retour</p>
              <p className="font-cormorant text-pearl/45 text-sm">
                Notre équipe va revenir vers vous rapidement.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA boutique */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-gold text-night font-cormorant text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors duration-300"
          >
            Continuer mes achats
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-gold/30 text-pearl/70 font-cormorant text-sm tracking-widest uppercase hover:border-gold/60 hover:text-pearl transition-colors duration-300"
          >
            Retour à l'accueil
          </Link>
        </div>

        {sessionId && (
          <p className="mt-8 font-cormorant text-pearl/20 text-xs tracking-wider">
            Réf. {sessionId.slice(-12).toUpperCase()}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default function CommandeConfirmeePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="w-8 h-8 border border-gold/30 animate-spin rounded-full border-t-gold" />
      </div>
    }>
      <CommandeConfirmeeContent />
    </Suspense>
  )
}
