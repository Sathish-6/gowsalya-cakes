/**
 * Product catalogue.
 *
 * Prices are intentionally "Contact for Price" — the shop quotes personally on
 * WhatsApp based on size, flavour and occasion, which is also the single best
 * conversion path. Every image key resolves through `src/data/images.js`.
 */

import { photo } from './images';

export const PRICE = 'Contact for Price';

export const CATEGORIES = [
  {
    id: 'cakes',
    name: 'Cakes',
    tagline: 'Freshly baked for every special moment',
    icon: 'CakeSlice',
    accent: 'berry',
    image: 'chocolateDrip',
    featured: true,
    products: [
      {
        id: 'chocolate-truffle-cake',
        name: 'Chocolate Truffle Cake',
        desc: 'Deep cocoa sponge layered with whipped chocolate truffle cream and finished with a glossy ganache drip.',
        price: PRICE,
        image: 'chocolateDrip',
        tags: ['Best seller', 'Eggless option'],
        signature: true,
      },
      {
        id: 'rainbow-sprinkle-cake',
        name: 'Rainbow Sprinkle Cake',
        desc: 'Soft vanilla layers with light cream filling, smothered in vanilla buttercream and a shower of rainbow sprinkles.',
        price: PRICE,
        image: 'rainbowSlice',
        tags: ['Kids favourite'],
      },
      {
        id: 'raspberry-cream-cake',
        name: 'Raspberry Cream Cake',
        desc: 'Vanilla sponge with fresh raspberry cream and delicate raspberry layers, finished light and fruity.',
        price: PRICE,
        image: 'raspberry',
        tags: ['Fresh fruit'],
      },
      {
        id: 'mirror-glaze-cake',
        name: 'Mirror Glaze Celebration Cake',
        desc: 'A showstopper celebration cake with a flawless mirror glaze, moist layers and a clean glossy finish.',
        price: PRICE,
        image: 'mirrorGlaze',
        tags: ['Premium', 'Showstopper'],
        signature: true,
      },
      {
        id: 'strawberry-pink-drip-cake',
        name: 'Strawberry Pink Drip Cake',
        desc: 'Creamy strawberry sponge under a berry-pink drip and a crown of fresh strawberries.',
        price: PRICE,
        image: 'pinkDrip',
        tags: ['Fresh fruit', 'Instagram worthy'],
      },
      {
        id: 'pearl-chocolate-cake',
        name: 'Pearl Chocolate Cake',
        desc: 'Our most requested chocolate cake, layered with rich ganache and finished with edible sugar pearls.',
        price: PRICE,
        image: 'pearlCake',
        tags: ['Best seller'],
      },
      {
        id: 'lemon-meringue-tart',
        name: 'Lemon Meringue Tart',
        desc: 'Sharp lemon curd in a buttery tart shell, crowned with torched Italian meringue clouds.',
        price: PRICE,
        image: 'lemonPie',
        tags: ['Tangy', 'Seasonal'],
      },
      {
        id: 'caramel-cream-cake',
        name: 'Caramel Cream Cake',
        desc: 'Soft sponge with salted caramel cream, finished with a glossy caramel glaze and a cream accent.',
        price: PRICE,
        image: 'caramel',
        tags: ['Sweet pick'],
      },
    ],
  },
  {
    id: 'cookies',
    name: 'Cookies',
    tagline: 'Crispy, soft & delicious',
    icon: 'Cookie',
    accent: 'gold',
    image: 'chocChip',
    featured: true,
    products: [
      {
        id: 'chocolate-chip-cookies',
        name: 'Chocolate Chip Cookies',
        desc: 'Classic buttery cookies loaded with generous chunks of dark chocolate — crisp at the edge, soft in the middle.',
        price: PRICE,
        image: 'chocChip',
        tags: ['Classic', 'Best seller'],
        signature: true,
      },
      {
        id: 'assorted-cookie-box',
        name: 'Assorted Cookie Box',
        desc: 'A gift box of our best sellers: chocolate chip, oatmeal, peanut butter and butter cookies.',
        price: PRICE,
        image: 'cookieBasket',
        tags: ['Gift box', 'Assorted'],
      },
      {
        id: 'butter-cookies',
        name: 'Butter Cookies',
        desc: 'Simple, elegant and melt-in-the-mouth, piped by hand with a classic butter flavour.',
        price: PRICE,
        image: 'cookieBasket',
        tags: ['Tea time'],
      },
      {
        id: 'oatmeal-cookies',
        name: 'Oatmeal Cookies',
        desc: 'Wholesome rolled oats and a hint of cinnamon in a chewy, satisfying cookie.',
        price: PRICE,
        image: 'chocChip',
        tags: ['Chewy'],
      },
    ],
  },
  {
    id: 'brownies',
    name: 'Brownies',
    tagline: 'Rich chocolate indulgence',
    icon: 'Square',
    accent: 'choco',
    image: 'sprinkleBar',
    featured: true,
    products: [
      {
        id: 'classic-fudge-brownies',
        name: 'Classic Fudge Brownies',
        desc: 'Dense, fudgy and rich with a paper-thin crackled top. Cut into generous squares.',
        price: PRICE,
        image: 'sprinkleBar',
        tags: ['Fudgy', 'Best seller'],
        signature: true,
      },
      {
        id: 'walnut-brownies',
        name: 'Walnut Brownies',
        desc: 'Our fudgy brownie base loaded with toasted walnut pieces for a nutty crunch.',
        price: PRICE,
        image: 'chocolateBun',
        tags: ['Nutty'],
      },
      {
        id: 'blondies',
        name: 'Blondies',
        desc: 'A golden, vanilla-forward brownie with a chewy centre and crisp, caramelised edges.',
        price: PRICE,
        image: 'sprinkleBar',
        tags: ['Chewy'],
      },
    ],
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    tagline: 'Small treats, big happiness',
    icon: 'Cupcake',
    accent: 'blush',
    image: 'rainbowCups',
    featured: true,
    products: [
      {
        id: 'rainbow-cupcakes',
        name: 'Rainbow Sprinkle Cupcakes',
        desc: 'Vanilla cupcakes with cloud-soft frosting and a joyful rainbow sprinkle finish. Great for parties.',
        price: PRICE,
        image: 'rainbowCups',
        tags: ['Party favourite', 'Best seller'],
        signature: true,
      },
      {
        id: 'strawberry-cupcakes',
        name: 'Strawberry Cupcakes',
        desc: 'Light vanilla sponge topped with fresh strawberry frosting and a real berry.',
        price: PRICE,
        image: 'strawberryCups',
        tags: ['Fresh fruit'],
      },
      {
        id: 'mint-cupcakes',
        name: 'Mint Cupcakes',
        desc: 'Cool mint buttercream over a moist chocolate cupcake — a refreshing twist on a classic.',
        price: PRICE,
        image: 'mintCups',
        tags: ['Refreshing'],
      },
      {
        id: 'chocolate-cupcakes',
        name: 'Double Chocolate Cupcakes',
        desc: 'Chocolate sponge with tall chocolate frosting swirls, finished with cocoa and sprinkles.',
        price: PRICE,
        image: 'chocoCups',
        tags: ['Rich', 'Best seller'],
      },
      {
        id: 'mint-chocolate-cupcake',
        name: 'Mint Chocolate Cupcake',
        desc: 'A single indulgence: rich chocolate cake crowned with a bright mint swirl.',
        price: PRICE,
        image: 'mintChocoCup',
        tags: ['Signature'],
      },
      {
        id: 'oreo-cupcakes',
        name: 'Cookies & Cream Cupcakes',
        desc: 'Chocolate sponge with a cream cookie filling and cookie crumb topping.',
        price: PRICE,
        image: 'oreoCups',
        tags: ['Crowd pleaser'],
      },
    ],
  },
  {
    id: 'customized-cakes',
    name: 'Customized Cakes',
    tagline: 'Your dream cake, our creation',
    icon: 'Palette',
    accent: 'berry',
    image: 'bakingHands',
    featured: true,
    products: [
      {
        id: 'birthday-cake',
        name: 'Birthday Cakes',
        desc: 'Tell us the name, the age and the flavour — we design a cake that is unmistakably theirs.',
        price: PRICE,
        image: 'pinkDrip',
        tags: ['Custom design', 'Message writing'],
        signature: true,
      },
      {
        id: 'wedding-cake',
        name: 'Wedding & Engagement Cakes',
        desc: 'Elegant multi-tier celebration cakes designed around your theme, with an edible printed topper.',
        price: PRICE,
        image: 'mirrorGlaze',
        tags: ['Multi tier', 'Premium'],
      },
      {
        id: 'theme-cake',
        name: 'Theme & Character Cakes',
        desc: 'Cartoon, superhero, floral or corporate themes, sculpted and finished to match your reference.',
        price: PRICE,
        image: 'rainbowSlice',
        tags: ['Fully custom'],
      },
      {
        id: 'photo-cake',
        name: 'Photo Printed Cakes',
        desc: 'Send your photo and we print it directly onto an edible sheet for a cake that looks like you.',
        price: PRICE,
        image: 'lemonPie',
        tags: ['Edible print'],
      },
      {
        id: 'cupcake-tower',
        name: 'Cupcake Towers',
        desc: 'A stacked tower of cupcakes for birthdays, baby showers and office celebrations.',
        price: PRICE,
        image: 'rainbowCups',
        tags: ['Serves many'],
      },
      {
        id: 'fondant-cake',
        name: 'Fondant Cakes',
        desc: 'Clean fondant finishes with hand-modelled details, in any colour you choose.',
        price: PRICE,
        image: 'bakingHands',
        tags: ['Clean finish'],
      },
    ],
  },
  {
    id: 'chocolate-varieties',
    name: 'Chocolate Varieties',
    tagline: 'Pure chocolate bliss',
    icon: 'Candy',
    accent: 'choco',
    image: 'chocolateBun',
    featured: true,
    products: [
      {
        id: 'chocolate-lollipops',
        name: 'Chocolate Lollipops',
        desc: 'Decorative lollipops in a range of colours and shapes — a favourite for return gifts and party favours.',
        price: PRICE,
        image: 'mintChocoCup',
        tags: ['Return gifts', 'Kids favourite'],
        signature: true,
      },
      {
        id: 'chocolate-truffles',
        name: 'Handmade Truffles',
        desc: 'Rich chocolate rolled with crisp cocoa — smooth, intense and made in small batches.',
        price: PRICE,
        image: 'chocolateBun',
        tags: ['Handmade'],
      },
      {
        id: 'chocolate-coin-bar',
        name: 'Chocolate Coins',
        desc: 'Coin-shaped chocolates in a decorative box with a foil-wrapped finish. Perfect for gifting.',
        price: PRICE,
        image: 'sprinkleBar',
        tags: ['Gift box'],
      },
      {
        id: 'dry-fruit-chocolates',
        name: 'Dry Fruit Chocolates',
        desc: 'Almonds, cashews and pistachios dipped in dark and milk chocolate.',
        price: PRICE,
        image: 'pearlCake',
        tags: ['Premium nuts'],
      },
      {
        id: 'chocolate-cake-roll',
        name: 'Chocolate Cake Roll',
        desc: 'A soft chocolate roulade with whipped cream, rolled and chilled for a clean slice.',
        price: PRICE,
        image: 'caramel',
        tags: ['Roll'],
      },
    ],
  },
];

/** Lookup helpers — keeps component code free of filter/map noise. */
export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

export const FEATURED_CATEGORIES = CATEGORIES.filter((c) => c.featured);

export const SIGNATURE_PRODUCTS = CATEGORIES.flatMap((c) =>
  c.products.filter((p) => p.signature).map((p) => ({ ...p, category: c.name, categoryId: c.id }))
);

export const ALL_PRODUCTS = CATEGORIES.flatMap((c) =>
  c.products.map((p) => ({ ...p, category: c.name, categoryId: c.id, imageData: photo(p.image) }))
);

export const TOTAL_PRODUCTS = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);

export default CATEGORIES;
