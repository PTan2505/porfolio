import { useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import SplitText from '@/components/SplitText'

// Ghost word size cap: the original clamp(4.5rem, 15vw, 13rem), resolved in px.
const ghostCap = () => {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  return Math.max(4.5 * rem, Math.min(window.innerWidth * 0.15, 13 * rem))
}

// Shrinks the ghost word so it never runs wider than the heading's container.
function useFitWidth(boxRef, textRef) {
  useLayoutEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return undefined
    const fit = () => {
      text.style.fontSize = '100px'
      const natural = text.getBoundingClientRect().width
      if (!natural) return
      text.style.fontSize = `${Math.min(ghostCap(), (100 * box.clientWidth) / natural)}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    window.addEventListener('resize', fit)
    document.fonts?.ready.then(fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [boxRef, textRef])
}

// Centred "SELECTED WORK" style heading (Astravolt) with an optional giant ghost word (Apexor) behind it.
export default function SectionHeading({ title, ghost, dark = false, align = 'center', aside, className, as = 'h2' }) {
  const ghostBoxRef = useRef(null)
  const ghostRef = useRef(null)
  useFitWidth(ghostBoxRef, ghostRef)

  return (
    <div className={cn('relative', className)}>
      {ghost && (
        <div
          ref={ghostBoxRef}
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-x-0 top-0 flex select-none', align === 'center' ? 'justify-center' : 'justify-start')}
        >
          <span
            ref={ghostRef}
            className={cn(
              'font-hero -mt-[0.35em] block whitespace-nowrap text-[clamp(4.5rem,15vw,13rem)] font-normal uppercase leading-none tracking-[0.04em]',
              dark ? 'ghost-title-dark' : 'ghost-title'
            )}
          >
            {ghost}
          </span>
        </div>
      )}
      <div
        className={cn(
          'relative flex',
          align === 'center' ? 'flex-col items-center gap-3 text-center' : 'flex-wrap items-end justify-between gap-4'
        )}
      >
        <SplitText
          tag={as}
          text={title}
          textAlign={align}
          splitType="chars"
          delay={25}
          duration={0.9}
          mask
          className={cn(
            'font-title text-[clamp(2.875rem,calc(6vw+10px),5.125rem)] font-bold uppercase leading-[0.95] tracking-normal',
            dark ? 'text-paper' : 'text-ink'
          )}
        />
        {aside && (
          <div className={cn('text-lg', align !== 'center' && 'pb-2', dark ? 'text-paper/80' : 'text-ink-soft')}>{aside}</div>
        )}
      </div>
    </div>
  )
}
