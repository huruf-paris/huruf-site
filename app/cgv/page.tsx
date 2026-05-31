import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Hurûf',
  description: 'Conditions générales de vente du site Hurûf.',
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-night pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="py-16 text-center">
          <p className="font-cormorant text-gold/50 text-xs tracking-[0.4em] uppercase mb-4">
            Informations légales
          </p>
          <h1 className="font-playfair text-pearl text-5xl font-light mb-4">
            Conditions Générales de Vente
          </h1>
          <div className="w-12 h-px bg-gold/30 mx-auto" />
          <p className="font-cormorant text-pearl/30 text-sm mt-4">Dernière mise à jour : juin 2025</p>
        </div>

        <div className="space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes conclues entre Hurûf (ci-après "le Vendeur") et tout client (ci-après "l'Acheteur") passant commande sur le site huruf-site.vercel.app.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">2. Produits</h2>
            <p>
              Les tableaux de calligraphie arabe proposés à la vente sont des oeuvres artisanales tracées à la main. Chaque oeuvre est unique — de légères variations par rapport aux photos peuvent exister, ce qui constitue la richesse de l'artisanat.
            </p>
            <p className="mt-3">
              Les tableaux sont livrés encadrés, prêts à être accrochés. Les formats disponibles sont : 30 × 40 cm, 40 × 50 cm et 50 × 70 cm.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">3. Prix</h2>
            <p>
              Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais les produits sont facturés sur la base du tarif en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">4. Commande et paiement</h2>
            <p>
              La commande est définitivement validée après confirmation du paiement. Le paiement est sécurisé via Stripe (chiffrement SSL). Nous acceptons les cartes Visa, Mastercard, American Express et toutes les cartes bancaires standard.
            </p>
            <p className="mt-3">
              Un email de confirmation est envoyé à l'Acheteur dès validation du paiement.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">5. Livraison</h2>
            <div className="bg-night-deep border border-gold/10 p-6 space-y-3">
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Zones de livraison</span>France métropolitaine, Belgique, Suisse, Luxembourg, Monaco</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Délai d'expédition</span>Sous 24h après confirmation de paiement</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Délai de livraison</span>3 à 5 jours ouvrés après expédition</p>
              <p><span className="text-pearl/40 uppercase text-sm tracking-wider block mb-1">Frais de livraison</span>Offerts sur toutes les commandes</p>
            </div>
            <p className="mt-4">
              En cas d'absence lors de la livraison, un avis de passage sera déposé et le colis sera disponible en point relais selon les modalités du transporteur.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">6. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-18 du Code de la consommation, l'Acheteur dispose d'un délai de <strong className="text-pearl">14 jours</strong> à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motif.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, l'Acheteur doit notifier sa décision par email à{' '}
              <a href="mailto:fashiontrendyfemme@gmail.com" className="text-gold/70 hover:text-gold transition-colors">
                fashiontrendyfemme@gmail.com
              </a>{' '}
              avant l'expiration du délai.
            </p>
            <p className="mt-3">
              Le produit doit être retourné dans son emballage d'origine, en parfait état, non utilisé. Les frais de retour sont à la charge de l'Acheteur. Le remboursement sera effectué dans un délai de 5 jours ouvrés après réception du retour.
            </p>
            <p className="mt-3 text-pearl/40 text-base italic">
              Exception : Les commandes sur mesure (personnalisées) ne peuvent pas faire l'objet d'un droit de rétractation, conformément à l'article L221-28 du Code de la consommation.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">7. Garantie légale</h2>
            <p>
              Tous nos produits bénéficient des garanties légales françaises : garantie légale de conformité (article L217-4 du Code de la consommation) et garantie contre les vices cachés (articles 1641 à 1648 du Code civil).
            </p>
            <p className="mt-3">
              En cas de produit défectueux ou endommagé lors du transport, l'Acheteur doit nous contacter dans les 48h suivant la réception avec des photos à l'appui. Nous enverrons un produit de remplacement sans frais.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">8. Responsabilité</h2>
            <p>
              Le Vendeur ne pourra être tenu responsable des dommages résultant d'une mauvaise utilisation du produit, d'un cas de force majeure, ou de faits imputables à un tiers.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">9. Litiges</h2>
            <p>
              En cas de litige, l'Acheteur est invité à contacter en premier lieu le service client à{' '}
              <a href="mailto:fashiontrendyfemme@gmail.com" className="text-gold/70 hover:text-gold transition-colors">
                fashiontrendyfemme@gmail.com
              </a>{' '}
              pour trouver une solution amiable.
            </p>
            <p className="mt-3">
              À défaut de résolution amiable, le litige sera soumis aux tribunaux français compétents. Les présentes CGV sont soumises au droit français.
            </p>
          </section>

          <div className="border-t border-gold/10 pt-8 text-center">
            <Link
              href="/mentions-legales"
              className="font-cormorant text-gold/60 hover:text-gold transition-colors text-lg tracking-wide uppercase"
            >
              ← Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
