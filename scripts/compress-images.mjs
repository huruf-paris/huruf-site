// Script de compression d'images pour Hurûf
// Réduit les PNG de ~9MB à ~200-400KB en gardant la qualité visuelle

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

const INPUT_DIR = './public/images/products'
const MAX_WIDTH = 1200 // px — suffisant pour affichage desktop

async function compressAll() {
  const files = await readdir(INPUT_DIR)
  const pngs = files.filter(f => f.endsWith('.png'))

  console.log(`\n🗜  Compression de ${pngs.length} images...\n`)

  for (const file of pngs) {
    const filePath = join(INPUT_DIR, file)
    const before = (await stat(filePath)).size
    const tmpPath = filePath + '.tmp'

    try {
      await sharp(filePath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9, effort: 10 })
        .toFile(tmpPath)

      const after = (await stat(tmpPath)).size

      // Remplacer seulement si le fichier compressé est plus petit
      if (after < before) {
        const { rename } = await import('fs/promises')
        await rename(tmpPath, filePath)
        const saved = Math.round((1 - after / before) * 100)
        console.log(`✅ ${file.padEnd(30)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${saved}%)`)
      } else {
        const { unlink } = await import('fs/promises')
        await unlink(tmpPath)
        console.log(`⏭  ${file.padEnd(30)} déjà optimisé`)
      }
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`)
      try { const { unlink } = await import('fs/promises'); await unlink(tmpPath) } catch {}
    }
  }

  console.log('\n✨ Terminé !\n')
}

compressAll()
