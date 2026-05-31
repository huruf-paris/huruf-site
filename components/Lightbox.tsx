'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

interface Props {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function Lightbox({ src, alt, isOpen, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center lightbox-overlay bg-night/95"
          onClick={onClose}
        >
          <button
            className="absolute top-6 right-6 p-2 text-pearl/60 hover:text-gold transition-colors z-10"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-3xl max-h-[85vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[3/4] border border-gold/20">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <p className="text-center font-cormorant text-pearl/50 text-sm mt-3 tracking-widest uppercase">
              {alt}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LightboxTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-3 right-3 p-2 bg-night/70 backdrop-blur-sm text-pearl/60 hover:text-gold transition-colors rounded-sm border border-gold/10"
      aria-label="Agrandir l'image"
    >
      <ZoomIn size={16} strokeWidth={1.5} />
    </button>
  )
}
