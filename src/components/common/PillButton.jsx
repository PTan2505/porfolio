import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Rounded pill CTA from the reference. Renders <Link>, <a> or <button> depending on props.
const variants = {
  dark: 'bg-ink text-paper shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-black',
  light: 'bg-paper text-ink border border-ink/10 shadow-[0_6px_20px_-12px_rgb(0_0_0/0.35)] hover:border-ink/25',
  invert: 'bg-paper text-ink hover:bg-paper/90',
  ghost: 'border border-paper/20 text-paper hover:bg-paper/10',
}

export default function PillButton({
  to,
  href,
  variant = 'dark',
  size = 'md',
  icon = true,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'group/pill inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    size === 'md' ? 'h-12 px-6 text-[15px]' : 'h-10 px-4 text-sm',
    variants[variant],
    className
  )
  const content = (
    <>
      {children}
      {icon === true ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:rotate-45"
        />
      ) : (
        icon || null
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
