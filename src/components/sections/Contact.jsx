import { Clock, Mail, MapPin, MessageCircle, Phone, Truck } from 'lucide-react';
import { SHOP, FULL_ADDRESS } from '../../data/shop';
import { CATEGORIES } from '../../data/products';
import { WHATSAPP_TEL } from '../../lib/whatsapp';
import { WhatsAppButton } from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import { BrandBanner } from '../ui/Brand';
import { Reveal, StaggerParent, StaggerItem } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

const telHref = WHATSAPP_TEL;

/** Address, hours, map and direct contact routes. */
export default function Contact() {
  return (
    <SoftSection id="contact" tone="blush">
      <div className="container-gc">
        <SectionHeading
          eyebrow="Get in touch"
          title="Visit us or"
          highlight="just say hello"
          script="See you soon"
          description="Come to the shop in Thirumangalam, or send a quick message and we will get back to you on WhatsApp."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Address + brand plate */}
          <Reveal className="lg:col-span-1">
            <div className="h-full overflow-hidden rounded-[2rem] bg-white/80 shadow-soft ring-1 ring-white/70">
              <BrandBanner className="!rounded-none !shadow-none" />
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-choco-800">Our bakery</h3>
                <address className="mt-3 space-y-2 not-italic text-sm text-choco-500">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry-500" aria-hidden="true" />
                    {FULL_ADDRESS}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-berry-500" aria-hidden="true" />
                    <a href={telHref} className="font-semibold text-berry-700 hover:underline">
                      {SHOP.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-berry-500" aria-hidden="true" />
                    <a href={`mailto:${SHOP.email}`} className="hover:text-berry-700">
                      {SHOP.email}
                    </a>
                  </p>
                </address>

                <a
                  href={SHOP.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-berry-700 hover:underline"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>

          <ContactHours />
          <ContactWhatsApp />
        </div>

        {/* Map */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-cream-200 shadow-soft">
            <iframe
              title="Map showing Gowsalya Cake Shop, Thirumangalam, Madurai"
              src={SHOP.mapsEmbed}
              className="h-[320px] w-full border-0 sm:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </SoftSection>
  );
}

/** Opening hours card. */
function ContactHours() {
  return (
    <Reveal delay={0.1} className="lg:col-span-1">
      <div className="h-full rounded-[2rem] bg-white/80 p-7 shadow-soft ring-1 ring-white/70">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-choco-800">
          <Clock className="h-5 w-5 text-berry-500" aria-hidden="true" />
          Opening hours
        </h3>

        <StaggerParent className="mt-5 space-y-3">
          {SHOP.hours.map((row) => (
            <StaggerItem
              key={row.day}
              className="flex items-center justify-between rounded-2xl bg-cream-100/80 px-4 py-3"
            >
              <span className="text-sm font-semibold text-choco-600">{row.day}</span>
              <span className="text-sm text-choco-500">{row.time}</span>
            </StaggerItem>
          ))}
        </StaggerParent>

        <p className="mt-4 flex items-start gap-2 text-xs text-choco-400">
          <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {SHOP.hoursNote}
        </p>
      </div>
    </Reveal>
  );
}

/** WhatsApp call-to-action card. */
function ContactWhatsApp() {
  return (
    <Reveal delay={0.18} className="lg:col-span-1">
      <div className="h-full rounded-[2rem] bg-gradient-to-br from-berry-700 via-berry-600 to-berry-800 p-7 text-cream-100 shadow-lift">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-bold">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Order on WhatsApp
        </h3>
        <p className="mt-2.5 text-sm text-cream-200/90">
          Fastest way to order. We reply between 8 AM and 9:30 PM, every day.
        </p>

        <WhatsAppButton
          product="New order enquiry"
          label="Chat with us now"
          variant="gold"
          className="mt-5 w-full"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-cream-100 ring-1 ring-white/20 transition hover:bg-white/20"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
