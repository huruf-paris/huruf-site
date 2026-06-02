'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Pen, CheckCircle, Feather, Frame, Star } from 'lucide-react'
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
    desc: 'Nous créons votre composition sur mesure avec soin. Délai : 2 à 3 semaines.',
  },
  {
    num: '04',
    title: 'Livraison',
    desc: 'Votre tableau, encadré et emballé avec soin, est expédié chez vous.',
  },
]

const GUARANTEES = [
  { icon: <Feather size={18} strokeWidth={1.5} className="text-gold/70" />, label: 'Composition sur mesure' },
  { icon: <Frame size={18} strokeWidth={1.5} className="text-gold/70" />, label: 'Cadre noble inclus' },
  { icon: <Star size={18} strokeWidth={1.5} className="text-gold/70" />, label: 'Composition exclusive' },
  { icon: <Clock size={18} strokeWidth={1.5} className="text-gold/70" />, label: 'Devis gratuit sous 48h' },
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: data.prenom,
          email: data.email,
          sujet: `Commande sur mesure — ${data.mot}`,
          message: `Prénom : ${data.prenom}\nMot / phrase : ${data.mot}\nFormat : ${data.format}\nMessage : ${data.message || 'Aucun'}`,
        }),
      })
      if (!res.ok) throw new Error('Erreur envoi')
      setSent(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-night">

      {/* ── Hero visuel pleine largeur ── */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=1400&q=85"
          alt="Calligraphie sur mesure — Hurûf Paris"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/50 to-night" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-gold/70 text-sm tracking-[0.4em] uppercase mb-4"
          >
            Service exclusif
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-pearl text-5xl md:text-7xl font-light mb-5 leading-tight"
          >
            Commande sur mesure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-cormorant text-pearl/65 text-xl md:text-2xl italic leading-relaxed max-w-2xl"
          >
            Un mot qui vous tient à coeur, composé sur mesure pour vous.
            <br className="hidden md:block" />
            Une composition exclusive, dans le format de votre choix.
          </motion.p>
        </div>
      </section>

      {/* ── Garanties ── */}
      <section className="py-10 px-6 bg-night-deep border-b border-gold/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {GUARANTEES.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 border border-gold/20 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <span className="font-cormorant text-pearl/65 text-sm leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Étapes ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-pearl text-3xl font-light text-center mb-12"
          >
            Comment ça fonctionne
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10">
            {STEPS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-night p-8 group hover:bg-night-deep transition-colors duration-300"
              >
                <span className="font-playfair text-gold/25 text-4xl block mb-4 group-hover:text-gold/40 transition-colors duration-300">
                  {num}
                </span>
                <div className="w-6 h-px bg-gold/30 mb-4" />
                <h3 className="font-playfair text-pearl text-base mb-3">{title}</h3>
                <p className="font-cormorant text-pearl/50 text-base leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section principale : formulaire + image ── */}
      <section className="py-16 px-6 bg-night-deep">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Formulaire */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <CheckCircle size={52} strokeWidth={1} className="text-gold mx-auto mb-6" />
                <h2 className="font-playfair text-pearl text-3xl font-light mb-4">
                  Demande envoyée
                </h2>
                <p className="font-cormorant text-pearl/55 text-xl italic leading-relaxed">
                  Nous avons bien reçu votre demande.<br />
                  Vous recevrez une réponse sous 48h avec un aperçu et un devis personnalisé.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <Pen size={18} strokeWidth={1.5} className="text-gold" />
                  <h2 className="font-playfair text-pearl text-2xl font-light">Votre demande</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                        Prénom *
                      </label>
                      <input {...register('prenom')} placeholder="Votre prénom" className="luxury-input" />
                      {errors.prenom && (
                        <p className="font-cormorant text-red-400/80 text-sm mt-1">{errors.prenom.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                        Email *
                      </label>
                      <input {...register('email')} type="email" placeholder="votre@email.fr" className="luxury-input" />
                      {errors.email && (
                        <p className="font-cormorant text-red-400/80 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                      Mot ou phrase souhaité *
                    </label>
                    <input
                      {...register('mot')}
                      placeholder="Ex : Gratitude, Espoir, le nom de votre enfant…"
                      className="luxury-input"
                    />
                    {errors.mot && (
                      <p className="font-cormorant text-red-400/80 text-sm mt-1">{errors.mot.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                      Format désiré *
                    </label>
                    <select {...register('format')} className="luxury-input bg-night">
                      <option value="30x40">30 × 40 cm — Format intimiste</option>
                      <option value="40x50">40 × 50 cm — Le plus demandé</option>
                      <option value="50x70">50 × 70 cm — Format imposant</option>
                      <option value="duo">Format Duo (deux tableaux assortis)</option>
                      <option value="autre">Autre format (à préciser ci-dessous)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-cormorant text-pearl/60 text-sm tracking-widets uppercase block mb-2">
                      Message (facultatif)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Style calligraphique souhaité, occasion particulière, couleurs, contraintes d'accrochage…"
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
                    Devis gratuit et sans engagement · Réponse sous 48h
                  </p>
                </form>
              </motion.div>
            )}
          </div>

          {/* Colonne visuelle droite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Image calligraphe */}
            <div className="relative aspect-[4/3] overflow-hidden border border-gold/15">
              <Image
                src="https://images.unsplash.com/photo-1573844851308-2a3ac2622258?w=800&q=85"
                alt="Calligraphe au travail — Hurûf"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-night/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-amiri text-gold text-3xl mb-1">بِسْمِ اللهِ</p>
                <p className="font-cormorant text-pearl/50 text-xs tracking-widest uppercase">
                  Chaque oeuvre débute par ces mots
                </p>
              </div>
            </div>

            {/* Engagement qualité */}
            <div className="bg-night border border-gold/10 p-7">
              <div className="w-6 h-px bg-gold/40 mb-5" />
              <blockquote className="font-cormorant text-pearl/70 text-lg italic leading-relaxed mb-4">
                "Chaque composition sur mesure est pensée spécifiquement pour vous — formes, proportions, style — afin de créer une pièce qui vous ressemble vraiment."
              </blockquote>
              <p className="font-playfair text-gold/60 text-sm">L'équipe Hurûf Paris</p>
              <p className="font-cormorant text-pearl/35 text-xs tracking-wide mt-0.5">
                Devis gratuit · Réponse sous 48h
              </p>
            </div>

            {/* Délai */}
            <div className="flex items-center gap-4 px-1">
              <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Clock size={18} strokeWidth={1.5} className="text-gold/60" />
              </div>
              <div>
                <p className="font-playfair text-pearl text-sm">Délai de création estimé</p>
                <p className="font-cormorant text-pearl/45 text-base">
                  2 à 3 semaines · Composition sur mesure, impression premium, encadrement inclus
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
