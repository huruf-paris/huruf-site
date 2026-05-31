// TODO: Ajouter votre clé publique Stripe dans .env.local
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

import { loadStripe } from '@stripe/stripe-js'

let stripePromise: ReturnType<typeof loadStripe>

export const getStripe = () => {
  if (!stripePromise) {
    // TODO: Remplacer par votre vraie clé depuis https://dashboard.stripe.com/apikeys
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn('Stripe publishable key is not set. Payment will not work.')
      return null
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}
