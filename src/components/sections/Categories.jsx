import { CATEGORIES } from '../../data/products';
import SectionHeading from '../ui/SectionHeading';
import CategoryCard from '../ui/CategoryCard';
import { SoftSection } from '../decor/FrostingBlobs';

export default function Categories() {
  return (
    <SoftSection id="categories" tone="blush" className="splash-section-space">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Our special categories"
          title="Something Sweet For Every Celebration"
          highlight=""
          description=""
        />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </SoftSection>
  );
}
