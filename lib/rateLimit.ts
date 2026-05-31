/**
 * Rate limiter en mémoire — protège les routes API contre les abus
 * Limite : X requêtes par fenêtre de temps par adresse IP
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// Map globale partagée entre les requêtes (serveur Next.js)
const store = new Map<string, RateLimitEntry>()

// Nettoyage automatique toutes les 5 minutes pour éviter les fuites mémoire
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 5 * 60 * 1000)
}

interface RateLimitOptions {
  /** Nombre max de requêtes autorisées dans la fenêtre */
  limit?: number
  /** Durée de la fenêtre en millisecondes (défaut : 60s) */
  windowMs?: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(
  ip: string,
  { limit = 10, windowMs = 60_000 }: RateLimitOptions = {}
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    store.set(ip, { count: 1, resetAt })
    return { allowed: true, remaining: limit - 1, resetAt }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}
