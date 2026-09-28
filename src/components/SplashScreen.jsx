import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CakeSlice, Flower2, Heart, Sparkles, Star } from 'lucide-react';
import { photo } from '../data/images';

const sweets = [
  { key: 'chocolateDrip', className: 'splash-sweet-cake', alt: 'Chocolate cake with strawberries' },
  { key: 'rainbowCups', className: 'splash-sweet-cupcakes', alt: 'Freshly decorated cupcakes' },
  { key: 'sprinkleBar', className: 'splash-sweet-brownies', alt: 'Chocolate brownies' },
  { key: 'cookieBasket', className: 'splash-sweet-cookies', alt: 'Freshly baked cookies' },
];

const hearts = [
  { left: '12%', top: '27%', size: 20, delay: 0.15 },
  { left: '84%', top: '20%', size: 16, delay: 0.65 },
  { left: '74%', top: '52%', size: 22, delay: 1.05 },
  { left: '22%', top: '65%', size: 14, delay: 0.4 },
  { left: '91%', top: '40%', size: 13, delay: 1.35 },
];

const sparkles = [
  { left: '22%', top: '17%', size: 13, delay: 0.2 },
  { left: '78%', top: '31%', size: 11, delay: 0.55 },
  { left: '14%', top: '48%', size: 10, delay: 0.85 },
  { left: '88%', top: '64%', size: 14, delay: 0.35 },
  { left: '36%', top: '75%', size: 10, delay: 1.1 },
  { left: '66%', top: '13%', size: 9, delay: 1.4 },
];

export default function SplashScreen({ onComplete }) {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}gowsalya-splash-logo.png`;

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const fadeDuration = reduceMotion ? 150 : 650;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    let finishTimer;
    const timer = window.setTimeout(() => {
      setLeaving(true);
      finishTimer = window.setTimeout(onComplete, fadeDuration);
    }, reduceMotion ? 1800 : 2700);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="splash-screen fixed inset-0 z-[300] flex min-h-screen items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: 'easeInOut' }}
      role="status"
      aria-label="Gowsalya Cake Shop is getting ready"
    >
      <div className="splash-bokeh" aria-hidden="true" />
      <div className="splash-floral splash-floral-left" aria-hidden="true">
        <Flower2 />
      </div>
      <div className="splash-floral splash-floral-right" aria-hidden="true">
        <Flower2 />
      </div>

      {sweets.map(({ key, className, alt }, index) => {
        const image = photo(key, { w: 560, q: 72 });
        return (
          <motion.img
            key={key}
            src={image.src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`splash-sweet ${className}`}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -9, 0] }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.8, delay: 0.35 + index * 0.12 },
                    y: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 },
                  }
            }
          />
        );
      })}

      <div className="splash-particles" aria-hidden="true">
        {hearts.map(({ left, top, size, delay }, index) => (
          <motion.span
            key={`heart-${index}`}
            className="splash-heart"
            style={{ left, top }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={
              reduceMotion
                ? { opacity: 0.55 }
                : { opacity: [0.35, 0.9, 0.35], scale: [0.9, 1.1, 0.9], y: [0, -12, 0] }
            }
            transition={{ duration: 3.2, repeat: reduceMotion ? 0 : Infinity, delay, ease: 'easeInOut' }}
          >
            <Heart size={size} fill="currentColor" strokeWidth={1.5} />
          </motion.span>
        ))}
        {sparkles.map(({ left, top, size, delay }, index) => (
          <motion.span
            key={`sparkle-${index}`}
            className="splash-sparkle"
            style={{ left, top }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
            transition={{ duration: 2.4, repeat: reduceMotion ? 0 : Infinity, delay, ease: 'easeInOut' }}
          >
            <Star size={size} fill="currentColor" strokeWidth={1} />
          </motion.span>
        ))}
      </div>

      <motion.main
        className="splash-content relative z-10 flex flex-col items-center text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.7, delay: reduceMotion ? 0 : 0.25 }}
      >
        <motion.div
          className="splash-logo-frame"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { type: 'spring', stiffness: 170, damping: 18, delay: 0.12 }
          }
        >
          <img
            src={logoSrc}
            alt="Gowsalya Cake Shop logo, featuring the baker, homemade ribbon, cakes, category icons and WhatsApp number 8220199389"
            className="splash-logo"
            width="420"
            height="420"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        <motion.h1
          className="splash-title mt-4"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.6 }}
        >
          <span>Sweet Moments</span>
          <span className="splash-title-highlight">Start Here</span>
        </motion.h1>

        <motion.div
          className="splash-cupcake mt-3"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, y: [0, -5, 0] }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { opacity: { duration: 0.35, delay: 0.9 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }
          }
          aria-hidden="true"
        >
          <CakeSlice size={28} strokeWidth={1.6} />
        </motion.div>

        <div className="splash-progress mt-4" aria-label="Loading homepage">
          <motion.div
            className="splash-progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: reduceMotion ? 1.5 : 2.5, ease: 'easeInOut' }}
          />
        </div>
        <p className="splash-loading mt-2.5">
          <Heart size={11} fill="currentColor" aria-hidden="true" />
          <span>Loading...</span>
          <Heart size={11} fill="currentColor" aria-hidden="true" />
        </p>
      </motion.main>
    </motion.div>
  );
}
