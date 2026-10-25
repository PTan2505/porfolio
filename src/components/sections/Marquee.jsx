import ScrollVelocity from '@/components/ScrollVelocity'

const WORDS = ['Frontend Developer', 'React', 'React Native', 'Clean Architecture', 'Performance', 'CI/CD']

export default function Marquee() {
  return (
    <section aria-label="Focus areas" className="overflow-hidden bg-ink py-6 text-paper">
      <ScrollVelocity
        texts={[WORDS.join('  ✦  ') + '  ✦  ']}
        velocity={40}
        numCopies={4}
        skewWithVelocity={6}
        className="px-3 text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold uppercase tracking-tight"
      />
    </section>
  )
}
