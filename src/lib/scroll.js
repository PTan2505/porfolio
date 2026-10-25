// Native scrolling only. Anchor jumps glide via the browser's smooth scroll;
// reduced-motion users get an instant jump.
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToTarget(target, { immediate = false, offset = -80 } = {}) {
  const behavior = immediate || prefersReducedMotion() ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior })
}
