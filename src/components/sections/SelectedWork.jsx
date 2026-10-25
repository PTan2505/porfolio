import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import SpecularButton from '@/components/SpecularButton'
import ProjectCard from '@/components/common/ProjectCard'
import SectionHeading from '@/components/common/SectionHeading'
import { categories, projects } from '@/data/projects'
import { cn } from '@/lib/utils'

export default function SelectedWork({ limit, showViewAll = true, headingAs = 'h2', title = 'Selected Work' }) {
  const [active, setActive] = useState('All')
  const filtered = projects.filter(p => active === 'All' || p.category === active)
  const list = limit ? filtered.slice(0, limit) : filtered

  return (
    <section id="work" aria-label={title} className="bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title={title} ghost="Portfolio" align="center" as={headingAs} />

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1">
            {categories.map(c => (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={cn(
                  'relative h-11 cursor-pointer rounded-full px-5 text-[15px] font-medium transition-colors',
                  active === c ? 'text-paper' : 'text-ink hover:bg-ink/5'
                )}
              >
                {active === c && (
                  <motion.span
                    layoutId={`work-filter-${title}`}
                    className="absolute inset-0 -z-0 rounded-full bg-ink"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          {showViewAll && (
            <SpecularButton as={Link} to="/work" size="md" className="group/btn">
              View All Work
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
            </SpecularButton>
          )}
        </div>

        <motion.ul layout className="mt-12 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((project, i) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i % 2 === 1 && 'md:mt-20')}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="mt-12 text-center text-ink-soft">No projects in this category yet.</p>}
      </div>
    </section>
  )
}
