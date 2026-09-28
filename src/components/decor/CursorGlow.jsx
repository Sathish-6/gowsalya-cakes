import { useEffect, useState } from 'react';
import useDevice from '../../hooks/useDevice';

/**
 * A soft glow that follows the pointer on desktop.
 *
 * Disabled entirely for touch devices and low-power machines — it is purely
 * decorative and never intercepts clicks.
 */
export default function CursorGlow() {
  const { isDesktop, lowPower } = useDevice();
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop || lowPower) return undefined;

    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setPos({ x: event.clientX, y: event.clientY });
        setVisible(true);
        frame = 0;
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isDesktop, lowPower]);

  if (!isDesktop || lowPower) return null;

  return (
    <div
      className="pointer-events-none fixed z-0 h-72 w-72 rounded-full transition-opacity duration-500"
      style={{
        left: pos.x - 144,
        top: pos.y - 144,
        opacity: visible ? 0.5 : 0,
        background: 'radial-gradient(circle, rgba(255,167,200,0.35) 0%, rgba(255,231,240,0) 70%)',
      }}
      aria-hidden="true"
    />
  );
}
