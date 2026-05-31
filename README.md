# Hurûf — حروف

Site e-commerce haut de gamme pour la vente de tableaux de calligraphie arabe encadrés.

## Stack technique

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** avec palette personnalisée
- **Framer Motion** pour les animations
- **React Hook Form** + Zod pour les formulaires
- **Stripe** + **PayPal** pour les paiements
- Déploiement : **Vercel**

## Lancement en développement

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les clés API dans .env.local

# 3. Lancer le serveur de développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000)

## Configuration des paiements

### Stripe
1. Créez un compte sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Copiez votre clé publique dans `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copiez votre clé secrète dans `STRIPE_SECRET_KEY`
4. Créez la route API `/app/api/checkout/stripe/route.ts`

### PayPal
1. Créez une app sur [developer.paypal.com](https://developer.paypal.com/dashboard)
2. Copiez votre Client ID dans `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
3. Décommentez le composant PayPal dans `/app/panier/page.tsx`

## Configuration email (Resend)
1. Créez un compte sur [resend.com](https://resend.com)
2. Ajoutez votre clé API dans `RESEND_API_KEY`
3. Créez les routes `/app/api/contact/route.ts` et `/app/api/sur-mesure/route.ts`

## Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

N'oubliez pas d'ajouter les variables d'environnement dans le dashboard Vercel.

## Structure du projet

```
huruf-site/
├── app/                    # Pages (App Router)
│   ├── page.tsx            # Accueil
│   ├── boutique/           # Boutique + pages produits
│   ├── panier/             # Panier & paiement
│   ├── sur-mesure/         # Commande personnalisée
│   ├── a-propos/           # À propos
│   ├── contact/            # Contact
│   ├── mentions-legales/   # Mentions légales
│   └── cgv/                # Conditions générales de vente
├── components/             # Composants réutilisables
├── context/                # CartContext (état global du panier)
├── data/                   # Catalogue produits (products.ts)
├── lib/                    # Stripe & PayPal helpers
└── public/images/products/ # Photos des tableaux
```

## Informations légales
- SIRET : 993 653 393 00013
- APE : 47.91B
- Adresse : 60 Rue François Ier, 75008 Paris
