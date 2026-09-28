import { Heart, MapPin, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons';
import { SHOP, FULL_ADDRESS } from '../../data/shop';
import { FOOTER_LINKS } from '../../data/nav';
import { WHATSAPP_TEL, buildOrderMessage, waLink } from '../../lib/whatsapp';
import { BrandLockup } from '../ui/Brand';

const socialLinks = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
];

export default function Footer() {
  const orderUrl = waLink(buildOrderMessage({ product: 'New order enquiry' }));

  return (
    <footer className="site-footer relative overflow-hidden border-t border-berry-100 bg-cream-50">
      <div className="container-gc relative z-10 py-10 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <a href="#home" aria-label="Gowsalya Cake Shop home">
              <BrandLockup
                logoClass="h-14 w-14"
                titleClass="font-display text-xl leading-tight"
                subtitleClass="text-berry-600"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-choco-500">
              Made with Love <span aria-hidden="true">·</span> Baked Fresh <span aria-hidden="true">·</span> Just For You
            </p>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2 text-sm font-semibold text-white shadow-whatsapp transition hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              Order on WhatsApp
            </a>
          </div>

          {FOOTER_LINKS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-lg font-bold text-berry-700">{column.title}</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-choco-500 transition-colors hover:text-berry-700">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-lg font-bold text-berry-700">Get in touch</h2>
            <a href={WHATSAPP_TEL} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-choco-600 hover:text-berry-700">
              <Phone className="h-4 w-4 text-berry-500" aria-hidden="true" />
              {SHOP.phone}
            </a>
            <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-start gap-2 text-sm text-choco-500 hover:text-berry-700">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry-500" aria-hidden="true" />
              {FULL_ADDRESS}
            </a>
            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ label, Icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-berry-200 bg-white text-berry-700"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-berry-100 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-choco-400">
            © 2026 Gowsalya Cake Shop. All rights reserved.
          </p>
          <p className="font-script text-2xl text-berry-600">
            Thank You For Your Support <Heart className="inline h-4 w-4 fill-current" aria-label="love" />
          </p>
        </div>
      </div>
    </footer>
  );
}
