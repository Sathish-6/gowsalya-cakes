import { ALL_PRODUCTS, CATEGORIES } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';
import { SoftSection } from '../decor/FrostingBlobs';
import CategorySection from './CategorySection';

const featuredNames = [
  'Chocolate Truffle Cake',
  'Raspberry Cream Cake',
  'Photo Printed Cakes',
  'Rainbow Sprinkle Cupcakes',
  'Chocolate Chip Cookies',
  'Classic Fudge Brownies',
];

const featuredProducts = featuredNames.map(
  (name) =>
    ALL_PRODUCTS.find((product) => product.name === name) ??
    (() => {
      throw new Error(`Featured product "${name}" is missing from the catalogue`);
    })()
);

export default function ProductShowcase() {
  return (
    <SoftSection id="menu" tone="cream" className="splash-section-space">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Our favourites"
          title="Featured Products"
          highlight=""
          script="Made fresh, shared with love"
          description=""
        />
        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="#all-menu"
            className="rounded-full px-4 py-2 text-sm font-semibold text-berry-700 transition hover:bg-berry-50"
          >
            View all products <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={{ ...product, name: [
                'Chocolate Cake',
                'Red Velvet Cake',
                'Photo Cake',
                'Cupcakes',
                'Cookies',
                'Brownies',
              ][index] }}
              category={null}
              index={index}
              featured
            />
          ))}
        </div>
      </div>
      <div id="all-menu" className="container-gc mt-10 scroll-mt-24">
        <div className="mb-8 text-center">
          <h3 className="font-display text-2xl font-bold text-choco-800 sm:text-3xl">Explore the full menu</h3>
        </div>
        {CATEGORIES.map((category, index) => (
          <CategorySection key={category.id} category={category} index={index} />
        ))}
      </div>
    </SoftSection>
  );
}
