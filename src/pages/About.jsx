import { ArrowUpRight, Download } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import SplitText from '@/components/SplitText'
import SpecularButton from '@/components/SpecularButton'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import Contact from '@/components/sections/Contact'
import TechStack from '@/components/sections/TechStack'
import { certifications, education, languages, profile, skillGroups, writing } from '@/data/site'
import usePageTitle from '@/lib/usePageTitle'

function Label({ children }) {
  return <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">{children}</h3>
}

function TodoBadge() {
  return (
    <span className="rounded-full border border-dashed border-ink/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
      TODO
    </span>
  )
}

export default function About() {
  usePageTitle('About')
  return (
    <>
      <section className="bg-paper pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">About me</p>
            <SplitText
              tag="h1"
              text={profile.fullName}
              splitType="chars"
              delay={30}
              mask
              textAlign="left"
              className="mt-6 py-[0.08em] text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-ink"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink">{profile.summary}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <SpecularButton as="a" href={profile.cv} download size="md">
                  <Download aria-hidden="true" className="size-4" />
                  Download CV
                </SpecularButton>
                <SpecularButton as="a" href={profile.github} target="_blank" rel="noreferrer" size="md" className="group/btn">
                  GitHub
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
                </SpecularButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-dim ring-1 ring-ink/10">
              <img
                src={profile.avatar}
                alt={`Portrait of ${profile.fullName}`}
                width="1105"
                height="1400"
                className="h-full w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
            <p className="absolute -bottom-5 left-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-xl">
              {profile.location}
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Education and skills" className="bg-paper-dim py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Background" ghost="Education" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-3xl bg-paper p-8 ring-1 ring-ink/10 lg:col-span-2">
              <Label>Education</Label>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-ink">{education.school}</p>
              <p className="mt-1 text-lg text-ink-soft">
                {education.degree} · {education.period}
              </p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                {education.details.map(d => (
                  <div key={d.label}>
                    <dt className="text-sm text-ink-soft">{d.label}</dt>
                    <dd className="mt-1 font-semibold text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.08} className="rounded-3xl bg-ink p-8 text-paper">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-night-muted">Languages</h3>
              <dl className="mt-5 space-y-3">
                {languages.map(l => (
                  <div key={l.label} className="flex items-baseline justify-between border-b border-night-line pb-3">
                    <dt className="text-2xl font-semibold">{l.label}</dt>
                    <dd className="text-night-muted">{l.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="mt-6 rounded-3xl bg-paper p-8 ring-1 ring-ink/10">
            <Label>Skills</Label>
            <dl className="mt-6 divide-y divide-ink/10">
              {skillGroups.map(g => (
                <div key={g.label} className="grid gap-3 py-5 md:grid-cols-[12rem_1fr]">
                  <dt className="font-semibold text-ink">{g.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map(s => (
                        <li key={s} className="rounded-full border border-ink/10 px-3.5 py-1 text-sm text-ink">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <TechStack />

      <section aria-label="Certifications, open source and writing" className="bg-paper py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink/10 p-8">
            <Label>Certifications & Awards</Label>
            <ul className="mt-6 divide-y divide-ink/10">
              {certifications.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-semibold text-ink">{c.title}</span>
                    <span className="block text-sm text-ink-soft">{c.issuer}</span>
                  </span>
                  {c.placeholder ? <TodoBadge /> : <span className="text-sm text-ink-soft">{c.year}</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="rounded-3xl border border-ink/10 p-8">
            <Label>Writing</Label>
            <ul className="mt-6 divide-y divide-ink/10">
              {writing.map((w, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-semibold text-ink">{w.title}</span>
                    <span className="block text-sm text-ink-soft">{w.summary}</span>
                  </span>
                  {w.placeholder ? <TodoBadge /> : <span className="text-sm text-ink-soft">{w.date}</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl bg-night p-8 text-paper lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="inline-flex items-center gap-3 text-2xl font-semibold">
                <SiGithub aria-hidden="true" /> Open source activity
              </h3>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-night-muted transition-colors hover:text-paper"
              >
                github.com/{profile.githubUser}
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:rotate-45" />
              </a>
            </div>
            <div className="mt-8 overflow-x-auto rounded-2xl bg-paper p-5">
              <img
                src={`https://ghchart.rshah.org/111111/${profile.githubUser}`}
                alt={`GitHub contribution chart for ${profile.githubUser}`}
                loading="lazy"
                className="min-w-[640px] grayscale"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  )
}
