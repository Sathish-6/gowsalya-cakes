import { useEffect, useState } from 'react';
import useDevice from '../../hooks/useDevice';

/**
 * Soft frosting blob backdrop that morphs its own border-radius.
 * Purely decorative and disabled on low-power devices.
 */
export function FrostingBlobs({ className = '' }) {
  const { lowPower } = useDevice();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <span className="frosting-blob absolute -left-24 top-10 h-72 w-72 bg-gradient-to-br from-blush-200 to-berry-200 opacity-45 blur-2xl md:h-96 md:w-96" />
      <span
        className="frosting-blob absolute -right-20 bottom-0 h-64 w-64 bg-gradient-to-br from-cream-200 to-gold-200 opacity-50 blur-2xl md:h-80 md:w-80"
        style={{ animationDelay: '-5s' }}
      />
      {!lowPower ? (
        <span
          className="frosting-blob absolute left-1/3 top-1/2 h-56 w-56 bg-gradient-to-br from-berry-200 to-blush-100 opacity-35 blur-2xl"
          style={{ animationDelay: '-9s' }}
        />
      ) : null}
    </div>
  );
}

/** Section wrapper that paints the soft mesh + blob background. */
export function SoftSection({ children, tone = 'cream', className = '', id }) {
  const tones = {
    cream: 'bg-cream-50',
    blush: 'bg-gradient-to-b from-cream-50 via-blush-50 to-cream-50',
    dark: 'choco-mesh',
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-24 lg:py-28 ${tones[tone] ?? tones.cream} ${className}`}
    >
      <FrostingBlobs />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/** Small scroll-progress-free "trust bar" of ticks used between sections. */
export function SugarDivider() {
  const { lowPower } = useDevice();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="pointer-events-none mx-auto flex max-w-xs items-center justify-center gap-2 py-6"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-berry-300/70"
          style={
            mounted && !lowPower
              ? { animation: `floaty ${6 + i * 0.6}s ease-in-out ${i * 0.3}s infinite` }
              : undefined
          }
        />
      ))}
    </div>
  );
}

export default FrostingBlobs;
