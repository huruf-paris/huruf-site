'use client'

const ITEMS = [
  'Livraison offerte en Europe',
  'Cadre inclus',
  'Papier d\'art premium',
  'Retour 14 jours',
  'Paiement sécurisé Stripe',
  '⭐⭐⭐⭐⭐ Clients satisfaits',
  'Expédié sous 3 à 5 jours ouvrés',
  'Emballage soigné et protecteur',
]

const Divider = () => (
  <span className="text-gold/30 mx-6 flex-shrink-0">✦</span>
)

export default function MarqueeBand() {
  return (
    <div className="overflow-hidden bg-night-deep border-b border-gold/12 py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Deux copies pour boucle infinie seamless */}
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="font-cormorant text-pearl/45 text-xs tracking-[0.25em] uppercase">
              {item}
            </span>
            <Divider />
          </span>
        ))}
      </div>
    </div>
  )
}
