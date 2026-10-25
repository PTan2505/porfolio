import { Quote } from 'lucide-react'
import Reveal from '@/components/common/Reveal'
import SectionHeading from '@/components/common/SectionHeading'
import { testimonials } from '@/data/site'

export default function Testimonials() {
  return (
    <section aria-label="Testimonials" className="bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="Kind Words" ghost="Testimonials" />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-dashed border-ink/15 bg-paper-dim p-8">
                <div>
                  <Quote aria-hidden="true" className="size-8 text-ink" />
                  <blockquote className="mt-6 text-lg leading-relaxed text-ink">{t.quote}</blockquote>
                </div>
                <figcaption className="flex items-center gap-4">
                  <span aria-hidden="true" className="size-11 rounded-full bg-ink/10" />
                  <span>
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-ink-soft">{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
