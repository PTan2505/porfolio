import {
  SiExpo,
  SiGithubactions,
  SiHono,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiDjango,
  SiFigma,
  SiBun,
  SiMui,
  SiZod,
  SiReacthookform,
  SiVercel,
} from 'react-icons/si'
import LogoLoop from '@/components/LogoLoop'

const ROW_A = [
  { Icon: SiReact, title: 'React' },
  { Icon: SiTypescript, title: 'TypeScript' },
  { Icon: SiJavascript, title: 'JavaScript' },
  { Icon: SiRedux, title: 'Redux Toolkit' },
  { Icon: SiReactquery, title: 'React Query' },
  { Icon: SiTailwindcss, title: 'Tailwind CSS' },
  { Icon: SiVite, title: 'Vite' },
  { Icon: SiExpo, title: 'Expo' },
  { Icon: SiMui, title: 'MUI' },
  { Icon: SiZod, title: 'Zod' },
]
const ROW_B = [
  { Icon: SiNodedotjs, title: 'Node.js' },
  { Icon: SiHono, title: 'Hono' },
  { Icon: SiDjango, title: 'Django' },
  { Icon: SiPostgresql, title: 'PostgreSQL' },
  { Icon: SiMongodb, title: 'MongoDB' },
  { Icon: SiBun, title: 'Bun' },
  { Icon: SiGithubactions, title: 'GitHub Actions' },
  { Icon: SiVercel, title: 'Vercel' },
  { Icon: SiFigma, title: 'Figma' },
  { Icon: SiReacthookform, title: 'React Hook Form' },
]

const toLogos = row =>
  row.map(({ Icon, title }) => ({
    title,
    node: (
      <span className="inline-flex items-center gap-3 text-ink">
        <Icon aria-hidden="true" />
        <span className="text-[0.6em] font-semibold tracking-tight">{title}</span>
      </span>
    ),
  }))

export default function TechStack() {
  return (
    <section aria-labelledby="stack-title" className="border-y border-ink/5 bg-paper-dim py-16">
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
        <h2 id="stack-title" className="text-sm font-bold uppercase tracking-[0.2em] text-ink-soft">
          Tools I ship with
        </h2>
        <p className="hidden text-sm text-ink-soft sm:block">Drag to scrub ↔</p>
      </div>
      <div className="flex flex-col gap-8">
        <LogoLoop logos={toLogos(ROW_A)} speed={60} logoHeight={36} gap={56} pauseOnHover scaleOnHover ariaLabel="Frontend tools" />
        <LogoLoop
          logos={toLogos(ROW_B)}
          speed={60}
          direction="right"
          logoHeight={36}
          gap={56}
          pauseOnHover
          scaleOnHover
          ariaLabel="Backend and DevOps tools"
        />
      </div>
    </section>
  )
}
