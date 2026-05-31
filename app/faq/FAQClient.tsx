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
        q: 'Les tableaux sont-ils peints à la main ou imprimés ?',
        a: 'Chaque tableau Hurûf est tracé à la main par un calligraphe formé à la tradition arabe classique. Il ne s\'agit pas d\'impressions numériques — chaque oeuvre est unique, tracée à l\'encre permanente sur papier d\'art de qualité musée.',
      },
      {
        q: 'Quels formats sont disponibles ?',
        a: 'Nos tableaux sont disponibles en trois formats : 30 × 40 cm, 40 × 50 cm et 50 × 70 cm. Pour un format personnalisé, rendez-vous sur notre page Commande sur mesure.',
      },
      {
        q: 'Le cadre est-il inclus dans le prix ?',
        a: 'Oui, chaque tableau est livré avec son cadre, prêt à être accroché. Aucun achat supplémentaire n\'est nécessaire.',
      },
      {
        q: 'Quels styles calligraphiques utilisez-vous ?',
        a: 'Nous maîtrisons plusieurs styles classiques : le Naskh (lisible et élégant), le Thuluth (monumental et majestueux), le Diwani (fluide et ornemental) et le Riq\'a (rapide et naturel). Le style est choisi selon le mot calligraphié pour en exprimer toute la profondeur.',
      },
    ],
  },
  {
    category: 'Commandes & paiement',
    questions: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons toutes les cartes bancaires (Visa, Mastercard, American Express) via notre système de paiement sécurisé Stripe. Le paiement est entièrement crypté — vos données bancaires ne transitent jamais par nos serveurs.',
      },
      {
        q: 'Puis-je annuler ou modifier ma commande ?',
        a: 'Vous pouvez annuler ou modifier votre commande dans les 24h suivant l\'achat en nous contactant par email. Au-delà, si le tableau est déjà en préparation, l\'annulation n\'est plus possible.',
      },
      {
        q: 'Est-il possible de commander un tableau personnalisé ?',
        a: 'Oui ! Notre service "Sur mesure" vous permet de commander n\'importe quel mot, phrase ou calligraphie dans le format et le style de votre choix. Rendez-vous sur la page Commande sur mesure pour recevoir un devis sous 48h.',
      },
    ],
  },
  {
    category: 'Livraison',
    questions: [
      {
        q: 'Dans quels pays livrez-vous ?',
        a: 'Nous livrons en France métropolitaine, Belgique, Suisse, Luxembourg et Monaco. Pour toute autre destination, contactez-nous directement.',
      },
      {
        q: 'Quel est le délai de livraison ?',
        a: 'Les commandes sont expédiées sous 24h après confirmation de paiement. Le délai de livraison est ensuite de 3 à 5 jours ouvrés. Vous recevrez un email de confirmation avec le numéro de suivi.',
      },
      {
        q: 'Comment les tableaux sont-ils emballés ?',
        a: 'Chaque tableau est soigneusement protégé dans un emballage renforcé spécialement conçu pour les oeuvres d\'art. Angles protégés, bulle, boîte rigide — votre tableau arrive intact.',
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
        a: 'Vous disposez de 14 jours après réception pour nous retourner votre tableau si vous n\'en êtes pas satisfait. Le tableau doit être retourné dans son emballage d\'origine, en parfait état. Le remboursement est effectué sous 5 jours ouvrés après réception du retour.',
      },
      {
        q: 'Que faire si mon tableau arrive endommagé ?',
        a: 'Dans le cas très rare d\'un tableau endommagé lors du transport, contactez-nous dans les 48h avec des photos du colis et de l\'oeuvre. Nous vous enverrons un tableau de remplacement sans frais.',
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
    <div className="min-h-screen bg-night pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4"
          >
            Questions fréquentes
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
          Vous ne trouvez pas votre réponse ?
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
