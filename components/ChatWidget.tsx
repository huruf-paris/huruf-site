'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

/**
 * Bulle "question rapide" flottante. Ce n'est PAS un chat en direct :
 * le message est envoyé par email (route /api/contact déjà existante,
 * même infra que le formulaire de contact), avec un sujet dédié pour
 * le repérer facilement dans la boîte mail. Réponse asynchrone sous 48h,
 * annoncée clairement pour ne pas créer d'attente d'instantanéité.
 */
export default function ChatWidget() {
  const pathname = usePathname()
  // Les fiches produit ont leur propre barre "Ajouter au panier" sticky sur
  // mobile/tablette (cf. ProductPageClient) : la bulle doit se décaler pour
  // ne pas la recouvrir, comme elle le fait déjà avec le bandeau cookie.
  const onProductPage = Boolean(pathname && pathname !== '/boutique' && pathname.startsWith('/boutique/'))
  const [open, setOpen] = useState(false)
  // Tant qu'on ne sait pas si le bandeau cookie est déjà accepté, on suppose
  // qu'il est visible (cas du tout premier chargement) pour éviter tout chevauchement.
  const [liftedByBanner, setLiftedByBanner] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', message: '' })

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('huruf_cookies_accepted')
      setLiftedByBanner(!accepted)
    } catch {
      // Navigation privée / stockage bloqué : on part du principe le plus sûr.
    }
    const onAccepted = () => setLiftedByBanner(false)
    window.addEventListener('huruf:cookies-accepted', onAccepted)
    return () => window.removeEventListener('huruf:cookies-accepted', onAccepted)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          email: form.email,
          sujet: 'Question rapide (chat)',
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue. Veuillez réessayer.')
        return
      }
      setSent(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  // Le bandeau cookie est prioritaire (il masque de toute façon la barre sticky
  // produit quand les deux sont présents) ; sinon on tient compte de la barre
  // "Ajouter au panier" sur les fiches produit.
  const buttonBottomClass = liftedByBanner
    ? 'bottom-28 sm:bottom-6'
    : onProductPage
      ? 'bottom-28 lg:bottom-6'
      : 'bottom-6'

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fermer la fenêtre de question' : 'Poser une question rapide'}
        aria-expanded={open}
        className={`fixed right-5 z-[90] w-14 h-14 rounded-full bg-gold text-night flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold/90 hover:scale-105 transition-all duration-300 ${buttonBottomClass}`}
      >
        {open ? <X size={22} strokeWidth={1.75} /> : <MessageCircle size={22} strokeWidth={1.75} />}
      </button>

      {/* Panneau */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed right-5 z-[90] w-[calc(100vw-2.5rem)] max-w-[360px] bg-night-deep border border-gold/20 shadow-2xl flex flex-col ${
              liftedByBanner ? 'bottom-[10.5rem] sm:bottom-24' : 'bottom-24'
            }`}
            role="dialog"
            aria-label="Poser une question rapide"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/10">
              <span className="font-amiri text-gold text-2xl flex-shrink-0">حروف</span>
              <div>
                <p className="font-playfair text-pearl text-sm">Une question ?</p>
                <p className="font-cormorant text-pearl/40 text-xs">Réponse par email sous 48h</p>
              </div>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {sent ? (
                <div className="text-center py-6">
                  <p className="font-playfair text-pearl text-lg mb-2">Message envoyé !</p>
                  <p className="font-cormorant text-pearl/55 text-base leading-relaxed">
                    Merci, nous revenons vers vous par email sous 48h.
                  </p>
                </div>
              ) : (
                <>
                  {/* Bulle d'accueil, style message reçu */}
                  <div className="bg-night border border-gold/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="font-cormorant text-pearl/70 text-sm leading-relaxed">
                      Bonjour 👋 Posez-nous votre question, nous vous répondons par email sous 48h.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Votre prénom"
                      value={form.nom}
                      onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                      className="luxury-input text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Votre email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="luxury-input text-sm"
                    />
                    <textarea
                      required
                      maxLength={2000}
                      rows={3}
                      placeholder="Votre question…"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="luxury-input text-sm resize-none"
                    />
                    {error && <p className="font-cormorant text-red-400 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-gold text-night font-cormorant text-sm tracking-widest uppercase py-3 hover:bg-gold/90 transition-colors font-semibold disabled:opacity-50"
                    >
                      <Send size={14} strokeWidth={2} />
                      {loading ? 'Envoi…' : 'Envoyer'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
