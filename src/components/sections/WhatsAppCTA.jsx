import { motion, useReducedMotion } from 'framer-motion';
import { CakeSlice, Heart, Sparkles } from 'lucide-react';
import { WHATSAPP_DISPLAY, buildOrderMessage, waLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/Button';

export default function WhatsAppCTA() {
  const reduceMotion = useReducedMotion();
  const href = waLink(
    buildOrderMessage({
      product: 'New order enquiry',
      requirements: 'I am ready to order. Please share your delicious treats.',
    })
  );

  return (
    <section id="contact" className="whatsapp-cta relative overflow-hidden px-4 py-14 text-center sm:py-20">
      <div className="container-gc relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <span className="eyebrow">
            <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            Ready to order?
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-choco-800 sm:text-4xl lg:text-5xl">
            Delicious Treats Just a <span className="text-berry-600">WhatsApp Away!</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-choco-500 sm:text-base">
            Tell us what you are celebrating and we will help make it a little sweeter.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-7 py-3.5 text-sm font-bold text-white shadow-whatsapp transition hover:-translate-y-0.5 hover:brightness-105 sm:text-base"
          >
            <WhatsAppIcon />
            Order on WhatsApp
          </a>
          <a
            href="tel:+918220199389"
            className="mt-4 block font-semibold text-berry-700 hover:text-berry-800"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </motion.div>
      </div>
      <motion.span
        className="whatsapp-cta-decor whatsapp-cta-left"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CakeSlice />
      </motion.span>
      <Heart className="whatsapp-cta-heart whatsapp-cta-heart-left" fill="currentColor" aria-hidden="true" />
      <Sparkles className="whatsapp-cta-sparkle" aria-hidden="true" />
      <motion.span
        className="whatsapp-cta-decor whatsapp-cta-right"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <CakeSlice />
      </motion.span>
      <Heart className="whatsapp-cta-heart whatsapp-cta-heart-right" fill="currentColor" aria-hidden="true" />
    </section>
  );
}
