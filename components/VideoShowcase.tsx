'use client'

import { useEffect, useRef } from 'react'
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
 * `preload="none"` : aucun téléchargement tant que la vidéo n'entre pas dans le viewport.
 */
function LazyVideo({ video, index }: { video: ShowcaseVideo; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() déclenche le chargement (preload="none") puis la lecture
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.3 }
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
      className="group flex-none snap-center w-[70vw] max-w-[280px] sm:w-[260px]"
    >
      <div className="relative w-full aspect-[9/16] overflow-hidden border border-gold/15 group-hover:border-gold/35 transition-colors duration-400">
        <video
          ref={ref}
          className="w-full h-full object-cover"
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={video.caption}
        />

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
          <LazyVideo key={video.src} video={video} index={i} />
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
