import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion } from 'motion/react'
import GridScan from '@/components/GridScan'
import TechText from '@/components/TechText'
import SpecularButton from '@/components/SpecularButton'
import { SocialPill } from '@/components/common/SocialPills'
import { profile, socials } from '@/data/site'
import { isFigmaCapture } from '@/lib/figmaCapture'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const name = `${profile.firstName} ${profile.lastName}`.toUpperCase()
  const nameBandRef = useRef(null)

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden bg-paper">
      {/* Background: React Bits Grid Scan in monochrome */}
      <div className="absolute inset-0 -z-10 opacity-80">
        <GridScan
          linesColor="#3a3a3a"
          scanColor="#f5f5f5"
          cells={10}
          depth={3}
          glow={0.4}
          reflection={0.2}
          scanDuration={3}
          scanDelay={2.4}
          clickEffect="ping"
          dpr={1.25}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-paper to-transparent" />

      {/* Big name, solid. Tech Text "metrics" intro draws the
          type guides (baseline, x-height, cap height) first, then traces the letters in.
          The canvas spans the whole section so letters can be dragged anywhere; the name itself is
          laid out inside the invisible band below. */}
      <div
        ref={nameBandRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[max(6.5rem,13svh)] h-[clamp(120px,22vw,330px)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute inset-0 z-10 text-ink"
      >
        <TechText
          layoutRef={nameBandRef}
          text={name}
          fontFamily="'Apexor', 'Manrope Variable', sans-serif"
          fontWeight={400}
          fontSize={420}
          letterSpacing={0.02}
          color="currentColor"
          accentColor="currentColor"
          reveal="letter"
          intro="metrics"
          introDuration={2.4}
          labels
          specks={12}
          sweep={!isFigmaCapture}
        />
      </motion.div>

      {/* Soft halo so the dark hair separates from the black background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[min(70svh,720px)] w-[min(90vw,760px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.14),transparent)] lg:h-[min(80svh,860px)]"
      />

      {/* Portrait cut-out sits over the name like the reference. Oversized and pushed below the
          fold so it reads large while the head stays clear of most of the name. */}
      <picture>
        <source srcSet={profile.photoAvif} type="image/avif" />
        <motion.img
          src={profile.photo}
          alt={`Portrait of ${profile.fullName}`}
          width="1638"
          height="1618"
          fetchPriority="high"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          className="pointer-events-none absolute -bottom-[8svh] left-1/2 z-20 h-[68svh] w-auto max-w-none -translate-x-1/2 select-none object-contain object-bottom grayscale contrast-[1.05] sm:-bottom-[14svh] sm:h-[80svh] lg:-bottom-[22svh] lg:h-[90svh]"
        />
      </picture>

      {/* Left: role + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease }}
        className="absolute inset-x-4 bottom-4 z-30 rounded-3xl bg-paper/85 p-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.4)] ring-1 ring-ink/10 backdrop-blur-md sm:inset-x-6 md:inset-x-auto md:bottom-[12svh] md:left-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:max-w-sm md:bg-transparent md:p-0 md:shadow-none md:ring-0 md:backdrop-blur-none"
      >
        <h1 id="hero-title" className="font-title text-subheading font-normal leading-[1.05] text-ink">
          <span className="sr-only">{profile.fullName} — </span>
          {profile.role}
        </h1>
        <p className="mt-3 max-w-xs text-[17px] leading-relaxed text-ink-soft">{profile.tagline}</p>
        <div className="mt-6">
          <SpecularButton as={Link} to="/#contact" size="md" className="group/btn">
            Let’s collaborate
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
          </SpecularButton>
        </div>
      </motion.div>

      {/* Right: socials */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }}
        className="absolute bottom-[12svh] right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] z-30 hidden flex-col items-end gap-4 md:flex"
      >
        {socials.map(item => (
          <motion.li
            key={item.label}
            variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
          >
            <SocialPill item={item} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
