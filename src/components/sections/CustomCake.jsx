import { CakeSlice, Gift, Heart, Image, PartyPopper, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { photo } from '../../data/images';
import { buildCustomCakeMessage, waLink } from '../../lib/whatsapp';
import LazyImage from '../ui/LazyImage';
import { SoftSection } from '../decor/FrostingBlobs';

const cakeTypes = [
  { label: 'Birthday Cakes', icon: CakeSlice },
  { label: 'Anniversary Cakes', icon: Heart },
  { label: 'Wedding Cakes', icon: Sparkles },
  { label: 'Kids Cakes', icon: PartyPopper },
  { label: 'Theme Cakes', icon: Gift },
  { label: 'Photo Cakes', icon: Image },
];

export default function CustomCake() {
  const cake = photo('pinkDrip', { w: 1000 });
  const orderUrl = waLink(buildCustomCakeMessage('I would love to create a custom cake.'));

  return (
    <SoftSection id="custom-cakes" tone="blush" className="splash-section-space">
      <div className="container-gc">
        <motion.section
          className="custom-cake-banner grid overflow-hidden rounded-[2rem] bg-white/80 shadow-lift ring-1 ring-berry-100/80 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7 }}
          aria-labelledby="custom-cake-heading"
        >
          <div className="custom-cake-image relative min-h-64 overflow-hidden sm:min-h-80 lg:min-h-[430px]">
            <LazyImage
              src={cake.src}
              srcSet={cake.srcSet}
              alt="Pink customized celebration cake decorated with berries and frosting"
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-berry-900/25 to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-berry-700 shadow-soft backdrop-blur">
              Made for your moment
            </span>
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <span className="eyebrow self-start">
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              Custom cakes
            </span>
            <h2 id="custom-cake-heading" className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight text-choco-800 sm:text-4xl">
              Your Dream Cake,
              <span className="block text-berry-600">Your Way <Heart className="inline h-7 w-7 fill-berry-500 text-berry-500" aria-label="love" /></span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-choco-500 sm:text-base">
              From birthdays to weddings, we create custom cakes that make your special moments unforgettable.
            </p>

            <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6" aria-label="Custom cake occasions">
              {cakeTypes.map(({ label, icon: Icon }) => (
                <li key={label} className="flex flex-col items-center gap-1.5 text-center text-[0.65rem] font-medium leading-tight text-choco-600 sm:text-xs">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-berry-200 bg-blush-50 text-berry-600 transition-transform hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-berry-600 to-berry-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              Create My Custom Cake
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.section>
      </div>
    </SoftSection>
  );
}
