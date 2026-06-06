import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-amiri text-gold/20 text-7xl mb-4">٤٠٤</p>
        <h1 className="font-playfair text-pearl text-3xl font-light mb-3">
          Page introuvable
        </h1>
        <p className="font-cormorant text-pearl/50 text-lg italic mb-8">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/boutique"
            className="font-cormorant text-sm tracking-widest uppercase bg-gold text-night px-6 py-3 hover:bg-gold/90 transition-colors"
          >
            Voir la boutique
          </Link>
          <Link
            href="/"
            className="font-cormorant text-sm tracking-widest uppercase border border-gold/30 text-pearl/70 px-6 py-3 hover:border-gold/60 hover:text-pearl transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
