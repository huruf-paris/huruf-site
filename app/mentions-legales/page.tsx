import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-night pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 border-b border-gold/10 pb-8">
          <p className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">
            Informations légales
          </p>
          <h1 className="font-playfair text-pearl text-4xl font-light">Mentions légales</h1>
        </div>

        <div className="prose-luxury space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">1. Éditeur du site</h2>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ['Dénomination', 'Hurûf — حروف'],
                  ['SIRET', '993 653 393 00013'],
                  ['Code APE', '47.91B — Vente à distance sur catalogue spécialisé'],
                  ['Siège social', '60 Rue François Ier, 75008 Paris, France'],
                  ['Date de création', '07 novembre 2025'],
                  ['Contact', 'contact@huruf.fr'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gold/10">
                    <td className="py-3 pr-6 text-pearl/40 font-cormorant text-sm tracking-widest uppercase w-1/3">
                      {label}
                    </td>
                    <td className="py-3 text-pearl/70">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">2. Hébergement</h2>
            <p>
              Le site huruf.fr est hébergé par la société <strong className="text-pearl/90">Vercel Inc.</strong>,
              340 Pine Street, Suite 700, San Francisco, CA 94104, États-Unis.
              Site web : <span className="text-gold/60">vercel.com</span>
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments composant ce site (textes, images, calligraphies, logos, design)
              est la propriété exclusive de Hurûf, protégé par les lois françaises et internationales
              relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
              du contenu de ce site est strictement interdite sans l'autorisation écrite préalable de Hurûf.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">4. Données personnelles (RGPD)</h2>
            <p>
              Les données personnelles collectées via les formulaires de ce site (nom, email, messages)
              sont utilisées exclusivement pour répondre à vos demandes et ne sont pas cédées à des tiers.
            </p>
            <p className="mt-3">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez d'un droit d'accès, de rectification,
              de suppression et d'opposition à vos données personnelles.
            </p>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à : <span className="text-gold/70">contact@huruf.fr</span>
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">5. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (panier,
              session). Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans votre consentement.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </section>

          <p className="text-pearl/30 text-sm border-t border-gold/10 pt-6 mt-10">
            Dernière mise à jour : novembre 2025 · Hurûf — SIRET 993 653 393 00013
          </p>
        </div>
      </div>
    </div>
  )
}
