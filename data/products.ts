export type Format = '30x40' | '40x50' | '50x70'

export interface FormatPrice {
  single: number
  lot3: number
}

export interface Product {
  id: string
  slug: string
  /** Nom français affiché en titre */
  nameFr: string
  /** Mot arabe — affiché sur les cartes et pages produit uniquement */
  nameAr: string
  /** Phonétique — affiché sur les cartes et pages produit uniquement */
  transliteration: string
  meaning: string
  description: string
  calligraphyDescription: string
  /** Première image = image principale ; les suivantes = galerie */
  images: string[]
  featured: boolean
  /** true = c'est un pack (duo ou trio) et non un tableau seul */
  isBundle?: boolean
  bundleSize?: 2 | 3
  /** Prix sur demande (duo) */
  prixSurDemande?: boolean
  prices: Record<Format, FormatPrice>
}

export const FORMATS: Record<Format, string> = {
  '30x40': '30 × 40 cm',
  '40x50': '40 × 50 cm',
  '50x70': '50 × 70 cm',
}

export const products: Product[] = [
  /* ─────────────────────────── TABLEAUX SEULS ─────────────────────────── */

  {
    id: 'allah-akbar',
    slug: 'allahu-akbar-grandeur',
    nameFr: 'Allahu Akbar',
    nameAr: 'الله أكبر',
    transliteration: 'Allahu Akbar',
    meaning: 'Dieu est le plus Grand',
    description:
      "Allahu Akbar est une formule de magnification divine, l'un des dhikr (rappels) les plus récités dans la tradition islamique. Au-delà de toute connotation, ces mots expriment simplement la grandeur infinie du Créateur face à la petitesse de l'existence humaine. Un tableau de paix intérieure et de sérénité profonde.",
    calligraphyDescription:
      "La composition s'inspire du style Thuluth monumental, donnant à cette formule sa pleine majesté — équilibre, hauteur et puissance visuelle.",
    images: [
      '/images/products/allah-akbar-1.png',
      '/images/products/allah-akbar-2.png',
    ],
    featured: true,
    prices: {
      '30x40': { single: 37.99, lot3: 99.99 },
      '40x50': { single: 47.99, lot3: 124.99 },
      '50x70': { single: 61.99, lot3: 159.99 },
    },
  },

  {
    id: 'salam',
    slug: 'salam-paix',
    nameFr: 'Salam — Paix',
    nameAr: 'سلام',
    transliteration: 'Salam',
    meaning: 'La Paix',
    description:
      "Salam est la salutation universelle, le vœu adressé à l'autre au premier instant de la rencontre. La paix comme état d'être, comme aspiration quotidienne. Ce mot résonne depuis des siècles et trouve ici une forme visuelle digne de sa profondeur.",
    calligraphyDescription:
      "La composition s'inspire du style Riqa'a pour une fluidité particulière — ses lettres s'enchaînent comme une respiration apaisée.",
    images: [
      '/images/products/salam-3.png',
      '/images/products/salam-1.png',
      '/images/products/salam-2.png',
    ],
    featured: true,
    prices: {
      '30x40': { single: 35.99, lot3: 95.99 },
      '40x50': { single: 45.99, lot3: 119.99 },
      '50x70': { single: 58.99, lot3: 149.99 },
    },
  },

  {
    id: 'subhanallah',
    slug: 'subhanallah-gloire',
    nameFr: 'Subhanallah',
    nameAr: 'سبحان الله',
    transliteration: 'Subhanallah',
    meaning: 'Gloire à Dieu',
    description:
      "Subhanallah est une expression d'émerveillement et de glorification divine. On le prononce devant la beauté d'un coucher de soleil, la naissance d'un enfant, ou tout ce qui dépasse la compréhension humaine. Ce tableau est une invitation permanente à l'émerveillement.",
    calligraphyDescription:
      "Composé dans l'esprit du style Naskh raffiné, la formule s'inscrit en une ligne noble et équilibrée, riche en points diacritiques.",
    images: ['/images/products/subhanallah.png'],
    featured: true,
    prices: {
      '30x40': { single: 34.99, lot3: 92.99 },
      '40x50': { single: 44.99, lot3: 116.99 },
      '50x70': { single: 56.99, lot3: 144.99 },
    },
  },

  {
    id: 'sabr',
    slug: 'sabr-patience',
    nameFr: 'Sabr — Patience',
    nameAr: 'صبر',
    transliteration: 'Sabr',
    meaning: 'La Patience',
    description:
      "Sabr est l'une des vertus les plus célébrées dans la sagesse arabe et islamique. Elle incarne la capacité à traverser l'épreuve avec dignité, à persévérer sans se laisser consumer par l'impatience. Ce tableau capture l'essence de cette qualité rare.",
    calligraphyDescription:
      "Composé dans l'esprit du style Naskh classique, ce caractère s'élance avec équilibre et retenue — comme la vertu qu'il représente.",
    images: ['/images/products/sabr.png'],
    featured: true,
    prices: {
      '30x40': { single: 35.99, lot3: 95.99 },
      '40x50': { single: 45.99, lot3: 119.99 },
      '50x70': { single: 58.99, lot3: 149.99 },
    },
  },

  {
    id: 'hubb',
    slug: 'hubb-amour',
    nameFr: 'Hubb — Amour',
    nameAr: 'حب',
    transliteration: 'Hubb',
    meaning: "L'Amour",
    description:
      "Hubb — deux lettres seulement, mais quel abîme de sens. L'amour en arabe porte en lui la racine du désir, de l'attachement et du dévoilement de soi. Offrir ce tableau, c'est offrir une déclaration silencieuse et intemporelle.",
    calligraphyDescription:
      "Dans l'esprit du style Diwani, les deux lettres ح et ب se rejoignent en une courbe unique, symbole d'union et de plénitude.",
    images: ['/images/products/hubb.png'],
    featured: true,
    prices: {
      '30x40': { single: 34.99, lot3: 92.99 },
      '40x50': { single: 44.99, lot3: 116.99 },
      '50x70': { single: 57.99, lot3: 146.99 },
    },
  },

  {
    id: 'hulm',
    slug: 'hulm-reve',
    nameFr: 'Hulm — Rêve',
    nameAr: 'حلم',
    transliteration: 'Hulm',
    meaning: 'Le Rêve',
    description:
      "Hulm est le rêve nocturne, mais aussi le rêve éveillé — l'aspiration profonde, la vision que l'on porte en soi. Dans la poésie arabe classique, le rêve est souvent le territoire de la rencontre avec ce que l'on désire le plus. Ce tableau invite à ne jamais cesser de rêver.",
    calligraphyDescription:
      "La composition s'inspire du Naskh et déploie les trois lettres avec une légèreté qui évoque l'état de rêverie.",
    images: ['/images/products/hulm.png'],
    featured: false,
    prices: {
      '30x40': { single: 36.99, lot3: 98.99 },
      '40x50': { single: 46.99, lot3: 122.99 },
      '50x70': { single: 59.99, lot3: 152.99 },
    },
  },

  /* ──────────────────────────────── PACKS ──────────────────────────────── */

  {
    id: 'duo-bismillah',
    slug: 'duo-bismillah-subhanallah',
    nameFr: 'Duo Bismillah · Subhanallah',
    nameAr: 'بسم الله · سبحان الله',
    transliteration: 'Bismillah · Subhanallah',
    meaning: 'Au nom de Dieu · Gloire à Dieu',
    description:
      "Ce duo associe deux des formules les plus emblématiques de la calligraphie islamique : Bismillah (au nom de Dieu) et Subhanallah (gloire à Dieu). Ensemble, ils forment un diptyque équilibré et harmonieux, conçu pour être exposé côte à côte.",
    calligraphyDescription:
      "Les deux tableaux ont été composés dans le même style et avec les mêmes proportions pour garantir une cohérence visuelle parfaite.",
    images: [
      '/images/products/duo-bismi-2.png',
      '/images/products/duo-bismi-3.png',
      '/images/products/duo-bismi-1.png',
    ],
    featured: true,
    isBundle: true,
    bundleSize: 2,
    prices: {
      '30x40': { single: 64.99, lot3: 64.99 },
      '40x50': { single: 79.99, lot3: 79.99 },
      '50x70': { single: 99.99, lot3: 99.99 },
    },
  },

  {
    id: 'trio-chukr-sabr-hubb',
    slug: 'trio-chukr-sabr-hubb',
    nameFr: 'Trio Chukr · Sabr · Hubb',
    nameAr: 'شكر · صبر · حب',
    transliteration: 'Chukr · Sabr · Hubb',
    meaning: 'Gratitude · Patience · Amour',
    description:
      "Ce trio rassemble trois valeurs fondamentales : la gratitude (Chukr), la patience (Sabr) et l'amour (Hubb). Exposés ensemble, ces trois tableaux forment une composition murale équilibrée et profonde, idéale pour un salon, une entrée ou un couloir. Un cadeau parfait pour une famille ou un foyer.",
    calligraphyDescription:
      "Chaque tableau du trio est composé dans le même style, avec des proportions et une mise en page coordonnées pour une cohérence visuelle optimale.",
    images: [
      '/images/products/trio-chukr-1.png',
      '/images/products/trio-chukr-2.png',
    ],
    featured: true,
    isBundle: true,
    bundleSize: 3,
    prices: {
      '30x40': { single: 89.99, lot3: 89.99 },
      '40x50': { single: 109.99, lot3: 109.99 },
      '50x70': { single: 134.99, lot3: 134.99 },
    },
  },

  {
    id: 'trio-bismillah',
    slug: 'trio-bismillah-subhanallah-allahuakbar',
    nameFr: 'Trio Bismillah · Subhanallah · Allahu Akbar',
    nameAr: 'بسم الله · سبحان الله · الله أكبر',
    transliteration: 'Bismillah · Subhanallah · Allahu Akbar',
    meaning: 'Au nom de Dieu · Gloire à Dieu · Dieu est le plus Grand',
    description:
      "Ce trio associe trois formules spirituelles majeures : Bismillah, Subhanallah et Allahu Akbar. Ensemble, ils créent une composition murale d'une grande richesse, parfaite pour une pièce de vie. Chaque tableau peut aussi être acheté séparément.",
    calligraphyDescription:
      "Les trois tableaux partagent le même style de composition et la même gamme de couleurs pour une harmonie parfaite.",
    images: ['/images/products/trio-bismi.png'],
    featured: false,
    isBundle: true,
    bundleSize: 3,
    prices: {
      '30x40': { single: 89.99, lot3: 89.99 },
      '40x50': { single: 109.99, lot3: 109.99 },
      '50x70': { single: 134.99, lot3: 134.99 },
    },
  },
]

const FEATURED_ORDER = ['allah-akbar', 'duo-bismillah', 'salam', 'trio-chukr-sabr-hubb', 'subhanallah', 'sabr']
export const getFeaturedProducts = () =>
  FEATURED_ORDER.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug)
