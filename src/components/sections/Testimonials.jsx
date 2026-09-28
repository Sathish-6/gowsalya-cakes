import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';
import { Reveal } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

/** Sliding customer review carousel with dots and arrow controls. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next) => {
    setDir(next > 0 ? 1 : -1);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (TESTIMONIALS.length < 2) return undefined;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <SoftSection id="reviews" tone="blush">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Customer love"
          title="Rated 5 stars by"
          highlight="our customers"
          script="Sweet words"
          description="Birthdays, weddings and everyday treats — here is what people say after the first bite."
        />

        <Reveal className="relative mx-auto mt-14 max-w-3xl">
          <div className="glass-card relative overflow-hidden rounded-[2rem] px-6 py-10 shadow-lift sm:px-12 sm:py-12">
            <Quote
              className="absolute -top-2 right-6 h-24 w-24 text-berry-100"
              aria-hidden="true"
            />

            <div className="min-h-[230px] sm:min-h-[200px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={current.id}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex justify-center gap-1 sm:justify-start" aria-label={`${current.rating} out of 5 stars`}>
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="mt-5 text-center text-lg leading-relaxed text-choco-700 sm:text-left sm:text-xl">
                    “{current.text}”
                  </blockquote>

                  <figcaption className="mt-6 flex flex-col items-center gap-1 sm:items-start">
                    <span className="font-display text-lg font-bold text-berry-700">{current.name}</span>
                    <span className="text-sm text-choco-400">
                      {current.role} · {current.product}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous review"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-berry-700 shadow-soft ring-1 ring-cream-200 transition hover:bg-white active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Review ${i + 1} of ${TESTIMONIALS.length}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-berry-500' : 'w-2.5 bg-cream-300 hover:bg-berry-300'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next review"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-berry-700 shadow-soft ring-1 ring-cream-200 transition hover:bg-white active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </SoftSection>
  );
}
