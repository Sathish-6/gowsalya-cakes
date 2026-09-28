import { Check, Leaf, MapPin } from 'lucide-react';
import { photo } from '../../data/images';
import { SHOP, FULL_ADDRESS } from '../../data/shop';
import { STORY } from '../../data/gallery';
import { STATS } from '../../data/testimonials';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';
import Counter from '../ui/Counter';
import { WhatsAppButton } from '../ui/Button';
import { Reveal, StaggerParent, StaggerItem } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

/** The shop story, values and animated stats. */
export default function About() {
  const shelf = photo('bakingHands', { w: 1000 });
  const shelfAlt = photo('bakeryShelf', { w: 700 });

  return (
    <SoftSection id="about" tone="blush">
      <div className="container-gc">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/70">
                <LazyImage
                  src={shelf.src}
                  srcSet={shelf.srcSet}
                  alt={shelf.alt}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div className="glass-card absolute -bottom-10 -right-4 w-44 overflow-hidden rounded-2xl shadow-soft sm:-right-10 sm:w-56">
                <LazyImage
                  src={shelfAlt.src}
                  srcSet={shelfAlt.srcSet}
                  alt={shelfAlt.alt}
                  className="h-24 w-full sm:h-28"
                  sizes="14rem"
                />
                <p className="px-3 py-2 text-center text-[0.68rem] font-semibold text-choco-600">
                  Baked since {SHOP.since}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="About our bakery"
              title={STORY.heading}
              align="left"
              className="mx-0"
            />

            <StaggerParent className="mt-6 space-y-4">
              {STORY.paragraphs.map((text) => (
                <StaggerItem key={text.slice(0, 24)} as="p" className="text-base leading-relaxed text-choco-500">
                  {text}
                </StaggerItem>
              ))}
            </StaggerParent>

            <StaggerParent className="mt-7 flex flex-wrap gap-2.5">
              {STORY.values.map((value) => (
                <StaggerItem
                  key={value}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-choco-600 ring-1 ring-cream-200"
                >
                  <Check className="h-3.5 w-3.5 text-berry-500" aria-hidden="true" />
                  {value}
                </StaggerItem>
              ))}
            </StaggerParent>

            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                product="New order enquiry"
                requirements="I have a question about your cakes."
                label="Talk to us on WhatsApp"
              />
              <a
                href={SHOP.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-berry-500/30 px-6 py-3.5 text-sm font-semibold text-berry-700 transition hover:border-berry-500 hover:bg-white/70"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {FULL_ADDRESS.split(',')[0]}, {SHOP.address.area}
              </a>
            </Reveal>
          </div>
        </div>

        {/* Stats band */}
        <StaggerParent className="mt-24 grid grid-cols-2 gap-6 rounded-[2rem] bg-gradient-to-br from-berry-700 via-berry-600 to-berry-800 px-6 py-10 shadow-lift sm:gap-8 sm:px-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.id} className="flex justify-center lg:justify-start">
              <div className="[&_span:first-child]:text-cream-50 [&_span:last-child]:text-cream-200/85">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  decimals={stat.decimals}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerParent>

        <Reveal className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-choco-500">
          <Leaf className="h-4 w-4 text-berry-500" aria-hidden="true" />
          Eggless options available across our cake range
        </Reveal>
      </div>
    </SoftSection>
  );
}
