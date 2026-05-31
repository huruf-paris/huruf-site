import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  robots: { index: false },
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-night pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 border-b border-gold/10 pb-8">
          <p className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-3">
            Conditions contractuelles
          </p>
          <h1 className="font-playfair text-pearl text-4xl font-light">
            Conditions Générales de Vente
          </h1>
          <p className="font-cormorant text-pearl/40 text-base mt-2 italic">
            En vigueur au 1er janvier 2026
          </p>
        </div>

        <div className="space-y-10 font-cormorant text-pearl/70 text-lg leading-relaxed">
          {/* Article 1 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 1 — Identité du vendeur</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes effectuées
              sur le site huruf.fr par :
            </p>
            <ul className="mt-3 space-y-1.5 pl-4 border-l border-gold/15">
              <li><span className="text-pearl/40">Raison sociale :</span> Hurûf — حروف</li>
              <li><span className="text-pearl/40">SIRET :</span> 993 653 393 00013</li>
              <li><span className="text-pearl/40">Adresse :</span> 60 Rue François Ier, 75008 Paris</li>
              <li><span className="text-pearl/40">Email :</span> contact@huruf.fr</li>
              <li><span className="text-pearl/40">Activité :</span> 47.91B — Vente à distance sur catalogue spécialisé</li>
            </ul>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 2 — Produits</h2>
            <p>
              Les produits proposés à la vente sont des tableaux de calligraphie arabe encadrés,
              tracés à la main sur papier d'art. Chaque tableau comprend le cadre.
              Les caractéristiques essentielles des produits sont décrites sur les pages produits.
            </p>
            <p className="mt-3">
              Les photographies sont présentées à titre illustratif. En raison de la nature artisanale
              des œuvres, de légères variations entre le rendu photographié et le produit livré
              sont possibles et ne constituent pas un défaut.
            </p>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 3 — Prix</h2>
            <p>
              Les prix sont indiqués en euros TTC (TVA incluse le cas échéant, ou non assujetti
              selon le régime fiscal applicable). Hurûf se réserve le droit de modifier ses prix
              à tout moment, sans que cela affecte les commandes déjà passées et confirmées.
            </p>
            <div className="mt-4 bg-night-deep border border-gold/10 p-5">
              <p className="font-playfair text-pearl text-sm mb-3 tracking-wide">Grille tarifaire en vigueur :</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-2 font-cormorant text-pearl/40 tracking-widest uppercase text-xs">Format</th>
                    <th className="text-right py-2 font-cormorant text-pearl/40 tracking-widest uppercase text-xs">Affiche seule</th>
                    <th className="text-right py-2 font-cormorant text-pearl/40 tracking-widest uppercase text-xs">Lot de 3</th>
                  </tr>
                </thead>
                <tbody className="font-cormorant text-pearl/65">
                  {[
                    ['30 × 40 cm', 'à partir de 34,99 €', 'à partir de 92,99 €'],
                    ['40 × 50 cm', 'à partir de 44,99 €', 'à partir de 116,99 €'],
                    ['50 × 70 cm', 'à partir de 56,99 €', 'à partir de 144,99 €'],
                  ].map(([f, s, l]) => (
                    <tr key={f} className="border-b border-gold/5">
                      <td className="py-2">{f}</td>
                      <td className="py-2 text-right">{s}</td>
                      <td className="py-2 text-right">{l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 4 — Commande</h2>
            <p>
              La commande est réputée définitive après confirmation du paiement. Un email de
              confirmation est adressé à l'acheteur dès réception du paiement. Hurûf se réserve
              le droit d'annuler toute commande frauduleuse ou en cas de rupture de stock.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 5 — Paiement</h2>
            <p>
              Le règlement s'effectue en ligne par carte bancaire via <strong className="text-pearl/90">Stripe</strong> ou
              par <strong className="text-pearl/90">PayPal</strong>. Les transactions sont sécurisées par chiffrement SSL.
              Les coordonnées bancaires ne sont pas conservées par Hurûf.
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 6 — Livraison</h2>
            <p>
              Les produits sont expédiés à l'adresse indiquée lors de la commande. Les délais
              et frais de livraison sont indiqués au moment de la commande. Hurûf ne saurait
              être tenue responsable des retards imputables au transporteur.
            </p>
            <p className="mt-3 text-pearl/40 italic text-base">
              Note : les modalités précises de livraison (transporteurs, délais, zones) seront
              précisées dans une prochaine mise à jour de ces CGV.
            </p>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 7 — Droit de rétractation</h2>
            <p>
              Conformément à l'article L.221-18 du Code de la consommation, le consommateur
              dispose d'un délai de <strong className="text-pearl/90">14 jours calendaires</strong> à compter
              de la réception du bien pour exercer son droit de rétractation, sans avoir à justifier
              de motifs ni à payer de pénalités.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, contactez-nous à <span className="text-gold/70">contact@huruf.fr</span>{' '}
              avant l'expiration du délai. Les frais de retour sont à la charge du client.
              Le produit doit être retourné en parfait état, dans son emballage d'origine.
            </p>
            <p className="mt-3">
              <strong className="text-pearl/80">Exception :</strong> Le droit de rétractation ne s'applique pas
              aux commandes sur mesure, conformément à l'article L.221-28 13° du Code de la consommation
              (bien confectionné selon les spécifications du consommateur).
            </p>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 8 — Garanties légales</h2>
            <p>
              Tous nos produits bénéficient de la garantie légale de conformité (art. L.217-4 à L.217-14
              du Code de la consommation) et de la garantie contre les vices cachés
              (art. 1641 à 1648 du Code civil).
            </p>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="font-playfair text-pearl text-xl mb-4">Article 9 — Droit applicable & litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée en priorité. À défaut, le consommateur peut recourir à la
              médiation via la plateforme européenne de règlement en ligne des litiges :
              <span className="text-gold/60"> ec.europa.eu/consumers/odr</span>
            </p>
          </section>

          <p className="text-pearl/25 text-sm border-t border-gold/10 pt-6">
            Dernière mise à jour : janvier 2026 · Hurûf — SIRET 993 653 393 00013
          </p>
        </div>
      </div>
    </div>
  )
}
