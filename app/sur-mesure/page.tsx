'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Pen, CheckCircle } from 'lucide-react'
import Button from '@/components/Button'
import { SectionDivider } from '@/components/IslamicOrnament'

const schema = z.object({
  prenom: z.string().min(2, 'Prénom requis'),
  email: z.string().email('Email invalide'),
  mot: z.string().min(1, 'Veuillez indiquer le mot souhaité'),
  format: z.enum(['30x40', '40x50', '50x70', 'duo', 'autre']),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const STEPS = [
  {
    num: '01',
    title: 'Votre demande',
    desc: 'Remplissez le formulaire avec le mot que vous souhaitez voir calligraphié.',
  },
  {
    num: '02',
    title: 'Validation',
    desc: 'Nous vous contactons sous 48h pour valider le rendu et le devis personnalisé.',
  },
  {
    num: '03',
    title: 'Création',
    desc: 'Le calligraphe trace votre oeuvre à la main. Délai : 3 à 4 semaines.',
  },
  {
    num: '04',
    title: 'Livraison',
    desc: 'Votre tableau, encadré et emballé avec soin, est expédié chez vous.',
  },
]

export default function SurMesurePage() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { format: '40x50' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Envoyer l'email via Resend ou EmailJS
      // await fetch('/api/sur-mesure', { method: 'POST', body: JSON.stringify(data) })
      console.log('Demande sur mesure :', data)
      await new Promise((r) => setTimeout(r, 1000))
      setSent(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-night pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Service exclusif
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-pearl text-5xl md:text-6xl font-light mb-4"
          >
            Commande sur mesure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-cormorant text-pearl/55 text-xl italic leading-relaxed"
          >
            Un mot qui vous tient à coeur, calligraphié à la main pour vous.
            <br />
            Une oeuvre unique, dans le format de votre choix.
          </motion.p>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-12 px-6 bg-night-deep">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="bg-night-deep p-7"
            >
              <span className="font-playfair text-gold/30 text-3xl block mb-3">{num}</span>
              <h3 className="font-playfair text-pearl text-base mb-2">{title}</h3>
              <p className="font-cormorant text-pearl/45 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-5 flex items-center gap-3 px-2">
          <Clock size={16} strokeWidth={1.5} className="text-teal/60 flex-shrink-0" />
          <p className="font-cormorant text-pearl/40 text-sm italic">
            Délai de création estimé :{' '}
            <strong className="text-pearl/60 font-normal">3 à 4 semaines</strong> — chaque oeuvre
            est tracée à la main, sans compromis.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Formulaire */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <CheckCircle size={48} strokeWidth={1} className="text-gold mx-auto mb-6" />
              <h2 className="font-playfair text-pearl text-3xl font-light mb-3">
                Demande envoyée
              </h2>
              <p className="font-cormorant text-pearl/55 text-xl italic leading-relaxed">
                Nous avons bien reçu votre demande. Vous recevrez une réponse sous 48h avec un
                aperçu et un devis personnalisé.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Pen size={18} strokeWidth={1.5} className="text-gold" />
                <h2 className="font-playfair text-pearl text-2xl font-light">Votre demande</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Prénom *
                  </label>
                  <input {...register('prenom')} placeholder="Votre prénom" className="luxury-input" />
                  {errors.prenom && (
                    <p className="font-cormorant text-red-400/80 text-sm mt-1">
                      {errors.prenom.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="votre@email.fr"
                    className="luxury-input"
                  />
                  {errors.email && (
                    <p className="font-cormorant text-red-400/80 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Mot souhaité *
                  </label>
                  <input
                    {...register('mot')}
                    placeholder="Ex : Gratitude, Espoir, le nom de votre enfant…"
                    className="luxury-input"
                  />
                  {errors.mot && (
                    <p className="font-cormorant text-red-400/80 text-sm mt-1">
                      {errors.mot.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Format désiré *
                  </label>
                  <select {...register('format')} className="luxury-input bg-night-deep">
                    <option value="30x40">30 × 40 cm</option>
                    <option value="40x50">40 × 50 cm (le plus populaire)</option>
                    <option value="50x70">50 × 70 cm</option>
                    <option value="duo">Format Duo (deux tableaux assortis)</option>
                    <option value="autre">Autre (à préciser dans le message)</option>
                  </select>
                </div>

                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Message (facultatif)
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Style calligraphique souhaité, occasion, contraintes particulières…"
                    className="luxury-input resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                >
                  Envoyer ma demande
                </Button>

                <p className="font-cormorant text-pearl/25 text-sm text-center">
                  Réponse garantie sous 48h · Devis gratuit et sans engagement
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
