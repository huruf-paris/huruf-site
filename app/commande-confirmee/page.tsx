'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'

export default function CommandeConfirmeePage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

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

        {/* Titre */}
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

        {/* Informations livraison */}
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

        {/* CTA */}
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

        {/* Référence commande */}
        {sessionId && (
          <p className="mt-8 font-cormorant text-pearl/20 text-xs tracking-wider">
            Réf. {sessionId.slice(-12).toUpperCase()}
          </p>
        )}
      </motion.div>
    </div>
  )
}
