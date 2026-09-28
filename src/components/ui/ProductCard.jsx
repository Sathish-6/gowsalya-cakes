import { motion } from 'framer-motion';
import { photo } from '../../data/images';
import { PRICE } from '../../data/products';
import { buildFeaturedOrderMessage, waLink } from '../../lib/whatsapp';
import LazyImage from './LazyImage';
import { WhatsAppButton } from './Button';

/**
 * Product card used in the menu grid and the signature strip.
 *
 * The whole card is keyboard reachable and the WhatsApp CTA carries a
 * pre-filled order message for that exact product.
 */
export default function ProductCard({ product, category, index = 0, compact = false, featured = false }) {
  const { name, desc, price, image, tags = [], signature } = product;
  const img = photo(image, { w: compact ? 640 : 900 });

  return (
    <motion.article
      layout
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white/85 shadow-soft ring-1 ring-white/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lift ${featured ? 'featured-product-card snap-start' : ''}`}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          className={featured ? 'h-36 w-full sm:h-44' : compact ? 'h-44 w-full' : 'h-56 w-full'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-choco-900/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden="true"
        />

        {signature ? (
          <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-choco-900 shadow-gold">
            Signature
          </span>
        ) : null}

        {category ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-berry-700 backdrop-blur">
            {category}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col ${featured ? 'p-3.5 sm:p-4' : 'p-5 sm:p-6'}`}>
        <h3 className="font-display text-base font-bold leading-snug text-choco-800 transition-colors duration-300 group-hover:text-berry-700 sm:text-lg">
          {name}
        </h3>

        <p className={`${featured ? 'mt-1.5 line-clamp-2 text-xs' : 'mt-2 line-clamp-3 text-sm'} leading-relaxed text-choco-500`}>{desc}</p>

        {tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-berry-50 px-2.5 py-1 text-[0.68rem] font-semibold text-berry-700 ring-1 ring-berry-200/60"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={`${featured ? 'mt-3' : 'mt-5'} flex flex-wrap items-center justify-between gap-2 border-t border-cream-200 pt-3`}>
          <span className="font-display text-sm font-bold text-berry-700">
            <span className="block text-[0.6rem] font-sans uppercase tracking-[0.18em] text-choco-300">
              {featured ? '' : 'Price'}
            </span>
            {featured ? PRICE : price}
          </span>

          {featured ? (
            <WhatsAppButton
              product={name}
              label="Order on WhatsApp"
              size="sm"
              message={buildFeaturedOrderMessage(name)}
              className="!px-3 !py-2 !text-[0.65rem]"
              icon={<WhatsAppGlyph />}
            />
          ) : (
            <WhatsAppButton
              product={name}
              category={category}
              label="Order"
              size="sm"
              className="!px-4 !py-2.5"
              icon={<WhatsAppGlyph />}
            />
          )}
        </div>
      </div>

      {/* Gold hairline accent on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-gold-300 to-berry-400 transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </motion.article>
  );
}

/** Inline WhatsApp glyph (keeps the card free of an extra import chain). */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.9 11.9 0 005.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 00-3.421-8.4" />
    </svg>
  );
}
