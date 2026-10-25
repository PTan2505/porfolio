import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SplitText from '@/components/SplitText'
import SpecularButton from '@/components/SpecularButton'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { profile, stats } from '@/data/site'

export default function AboutTeaser() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="About" ghost="About" />
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h3 id="about-title" className="sr-only">
              About {profile.fullName}
            </h3>
            <SplitText
              tag="p"
              text="I build interfaces that are fast, accessible and a pleasure to use — from the first component to the CI pipeline that ships it."
              splitType="words"
              delay={30}
              duration={1}
              textAlign="left"
              className="text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-ink"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{profile.summary}</p>
              <SpecularButton as={Link} to="/about" size="md" className="group/btn mt-8">
                More about me
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
              </SpecularButton>
            </Reveal>
          </div>
          <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-paper p-6 sm:p-8">
                <dt className="text-sm font-medium text-ink-soft">{s.label}</dt>
                <dd className="mt-3 text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-none tracking-tight text-ink tabular-nums">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
