/**
 * Gallery images.
 *
 * The masonry grid mixes shop photography with product close-ups so the
 * gallery reads as a real bakery, not a repeated stock pattern.
 */

export const GALLERY = [
  { id: 'g1', image: 'chocolateDrip', caption: 'Chocolate truffle cake', size: 'tall' },
  { id: 'g2', image: 'raspberry', caption: 'Red velvet cake', size: 'normal' },
  { id: 'g3', image: 'rainbowCups', caption: 'Freshly frosted cupcakes', size: 'normal' },
  { id: 'g4', image: 'sprinkleBar', caption: 'Rich chocolate brownies', size: 'wide' },
  { id: 'g5', image: 'chocChip', caption: 'Freshly baked cookies', size: 'normal' },
  { id: 'g6', image: 'pearlCake', caption: 'Pearl chocolate cake', size: 'normal' },
  { id: 'g7', image: 'chocolateBun', caption: 'Chocolate bundt cake', size: 'tall' },
  { id: 'g8', image: 'pinkDrip', caption: 'Customized celebration cake', size: 'wide' },
];

/** Value propositions for the "Why Choose Us" band. */
export const FEATURES = [
  {
    id: 'fresh',
    icon: 'Croissant',
    title: 'Baked Fresh Daily',
    text: 'No premixes, no shortcuts — every cake, cookie and brownie is mixed and baked in small batches in our Thirumangalam kitchen.',
  },
  {
    id: 'custom',
    icon: 'Palette',
    title: 'Fully Customized',
    text: 'Share a photo or an idea and we design it to match. Flavours, colours, writing, toppers — all tailored to your occasion.',
  },
  {
    id: 'hygiene',
    icon: 'ShieldCheck',
    title: 'Clean & Hygienic',
    text: 'A spotless bakery kitchen, food-grade ingredients and hygienic packaging, so every order is safe to share.',
  },
  {
    id: 'delivery',
    icon: 'Truck',
    title: 'On-Time Delivery',
    text: 'We deliver across Madurai and nearby areas with careful packing, and we always confirm the time on WhatsApp first.',
  },
  {
    id: 'eggless',
    icon: 'Leaf',
    title: 'Eggless Options',
    text: 'Delicious eggless versions available across our cake range, made with the same care and flavour.',
  },
  {
    id: 'affordable',
    icon: 'Wallet',
    title: 'Fair Pricing',
    text: 'Honest, affordable pricing for a local shop. Ask us for a quote and we will suggest the best option for your budget.',
  },
];

/** Custom cake process steps. */
export const CUSTOM_STEPS = [
  {
    id: 1,
    icon: 'MessageCircle',
    title: 'Send your idea',
    text: 'Share the occasion, theme, photo and number of servings on WhatsApp.',
  },
  {
    id: 2,
    icon: 'Palette',
    title: 'We design it',
    text: 'Our baker sketches the design and confirms flavours, colours and size with you.',
  },
  {
    id: 3,
    icon: 'ChefHat',
    title: 'Freshly baked',
    text: 'The cake is baked and decorated to order, usually within 24 hours of your confirmation.',
  },
  {
    id: 4,
    icon: 'PartyPopper',
    title: 'Delivered to you',
    text: 'Packed carefully and delivered across Madurai, or collected from our shop.',
  },
];

/** The shop story. */
export const STORY = {
  heading: 'Baking with love in Thirumangalam',
  paragraphs: [
    'Gowsalya Cake Shop began as a home kitchen in Thirumangalam, baking cakes for birthdays, family functions and festivals. The recipe books were small; the queue of neighbours was long.',
    'Today we still bake the same way — real butter, good chocolate, fresh cream and real fruit, prepared in small batches so every cake gets the attention it deserves.',
    'Whether it is a simple chocolate cake for a birthday or an elaborate customized showpiece, we treat every order like it is for our own family.',
  ],
  values: ['Fresh ingredients', 'Small batches', 'Clean kitchen', 'Custom designs', 'On-time delivery'],
};

export default GALLERY;
