import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import { WhatsAppButton } from '../ui/Button';
import { Reveal } from '../decor/Reveal';

/**
 * One category block.
 *
 * `id` matches the sitemap anchors (`#cakes`, `#cookies`, `#brownies`,
 * `#cupcakes`, `#customized-cakes`, `#chocolate-varieties`) so every category
 * is directly linkable from search results.
 */
export default function CategorySection({ category, index = 0 }) {
  const { id, name, tagline, products } = category;
  const even = index % 2 === 1;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-cream-200/80 py-14 first:border-t-0 sm:py-16"
    >
      <Reveal>
        <div
          className={`mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
            even ? 'sm:flex-row-reverse' : ''
          }`}
        >
          <div className="sm:max-w-xl">
            <h3
              id={`${id}-heading`}
              className="font-display text-2xl font-bold text-choco-800 sm:text-3xl"
            >
              {name}
            </h3>
            <p className="mt-2 text-choco-500">{tagline}</p>
          </div>

          <WhatsAppButton
            product={`${name} (general enquiry)`}
            category={name}
            label={`Order ${name.toLowerCase()}`}
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
          />
        </div>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 26 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <ProductCard product={product} category={name} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export { CATEGORIES };
