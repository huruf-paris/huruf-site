'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export interface ShowcaseVideo {
  /** Fichier MP4 dans /public/videos */
  src: string
  /** Image poster (WebP) affichée avant lecture */
  poster: string
  /** Titre court affiché sous la vidéo */
  label: string
  /** Légende descriptive */
  caption: string
}

/**
 * Lit la vidéo uniquement quand elle est visible à l'écran (économie data + batterie),
 * en muet, en boucle, sans contrôles — purement décoratif pour visualiser le produit réel.
 */
function LazyVideo({ video, index }: { video: ShowcaseVideo; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Charge puis lance la lecture seulement à l'entrée dans le viewport
          setActivated(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="group flex-none w-[68vw] max-w-[300px] sm:w-auto"
    >
      <div className="relative aspect-[9/16] overflow-hidden border border-gold/15 group-hover:border-gold/35 transition-colors duration-400">
        <video
          ref={ref}
          className="w-full h-full object-cover"
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          autoPlay
          aria-label={video.caption}
        >
          {activated && <source src={video.src} type="video/mp4" />}
        </video>

        {/* Liseré décoratif au survol */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/20 transition-all duration-400" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />
      </div>

      <figcaption className="mt-4 text-center">
        <p className="font-playfair text-pearl text-lg font-light group-hover:text-gold transition-colors duration-300">
          {video.label}
        </p>
        <p className="font-cormorant text-pearl/50 text-base mt-1 leading-snug">
          {video.caption}
        </p>
      </figcaption>
    </motion.figure>
  )
}

export default function VideoShowcase({ videos }: { videos: ShowcaseVideo[] }) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Mobile : carrousel horizontal — Desktop : rangée centrée */}
      <div className="flex gap-5 sm:gap-8 justify-start sm:justify-center overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none px-6 sm:px-0 pb-2">
        {videos.map((video, i) => (
          <div key={video.src} className="snap-center">
            <LazyVideo video={video} index={i} />
          </div>
        ))}
      </div>

      {videos.length > 1 && (
        <p className="sm:hidden text-center font-cormorant text-pearl/25 text-xs tracking-widest uppercase mt-3 px-6">
          Glisser pour découvrir →
        </p>
      )}
    </div>
  )
}
