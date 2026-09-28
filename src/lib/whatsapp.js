/**
 * WhatsApp ordering engine for Gowsalya Cake Shop.
 *
 * Every "Order on WhatsApp" button in the site funnels through this module so
 * the customer always receives a well formatted, URL-encoded enquiry on the
 * shop's single business number: +91 82201 99389.
 */

export const WHATSAPP_NUMBER = '918220199389'; // digits only, with country code
export const WHATSAPP_DISPLAY = '+91 82201 99389';
export const WHATSAPP_LOCAL = '82201 99389';
export const WHATSAPP_TEL = `tel:${WHATSAPP_DISPLAY.replace(/\s+/g, '')}`;
export const WA_BASE = 'https://wa.me';

/** Compact product-card message used by featured products. */
export function buildFeaturedOrderMessage(product, quantity = 1) {
  return [
    'Hello Gowsalya Cake Shop 👋',
    '',
    'I would like to order:',
    `Product: ${String(product).trim()}`,
    `Quantity: ${quantity}`,
    '',
    'Please share the details.',
  ].join('\n');
}

/** Builds the product-order message format used across the whole site. */
export function buildOrderMessage({
  product = 'New order enquiry',
  category = '',
  quantity = 1,
  date = '',
  requirements = '',
  name = '',
  phone = '',
  fulfilment = '',
} = {}) {
  const lines = ['Hello Gowsalya Cake Shop 👋', 'I would like to order:'];

  // Only add a field when it actually carries information, so the message the
  // shop receives is never padded with empty labels.
  if (String(product).trim()) lines.push(`Product: ${String(product).trim()}`);
  if (category) lines.push(`Category: ${category}`);

  const qty = Number(quantity);
  if (Number.isFinite(qty) && qty > 1) lines.push(`Quantity: ${qty}`);

  if (String(date).trim()) lines.push(`Date: ${String(date).trim()}`);
  if (fulfilment) lines.push(`Delivery / Pickup: ${fulfilment}`);
  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  lines.push(`Special Requirements: ${String(requirements).trim() || 'None'}`);

  return lines.join('\n');
}

/** Message for the dedicated ORDER NOW form. */
export function buildFormOrderMessage(form = {}) {
  const {
    name = '',
    phone = '',
    product = 'Custom Cake',
    quantity = 1,
    fulfilment = 'Delivery',
    date = 'As soon as possible',
    message = '',
  } = form;

  const lines = [
    'Hello Gowsalya Cake Shop 👋',
    'I would like to place an order:',
    `Product: ${product}`,
    `Quantity: ${quantity}`,
    `Delivery / Pickup: ${fulfilment}`,
    `Required Date: ${date}`,
    `Customer Name: ${name || 'Not provided'}`,
    `Phone Number: ${phone || 'Not provided'}`,
    `Message / Customization: ${String(message).trim() || 'None'}`,
  ];

  return lines.join('\n');
}

/** Custom cake CTA copy. */
export function buildCustomCakeMessage(detail = '') {
  const base = 'Hello Gowsalya Cake Shop, I would like to discuss a customized cake.';
  return detail ? `${base}\n\nOccasion / Idea: ${detail}` : base;
}

/** Returns a fully encoded wa.me deep link. */
export function waLink(message = '') {
  return `${WA_BASE}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp (web / app) with the encoded message. */
export function openWhatsApp(message = '') {
  const url = waLink(message);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url; // popup blocked fallback
  return url;
}

/** Convenience: order a specific product in one call. */
export function orderOnWhatsApp(product, extra = {}) {
  return openWhatsApp(buildOrderMessage({ product, ...extra }));
}

/** Direct chat link (no pre-filled text). */
export function chatOnWhatsApp(message = 'Hello Gowsalya Cake Shop 👋') {
  return openWhatsApp(message);
}
