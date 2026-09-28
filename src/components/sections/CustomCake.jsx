import { ChefHat, MessageCircle, PartyPopper, Palette } from 'lucide-react';
import { CUSTOM_STEPS } from '../../data/gallery';
import { photo } from '../../data/images';
import { buildCustomCakeMessage, waLink } from '../../lib/whatsapp';
import LazyImage from '../ui/LazyImage';
import SectionHeading from '../ui/SectionHeading';
import { WhatsAppButton, Button } from '../ui/Button';
import { Reveal, StaggerParent, StaggerItem } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

const iconMap = { MessageCircle, Palette, ChefHat, PartyPopper };

/** Custom cake pitch + the four-step booking process. */
export default function CustomCake() {
  const img = photo('pinkDrip', { w: 1000 });
  const detail = photo('bakingHands', { w: 700 });

  return (
    <SoftSection id="custom-cakes" tone="blush">
      <div className="container-gc">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/70">
              <LazyImage
                src={img.src}
                srcSet={img.srcSet}
                alt={img.alt}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="glass-card absolute -bottom-8 -right-3 w-40 overflow-hidden rounded-2xl shadow-soft sm:-right-8 sm:w-52">
              <LazyImage
                src={detail.src}
                srcSet={detail.srcSet}
                alt={detail.alt}
                className="h-24 w-full sm:h-28"
                sizes="13rem"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Customized cakes"
              title="Your idea,"
              highlight="our oven"
              script="Made for you"
              align="left"
              description="Birthdays, weddings, baby showers, office events or just because. Send us a reference photo or a rough idea and we will turn it into a cake that is unmistakably yours."
            />

            <StaggerParent className="mt-9 space-y-5">
              {CUSTOM_STEPS.map((step) => {
                const Icon = iconMap[step.icon] ?? Palette;
                return (
                  <StaggerItem key={step.id} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-berry-600 to-berry-800 text-white shadow-soft">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-choco-800">
                        <span className="mr-2 text-berry-400">{step.id}.</span>
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-choco-500">{step.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerParent>

            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                product="Customized Cake"
                requirements="I have an idea for a customized cake. Please guide me."
                label="Discuss my custom cake"
                variant="primary"
              />
              <Button as="a" href="#order" variant="outline">
                Fill the order form
              </Button>
            </Reveal>

            <p className="mt-4 text-xs text-choco-400">
              Prefer a quick link?{' '}
              <a
                href={waLink(buildCustomCakeMessage('I have an idea for a customized cake.'))}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-berry-600 underline underline-offset-4 hover:text-berry-700"
              >
                Open a pre-filled WhatsApp chat
              </a>
            </p>
          </div>
        </div>
      </div>
    </SoftSection>
  );
}
