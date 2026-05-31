'use client'

import { motion } from 'framer-motion'

interface Props {
  frenchTitle: string
  subtitle?: string
  centered?: boolean
}

export default function SectionTitle({ frenchTitle, subtitle, centered = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 ${centered ? 'text-center' : ''}`}
    >
      <h2 className="font-playfair text-pearl text-3xl md:text-4xl lg:text-5xl font-light">
        {frenchTitle}
      </h2>
      {subtitle && (
        <p className="font-cormorant text-pearl/60 text-lg md:text-xl mt-3 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
