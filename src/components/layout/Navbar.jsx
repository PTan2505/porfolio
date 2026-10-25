import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Magnet from '@/components/Magnet'
import PillButton from '@/components/common/PillButton'
import SocialPills from '@/components/common/SocialPills'
import { navLinks, profile } from '@/data/site'
import { cn } from '@/lib/utils'

function NavItem({ item, onClick, large }) {
  const isHash = item.to.includes('#')
  const Comp = isHash ? Link : NavLink
  const base = cn(
    'group/nav relative inline-flex items-baseline gap-1.5 font-medium text-ink transition-opacity hover:opacity-100',
    large ? 'text-5xl font-semibold tracking-tight' : 'text-[15px] opacity-85'
  )
  return (
    <Comp
      to={item.to}
      onClick={onClick}
      className={isHash ? base : ({ isActive }) => cn(base, isActive && 'opacity-100 underline decoration-2 underline-offset-8')}
    >
      <span className="relative">
        {item.label}
        {!large && (
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover/nav:scale-x-100" />
        )}
      </span>
      {item.count && (
        <span className={cn('font-mono text-ink-soft', large ? 'text-base' : 'text-xs')}>[{item.count}]</span>
      )}
    </Comp>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled || open
            ? 'bg-paper/80 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.35)] ring-1 ring-ink/10 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="inline-flex items-center gap-2.5 rounded-full bg-paper py-1 pl-1 pr-4 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] ring-1 ring-ink/10"
          aria-label={`${profile.firstName} ${profile.lastName} — home`}
        >
          <img src={profile.avatar} alt="" width="32" height="32" className="size-8 rounded-full object-cover object-top grayscale" />
          <span className="text-[15px] font-semibold text-ink">
            {profile.firstName} {profile.lastName}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map(item => (
              <li key={item.label}>
                <NavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Magnet padding={40} magnetStrength={4}>
              <PillButton to="/#contact" size="md">
                Let’s Talk
              </PillButton>
            </Magnet>
          </div>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-paper lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-7xl rounded-[2rem] bg-paper p-8 shadow-2xl ring-1 ring-ink/10 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-5">
                {navLinks.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <NavItem item={item} large onClick={() => setOpen(false)} />
                  </motion.li>
                ))}
              </ul>
            </nav>
            <SocialPills className="mt-8 flex flex-wrap gap-3" />
            <PillButton to="/#contact" className="mt-6 w-full" onClick={() => setOpen(false)}>
              Let’s Talk
            </PillButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
