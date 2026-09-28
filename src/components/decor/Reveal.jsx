import { motion } from 'framer-motion';

/**
 * Reusable scroll-triggered animation primitives.
 *
 * All of them collapse to a static render when the visitor prefers reduced
 * motion, so content is never hidden behind an animation that will not run.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fades and lifts a single block into view. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.65,
  once = true,
  className = '',
  as = 'div',
  ...rest
}) {
  const reduce = prefersReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its `StaggerItem` children. */
export function StaggerParent({ children, className = '', delay = 0, gap = 0.09, ...rest }) {
  const reduce = prefersReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** A single child inside `StaggerParent`. */
export function StaggerItem({ children, className = '', y = 24, as = 'div', ...rest }) {
  const reduce = prefersReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
