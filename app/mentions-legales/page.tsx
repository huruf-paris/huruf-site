import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales — Hurûf',
  description: 'Mentions légales et informations légales du site Hurûf.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-night pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-16 text-center">
          <p className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4">
            Informations légales
          </p>
          <h1 className="font-playfair text-pearl text-5xl font-light mb-4">
            Mentions légales
          </h1>
          <div className="w-12 h-px bg-gold/30 mx-auto" />
        </div>

        <div className="space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">1. Éditeur du site</h2>
            <p>Le site huruf-site.vercel.app est édité par :</p>
            <div className="mt-4 bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Raison sociale</span>Hurûf — حروف</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">SIRET</span>993 653 393 00013</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Code APE</span>47.91B — Vente à distance sur catalogue général</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Adresse</span>60 Rue François Ier, 75008 Paris, France</p>
              <p>
                <span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Email</span>
                <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                  contact@huruf-paris.fr
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">2. Hébergeur</h2>
            <div className="bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Société</span>Vercel Inc.</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Adresse</span>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
              <p>
                <span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Site web</span>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold transition-colors">vercel.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, calligraphies, logos, éléments graphiques) sont la propriété exclusive de Hurûf ou font l'objet d'une autorisation d'utilisation.
            </p>
            <p className="mt-3">
              Toute reproduction, distribution, modification ou utilisation de ces contenus, en tout ou partie, sans autorisation écrite préalable, est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">4. Données personnelles (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="mt-3 space-y-2 pl-4 border-l border-gold/20">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits :{' '}
              <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                contact@huruf-paris.fr
              </a>
            </p>
            <p className="mt-3">
              Les données collectées (nom, adresse, email) sont utilisées uniquement pour le traitement et l'expédition des commandes. Elles ne sont jamais revendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement (panier, session de paiement Stripe). Aucun cookie publicitaire ou de traçage tiers n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">6. Droit applicable</h2>
            <p>
              Le présent site et ces mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <div className="border-t border-gold/10 pt-8 text-center">
            <p className="text-pearl/40 text-base mb-4">Consultez également :</p>
            <Link
              href="/cgv"
              className="font-cormorant text-gold/60 hover:text-gold transition-colors text-lg tracking-wide uppercase"
            >
              Conditions Générales de Vente →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
