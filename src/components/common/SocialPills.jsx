import { FileText, Mail, Phone } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { socials } from '@/data/site'
import { cn } from '@/lib/utils'

const ICONS = {
  github: SiGithub,
  mail: Mail,
  file: FileText,
  phone: Phone,
}

export function SocialPill({ item, className }) {
  const Icon = ICONS[item.icon]
  return (
    <a
      href={item.href}
      {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(item.download ? { download: '' } : {})}
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-full border border-ink/10 bg-paper/90 px-5 text-[15px] font-semibold text-ink shadow-[0_6px_20px_-12px_rgb(0_0_0/0.35)] backdrop-blur transition-[border-color,transform,background-color] duration-200 hover:-translate-y-0.5 hover:border-ink/30 active:scale-[0.97]',
        className
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-4" />}
      {item.label}
    </a>
  )
}

export default function SocialPills({ className, itemClassName }) {
  return (
    <ul className={className}>
      {socials.map(item => (
        <li key={item.label}>
          <SocialPill item={item} className={itemClassName} />
        </li>
      ))}
    </ul>
  )
}
