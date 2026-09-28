import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkle, Star } from 'lucide-react';
import useDevice from '../../hooks/useDevice';

/**
 * Ambient decorative shapes that drift behind sections.
 *
 * Entirely decorative (`aria-hidden`), generated once per render from a seeded
 * list, and fully suppressed on low-power devices or when the visitor prefers
 * reduced motion.
 */
export default function FloatingDecor({ count = 10, type = 'mixed', className = '' }) {
  const { lowPower } = useDevice();

  const pieces = useMemo(() => {
    const shapes = ['heart', 'sparkle', 'star', 'dot'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: type === 'mixed' ? shapes[i % shapes.length] : type,
      // Deterministic pseudo-random placement keeps the layout stable.
      left: (i * 97 + 7) % 100,
      top: (i * 53 + 11) % 100,
      size: 10 + ((i * 7) % 16),
      duration: 7 + ((i * 3) % 8),
      delay: (i % 6) * 1.1,
      rotate: (i * 37) % 180,
      opacity: 0.18 + ((i * 4) % 22) / 100,
    }));
  }, [count, type]);

  if (lowPower) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-berry-300"
          style={{ left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacity }}
          animate={{ y: [0, -26, 0], rotate: [0, p.rotate, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.shape === 'heart' ? (
            <Heart style={{ width: p.size, height: p.size }} fill="currentColor" />
          ) : p.shape === 'sparkle' ? (
            <Sparkle style={{ width: p.size, height: p.size }} />
          ) : p.shape === 'star' ? (
            <Star style={{ width: p.size, height: p.size }} fill="currentColor" />
          ) : (
            <span
              className="block rounded-full bg-gold-300"
              style={{ width: p.size / 2.5, height: p.size / 2.5 }}
            />
          )}
        </motion.span>
      ))}
    </div>
  );
}
