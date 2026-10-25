import PillButton from '@/components/common/PillButton'
import usePageTitle from '@/lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="grid min-h-[80svh] place-items-center bg-paper px-4 pt-24 text-center">
      <div>
        <p className="text-[clamp(6rem,20vw,14rem)] font-extrabold leading-none tracking-tighter text-ink">
          <span className="text-outline">4</span>0<span className="text-outline">4</span>
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-ink">This page doesn’t exist.</h1>
        <p className="mt-2 text-ink-soft">The link may be broken, or the page has moved.</p>
        <PillButton to="/" className="mt-8">
          Back home
        </PillButton>
      </div>
    </section>
  )
}
