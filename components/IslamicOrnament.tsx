'use client'

import { motion } from 'framer-motion'

interface Props {
  className?: string
  size?: number
  animated?: boolean
}

export default function IslamicOrnament({ className = '', size = 40, animated = true }: Props) {
  const ornament = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Étoile à 8 branches — motif géométrique islamique classique */}
      <g opacity="0.6">
        <polygon
          points="20,2 23.5,16.5 38,20 23.5,23.5 20,38 16.5,23.5 2,20 16.5,16.5"
          stroke="#D4AF37"
          strokeWidth="0.8"
          fill="none"
        />
        <polygon
          points="20,6 22.8,17.2 34,20 22.8,22.8 20,34 17.2,22.8 6,20 17.2,17.2"
          stroke="#D4AF37"
          strokeWidth="0.5"
          fill="none"
          opacity="0.5"
        />
        <circle cx="20" cy="20" r="2.5" fill="#D4AF37" opacity="0.8" />
        <circle cx="20" cy="20" r="1.2" fill="#D4AF37" />
      </g>
    </svg>
  )

  if (!animated) return ornament

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {ornament}
    </motion.div>
  )
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 w-full my-12">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
      <IslamicOrnament size={32} />
      {label && (
        <span className="font-amiri text-gold/60 text-sm tracking-widest uppercase">{label}</span>
      )}
      {label && <IslamicOrnament size={32} />}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  )
}
