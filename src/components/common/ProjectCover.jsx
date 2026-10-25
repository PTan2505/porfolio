import { cn } from '@/lib/utils'

// Monochrome generated cover art — used until real screenshots exist.
// Pass `image` on a project to replace it with a screenshot.

const Bar = ({ className }) => <div className={cn('h-2 rounded-full', className)} />

function Browser({ dark, children, className }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border shadow-2xl',
        dark ? 'border-white/10 bg-[#1b1b1b]' : 'border-black/10 bg-white',
        className
      )}
    >
      <div className={cn('flex items-center gap-1.5 border-b px-3 py-2', dark ? 'border-white/10' : 'border-black/5')}>
        {[0, 1, 2].map(i => (
          <span key={i} className={cn('size-2 rounded-full', dark ? 'bg-white/20' : 'bg-black/15')} />
        ))}
      </div>
      {children}
    </div>
  )
}

function Devices({ dark, logo }) {
  const line = dark ? 'bg-white/15' : 'bg-black/10'
  return (
    <div className="absolute inset-x-[8%] bottom-0 top-[18%]">
      <Browser dark={dark} className="absolute inset-x-0 bottom-[-8%] top-0">
        <div className="grid h-full grid-cols-[1fr_1.3fr] gap-4 p-5">
          <div className="space-y-3 pt-4">
            {logo && <img src={logo} alt="" className={cn('h-6 w-auto opacity-90 grayscale', dark && 'invert')} />}
            <Bar className={cn('w-4/5', dark ? 'bg-white/40' : 'bg-black/40')} />
            <Bar className={cn('w-3/5', line)} />
            <Bar className={cn('w-2/3', line)} />
            <div className={cn('mt-4 h-6 w-24 rounded-full', dark ? 'bg-white' : 'bg-black')} />
          </div>
          <div className={cn('rounded-lg', dark ? 'bg-white/[0.06]' : 'bg-black/[0.04]')}>
            <svg viewBox="0 0 200 120" className="h-full w-full opacity-60" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <path key={i} d={`M0 ${15 + i * 12} Q 60 ${i * 14} 120 ${25 + i * 10} T 200 ${10 + i * 13}`} fill="none" stroke="currentColor" strokeWidth="0.5" />
              ))}
              <circle cx="120" cy="58" r="6" fill="currentColor" />
              <circle cx="120" cy="58" r="14" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </svg>
          </div>
        </div>
      </Browser>
      <div
        className={cn(
          'absolute -bottom-[14%] right-[-2%] w-[24%] rounded-[1.4rem] border-4 p-2 shadow-2xl',
          dark ? 'border-[#2c2c2c] bg-[#111]' : 'border-[#222] bg-white'
        )}
        style={{ aspectRatio: '9 / 18' }}
      >
        <div className={cn('mx-auto mb-3 h-1.5 w-1/3 rounded-full', dark ? 'bg-white/20' : 'bg-black/20')} />
        <div className={cn('mb-2 aspect-square rounded-lg', dark ? 'bg-white/10' : 'bg-black/5')} />
        <Bar className={cn('mb-1.5 w-4/5', dark ? 'bg-white/30' : 'bg-black/30')} />
        <Bar className={cn('w-1/2', line)} />
      </div>
    </div>
  )
}

function Pulse({ dark }) {
  return (
    <div className="absolute inset-0 flex items-center">
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-1/2 w-full" aria-hidden="true">
        <path
          d="M0 60 H120 L135 60 L145 20 L160 100 L172 40 L182 70 L190 60 H260 L270 60 L278 35 L290 85 L298 60 H400"
          fill="none"
          stroke={dark ? '#fff' : '#111'}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function Editor({ dark }) {
  const line = dark ? 'bg-white/15' : 'bg-black/10'
  return (
    <Browser dark={dark} className="absolute inset-x-[10%] bottom-[-6%] top-[18%]">
      <div className={cn('flex gap-2 border-b px-4 py-2.5', dark ? 'border-white/10' : 'border-black/5')}>
        {['B', 'I', 'U', 'H1', 'H2', '“', '≡'].map(t => (
          <span
            key={t}
            className={cn(
              'grid size-6 place-items-center rounded text-[10px] font-bold',
              dark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/60'
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-5 p-5">
        <div className="space-y-2.5">
          <Bar className={cn('h-3 w-3/4', dark ? 'bg-white/50' : 'bg-black/60')} />
          {['w-full', 'w-11/12', 'w-full', 'w-2/3'].map((w, i) => (
            <Bar key={i} className={cn(w, line)} />
          ))}
          <div className="flex items-center gap-1 pt-1">
            <Bar className={cn('w-1/3', line)} />
            <span className={cn('h-4 w-0.5 animate-pulse', dark ? 'bg-white' : 'bg-black')} />
          </div>
        </div>
        <div className={cn('aspect-[4/3] rounded-lg', dark ? 'bg-white/10' : 'bg-black/[0.06]')} />
      </div>
    </Browser>
  )
}

function Cards({ dark }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-[62%] aspect-[5/7]">
        {[-14, 0, 14].map((r, i) => (
          <div
            key={r}
            className={cn(
              'absolute inset-0 rounded-xl border p-3 shadow-2xl transition-transform duration-500',
              dark ? 'border-white/15 bg-[#1d1d1d]' : 'border-black/10 bg-white',
              'group-hover:[transform:var(--to)]'
            )}
            style={{
              transform: `rotate(${r}deg) translateX(${r * 4}%)`,
              '--to': `rotate(${r * 1.5}deg) translateX(${r * 6}%) translateY(${i === 1 ? -6 : 0}%)`,
              zIndex: i === 1 ? 2 : 1,
            }}
          >
            <div className={cn('h-[58%] rounded-md', dark ? 'bg-white/10' : 'bg-black/[0.06]')} />
            <Bar className={cn('mt-3 w-2/3', dark ? 'bg-white/40' : 'bg-black/40')} />
            <Bar className={cn('mt-2 w-1/2', dark ? 'bg-white/15' : 'bg-black/10')} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard({ dark }) {
  const line = dark ? 'bg-white/15' : 'bg-black/10'
  return (
    <Browser dark={dark} className="absolute inset-x-[8%] bottom-[-6%] top-[16%]">
      <div className="grid h-full grid-cols-[22%_1fr]">
        <div className={cn('space-y-3 border-r p-4', dark ? 'border-white/10' : 'border-black/5')}>
          {[0, 1, 2, 3, 4].map(i => (
            <Bar key={i} className={cn(i === 1 ? (dark ? 'bg-white/50' : 'bg-black/60') : line, 'w-4/5')} />
          ))}
        </div>
        <div className="grid grid-cols-7 content-start gap-1.5 p-4">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'aspect-square rounded',
                [3, 9, 10, 17, 23].includes(i) ? (dark ? 'bg-white/70' : 'bg-black/80') : dark ? 'bg-white/[0.07]' : 'bg-black/[0.05]'
              )}
            />
          ))}
        </div>
      </div>
    </Browser>
  )
}

const MOTIFS = { devices: Devices, pulse: Pulse, editor: Editor, cards: Cards, dashboard: Dashboard }

export default function ProjectCover({ project, className }) {
  const { cover, image, title } = project
  const dark = cover.tone === 'dark'
  const Motif = MOTIFS[cover.motif] ?? Pulse

  if (image) {
    return <img src={image} alt={`${title} preview`} loading="lazy" className={cn('h-full w-full object-cover', className)} />
  }

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden',
        dark ? 'bg-[#1a1a1a] text-white' : 'bg-[#e9e9e9] text-black',
        className
      )}
      role="img"
      aria-label={`${title} cover`}
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(${dark ? 'rgb(255 255 255 / 0.06)' : 'rgb(0 0 0 / 0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${dark ? 'rgb(255 255 255 / 0.06)' : 'rgb(0 0 0 / 0.06)'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <span
        className={cn(
          'pointer-events-none absolute -left-2 top-2 select-none text-[clamp(3rem,9vw,7rem)] font-extrabold uppercase leading-none tracking-tighter',
          dark ? 'text-white/[0.06]' : 'text-black/[0.06]'
        )}
        aria-hidden="true"
      >
        {cover.label}
      </span>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <Motif dark={dark} logo={cover.logo} />
      </div>
    </div>
  )
}
