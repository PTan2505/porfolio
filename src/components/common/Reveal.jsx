import { motion } from 'motion/react'

// Fade-and-rise on scroll into view. Honors reduced motion through <MotionConfig reducedMotion="user">.
export default function Reveal({ children, delay = 0, y = 32, className, as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
