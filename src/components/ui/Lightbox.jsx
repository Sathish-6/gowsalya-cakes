import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import { photo } from '../../data/images';

/**
 * Accessible image lightbox.
 *
 * - Escape closes, arrow keys navigate, body scroll is locked while open.
 * - Rendered in a portal so it escapes any `overflow: hidden` ancestor.
 * - Restores focus to the trigger element on close.
 */
export default function Lightbox({ items = [], index = null, onClose, onNavigate }) {
  const open = index !== null && index >= 0;
  useBodyScrollLock(open);

  const handleKey = useCallback(
    (event) => {
      if (!open) return;
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'ArrowRight') onNavigate?.((index + 1) % items.length);
      if (event.key === 'ArrowLeft') onNavigate?.((index - 1 + items.length) % items.length);
    },
    [open, index, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (!open) return undefined;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  const current = open ? items[index] : null;
  const img = current ? photo(current.image, { w: 1600, q: 82 }) : null;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-choco-900/92 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || 'Gallery image'}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.((index - 1 + items.length) % items.length);
                }}
                aria-label="Previous image"
                className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6 sm:h-13 sm:w-13"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.((index + 1) % items.length);
                }}
                aria-label="Next image"
                className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:h-13 sm:w-13"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <motion.figure
            key={current.id}
            className="relative z-[1] max-h-full w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="mx-auto max-h-[74vh] w-auto rounded-2xl object-contain shadow-lift"
              loading="eager"
            />
            {current.caption ? (
              <figcaption className="mt-4 text-center text-sm text-cream-200">
                {current.caption}
              </figcaption>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
