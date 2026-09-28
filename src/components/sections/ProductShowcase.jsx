import { ALL_PRODUCTS } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';
import { SoftSection } from '../decor/FrostingBlobs';
import { WhatsAppButton } from '../ui/Button';

const featuredItems = [
  { lookup: 'Chocolate Truffle Cake', name: 'Chocolate Cake', desc: 'Rich and moist chocolate cake with premium ingredients.' },
  { lookup: 'Raspberry Cream Cake', name: 'Red Velvet Cake', desc: 'Soft, velvety layers finished with a smooth, creamy frosting.' },
  { lookup: 'Photo Printed Cakes', name: 'Photo Cake', desc: 'Personalized cakes with your favourite photo on top.' },
  { lookup: 'Rainbow Sprinkle Cupcakes', name: 'Cupcakes', desc: 'Freshly baked cupcakes in assorted flavours.' },
  { lookup: 'Chocolate Chip Cookies', name: 'Cookies', desc: 'Crunchy outside, soft inside cookies.' },
  { lookup: 'Classic Fudge Brownies', name: 'Brownies', desc: 'Rich and fudgy chocolate brownies.' },
];

const featuredProducts = featuredItems.map(({ lookup, ...details }) => {
  const product = ALL_PRODUCTS.find((item) => item.name === lookup);
  if (!product) throw new Error(`Featured product "${lookup}" is missing from the catalogue`);
  return { ...product, ...details };
});

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
          <WhatsAppButton
            product="Full menu"
            requirements="Please share the full menu and prices."
            label="View All Products"
            variant="outline"
            size="sm"
          />
        </div>
        <div className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              category={null}
              index={index}
              featured
            />
          ))}
        </div>
      </div>
    </SoftSection>
  );
}
