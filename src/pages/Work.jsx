import Contact from '@/components/sections/Contact'
import SelectedWork from '@/components/sections/SelectedWork'
import usePageTitle from '@/lib/usePageTitle'

export default function Work() {
  usePageTitle('Work')
  return (
    <div className="pt-24">
      <SelectedWork title="All Work" showViewAll={false} headingAs="h1" />
      <Contact />
    </div>
  )
}
