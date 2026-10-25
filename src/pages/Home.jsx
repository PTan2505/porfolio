import AboutTeaser from '@/components/sections/AboutTeaser'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import SelectedWork from '@/components/sections/SelectedWork'
import Services from '@/components/sections/Services'
import TechStack from '@/components/sections/TechStack'
import Testimonials from '@/components/sections/Testimonials'
import usePageTitle from '@/lib/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork limit={4} />
      <TechStack />
      <Services />
      <Experience />
      <AboutTeaser />
      <Testimonials />
      <Contact />
    </>
  )
}
