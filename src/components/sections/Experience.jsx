import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import ProjectCover from '@/components/common/ProjectCover'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { getProject } from '@/data/projects'
import { experience, profile } from '@/data/site'
import { cn } from '@/lib/utils'

export default function Experience() {
  const listRef = useRef(null)
  const [hovered, setHovered] = useState(-1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 })

  const onMove = (e, snap = false) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    x.set(px)
    y.set(py)
    // First appearance: start at the cursor instead of flying in from the corner.
    if (snap) {
      sx.jump(px)
      sy.jump(py)
    }
  }

  const preview = hovered >= 0 ? getProject(experience[hovered].project) : null

  return (
    <section id="experience" aria-label="Experience" className="bg-night py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="Experience" ghost="Experience" dark aside={`${profile.yearsOfExperience} years of experience`} />

        <div ref={listRef} onPointerMove={e => onMove(e)} onPointerLeave={() => setHovered(-1)} className="relative mt-14">
          <ul>
            {experience.map((item, i) => (
              <Reveal as="li" key={item.company} delay={i * 0.05} className="border-b border-night-line">
                <Link
                  to={`/work/${item.project}`}
                  onPointerEnter={e => {
                    onMove(e, hovered < 0)
                    setHovered(i)
                  }}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(-1)}
                  className={cn(
                    'grid gap-2 px-2 py-8 transition-[opacity,padding] duration-300 sm:grid-cols-[1fr_auto] sm:items-center sm:px-4',
                    hovered >= 0 && hovered !== i ? 'opacity-40' : 'opacity-100',
                    hovered === i && 'sm:pl-8'
                  )}
                >
                  <div>
                    <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium">
                      {item.company}
                      {item.placeholder && (
                        <span className="ml-3 rounded-full border border-night-line px-2 py-0.5 align-middle text-xs font-semibold uppercase tracking-wide text-night-muted">
                          Details TODO
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 text-lg text-night-muted">{item.role}</p>
                  </div>
                  <p className="text-lg text-night-muted tabular-nums sm:text-right">{item.period}</p>
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* Cursor-following preview (pointer devices only) */}
          <AnimatePresence>
            {preview && (
              <motion.div
                key="preview"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ x: sx, y: sy }}
                className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)]:block"
              >
                <div className="translate-x-8 -translate-y-1/2 overflow-hidden rounded-lg border-4 border-paper/90 shadow-2xl">
                  <div className="aspect-[4/3] w-60">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={preview.slug}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full"
                      >
                        <ProjectCover project={preview} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
