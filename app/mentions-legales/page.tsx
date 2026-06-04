import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions lÃ©gales â€” HurÃ»f',
  description: 'Mentions lÃ©gales et informations lÃ©gales du site HurÃ»f.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-night pt-40 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-16 text-center">
          <p className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4">
            Informations lÃ©gales
          </p>
          <h1 className="font-playfair text-pearl text-5xl font-light mb-4">
            Mentions lÃ©gales
          </h1>
          <div className="w-12 h-px bg-gold/30 mx-auto" />
        </div>

        <div className="space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">1. Ã‰diteur du site</h2>
            <p>Le site huruf-site.vercel.app est Ã©ditÃ© par :</p>
            <div className="mt-4 bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Raison sociale</span>HurÃ»f â€” Ø­Ø±ÙˆÙ</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">SIRET</span>993 653 393 00013</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Code APE</span>47.91B â€” Vente Ã  distance sur catalogue gÃ©nÃ©ral</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Adresse</span>60 Rue FranÃ§ois Ier, 75008 Paris, France</p>
              <p>
                <span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Email</span>
                <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                  contact@huruf-paris.fr
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">2. HÃ©bergeur</h2>
            <div className="bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">SociÃ©tÃ©</span>Vercel Inc.</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Adresse</span>340 Pine Street, Suite 701, San Francisco, CA 94104, Ã‰tats-Unis</p>
              <p>
                <span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Site web</span>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold transition-colors">vercel.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">3. PropriÃ©tÃ© intellectuelle</h2>
            <p>
              L'ensemble des contenus prÃ©sents sur ce site (textes, images, calligraphies, logos, Ã©lÃ©ments graphiques) sont la propriÃ©tÃ© exclusive de HurÃ»f ou font l'objet d'une autorisation d'utilisation.
            </p>
            <p className="mt-3">
              Toute reproduction, distribution, modification ou utilisation de ces contenus, en tout ou partie, sans autorisation Ã©crite prÃ©alable, est strictement interdite et constitue une contrefaÃ§on sanctionnÃ©e par le Code de la propriÃ©tÃ© intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">4. DonnÃ©es personnelles (RGPD)</h2>
            <p>
              ConformÃ©ment au RÃ¨glement GÃ©nÃ©ral sur la Protection des DonnÃ©es (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="mt-3 space-y-2 pl-4 border-l border-gold/20">
              <li>Droit d'accÃ¨s Ã  vos donnÃ©es personnelles</li>
              <li>Droit de rectification des donnÃ©es inexactes</li>
              <li>Droit Ã  l'effacement (droit Ã  l'oubli)</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit Ã  la portabilitÃ© des donnÃ©es</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits :{' '}
              <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                contact@huruf-paris.fr
              </a>
            </p>
            <p className="mt-3">
              Les donnÃ©es collectÃ©es (nom, adresse, email) sont utilisÃ©es uniquement pour le traitement et l'expÃ©dition des commandes. Elles ne sont jamais revendues Ã  des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nÃ©cessaires Ã  son fonctionnement (panier, session de paiement Stripe). Aucun cookie publicitaire ou de traÃ§age tiers n'est utilisÃ©.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">6. Droit applicable</h2>
            <p>
              Le prÃ©sent site et ces mentions lÃ©gales sont soumis au droit franÃ§ais. En cas de litige, et Ã  dÃ©faut de rÃ©solution amiable, les tribunaux franÃ§ais seront seuls compÃ©tents.
            </p>
          </section>

          <div className="border-t border-gold/10 pt-8 text-center">
            <p className="text-pearl/40 text-base mb-4">Consultez Ã©galement :</p>
            <Link
              href="/cgv"
              className="font-cormorant text-gold/60 hover:text-gold transition-colors text-lg tracking-wide uppercase"
            >
              Conditions GÃ©nÃ©rales de Vente â†’
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

