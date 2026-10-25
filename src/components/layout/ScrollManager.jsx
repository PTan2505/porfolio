import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTarget } from '@/lib/scroll'

// Scroll-to-top on route change + scroll to #hash targets.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page has rendered its sections.
      const id = requestAnimationFrame(() => scrollToTarget(hash))
      return () => cancelAnimationFrame(id)
    }
    scrollToTarget(0, { immediate: true, offset: 0 })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  useEffect(() => {
    // Move focus to main content for screen-reader users on page change.
    if (!hash) document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
