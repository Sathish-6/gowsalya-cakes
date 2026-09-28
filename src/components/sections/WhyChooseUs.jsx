import {
  ChefHat,
  Croissant,
  Leaf,
  Palette,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { FEATURES } from '../../data/gallery';
import SectionHeading from '../ui/SectionHeading';
import { StaggerParent, StaggerItem } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

const iconMap = { Croissant, Palette, ShieldCheck, Truck, Leaf, Wallet, ChefHat };

/** Six reasons customers keep coming back. */
export default function WhyChooseUs() {
  return (
    <SoftSection id="why-us" tone="cream">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Why choose us"
          title="Baked the way your"
          highlight="family would"
          script="Our promise"
          description="No shortcuts, no artificial colouring, and no order is ever rushed. Here is what you get every single time."
        />

        <StaggerParent className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon] ?? ChefHat;
            return (
              <StaggerItem key={feature.id}>
                <article className="group h-full rounded-3xl bg-white/80 p-7 shadow-soft ring-1 ring-white/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-berry-100 to-blush-200 text-berry-700 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-bold text-choco-800">{feature.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-choco-500">{feature.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerParent>
      </div>
    </SoftSection>
  );
}
