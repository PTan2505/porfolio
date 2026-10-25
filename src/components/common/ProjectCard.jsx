import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from './ProjectCover'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block rounded-3xl bg-paper p-3 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)] ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgb(0_0_0/0.45)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
        <ProjectCover project={project} />
        <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow">
          {project.category}
        </span>
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 scale-50 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-xl transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight aria-hidden="true" className="size-6" />
        </span>
      </div>
      <div className="px-3 pb-3 pt-5">
        <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-tight tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{project.short}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <li key={tag} className="rounded-full border border-ink/10 px-4 py-1.5 text-sm font-medium text-ink/80">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
