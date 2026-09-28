import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import useActiveSection from '../../hooks/useActiveSection';
import useScrolled from '../../hooks/useScrolled';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import { MENU_DROPDOWN, NAV_LINKS, TRACKED_SECTIONS } from '../../data/nav';
import { WHATSAPP_DISPLAY, WHATSAPP_TEL } from '../../lib/whatsapp';
import { BrandLockup } from '../ui/Brand';
import { WhatsAppButton } from '../ui/Button';

/** Ids the navbar highlights while scrolling (kept in sync with the sitemap). */
export const SECTION_IDS = TRACKED_SECTIONS;

function MobileMenu({ open, setOpen, active }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[100] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-choco-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream-50 shadow-lift"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
              <BrandLockup logoClass="h-10 w-10" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-cream-100 text-choco-700 transition hover:bg-cream-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.filter((l) => !l.hasDropdown).map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                        active === link.id
                          ? 'bg-berry-50 text-berry-700'
                          : 'text-choco-700 hover:bg-cream-100'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 px-4 text-xs font-bold uppercase tracking-[0.2em] text-choco-300">
                Our Menu
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {MENU_DROPDOWN.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-choco-600 transition-colors hover:bg-berry-50 hover:text-berry-700"
                    >
                      {item.label}
                      <span className="hidden text-xs font-normal text-choco-300 sm:block">
                        {item.tagline}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-cream-200 px-5 py-5">
              <WhatsAppButton
                product="New order enquiry"
                requirements="I would like to know your menu and prices."
                label="Order on WhatsApp"
                className="w-full"
              />
              <a
                href={WHATSAPP_TEL}
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-berry-500/30 px-6 py-3 text-sm font-semibold text-berry-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MenuDropdown({ open, setOpen, active }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => {
        const isActive = active === link.id;

        if (link.hasDropdown) {
          return (
            <li
              key={link.id}
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <a
                href={link.href}
                onFocus={() => setOpen(true)}
                aria-expanded={open}
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-berry-700' : 'text-choco-600 hover:text-berry-700'
                }`}
              >
                {link.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </a>

              <AnimatePresence>
                {open ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                  >
                    <ul className="glass-card overflow-hidden rounded-2xl p-2">
                      {MENU_DROPDOWN.map((item) => (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-berry-50"
                          >
                            <span className="block text-sm font-semibold text-choco-800">
                              {item.label}
                            </span>
                            <span className="block text-xs text-choco-400">{item.tagline}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        }

        return (
          <li key={link.id}>
            <a
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-berry-700' : 'text-choco-600 hover:text-berry-700'
              }`}
            >
              {link.label}
              {isActive ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-berry-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
export default function Navbar() {
  const scrolled = useScrolled(20);
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useBodyScrollLock(open);

  // Close everything on Escape and when the viewport grows past mobile.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setDropdown(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-cream-200/70 bg-cream-50/85 shadow-soft backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            className="container-gc flex items-center justify-between gap-4 py-3"
            aria-label="Main navigation"
          >
            <a href="#home" className="shrink-0" aria-label="Gowsalya Cake Shop — home">
              <BrandLockup logoClass="h-11 w-11" />
            </a>

            <MenuDropdown open={dropdown} setOpen={setDropdown} active={active} />

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={WHATSAPP_TEL}
                className="inline-flex items-center gap-2 text-sm font-semibold text-choco-600 transition-colors hover:text-berry-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {WHATSAPP_DISPLAY}
              </a>
              <WhatsAppButton
                product="New order enquiry"
                requirements="I would like to know your menu and prices."
                label="Order Now"
                size="sm"
              />
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-berry-600 text-white shadow-soft transition hover:bg-berry-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={open} setOpen={setOpen} active={active} />
    </>
  );
}
