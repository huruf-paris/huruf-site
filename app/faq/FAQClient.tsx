'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'

const FAQ_ITEMS = [
  {
    category: 'Les tableaux',
    questions: [
      {
        q: 'Comment sont fabriquÃ©s vos tableaux ?',
        a: 'Nos tableaux sont des compositions calligraphiques designÃ©es numÃ©riquement dans la tradition des grands styles arabes classiques (Naskh, Thuluth, Diwaniâ€¦), puis imprimÃ©es sur papier d\'art de qualitÃ© premium et encadrÃ©es avec soin. Chaque composition est crÃ©Ã©e avec attention aux formes, aux proportions et Ã  l\'esthÃ©tique de la calligraphie arabe.',
      },
      {
        q: 'Quels formats sont disponibles ?',
        a: 'Nos tableaux sont disponibles en trois formats : 30 Ã— 40 cm, 40 Ã— 50 cm et 50 Ã— 70 cm. Pour un format personnalisÃ©, rendez-vous sur notre page Commande sur mesure.',
      },
      {
        q: 'Le cadre est-il inclus dans le prix ?',
        a: 'Oui, chaque tableau est livrÃ© avec son cadre, prÃªt Ã  Ãªtre accrochÃ©. Aucun achat supplÃ©mentaire n\'est nÃ©cessaire.',
      },
      {
        q: 'Quels styles calligraphiques inspirent vos compositions ?',
        a: 'Nos compositions s\'inspirent des grands styles classiques : le Naskh (lisible et Ã©lÃ©gant), le Thuluth (monumental et majestueux), le Diwani (fluide et ornemental) et le Riqa\'a (naturel et fluide). Le style est choisi selon le mot pour en exprimer toute la profondeur visuelle.',
      },
    ],
  },
  {
    category: 'Commandes & paiement',
    questions: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, American Express) via notre systÃ¨me de paiement sÃ©curisÃ© Stripe. Le paiement est entiÃ¨rement cryptÃ© â€” vos donnÃ©es bancaires ne transitent jamais par nos serveurs.',
      },
      {
        q: 'Puis-je annuler ou modifier ma commande ?',
        a: 'Vous pouvez annuler ou modifier votre commande dans les 24h suivant l\'achat en nous contactant par email. Au-delÃ , si le tableau est dÃ©jÃ  en prÃ©paration, l\'annulation n\'est plus possible.',
      },
      {
        q: 'Est-il possible de commander un tableau personnalisÃ© ?',
        a: 'Oui ! Notre service "Sur mesure" vous permet de commander n\'importe quel mot, phrase ou calligraphie dans le format et le style de votre choix. Rendez-vous sur la page Commande sur mesure pour recevoir un devis sous 48h.',
      },
    ],
  },
  {
    category: 'Livraison',
    questions: [
      {
        q: 'Dans quels pays livrez-vous ?',
        a: 'Nous livrons en France mÃ©tropolitaine, Belgique, Suisse, Luxembourg et Monaco. Pour toute autre destination, contactez-nous directement.',
      },
      {
        q: 'Quel est le dÃ©lai de livraison ?',
        a: 'Les commandes sont expÃ©diÃ©es sous 24h aprÃ¨s confirmation de paiement. Le dÃ©lai de livraison est ensuite de 3 Ã  5 jours ouvrÃ©s. Vous recevrez un email de confirmation avec le numÃ©ro de suivi.',
      },
      {
        q: 'Comment les tableaux sont-ils emballÃ©s ?',
        a: 'Chaque tableau est soigneusement protÃ©gÃ© dans un emballage renforcÃ© spÃ©cialement conÃ§u pour les oeuvres d\'art. Angles protÃ©gÃ©s, bulle, boÃ®te rigide â€” votre tableau arrive intact.',
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'Oui, la livraison est offerte sur toutes les commandes, sans minimum d\'achat.',
      },
    ],
  },
  {
    category: 'Retours & garanties',
    questions: [
      {
        q: 'Puis-je retourner un tableau ?',
        a: 'Vous disposez de 14 jours aprÃ¨s rÃ©ception pour nous retourner votre tableau si vous n\'en Ãªtes pas satisfait. Le tableau doit Ãªtre retournÃ© dans son emballage d\'origine, en parfait Ã©tat. Le remboursement est effectuÃ© sous 5 jours ouvrÃ©s aprÃ¨s rÃ©ception du retour.',
      },
      {
        q: 'Que faire si mon tableau arrive endommagÃ© ?',
        a: 'Dans le cas trÃ¨s rare d\'un tableau endommagÃ© lors du transport, contactez-nous dans les 48h avec des photos du colis et de l\'oeuvre. Nous vous enverrons un tableau de remplacement sans frais.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gold/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-cormorant text-pearl text-lg leading-snug group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={18} strokeWidth={1.5} className="text-gold/50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-cormorant text-pearl/55 text-lg leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-night pt-40 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4"
          >
            Questions frÃ©quentes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-pearl text-5xl md:text-6xl font-light mb-4"
          >
            FAQ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-cormorant text-pearl/55 text-xl italic"
          >
            Tout ce que vous devez savoir avant de commander.
          </motion.p>
        </div>
      </section>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {FAQ_ITEMS.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <h2 className="font-playfair text-gold/70 text-sm tracking-[0.3em] uppercase mb-6 pb-3 border-b border-gold/15">
              {cat.category}
            </h2>
            <div>
              {cat.questions.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA bas de page */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-20 px-6"
      >
        <p className="font-cormorant text-pearl/50 text-xl italic mb-6">
          Vous ne trouvez pas votre rÃ©ponse ?
        </p>
        <Link href="/contact">
          <Button variant="outline" size="lg">
            Nous contacter
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

