import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { photo } from '../../data/images';
import { WhatsAppButton, Button } from '../ui/Button';
import LazyImage from '../ui/LazyImage';

const floatingTreats = [
  { key: 'rainbowCups', label: 'Cupcakes', className: 'hero-treat-cupcakes' },
  { key: 'chocolateBun', label: 'Chocolates', className: 'hero-treat-chocolates' },
  { key: 'chocChip', label: 'Cookies', className: 'hero-treat-cookies' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const cake = photo('chocolateDrip', { w: 1200 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 48]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section pink-mesh relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[760px] lg:pb-24"
    >
      <div className="hero-bokeh" aria-hidden="true" />
      <div className="hero-organic hero-organic-one" aria-hidden="true" />
      <div className="hero-organic hero-organic-two" aria-hidden="true" />
      <div className="container-gc relative z-10">
        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="hero-copy text-center lg:text-left">
            <motion.span
              className="eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              Freshly baked · Homemade
            </motion.span>
            <motion.h1
              className="mx-auto mt-5 max-w-xl font-display text-4xl font-bold leading-[1.03] text-choco-800 sm:text-5xl lg:mx-0 lg:text-6xl xl:text-7xl"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Homemade
              <span className="block text-berry-gradient">Happiness,</span>
              Baked Fresh
            </motion.h1>
            <motion.p
              className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-choco-500 sm:text-base lg:mx-0 lg:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Premium homemade cakes, cookies, brownies, cupcakes and chocolate varieties — made in small batches with real ingredients and a whole lot of love.
            </motion.p>
            <motion.div
              className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
            >
              <WhatsAppButton
                product="New order enquiry"
                requirements="I would like to know your menu and prices."
                label="Order on WhatsApp"
                size="lg"
              />
              <Button as="a" href="#categories" variant="outline" size="lg">
                Explore Our Menu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
            <motion.ul
              className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[0.7rem] font-medium text-choco-500 sm:gap-x-6 sm:text-xs lg:justify-start"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {['Fresh Ingredients', 'Homemade Goodness', 'Made with Love'].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 fill-berry-500 text-berry-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="hero-art relative mx-auto w-full max-w-[580px] lg:ml-auto"
            style={{ y: imageY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-cake-frame relative mx-auto aspect-square w-[min(84vw,510px)] overflow-hidden">
              <LazyImage
                src={cake.src}
                srcSet={cake.srcSet}
                alt="Rich chocolate celebration cake finished with glossy ganache and chocolate truffles"
                priority
                eager
                className="h-full w-full"
                sizes="(max-width: 768px) 84vw, (max-width: 1200px) 46vw, 560px"
              />
            </div>

            <svg className="hero-gold-orbit" viewBox="0 0 620 600" fill="none" aria-hidden="true">
              <path d="M72 338C58 175 145 54 315 48c146-5 250 77 262 208 12 126-41 244-168 286" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 8" />
              <path d="M515 125c-47-44-99-65-160-70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {floatingTreats.map(({ key, label, className }, index) => {
              const image = photo(key, { w: 360 });
              return (
                <motion.div
                  key={key}
                  className={`hero-treat ${className}`}
                  animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, index % 2 ? -1 : 1, 0] }}
                  transition={{ duration: 4.4 + index * 0.7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                >
                  <LazyImage src={image.src} srcSet={image.srcSet} alt={image.alt} className="h-16 w-full sm:h-20" sizes="140px" />
                  <span>{label}</span>
                  <Heart className="hero-treat-heart h-3.5 w-3.5 fill-current" aria-hidden="true" />
                </motion.div>
              );
            })}

            <motion.span
              className="hero-handwriting"
              initial={reduceMotion ? false : { opacity: 0, rotate: -8, x: 10 }}
              animate={{ opacity: 1, rotate: -8, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Sweet Moments
              <br />
              Always <Heart className="inline h-4 w-4 fill-current" aria-hidden="true" />
            </motion.span>
            <Sparkles className="hero-sparkle hero-sparkle-one" aria-hidden="true" />
            <Sparkles className="hero-sparkle hero-sparkle-two" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
      <div className="hero-bottom-curve" aria-hidden="true" />
    </section>
  );
}
