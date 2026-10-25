import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import ClickSpark from '@/components/ClickSpark'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollManager from './ScrollManager'

export default function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <ClickSpark sparkColor="#f5f5f5" sparkSize={10} sparkRadius={22} sparkCount={8} duration={420}>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ScrollManager />
        <Navbar />
        <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
          <Outlet />
        </main>
        <Footer />
      </ClickSpark>
    </MotionConfig>
  )
}
