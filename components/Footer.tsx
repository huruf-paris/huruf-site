import Link from 'next/link'
import IslamicOrnament from './IslamicOrnament'

/* ── Logos paiement SVG inline ── */
function StripeLogo() {
  return (
    <svg viewBox="0 0 60 25" className="h-5 w-auto" aria-label="Stripe" fill="none">
      <path
        d="M28.4 9.8c0-.8.7-1.1 1.8-1.1 1.6 0 3.7.5 5.3 1.4V5.8C33.9 5 32 4.7 30.2 4.7c-3.7 0-6.2 1.9-6.2 5.2 0 5 6.9 4.2 6.9 6.4 0 .9-.8 1.2-2 1.2-1.7 0-3.9-.7-5.7-1.7v4.4c1.9.8 3.9 1.2 5.7 1.2 3.9 0 6.5-1.9 6.5-5.2-.1-5.5-7-4.5-7-6.4z"
        fill="#fff"
        opacity="0.7"
      />
      <path
        d="M7.6 5h4.2v15.2H7.6V5zM5.3 11.8L.8 5H5.7l2.7 4 2.8-4h4.9l-4.5 6.7 4.8 7.2H11l-3-4.5-3 4.5H.5l4.8-7.1z"
        fill="#fff"
        opacity="0.7"
      />
      <text x="18" y="18" fontFamily="Arial" fontSize="11" fill="white" opacity="0.7" fontWeight="600">stripe</text>
    </svg>
  )
}

function PayPalLogo() {
  return (
    <svg viewBox="0 0 80 22" className="h-5 w-auto" aria-label="PayPal" fill="none">
      <text x="0" y="16" fontFamily="Arial" fontSize="13" fill="#fff" opacity="0.7" fontWeight="700">PayPal</text>
    </svg>
  )
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 50 16" className="h-4 w-auto" aria-label="Visa">
      <rect width="50" height="16" rx="2" fill="white" opacity="0.12" />
      <text x="6" y="12" fontFamily="Arial" fontSize="11" fill="#fff" opacity="0.8" fontWeight="800" fontStyle="italic">VISA</text>
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard">
      <circle cx="14" cy="12" r="10" fill="#EB001B" opacity="0.7" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" opacity="0.7" />
      <path d="M19 5.7a10 10 0 0 1 0 12.6A10 10 0 0 1 19 5.7z" fill="#FF5F00" opacity="0.8" />
    </svg>
  )
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 50 16" className="h-4 w-auto" aria-label="American Express">
      <rect width="50" height="16" rx="2" fill="#2E77BC" opacity="0.5" />
      <text x="4" y="12" fontFamily="Arial" fontSize="8" fill="#fff" opacity="0.9" fontWeight="700" letterSpacing="0.5">AMEX</text>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-night-deep border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Marque */}
          <div className="md:col-span-2">
            <div className="flex flex-col mb-4">
              <span className="font-playfair text-pearl text-2xl font-semibold">Hurûf</span>
              {/* Identité de marque — arabe conservé car c'est le nom */}
              <span className="font-amiri text-gold text-xl">حروف</span>
            </div>
            <p className="font-cormorant text-pearl/60 text-base leading-relaxed max-w-xs">
              L'art de la calligraphie arabe, encadré pour votre intérieur. Chaque tableau est tracé à la main avec soin.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-4 mt-6">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/huruf.paris', icon: 'IG' },
                { label: 'Pinterest', href: 'https://www.pinterest.fr/hurufparis', icon: 'PT' },
                { label: 'Facebook', href: 'https://www.facebook.com/huruf.paris', icon: 'FB' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-gold/20 flex items-center justify-center text-pearl/40 hover:text-gold hover:border-gold/60 transition-colors duration-300 font-cormorant text-xs"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair text-pearl text-sm tracking-widest uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/boutique', label: 'Boutique' },
                { href: '/sur-mesure', label: 'Commande sur mesure' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-cormorant text-pearl/50 hover:text-gold transition-colors duration-300 text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-playfair text-pearl text-sm tracking-widest uppercase mb-4">
              Informations
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/cgv', label: 'Conditions de vente' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-cormorant text-pearl/50 hover:text-gold transition-colors duration-300 text-base"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <p className="font-cormorant text-pearl/40 text-sm leading-relaxed">
                  60 Rue François Ier
                  <br />
                  75008 Paris, France
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Logos paiement ── */}
        <div className="border-t border-gold/10 border-b border-b-gold/10 py-5 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-cormorant text-pearl/30 text-xs tracking-widest uppercase flex-shrink-0">
              Paiements acceptés :
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Stripe */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                <svg viewBox="0 0 32 14" className="h-4 w-auto" aria-label="Stripe">
                  <text x="0" y="11" fontFamily="Arial" fontSize="11" fill="#fff" opacity="0.75" fontWeight="600">stripe</text>
                </svg>
              </div>
              {/* PayPal */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                <svg viewBox="0 0 46 14" className="h-4 w-auto" aria-label="PayPal">
                  <text x="0" y="11" fontFamily="Arial" fontSize="11" fill="#fff" opacity="0.75" fontWeight="700">PayPal</text>
                </svg>
              </div>
              {/* Visa */}
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                <span className="font-bold text-white/70 text-xs tracking-wider italic">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 px-2 py-1.5 rounded">
                <div className="w-5 h-5 rounded-full bg-red-500/70" />
                <div className="w-5 h-5 rounded-full bg-yellow-500/70 -ml-2" />
              </div>
              {/* CB */}
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                <span className="font-bold text-white/70 text-xs tracking-wider">CB</span>
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-teal/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-cormorant text-pearl/30 text-xs tracking-wide">
                Paiement 100% sécurisé · SSL
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
          <IslamicOrnament size={24} animated={false} />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-pearl/30 font-cormorant text-sm">
          <p>© 2025 Hurûf — حروف. Tous droits réservés.</p>
          <p>SIRET 993 653 393 00013 — APE 47.91B — Paris 8e</p>
        </div>
      </div>
    </footer>
  )
}
