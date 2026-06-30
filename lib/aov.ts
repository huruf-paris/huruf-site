/**
 * Remise automatique « multi-tableaux » — levier de panier moyen (AOV).
 *
 * Dès AOV_MIN_ITEMS articles au panier, AOV_DISCOUNT est appliqué
 * automatiquement au paiement. Le calcul est fait côté serveur
 * (app/api/checkout/route.ts) → impossible à manipuler depuis le navigateur.
 *
 * Un pack (duo/trio) acheté seul = 1 article → PAS de remise (marges protégées).
 *
 * ⚠️ Impact direct sur tes marges — ajuste librement ces 2 valeurs.
 */
export const AOV_MIN_ITEMS = 2 // remise dès N articles
export const AOV_DISCOUNT = 0.1 // -10 %

/** Pourcentage entier (ex. 10) pour l'affichage et les coupons Stripe. */
export const aovPercent = () => Math.round(AOV_DISCOUNT * 100)

/** La remise s'applique-t-elle pour ce nombre total d'articles ? */
export const aovDiscountActive = (itemCount: number) => itemCount >= AOV_MIN_ITEMS
