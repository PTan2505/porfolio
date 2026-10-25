import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import ProjectCover from '@/components/common/ProjectCover'
import SectionHeading from '@/components/common/SectionHeading'
import { getProject } from '@/data/projects'
import { services } from '@/data/site'
import { cn } from '@/lib/utils'

const PREVIEW = ['nghia-ad-cms', 'lowca', 'trading-card-game', 'clinic-management']
const ease = [0.22, 1, 0.36, 1]

export default function Services() {
  const [open, setOpen] = useState(0)
  const uid = useId()

  return (
    <section
      id="service"
      aria-label="Services"
      className="grain relative overflow-hidden bg-paper-dim py-28 sm:py-36"
      style={{
        backgroundImage:
          'radial-gradient(60% 50% at 15% 20%, rgb(255 255 255 / 0.05), transparent 70%), radial-gradient(50% 40% at 85% 70%, rgb(255 255 255 / 0.04), transparent 70%)',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="Service" ghost="Services" />
        <ul className="mt-14">
          {services.map((s, i) => {
            const isOpen = open === i
            const project = getProject(PREVIEW[i])
            const panelId = `${uid}-panel-${i}`
            return (
              <li key={s.title} className={cn('border-b border-ink/10', isOpen && 'border-transparent')}>
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease }}
                  className={cn('relative rounded-2xl', isOpen ? 'my-3 bg-night text-paper shadow-2xl' : 'text-ink')}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-8 text-left sm:px-6 sm:py-10"
                    >
                      <motion.span
                        layout="position"
                        className="text-[clamp(1.75rem,5.5vw,4rem)] font-medium uppercase leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2"
                      >
                        {s.title}
                      </motion.span>
                      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full transition-colors group-hover:bg-ink/5">
                        {isOpen ? (
                          <X aria-hidden="true" className="size-8 stroke-[1.5]" />
                        ) : (
                          <ArrowUpRight aria-hidden="true" className="size-8 stroke-[1.5] transition-transform duration-300 group-hover:rotate-45" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-6 px-4 pb-8 sm:px-6 sm:pb-10 md:pr-[42%]">
                          <p className="max-w-md text-[17px] leading-relaxed text-night-muted">{s.description}</p>
                          <ul className="flex flex-wrap gap-2">
                            {s.tags.map(t => (
                              <li key={t} className="rounded-full border border-night-line px-3.5 py-1 text-sm text-paper/85">
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isOpen && project && (
                      <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, rotate: 0, y: 30, scale: 0.85 }}
                        animate={{ opacity: 1, rotate: 7, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                        transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.1 }}
                        className="pointer-events-none absolute right-[7%] top-1/2 hidden aspect-[4/3] w-[clamp(220px,20vw,300px)] -translate-y-1/2 overflow-hidden rounded-lg border-[6px] border-paper shadow-2xl lg:block"
                      >
                        <ProjectCover project={project} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
