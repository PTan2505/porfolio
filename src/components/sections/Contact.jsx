import { Clock, MapPin } from 'lucide-react'
import SplitText from '@/components/SplitText'
import ContactForm from '@/components/common/ContactForm'
import Reveal from '@/components/common/Reveal'
import { SocialPill } from '@/components/common/SocialPills'
import { profile, socials } from '@/data/site'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grain relative overflow-hidden bg-paper-dim py-28 sm:py-36"
      style={{
        backgroundImage:
          'radial-gradient(50% 40% at 20% 30%, rgb(255 255 255 / 0.06), transparent 70%), radial-gradient(45% 45% at 80% 60%, rgb(255 255 255 / 0.04), transparent 70%)',
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 id="contact-title" className="sr-only">
          Contact
        </h2>
        <SplitText
          tag="p"
          text="HAVE A PROJECT IN MIND?"
          splitType="chars"
          delay={20}
          duration={0.9}
          mask
          className="text-[clamp(2.25rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Together, we can build something clear and impactful. Tell me about your product, team or role — I usually reply within a day.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <ul className="flex flex-wrap items-center justify-center gap-3">
            <li>
              <span className="inline-flex h-11 items-center gap-2.5 rounded-full bg-ink py-1 pl-1 pr-5 text-[15px] font-semibold text-paper shadow-lg">
                <img src={profile.avatar} alt="" width="36" height="36" className="size-9 rounded-full object-cover object-top grayscale" />
                {profile.fullName}
              </span>
            </li>
            {socials.map(item => (
              <li key={item.label}>
                <SocialPill item={item} />
              </li>
            ))}
            <li>
              <SocialPill item={{ label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: 'phone' }} />
            </li>
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft">
            <MapPin aria-hidden="true" className="size-4" /> {profile.location}
            <span aria-hidden="true">·</span>
            <Clock aria-hidden="true" className="size-4" /> GMT+7
          </p>
        </Reveal>
      </div>
    </section>
  )
}
