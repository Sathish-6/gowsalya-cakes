import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand, X } from 'lucide-react';
import { GALLERY } from '../../data/gallery';
import { photo } from '../../data/images';
import LazyImage from '../ui/LazyImage';
import Lightbox from '../ui/Lightbox';
import SectionHeading from '../ui/SectionHeading';
import { StaggerParent, StaggerItem } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

const sizeClass = {
  tall: 'row-span-2 sm:row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
};

/** Masonry-style gallery with a keyboard-navigable lightbox. */
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <SoftSection id="gallery" tone="cream">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Our gallery"
          title="A peek inside our"
          highlight="kitchen"
          script="Fresh from the oven"
          description="Real bakes, real finishes. Tap any photo to view it larger."
        />

        <StaggerParent className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((item, index) => {
            const img = photo(item.image, { w: 800 });
            return (
              <StaggerItem
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-white/60 ${sizeClass[item.size] ?? ''}`}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  className="absolute inset-0 h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry-600"
                  aria-label={`View larger: ${item.caption}`}
                >
                  <LazyImage
                    src={img.src}
                    srcSet={img.srcSet}
                    alt={img.alt}
                    className="h-full w-full"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />

                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-choco-900/75 via-choco-900/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden="true"
                  />

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left">
                    <span className="block text-xs font-semibold text-cream-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                      {item.caption}
                    </span>
                  </span>

                  <span
                    className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Expand className="h-4 w-4" />
                  </span>

                  {/* Small screens have no hover — keep a readable caption. */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left sm:hidden"
                    aria-hidden="true"
                  >
                    <span className="block text-[0.7rem] font-semibold text-cream-50">{item.caption}</span>
                  </span>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerParent>

        {lightbox !== null ? (
          <Lightbox
            items={GALLERY}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        ) : null}
      </div>
    </SoftSection>
  );
}
