import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SplitText from '@/components/SplitText'
import SpecularButton from '@/components/SpecularButton'
import ProjectCover from '@/components/common/ProjectCover'
import Reveal from '@/components/common/Reveal'
import { getProject, projects } from '@/data/projects'
import usePageTitle from '@/lib/usePageTitle'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePageTitle(project?.title ?? 'Not found')
  if (!project) return <NotFound />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.period },
    { label: 'Type', value: project.category },
  ]

  return (
    <article className="bg-paper pt-32">
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <Link to="/work" className="inline-flex items-center gap-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink">
            <ArrowLeft aria-hidden="true" className="size-4" /> All work
          </Link>
        </div>
        <SplitText
          key={project.slug}
          tag="h1"
          text={project.title}
          splitType="words"
          delay={40}
          textAlign="left"
          className="mt-8 max-w-5xl text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.03em] text-ink"
        />
        {project.placeholder && (
          <p className="mt-4 inline-block rounded-full border border-dashed border-ink/20 px-3 py-1 text-sm font-semibold text-ink-soft">
            Details coming soon
          </p>
        )}
        <Reveal delay={0.1}>
          <dl className="mt-12 grid gap-6 border-y border-ink/10 py-8 sm:grid-cols-3">
            {meta.map(m => (
              <div key={m.label}>
                <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">{m.label}</dt>
                <dd className="mt-2 text-lg font-medium text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="group mx-auto mt-12 max-w-7xl px-4 sm:px-6"
      >
        <div className="aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-ink/10">
          <ProjectCover project={project} />
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <aside className="flex flex-col gap-10">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map(t => (
                <li key={t} className="rounded-full border border-ink/10 px-3.5 py-1.5 text-sm font-medium text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">Links</h2>
            {project.links.length ? (
              <ul className="mt-4 flex flex-col gap-3">
                {project.links.map(l => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-2 text-lg font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/link:rotate-45" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Source code is private for this project — happy to walk through it in a call.
              </p>
            )}
          </Reveal>
        </aside>

        <div>
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">Overview</h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] leading-relaxed text-ink">{project.description}</p>
          </Reveal>
          <Reveal delay={0.05} className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft">What I did</h2>
            <ol className="mt-6">
              {project.responsibilities.map((r, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-6 text-lg leading-relaxed text-ink">
                  <span className="font-mono text-sm text-ink-soft tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {r}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <Link to={`/work/${next.slug}`} className="group block bg-night text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-night-muted">Next project</p>
            <p className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-3">
              {next.title}
            </p>
          </div>
          <span className="grid size-20 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="size-8" />
          </span>
        </div>
      </Link>
      <div className="flex justify-center bg-paper py-16">
        <SpecularButton as={Link} to="/#contact" size="md" className="group/btn">
          Start a project
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
        </SpecularButton>
      </div>
    </article>
  )
}
