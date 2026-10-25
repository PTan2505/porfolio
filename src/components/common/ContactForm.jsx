import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Loader2, ArrowUpRight } from 'lucide-react'
import { sendContactMessage } from '@/lib/contact'
import { cn } from '@/lib/utils'
import SpecularButton from '@/components/SpecularButton'

const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email so I can reply.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email looks incomplete — e.g. you@company.com.'
  if (values.message.trim().length < 10) errors.message = 'Tell me a bit more — at least 10 characters.'
  return errors
}

function Field({ id, label, error, required, textarea, className, ...props }) {
  const Input = textarea ? 'textarea' : 'input'
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-ink-soft">
            {' '}
            *
          </span>
        )}
      </label>
      <Input
        id={id}
        name={id.split('-').pop()}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-2xl border bg-paper/90 px-5 text-base text-ink shadow-[0_6px_20px_-14px_rgb(0_0_0/0.3)] backdrop-blur transition-[border-color,box-shadow] duration-200 placeholder:text-ink/35 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10',
          textarea ? 'min-h-36 resize-y py-4' : 'h-13 py-3',
          error ? 'border-ink' : 'border-ink/10'
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-ink">
          ↳ {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm({ className }) {
  const uid = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')

  const id = name => `${uid}-${name}`

  const onChange = e => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name]) setErrors(validate(next))
  }

  const onBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    setServerError('')
    try {
      await sendContactMessage(values)
      setStatus('sent')
      setValues(EMPTY)
      setTouched({})
    } catch (err) {
      setStatus('error')
      setServerError(err?.message || 'Something went wrong. Please try again or email me directly.')
    }
  }

  const shown = name => (touched[name] ? errors[name] : undefined)

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn('grid gap-5 text-left sm:grid-cols-2', className)}>
      <Field
        id={id('name')}
        label="Name"
        required
        autoComplete="name"
        placeholder="Your name"
        value={values.name}
        onChange={onChange}
        onBlur={onBlur}
        error={shown('name')}
      />
      <Field
        id={id('email')}
        label="Email"
        required
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
        error={shown('email')}
      />
      <Field
        id={id('subject')}
        label="Subject"
        className="sm:col-span-2"
        placeholder="Project, role, or just hello"
        value={values.subject}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Field
        id={id('message')}
        label="Message"
        required
        textarea
        className="sm:col-span-2"
        placeholder="What are you building, and how can I help?"
        value={values.message}
        onChange={onChange}
        onBlur={onBlur}
        error={shown('message')}
      />
      <div className="flex flex-col items-center gap-4 sm:col-span-2" aria-live="polite">
        <SpecularButton type="submit" size="md" disabled={status === 'sending'} className="group/btn">
          {status === 'sending' ? 'Sending…' : 'Send message'}
          {status === 'sending' ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" />
          )}
        </SpecularButton>
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Check aria-hidden="true" className="size-4" /> Thanks! Your message is on its way — I’ll reply soon.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p key="error" role="alert" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-ink">
              {serverError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
