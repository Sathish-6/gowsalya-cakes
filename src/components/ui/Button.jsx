import { motion } from 'framer-motion';
import { waLink, buildOrderMessage } from '../../lib/whatsapp';

/**
 * Shared button styles.
 *
 * `whatsapp` variants render as real anchors (correct target, keyboard focus,
 * SEO-friendly) that hand a pre-filled message to wa.me on click.
 */

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-berry-600 disabled:pointer-events-none disabled:opacity-60';

const variants = {
  primary:
    'bg-gradient-to-r from-berry-600 via-berry-500 to-berry-700 px-6 py-3.5 text-white shadow-soft hover:shadow-lift hover:brightness-110 active:scale-[0.98]',
  whatsapp:
    'bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3.5 text-white shadow-whatsapp hover:brightness-110 active:scale-[0.98]',
  gold: 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-6 py-3.5 text-choco-900 shadow-gold hover:brightness-110 active:scale-[0.98]',
  outline:
    'border-2 border-berry-500/40 bg-white/70 px-6 py-3.5 text-berry-700 backdrop-blur hover:border-berry-500 hover:bg-white active:scale-[0.98]',
  ghost: 'px-4 py-2.5 text-berry-700 hover:bg-berry-50 active:scale-[0.98]',
  dark: 'bg-choco-800 px-6 py-3.5 text-cream-100 shadow-soft hover:bg-choco-900 active:scale-[0.98]',
};

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: '',
  lg: 'text-base px-8 py-4',
};

const motionPresets = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 420, damping: 24 },
};

/** Generic button / anchor with a subtle lift on hover. */
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  // Render as a motion component without creating a new element type on every
  // render (which would remount the node and drop focus).
  const MotionTag = Tag === 'a' ? motion.a : motion.button;

  return (
    <MotionTag
      {...motionPresets}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? ''} ${className}`}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * WhatsApp CTA.
 *
 * The message is fully URL-encoded and the link is exposed to crawlers, so the
 * page is indexable while still opening a one-tap pre-filled chat.
 */
export function WhatsAppButton({
  product = '',
  category = '',
  quantity = 1,
  date = '',
  requirements = '',
  label = 'Order on WhatsApp',
  variant = 'whatsapp',
  size = 'md',
  className = '',
  icon,
  children,
  message,
  ...rest
}) {
  const orderMessage =
    message ?? buildOrderMessage({ product, category, quantity, date, requirements });
  const href = waLink(orderMessage);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        product ? `${label} — ${product} via WhatsApp` : `${label} via WhatsApp`
      }
      {...motionPresets}
      className={`${base} ${variants[variant] ?? variants.whatsapp} ${sizes[size] ?? ''} ${className}`}
      {...rest}
    >
      {icon ?? <WhatsAppIcon />}
      <span>{children ?? label}</span>
    </motion.a>
  );
}

/** WhatsApp glyph, drawn inline so there is no extra network request. */
export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.9 11.9 0 005.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 00-3.421-8.4" />
    </svg>
  );
}

export default Button;
