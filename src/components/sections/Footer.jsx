import { Heart, Mail, MapPin, Phone, Send } from 'lucide-react';
import { SHOP, FULL_ADDRESS } from '../../data/shop';
import { FOOTER_LINKS } from '../../data/nav';
import { buildOrderMessage, waLink, WHATSAPP_TEL } from '../../lib/whatsapp';
import { BrandLockup } from '../ui/Brand';

/** Site footer: brand, links, contact and a closing strip. */
export default function Footer() {
  const year = new Date().getFullYear();
  const telHref = WHATSAPP_TEL;

  return (
    <footer className="choco-mesh relative overflow-hidden text-cream-200">
      <div className="container-gc relative z-10 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <BrandLockup
              logoClass="h-14 w-14"
              titleClass="font-display text-2xl !text-cream-50"
              subtitleClass="!text-berry-300"
              subtitle={false}
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-300/85">
              {SHOP.tagline}. Premium homemade cakes, cookies, brownies, cupcakes and chocolate
              varieties, baked fresh in Thirumangalam, Madurai.
            </p>

            <a
              href={waLink(buildOrderMessage({ product: 'New order enquiry' }))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white shadow-whatsapp transition hover:brightness-110"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Order on WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-lg font-bold text-cream-50">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream-300/85 transition-colors hover:text-berry-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="font-display text-lg font-bold text-cream-50">Visit us</h2>
            <ul className="mt-4 space-y-3 text-sm text-cream-300/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry-300" aria-hidden="true" />
                <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-berry-200">
                  {FULL_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-berry-300" aria-hidden="true" />
                <a href={telHref} className="hover:text-berry-200">
                  {SHOP.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-berry-300" aria-hidden="true" />
                <a href={`mailto:${SHOP.email}`} className="hover:text-berry-200">
                  {SHOP.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-cream-300/70 sm:text-left">
            © {year} {SHOP.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-cream-300/70">
            Made with <Heart className="h-4 w-4 fill-berry-400 text-berry-400" aria-hidden="true" /> in
            Madurai
          </p>
        </div>
      </div>
    </footer>
  );
}
