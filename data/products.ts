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
    id: 'allah-akbar-dore',
    slug: 'allahu-akbar-fond-dore',
    nameFr: 'Allahu Akbar — Édition Dorée',
    nameAr: 'الله أكبر',
    transliteration: 'Allahu Akbar',
    meaning: 'Dieu est le plus Grand',
    description:
      "Allahu Akbar — « Dieu est le plus Grand » — dans une composition lumineuse sur fond doré. Cette édition exclusive apporte chaleur et raffinement à votre intérieur. Ses teintes dorées s'harmonisent naturellement avec les intérieurs contemporains clairs, le bois naturel et le marbre. Un tableau d'exception pour une entrée, un salon ou une chambre. Cadeau islamique idéal pour une pendaison de crémaillère, un mariage ou une occasion spirituelle. Livré encadré, prêt à accrocher.",
    calligraphyDescription:
      "La composition s'inspire du style Thuluth monumental sur un fond doré lumineux. Ses lettres étirées vers le haut donnent à cette formule toute sa hauteur et sa puissance visuelle. Le fond doré crée un contraste élégant qui illumine n'importe quel mur. Imprimé sur papier d'art premium, cadre inclus.",
    images: ['/images/products/allah-akbar-1.png'],
    featured: true,
    prices: {
      '30x40': { single: 37.99, lot3: 99.99 },
      '40x50': { single: 47.99, lot3: 124.99 },
      '50x70': { single: 61.99, lot3: 159.99 },
    },
  },

  {
    id: 'allah-akbar-sombre',
    slug: 'allahu-akbar-fond-sombre',
    nameFr: 'Allahu Akbar — Édition Sombre',
    nameAr: 'الله أكبر',
    transliteration: 'Allahu Akbar',
    meaning: 'Dieu est le plus Grand',
    description:
      "Allahu Akbar — « Dieu est le plus Grand » — dans une composition puissante sur fond sombre. Cette édition apporte profondeur et élégance moderne à votre intérieur. Ses teintes foncées s'harmonisent parfaitement avec les intérieurs contemporains, les murs gris anthracite ou les espaces à l'ambiance feutrée. Un tableau de caractère pour un salon, une chambre ou un bureau. Cadeau islamique idéal pour une pendaison de crémaillère, un anniversaire ou une occasion spirituelle. Livré encadré, prêt à accrocher.",
    calligraphyDescription:
      "La composition s'inspire du style Thuluth monumental sur un fond sombre élégant. Ses lettres lumineuses se détachent avec force sur le fond foncé, créant un effet de profondeur saisissant. Un rendu visuel contemporain et puissant. Imprimé sur papier d'art premium, cadre inclus.",
    images: ['/images/products/allah-akbar-2.png'],
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
      "Salam — « La Paix » — est le mot arabe le plus universel. Salutation, vœu, état d'âme : il s'adresse à tous, arabophone ou non. Posé dans une entrée, il accueille chaque visiteur. Dans un salon, il invite à la sérénité. Dans une chambre, il accompagne le repos. Ce tableau de décoration islamique est l'un de nos plus demandés, aussi bien comme cadeau que comme pièce décorative pour soi. Livré encadré, toutes tailles disponibles.",
    calligraphyDescription:
      "La composition s'inspire du style Riqa'a, reconnaissable à sa fluidité naturelle et ses lettres qui s'enchaînent avec grâce. Un rendu visuel doux et élégant, qui s'intègre dans tous les styles d'intérieur — moderne, scandinave, oriental. Imprimé sur papier d'art premium, cadre inclus.",
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
      "Subhanallah — « Gloire à Dieu » — est le mot que l'on prononce face à ce qui émerveille : la naissance d'un enfant, un coucher de soleil, un moment de grâce inattendu. Suspendu dans votre intérieur, il rappelle chaque jour la beauté de l'existence et invite à la gratitude. Un tableau de calligraphie arabe élégant, qui trouve sa place dans un salon, un couloir ou une chambre. Idéal comme cadeau islamique pour une naissance, un mariage ou une nouvelle maison.",
    calligraphyDescription:
      "Composé dans l'esprit du style Naskh, l'un des styles arabes les plus lisibles et élégants. La formule s'étire en une ligne horizontale noble, riche en points diacritiques qui donnent au rendu toute sa précision. Un équilibre visuel parfait entre complexité et harmonie. Imprimé sur papier d'art premium, cadre inclus.",
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
      "Sabr — « La Patience » — est la vertu que chacun aspire à cultiver. Dans les moments difficiles, dans les périodes d'attente, dans les épreuves du quotidien, ce mot devient une ancre, un rappel silencieux de sa propre force intérieure. Ce tableau est l'un des plus offerts : pour quelqu'un qui traverse une période difficile, pour une chambre d'hôpital, pour un proche qui a besoin d'encouragement. Un cadeau islamique profondément humain. Livré encadré, prêt à accrocher.",
    calligraphyDescription:
      "Composé dans l'esprit du style Naskh classique, ce caractère unique s'élance avec une élégance sobre et retenue — en parfaite cohérence avec la vertu qu'il représente. La sobriété de la composition en fait un tableau discret mais puissant, qui s'intègre dans tout type d'intérieur. Imprimé sur papier d'art premium, cadre inclus.",
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
      "Hubb — « L'Amour » — deux lettres seulement, mais l'un des mots les plus puissants de la langue arabe. Il porte en lui la racine du désir, de l'attachement et du don de soi. Offrir ce tableau pour un mariage, un anniversaire ou la Saint-Valentin, c'est offrir une déclaration silencieuse et intemporelle. Suspendu dans une chambre ou un salon, il rappelle chaque jour ce qui compte vraiment. Un cadeau romantique et raffiné, à la fois islamique et universel.",
    calligraphyDescription:
      "Dans l'esprit du style Diwani, l'un des plus ornementaux de la calligraphie arabe, les deux lettres ح et ب se rejoignent en une courbe fluide et continue — symbole d'union parfaite. Un rendu visuel chaleureux et élégant, idéal pour une chambre ou un espace de vie intime. Imprimé sur papier d'art premium, cadre inclus.",
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
      "Hulm — « Le Rêve » — désigne à la fois le rêve nocturne et l'aspiration profonde que l'on porte en soi. Un rappel quotidien de ne jamais abandonner ses ambitions, de continuer à imaginer, à espérer, à viser plus haut. Ce tableau de calligraphie arabe est parfait pour une chambre, un bureau ou un espace de travail créatif. Un cadeau inspirant pour un jeune adulte, un entrepreneur, ou toute personne qui construit quelque chose de grand. Livré encadré.",
    calligraphyDescription:
      "La composition s'inspire du Naskh et déploie les trois lettres حلم avec une légèreté aérienne, comme si elles flottaient sur le papier. Un rendu visuel délicat qui évoque l'état de rêverie. Parfait pour une chambre ou un bureau. Imprimé sur papier d'art premium, cadre inclus.",
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
      "Le Duo Bismillah · Subhanallah associe deux des formules islamiques les plus emblématiques en un diptyque mural élégant. Bismillah (« Au nom de Dieu ») ouvre chaque acte avec intention. Subhanallah (« Gloire à Dieu ») célèbre la beauté du monde. Côte à côte, ils créent une composition murale équilibrée et puissante, idéale pour un salon, une entrée ou une salle à manger. Chaque tableau est fourni encadré dans le même format — il suffit de les accrocher. Le cadeau islamique parfait pour une pendaison de crémaillère ou un mariage.",
    calligraphyDescription:
      "Les deux compositions partagent le même style graphique, les mêmes proportions et la même palette — garantissant une cohérence visuelle parfaite lorsqu'ils sont exposés ensemble. Un vrai travail de mise en page pensé pour que les deux pièces dialoguent harmonieusement sur votre mur. Imprimés sur papier d'art premium, cadres inclus.",
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
      "Le Trio Chukr · Sabr · Hubb réunit les trois valeurs qui font un foyer heureux : la gratitude (Chukr), la patience (Sabr) et l'amour (Hubb). Exposés ensemble en ligne ou en triangle sur votre mur, ces trois tableaux créent une composition murale profonde et harmonieuse. Idéal pour un salon, une entrée ou un couloir. C'est le cadeau islamique par excellence pour une nouvelle maison, un mariage ou une famille — trois mots qui disent tout ce que l'on souhaite à ceux qu'on aime. Les trois tableaux sont fournis encadrés, dans le même format, prêts à accrocher.",
    calligraphyDescription:
      "Les trois compositions partagent le même style graphique, les mêmes proportions et la même gamme de couleurs. Qu'ils soient accrochés alignés ou en triangle, ils forment un ensemble cohérent et raffiné. Un vrai trio pensé pour s'harmoniser ensemble, pas seulement trois tableaux vendus ensemble. Imprimés sur papier d'art premium, cadres inclus.",
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
      "Le Trio Bismillah · Subhanallah · Allahu Akbar réunit trois des formules spirituelles les plus importantes de l'islam en une composition murale d'exception. Bismillah ouvre avec intention, Subhanallah célèbre avec émerveillement, Allahu Akbar élève avec grandeur. Ensemble, ils transforment n'importe quel mur en un espace chargé de sens et de beauté. Parfait pour un salon, une salle à manger ou une salle de prière. Un cadeau islamique fort pour un homme, une famille ou une maison. Les trois tableaux sont fournis encadrés, dans le même format.",
    calligraphyDescription:
      "Les trois compositions partagent le même style graphique et la même palette — une harmonie visuelle totale pour un rendu mural professionnel. Chaque pièce est pensée pour faire partie d'un ensemble, pas pour être vue isolément. Accrochez-les alignés pour un effet galerie, ou en triangle pour une composition plus dynamique. Imprimés sur papier d'art premium, cadres inclus.",
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

const FEATURED_ORDER = ['allah-akbar-dore', 'allah-akbar-sombre', 'duo-bismillah', 'salam', 'trio-chukr-sabr-hubb', 'subhanallah', 'sabr']
export const getFeaturedProducts = () =>
  FEATURED_ORDER.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug)
