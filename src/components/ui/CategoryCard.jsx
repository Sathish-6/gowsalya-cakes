import { motion } from 'framer-motion';
import { ArrowRight, CakeSlice, Candy, Cookie, Cupcake, Palette, Sparkles, Square } from 'lucide-react';
import { photo } from '../../data/images';
import { buildOrderMessage, waLink } from '../../lib/whatsapp';
import LazyImage from './LazyImage';

const iconMap = { CakeSlice, Cookie, Square, Cupcake, Palette, Candy };

export default function CategoryCard({ category, index = 0 }) {
  const { id, name, tagline, icon, image } = category;
  const Icon = iconMap[icon] ?? Sparkles;
  const img = photo(image, { w: 700 });
  const orderUrl = waLink(
    buildOrderMessage({
      product: `${name} order enquiry`,
      category: name,
      requirements: `I would like to order from your ${name.toLowerCase()} range.`,
    })
  );

  return (
    <motion.article
      id={id}
      id={id}
      className="group category-card relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white/80 shadow-soft ring-1 ring-berry-100/70 backdrop-blur-sm transition-shadow duration-500 hover:shadow-lift"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
    >
      <div className="category-card-image relative aspect-[1.45] overflow-hidden">
        <LazyImage
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          className="h-full w-full"
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 17vw"
          imgClassName="transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="relative flex flex-1 flex-col items-center px-4 pb-4 pt-8 text-center">
        <span className="category-card-icon absolute -top-6 grid h-12 w-12 place-items-center rounded-full border-[3px] border-white bg-gradient-to-br from-berry-400 to-berry-700 text-white shadow-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="font-display text-base font-bold leading-tight text-choco-800 sm:text-lg">
          {name}
        </h3>
        <p className="mt-1.5 min-h-10 text-xs leading-relaxed text-choco-500 sm:text-sm">
          {tagline}
        </p>
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-9 items-center gap-1 rounded-full border border-berry-300/80 px-4 py-1.5 text-xs font-semibold text-berry-700 transition-colors hover:border-berry-600 hover:bg-berry-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry-600"
          aria-label={`Order ${name} on WhatsApp`}
        >
          Order Now
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}
