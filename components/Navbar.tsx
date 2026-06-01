'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const links = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/sur-mesure', label: 'Sur mesure' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount, toggleCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'bg-night/95 backdrop-blur-md border-b border-gold/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-playfair text-pearl text-xl font-semibold tracking-wide group-hover:text-gold transition-colors duration-300">
              Hurûf
            </span>
            <span className="font-amiri text-gold text-base leading-none">حروف</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link font-cormorant text-base tracking-widest uppercase transition-colors duration-300 ${
                    pathname === href ? 'text-gold' : 'text-pearl/80 hover:text-pearl'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-pearl/80 hover:text-gold transition-colors duration-300"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-night text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Menu hamburger mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-pearl/80 hover:text-gold transition-colors duration-300"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-night/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center gap-10">
                {links.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                  >
                    <Link
                      href={href}
                      className="font-playfair text-3xl text-pearl hover:text-gold transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 font-amiri text-gold/40 text-4xl"
            >
              حروف
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
