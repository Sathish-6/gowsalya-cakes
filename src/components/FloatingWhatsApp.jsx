import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import useScrolled from '../hooks/useScrolled';
import useDevice from '../hooks/useDevice';
import { WHATSAPP_DISPLAY, WHATSAPP_TEL, buildOrderMessage, waLink } from '../lib/whatsapp';
import { WhatsAppIcon } from './ui/Button';

const telHref = WHATSAPP_TEL;

/**
 * Always-available ordering actions.
 *
 * - Desktop: a pulsing WhatsApp FAB that appears after the hero.
 * - Mobile: a full-width sticky bottom bar (kept clear of the safe area on
 *   notched phones).
 */
export default function FloatingWhatsApp() {
  const { isDesktop } = useDevice();
  const scrolled = useScrolled(520);
  const [dismissed, setDismissed] = useState(false);

  // Never leave a dismissed FAB hidden forever within a session.
  useEffect(() => {
    if (dismissed) {
      const timer = setTimeout(() => setDismissed(false), 30000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dismissed]);

  const href = waLink(buildOrderMessage({ product: 'New order enquiry' }));
  const visible = (scrolled || !isDesktop) && !dismissed;

  return (
    <>
      {/* Desktop FAB */}
      <AnimatePresence>
        {isDesktop && visible ? (
          <motion.div
            className="fixed bottom-8 right-8 z-[90] flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Hide WhatsApp button"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-choco-500 shadow-soft ring-1 ring-cream-200 transition hover:bg-white hover:text-berry-700"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-whatsapp"
              animate={{ boxShadow: ['0 0 0 0 rgba(37,211,102,0.55)', '0 0 0 18px rgba(37,211,102,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <WhatsAppIcon className="h-8 w-8" />
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile sticky bar */}
      <AnimatePresence>
        {!isDesktop && visible ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[90] border-t border-cream-200 bg-cream-50/95 px-3 pt-3 shadow-lift backdrop-blur-lg"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            initial={false}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-2.5">
              <a
                href={telHref}
                aria-label={`Call ${WHATSAPP_DISPLAY}`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-2 border-berry-500/30 text-berry-700"
              >
                <Phone className="h-5 w-5" />
              </a>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-sm font-semibold text-white shadow-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Hide order bar"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream-100 text-choco-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
