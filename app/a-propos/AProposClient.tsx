'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionDivider } from '@/components/IslamicOrnament'

const TIMELINE = [
  { year: '2025', event: 'Fondation de Hurûf à Paris, au coeur du 8e arrondissement.' },
  {
    year: '2025',
    event: 'Lancement de la première collection — tableaux de calligraphie arabe encadrés.',
  },
  {
    year: '2026',
    event: 'Ouverture des commandes sur mesure et de la boutique en ligne huruf-paris.fr.',
  },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-night pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant text-gold/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Notre histoire
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-playfair text-pearl text-5xl md:text-6xl font-light mb-4"
          >
            À propos de Hurûf
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-cormorant text-pearl/55 text-xl italic leading-relaxed"
          >
            Hurûf — du mot arabe signifiant « lettres ».
            <br />
            Car tout commence par une lettre, et la lettre devient art.
          </motion.p>
        </div>
      </section>

      {/* Histoire + Photo */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="font-playfair text-pearl text-3xl font-light mb-6">
              L'histoire de la marque
            </h2>
            <div className="space-y-4 font-cormorant text-pearl/65 text-lg leading-relaxed">
              <p>
                Hurûf est née d'une conviction simple : la calligraphie arabe est l'un des arts les
                plus raffinés du monde, et pourtant elle reste absente de la plupart des intérieurs
                contemporains. Trop souvent reléguée aux mosquées ou aux livres, elle méritait
                d'entrer dans les foyers.
              </p>
              <p>
                Fondée en novembre 2025 à Paris, la marque propose des compositions calligraphiques
                arabes encadrées — designées numériquement dans la tradition des grands styles
                classiques, imprimées sur papier d'art de qualité premium et livrées encadrées,
                prêtes à accrocher.
              </p>
              <p>
                Chaque tableau est une invitation à la contemplation. Un mot. Un sens. Une présence.
                Que vous soyez arabophone ou non, ces compositions vous parlent dans un langage
                universel : celui de la beauté de la lettre arabe.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="relative aspect-[3/4] border border-gold/20 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=800&q=85"
                alt="Atelier de calligraphie — Hurûf Paris"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-night/35 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 py-5 px-5">
                <p className="font-cormorant text-pearl/65 text-sm italic text-center">
                  La lettre arabe — un patrimoine visuel de 14 siècles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Notre processus créatif ── */}
      <section className="py-16 px-6 bg-night-deep">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <div className="relative aspect-square border border-gold/20 overflow-hidden">
              <Image
                src="/images/products/sabr.png"
                alt="Composition calligraphique — Hurûf"
                fill
                className="object-cover product-image"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-night/30" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-amiri text-gold text-3xl">صبر</p>
                <p className="font-cormorant text-pearl/50 text-xs tracking-widest uppercase mt-1">
                  Sabr — Patience · Composition Hurûf Paris
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="order-1 md:order-2"
          >
            <p className="font-cormorant text-gold/60 text-xs tracking-[0.3em] uppercase mb-4">
              Notre processus
            </p>
            <h2 className="font-playfair text-pearl text-3xl font-light mb-6">
              Du design à votre mur
            </h2>
            <div className="space-y-4 font-cormorant text-pearl/65 text-lg leading-relaxed">
              <p>
                Chaque composition Hurûf est designée numériquement en s'inspirant des grands styles
                classiques de la calligraphie arabe — Naskh, Thuluth, Diwani, Riqa'a. Un travail
                minutieux de formes, de proportions et d'équilibre, fidèle à l'esthétique de
                cette tradition millénaire.
              </p>
              <p>
                Une fois la composition finalisée, elle est imprimée sur papier d'art de qualité
                premium, puis encadrée avec soin avant d'être expédiée. Chaque tableau vous
                parvient prêt à accrocher, dans un emballage protecteur renforcé.
              </p>
              <p>
                Notre engagement : vous offrir la beauté de la lettre arabe, accessible à tous,
                sans compromis sur la qualité du rendu final.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/10 pt-6">
              {[
                { num: '9', label: 'compositions' },
                { num: '3', label: 'formats disponibles' },
                { num: '100%', label: 'encadré inclus' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-playfair text-gold text-2xl font-light">{num}</p>
                  <p className="font-cormorant text-pearl/40 text-xs tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* L'art de la calligraphie */}
      <section className="py-16 px-6 bg-night-deep">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-pearl text-3xl md:text-4xl font-light mb-3">
              L'art de la calligraphie arabe
            </h2>
            <p className="font-cormorant text-pearl/50 text-lg italic">
              Un patrimoine de 14 siècles, tracé lettre à lettre
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
            {[
              {
                title: 'Une histoire de 14 siècles',
                text: "La calligraphie arabe naît avec l'Islam au VIIe siècle. Elle devient rapidement l'art suprême du monde islamique — ornant mosquées, manuscrits et palais. Les maîtres calligraphes étaient considérés comme les plus grands artistes de leur époque.",
              },
              {
                title: 'Six grands styles',
                text: "Kufique, Naskh, Thuluth, Diwani, Riqa'a, Nasta'liq… Chaque style possède ses règles, ses proportions, son caractère propre. Maîtriser un seul style demande des années de pratique quotidienne avec la plume de roseau.",
              },
              {
                title: "Au-delà de l'écriture",
                text: "Pour le calligraphe, chaque lettre est une méditation. L'art n'est pas dans la reproduction mécanique, mais dans l'état d'esprit de celui qui trace. Un bon tableau de calligraphie porte en lui la présence de son auteur.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                className="bg-night-deep p-8"
              >
                <div className="w-6 h-px bg-gold/40 mb-5" />
                <h3 className="font-playfair text-pearl text-lg mb-3">{item.title}</h3>
                <p className="font-cormorant text-pearl/55 text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-pearl text-3xl font-light text-center mb-12">
            Notre parcours
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/20 to-transparent" />
            {TIMELINE.map(({ year, event }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                className="pl-8 pb-10 relative"
              >
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-gold/60 ring-4 ring-night" />
                <span className="font-playfair text-gold/60 text-sm block mb-1">{year}</span>
                <p className="font-cormorant text-pearl/65 text-lg leading-relaxed">{event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="py-16 px-6 text-center bg-night-deep">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-cormorant text-pearl/70 text-2xl md:text-3xl italic leading-relaxed mb-4">
            « La calligraphie est la langue de la main. »
          </p>
          <p className="font-cormorant text-pearl/25 text-sm tracking-widest uppercase">
            Proverbe de la tradition calligraphique arabe
          </p>
          <div className="w-12 h-px bg-gold/40 mx-auto mt-8" />
        </motion.div>
      </section>
    </div>
  )
}
