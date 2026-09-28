import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';
import { SoftSection } from '../decor/FrostingBlobs';

export default function Testimonials() {
  const carouselRef = useRef(null);

  const move = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector('[data-review-card]');
    const amount = card ? card.getBoundingClientRect().width + 16 : carousel.clientWidth * 0.8;
    carousel.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <SoftSection id="reviews" tone="blush" className="splash-section-space">
      <div className="container-gc">
        <SectionHeading
          eyebrow="What our customers say"
          title="Our Happy Customers"
          description=""
        />
        <div
          ref={carouselRef}
          className="review-carousel mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:mt-12 sm:gap-5"
          aria-label="Customer reviews"
        >
          {TESTIMONIALS.map((review) => {
            const initials = review.name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join('');
            return (
              <article
                key={review.id}
                data-review-card
                className="review-card flex min-w-[82vw] snap-start flex-col rounded-2xl border border-berry-100 bg-white/85 p-5 shadow-soft sm:min-w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-blush-200 to-berry-300 font-display text-lg font-bold text-berry-800 shadow-soft" aria-label={`${review.name} avatar`}>
                    {initials}
                  </span>
                  <div className="min-w-0 pt-1">
                    <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-choco-400">{review.role}</p>
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-choco-600">
                  “{review.text}”
                </blockquote>
                <div className="mt-4 border-t border-cream-200 pt-3">
                  <p className="font-display font-bold text-berry-700">{review.name}</p>
                  <p className="mt-0.5 text-xs text-choco-400">Madurai</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous customer reviews"
            className="grid h-10 w-10 place-items-center rounded-full border border-berry-200 bg-white/80 text-berry-700 shadow-soft transition hover:bg-berry-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs font-semibold text-choco-400">Swipe to read more</span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next customer reviews"
            className="grid h-10 w-10 place-items-center rounded-full border border-berry-200 bg-white/80 text-berry-700 shadow-soft transition hover:bg-berry-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SoftSection>
  );
}
