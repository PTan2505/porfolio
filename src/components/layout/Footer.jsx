import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '@/data/site'
import { scrollToTarget } from '@/lib/scroll'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
              <span className="text-outline">{profile.firstName}</span> {profile.lastName}
            </p>
            <p className="mt-4 max-w-sm text-night-muted">
              {profile.role} based in {profile.location}.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px]">
              {navLinks.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-paper/75 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-paper/75 transition-colors hover:text-paper">
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-night-line pt-6 text-sm text-night-muted sm:flex-row sm:items-center">
          <p>
            © {YEAR} {profile.fullName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToTarget(0, { offset: 0 })}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-night-line px-4 py-2 text-paper transition-colors hover:bg-paper/10"
          >
            Back to top <ArrowUp aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
