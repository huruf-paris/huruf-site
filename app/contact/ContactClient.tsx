'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Clock, CheckCircle, Instagram, Facebook } from 'lucide-react'
import Button from '@/components/Button'

const schema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  sujet: z.string().min(3, 'Sujet requis'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        setSubmitError(json.error || 'Une erreur est survenue, veuillez réessayer.')
        return
      }
      setSent(true)
    } catch {
      setSubmitError('Erreur réseau, veuillez réessayer.')
    }
  }

  return (
    <div className="min-h-screen bg-night pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-pearl text-5xl md:text-6xl font-light mb-4"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-cormorant text-pearl/55 text-xl italic"
          >
            Une question ? Nous vous répondons sous 48h.
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Infos */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="md:col-span-2 space-y-8 pt-4"
        >
          <div className="flex gap-4">
            <Mail size={20} strokeWidth={1.5} className="text-gold/60 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-playfair text-pearl text-sm mb-1">Email</p>
              <a
                href="mailto:contact@huruf-paris.fr"
                className="font-cormorant text-pearl/55 hover:text-gold transition-colors text-lg"
              >
                contact@huruf-paris.fr
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={20} strokeWidth={1.5} className="text-gold/60 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-playfair text-pearl text-sm mb-1">Adresse</p>
              <p className="font-cormorant text-pearl/55 text-lg leading-relaxed">
                60 Rue François Ier
                <br />
                75008 Paris, France
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock size={20} strokeWidth={1.5} className="text-gold/60 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-playfair text-pearl text-sm mb-1">Délai de réponse</p>
              <p className="font-cormorant text-pearl/55 text-lg">Sous 48 heures</p>
            </div>
          </div>

          <div>
            <p className="font-playfair text-pearl text-sm mb-3">Réseaux sociaux</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/huruf.paris"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cormorant text-pearl/40 hover:text-gold border border-gold/15 hover:border-gold/40 px-3 py-1.5 text-sm tracking-wide transition-all duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.pinterest.fr/hurufparis"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cormorant text-pearl/40 hover:text-gold border border-gold/15 hover:border-gold/40 px-3 py-1.5 text-sm tracking-wide transition-all duration-300"
              >
                Pinterest
              </a>
              <a
                href="https://www.facebook.com/huruf.paris"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cormorant text-pearl/40 hover:text-gold border border-gold/15 hover:border-gold/40 px-3 py-1.5 text-sm tracking-wide transition-all duration-300"
              >
                Facebook
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="md:col-span-3"
        >
          {sent ? (
            <div className="text-center py-16">
              <CheckCircle size={48} strokeWidth={1} className="text-gold mx-auto mb-6" />
              <h2 className="font-playfair text-pearl text-3xl font-light mb-3">
                Message envoyé
              </h2>
              <p className="font-cormorant text-pearl/55 text-xl italic">
                Merci pour votre message. Nous vous répondrons sous 48 heures.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                    Nom *
                  </label>
                  <input {...register('nom')} placeholder="Votre nom" className="luxury-input" />
                  {errors.nom && (
                    <p className="font-cormorant text-red-400/80 text-sm mt-1">
                      {errors.nom.message}
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
              </div>

              <div>
                <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                  Sujet *
                </label>
                <input
                  {...register('sujet')}
                  placeholder="Objet de votre message"
                  className="luxury-input"
                />
                {errors.sujet && (
                  <p className="font-cormorant text-red-400/80 text-sm mt-1">
                    {errors.sujet.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-cormorant text-pearl/60 text-sm tracking-widest uppercase block mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  placeholder="Votre message…"
                  className="luxury-input resize-none"
                />
                {errors.message && (
                  <p className="font-cormorant text-red-400/80 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="font-cormorant text-red-400/80 text-base text-center">
                  {submitError}
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                Envoyer le message
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
