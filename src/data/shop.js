/**
 * Shop details — single source of truth for contact info and copy.
 * Changing an address or number here updates the whole site.
 */

import { WHATSAPP_DISPLAY } from '../lib/whatsapp';

export const SHOP = {
  name: 'Gowsalya Cake Shop',
  tagline: 'Homemade Happiness, Baked Fresh',
  shortDescription:
    'Premium homemade cakes, cookies, brownies, cupcakes and chocolate varieties, baked fresh in Thirumangalam, Madurai.',
  address: {
    street: 'Thirumangalam Main Road',
    area: 'Thirumangalam',
    city: 'Madurai',
    state: 'Tamil Nadu',
    postalCode: '625010',
    country: 'India',
  },
  phone: WHATSAPP_DISPLAY,
  whatsapp: '918220199389',
  hours: [
    { day: 'Monday – Saturday', time: '7:00 AM – 9:30 PM' },
    { day: 'Sunday', time: '8:00 AM – 9:30 PM' },
  ],
  hoursNote: 'Fresh bakes finish early on festivals — order 24 hours in advance.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gowsalya+Cake+Shop+Thirumangalam+Madurai',
  mapsEmbed:
    'https://www.google.com/maps?q=Thirumangalam,+Madurai,+Tamil+Nadu+625010&output=embed',
  email: 'gousalyacakeshop@gmail.com',
  /** Prices are shared personally — keeps the promise of a WhatsApp-first shop. */
  priceNote: 'Contact for Price',
  since: 2019,
  deliveryRadius: 'Madurai city & nearby',
};

/** One-line address for maps / schema reuse. */
export const FULL_ADDRESS = `${SHOP.address.street}, ${SHOP.address.area}, ${SHOP.address.city}, ${SHOP.address.state} ${SHOP.address.postalCode}`;

export default SHOP;
