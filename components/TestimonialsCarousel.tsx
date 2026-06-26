'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Testimonial {
  quote: string
  author: string
  location: string
  date: string
  stars: number
  initial: string
  source?: 'Google' | 'Vinted' | 'Instagram'
  /** Avis adossé à une plateforme vérifiable (achat ou profil réel) */
  verified?: boolean
}

interface Props {
  testimonials: Testimonial[]
  interval?: number
  /** Si true, affiche 2 avis côte à côte sur desktop */
  twoColumns?: boolean
}

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 12 12" className={`w-3.5 h-3.5 ${i < count ? 'fill-gold' : 'fill-gold/20'}`} aria-hidden="true">
        <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z" />
      </svg>
    ))}
  </div>
)

/** Logo authentique de la plateforme d'origine de l'avis */
const SourceIcon = ({ source }: { source: NonNullable<Testimonial['source']> }) => {
  if (source === 'Google') {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.88c2.27-2.09 3.55-5.17 3.55-8.82Z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.95-2.91l-3.88-3a7.2 7.2 0 0 1-4.07 1.16 7.14 7.14 0 0 1-6.71-4.94H1.3v3.1A12 12 0 0 0 12 24Z" />
        <path fill="#FBBC05" d="M5.29 14.31a7.2 7.2 0 0 1 0-4.62v-3.1H1.3a12 12 0 0 0 0 10.82l3.99-3.1Z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.96 11.96 0 0 0 12 0 12 12 0 0 0 1.3 6.59l3.99 3.1A7.14 7.14 0 0 1 12 4.75Z" />
      </svg>
    )
  }
  if (source === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.4" stopColor="#FA7E1E" />
            <stop offset="0.7" stopColor="#D62976" />
            <stop offset="1" stopColor="#962FBF" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#ig-grad)" />
        <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="#fff" />
      </svg>
    )
  }
  // Vinted
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#09B1BA" />
      <path d="M7 7.5c1.4 0 2 .8 2.5 2 .6-1.4 1.6-2.4 3-2.4 1.3 0 2.2.9 2.2 2.3 0 2.4-2.7 5.2-4.6 6.6-.4.3-1 .3-1.4-.1C9 14 6.6 11.2 6.2 9.3 5.9 8.2 6.2 7.5 7 7.5Z" fill="#fff" />
    </svg>
  )
}

const Verified = () => (
  <span className="inline-flex items-center gap-1 text-[10px] font-cormorant tracking-wide text-gold/70 flex-shrink-0" title="Avis vérifié">
    <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden="true">
      <circle cx="8" cy="8" r="7" className="fill-gold/15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Vérifié
  </span>
)

const Card = ({ t }: { t: Testimonial }) => (
  <div className="bg-night-deep border border-gold/12 p-6 md:p-8 h-full flex flex-col gap-4">
    <div className="flex items-center justify-between gap-2">
      <Stars count={t.stars} />
      {t.verified && <Verified />}
    </div>
    <blockquote className="font-cormorant text-pearl/75 text-lg md:text-xl leading-relaxed italic flex-1">
      "{t.quote}"
    </blockquote>
    <div className="border-t border-gold/8 pt-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
        <span className="font-playfair text-gold text-sm font-semibold">{t.initial}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-playfair text-pearl text-sm">{t.author}</p>
          {t.source && (
            <span className="inline-flex items-center gap-1 text-[10px] font-cormorant tracking-wide text-pearl/45 border border-gold/15 pl-1 pr-1.5 py-0.5">
              <SourceIcon source={t.source} /> {t.source}
            </span>
          )}
        </div>
        <p className="font-cormorant text-pearl/35 text-xs">{t.location} · {t.date}</p>
      </div>
    </div>
  </div>
)

export default function TestimonialsCarousel({ testimonials, interval = 4500, twoColumns = false }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }, [current])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval, paused])

  if (twoColumns) {
    // Affiche 2 avis en parallèle sur desktop
    const idx2 = (current + 1) % testimonials.length
    return (
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[200px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`a-${current}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Card t={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`b-${idx2}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
              className="hidden md:block"
            >
              <Card t={testimonials[idx2]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-between mt-7">
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 border border-gold/20 flex items-center justify-center text-pearl/40 hover:text-gold hover:border-gold/50 transition-all duration-300"
              aria-label="Avis précédent"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-9 h-9 border border-gold/20 flex items-center justify-center text-pearl/40 hover:text-gold hover:border-gold/50 transition-all duration-300"
              aria-label="Avis suivant"
            >
              →
            </button>
          </div>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 h-px ${i === current ? 'w-6 bg-gold' : 'w-3 bg-gold/25'}`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Version 1 colonne (page produit)
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="min-h-[160px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Card t={testimonials[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1.5">
          <button onClick={prev} className="w-8 h-8 border border-gold/15 flex items-center justify-center text-pearl/30 hover:text-gold hover:border-gold/40 transition-all duration-300 font-cormorant text-lg">←</button>
          <button onClick={next} className="w-8 h-8 border border-gold/15 flex items-center justify-center text-pearl/30 hover:text-gold hover:border-gold/40 transition-all duration-300 font-cormorant text-lg">→</button>
        </div>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 h-px ${i === current ? 'w-5 bg-gold' : 'w-2.5 bg-gold/20'}`}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
