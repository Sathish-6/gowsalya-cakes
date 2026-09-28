import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Sparkles, Star } from 'lucide-react';
import { photo } from '../../data/images';
import { SHOP } from '../../data/shop';
import LazyImage from '../ui/LazyImage';
import { WhatsAppButton, Button } from '../ui/Button';
import FloatingDecor from '../decor/FloatingDecor';

const ease = [0.22, 1, 0.36, 1];

/** True when the visitor asked for reduced motion. */
function reduceMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Above-the-fold hero: the promise, the proof and the two CTAs. */
export default function Hero() {
  const hero = photo('chocolateDrip', { w: 1200 });
  const side = photo('rainbowCups', { w: 700 });
  const accent = photo('mirrorGlaze', { w: 700 });
  const still = reduceMotion();

  return (
    <section
      id="home"
      className="pink-mesh relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28"
    >
      <FloatingDecor count={12} />

      <div className="container-gc relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Thirumangalam · Madurai
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-6 font-display text-4xl font-bold leading-[1.08] text-choco-800 sm:text-5xl lg:text-6xl"
            >
              Homemade <span className="text-berry-gradient">Happiness</span>, Baked Fresh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-5 max-w-xl text-base leading-relaxed text-choco-500 sm:text-lg"
            >
              Premium homemade cakes, cookies, brownies, cupcakes and chocolate varieties — made
              in small batches with real butter, real chocolate and a whole lot of love. Order in
              one tap on WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <WhatsAppButton
                product="New order enquiry"
                requirements="I would like to know your menu and prices."
                label="Order on WhatsApp"
                size="lg"
              />
              <Button as="a" href="#menu" variant="outline" size="lg">
                Explore the menu
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <span className="inline-flex items-center gap-2 text-sm text-choco-500">
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </span>
                5.0 customer rating
              </span>

              <a
                href={SHOP.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-choco-500 transition-colors hover:text-berry-700"
              >
                <MapPin className="h-4 w-4 text-berry-500" aria-hidden="true" />
                {SHOP.address.area}, {SHOP.address.city}
              </a>
            </motion.div>
          </div>

          <HeroImagery hero={hero} side={side} accent={accent} still={still} />
        </div>
      </div>

      {/* Bottom fade into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50"
        aria-hidden="true"
      />
    </section>
  );

/** Layered hero imagery: main cake, floating card, spinning badge, backdrop. */
function HeroImagery({ hero, side, accent, still }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      <div className="relative">
        <motion.div
          animate={still ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/70"
        >
          <LazyImage
            src={hero.src}
            srcSet={hero.srcSet}
            alt={hero.alt}
            priority
            eager
            className="aspect-[4/5] w-full sm:aspect-square lg:aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </motion.div>

        <motion.div
          animate={still ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="glass-card absolute -bottom-8 -left-4 z-20 w-40 overflow-hidden rounded-2xl shadow-soft sm:-left-10 sm:w-48"
        >
          <LazyImage
            src={side.src}
            srcSet={side.srcSet}
            alt={side.alt}
            className="h-28 w-full sm:h-32"
            sizes="12rem"
          />
          <p className="px-3 py-2 text-center text-[0.7rem] font-semibold text-choco-600">
            Cupcakes for every party
          </p>
        </motion.div>

        {/* The disc stays upright so the text is always readable; only a dashed
            ring spins, which keeps the badge lively without tumbling the copy. */}
        <motion.div
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-6 -top-6 z-20 hidden h-24 w-24 place-items-center sm:grid"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="3 11"
              className="text-gold-600/70"
            />
          </svg>
          <div className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-center text-[0.6rem] font-bold uppercase leading-tight tracking-[0.12em] text-choco-900 shadow-gold">
            Freshly
            <br />
            baked
            <br />
            daily
          </div>
        </motion.div>

        <div
          className="absolute -right-8 top-10 -z-0 hidden h-56 w-56 overflow-hidden rounded-3xl opacity-40 blur-[2px] lg:block"
          aria-hidden="true"
        >
          <LazyImage src={accent.src} alt="" className="h-full w-full" sizes="14rem" />
        </div>
      </div>
    </motion.div>
  );
}

}
