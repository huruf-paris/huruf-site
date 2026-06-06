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
}

interface Props {
  testimonials: Testimonial[]
  interval?: number
  /** Si true, affiche 2 avis côte à côte sur desktop */
  twoColumns?: boolean
}

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5 fill-gold">
        <path d="M6 0l1.5 4h4l-3.3 2.4 1.3 4L6 8 2.5 10.4l1.3-4L.5 4h4z" />
      </svg>
    ))}
  </div>
)

const Card = ({ t }: { t: Testimonial }) => (
  <div className="bg-night-deep border border-gold/12 p-6 md:p-8 h-full flex flex-col gap-4">
    <Stars count={t.stars} />
    <blockquote className="font-cormorant text-pearl/75 text-lg md:text-xl leading-relaxed italic flex-1">
      "{t.quote}"
    </blockquote>
    <div className="border-t border-gold/8 pt-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
        <span className="font-playfair text-gold text-sm font-semibold">{t.initial}</span>
      </div>
      <div>
        <p className="font-playfair text-pearl text-sm">{t.author}</p>
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
