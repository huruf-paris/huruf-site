import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions GÃ©nÃ©rales de Vente â€” HurÃ»f',
  description: 'Conditions gÃ©nÃ©rales de vente du site HurÃ»f.',
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-night pt-40 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-16 text-center">
          <p className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4">
            Informations lÃ©gales
          </p>
          <h1 className="font-playfair text-pearl text-5xl font-light mb-4">
            Conditions GÃ©nÃ©rales de Vente
          </h1>
          <div className="w-12 h-px bg-gold/30 mx-auto" />
          <p className="font-cormorant text-pearl/30 text-sm mt-4">DerniÃ¨re mise Ã  jour : juin 2025</p>
        </div>

        <div className="space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">1. Objet</h2>
            <p>
              Les prÃ©sentes Conditions GÃ©nÃ©rales de Vente (CGV) rÃ©gissent l'ensemble des ventes conclues entre HurÃ»f (ci-aprÃ¨s "le Vendeur") et tout client (ci-aprÃ¨s "l'Acheteur") passant commande sur le site huruf-site.vercel.app.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">2. Produits</h2>
            <p>
              Les tableaux de calligraphie arabe proposÃ©s Ã  la vente sont des oeuvres artisanales tracÃ©es Ã  la main. Chaque oeuvre est unique â€” de lÃ©gÃ¨res variations par rapport aux photos peuvent exister, ce qui constitue la richesse de l'artisanat.
            </p>
            <p className="mt-3">
              Les tableaux sont livrÃ©s encadrÃ©s, prÃªts Ã  Ãªtre accrochÃ©s. Les formats disponibles sont : 30 Ã— 40 cm, 40 Ã— 50 cm et 50 Ã— 70 cm.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">3. Prix</h2>
            <p>
              Les prix sont indiquÃ©s en euros (â‚¬) toutes taxes comprises (TTC). Le Vendeur se rÃ©serve le droit de modifier ses prix Ã  tout moment, mais les produits sont facturÃ©s sur la base du tarif en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">4. Commande et paiement</h2>
            <p>
              La commande est dÃ©finitivement validÃ©e aprÃ¨s confirmation du paiement. Le paiement est sÃ©curisÃ© via Stripe (chiffrement SSL). Nous acceptons les cartes Visa, Mastercard, American Express et toutes les cartes bancaires standard.
            </p>
            <p className="mt-3">
              Un email de confirmation est envoyÃ© Ã  l'Acheteur dÃ¨s validation du paiement.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">5. Livraison</h2>
            <div className="bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Zones de livraison</span>France mÃ©tropolitaine, Belgique, Suisse, Luxembourg, Monaco</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">DÃ©lai d'expÃ©dition</span>Sous 24h aprÃ¨s confirmation de paiement</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">DÃ©lai de livraison</span>3 Ã  5 jours ouvrÃ©s aprÃ¨s expÃ©dition</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Frais de livraison</span>Offerts sur toutes les commandes</p>
            </div>
            <p className="mt-4">
              En cas d'absence lors de la livraison, un avis de passage sera dÃ©posÃ© et le colis sera disponible en point relais selon les modalitÃ©s du transporteur.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">6. Droit de rÃ©tractation</h2>
            <p>
              ConformÃ©ment Ã  l'article L221-18 du Code de la consommation, l'Acheteur dispose d'un dÃ©lai de <strong className="text-pearl">14 jours</strong> Ã  compter de la rÃ©ception du produit pour exercer son droit de rÃ©tractation, sans avoir Ã  justifier de motif.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, l'Acheteur doit notifier sa dÃ©cision par email Ã {' '}
              <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                contact@huruf-paris.fr
              </a>{' '}
              avant l'expiration du dÃ©lai.
            </p>
            <p className="mt-3">
              Le produit doit Ãªtre retournÃ© dans son emballage d'origine, en parfait Ã©tat, non utilisÃ©. Les frais de retour sont Ã  la charge de l'Acheteur. Le remboursement sera effectuÃ© dans un dÃ©lai de 5 jours ouvrÃ©s aprÃ¨s rÃ©ception du retour.
            </p>
            <p className="mt-3 text-pearl/40 text-base italic">
              Exception : Les commandes sur mesure (personnalisÃ©es) ne peuvent pas faire l'objet d'un droit de rÃ©tractation, conformÃ©ment Ã  l'article L221-28 du Code de la consommation.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">7. Garantie lÃ©gale</h2>
            <p>
              Tous nos produits bÃ©nÃ©ficient des garanties lÃ©gales franÃ§aises : garantie lÃ©gale de conformitÃ© (article L217-4 du Code de la consommation) et garantie contre les vices cachÃ©s (articles 1641 Ã  1648 du Code civil).
            </p>
            <p className="mt-3">
              En cas de produit dÃ©fectueux ou endommagÃ© lors du transport, l'Acheteur doit nous contacter dans les 48h suivant la rÃ©ception avec des photos Ã  l'appui. Nous enverrons un produit de remplacement sans frais.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">8. ResponsabilitÃ©</h2>
            <p>
              Le Vendeur ne pourra Ãªtre tenu responsable des dommages rÃ©sultant d'une mauvaise utilisation du produit, d'un cas de force majeure, ou de faits imputables Ã  un tiers.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">9. Litiges</h2>
            <p>
              En cas de litige, l'Acheteur est invitÃ© Ã  contacter en premier lieu le service client Ã {' '}
              <a href="mailto:contact@huruf-paris.fr" className="text-gold/70 hover:text-gold transition-colors">
                contact@huruf-paris.fr
              </a>{' '}
              pour trouver une solution amiable.
            </p>
            <p className="mt-3">
              Ã€ dÃ©faut de rÃ©solution amiable, le litige sera soumis aux tribunaux franÃ§ais compÃ©tents. Les prÃ©sentes CGV sont soumises au droit franÃ§ais.
            </p>
          </section>

          <div className="border-t border-gold/10 pt-8 text-center">
            <Link
              href="/mentions-legales"
              className="font-cormorant text-gold/60 hover:text-gold transition-colors text-lg tracking-wide uppercase"
            >
              â† Mentions lÃ©gales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

