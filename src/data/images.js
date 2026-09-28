/**
 * Central image registry.
 *
 * Every remote photo used on the site is declared here exactly once, with the
 * real subject it depicts, so copy and imagery can never drift apart.
 * Ids were verified visually against a generated contact sheet.
 */

const UNSPLASH = 'https://images.unsplash.com/photo-';

/** Builds a responsive, CDN-optimised Unsplash URL. */
export function unsplash(id, { w = 1200, h, q = 78, fit = 'crop' } = {}) {
  const params = new URLSearchParams({
    auto: 'format',
    fit,
    q: String(q),
    w: String(w),
  });
  if (h) params.set('h', String(h));
  return `${UNSPLASH}${id}?${params.toString()}`;
}

/**
 * Verified photo subjects.
 *  chocolateDrip – dark chocolate drip layer cake
 *  rainbowSlice  – rainbow sprinkle layer cake, cut slice
 *  caramel      – caramel plated dessert, glossy drizzle
 *  lemonPie     – lemon meringue tart, torched top
 *  rainbowCups  – rainbow sprinkle cupcakes
 *  mintCups     – mint buttercream cupcakes, teal backdrop
 *  strawberryCups – strawberry frosting cupcakes
 *  chocChip     – chocolate chip cookies, scattered
 *  bakeryShelf  – bakery display shelf of fresh bakes
 *  pinkDrip     – pink drip cake on a pedestal
 *  oreoCups     – cookies & cream cupcakes, dark plate
 *  raspberry    – raspberry layer cake slice
 *  mirrorGlaze  – orange mirror-glazed layer cake
 *  cookieBasket – assorted cookies in a basket
 *  chocoCups    – chocolate cupcakes with frosting swirls
 *  mintChocoCup – mint chocolate cupcake
 *  bakingHands  – hands dusting a fresh cake
 *  pearlCake    – chocolate cake with sugar pearls
 *  sprinkleBar  – chocolate sprinkle rice-krispie bars
 *  chocolateBun – dark chocolate fluted/bundt cake
 *  toast        – friends toasting at a celebration
 */
export const PHOTOS = {
  chocolateDrip: '1578985545062-69928b1d9587',
  rainbowSlice: '1464349095431-e9a21285b5f3',
  caramel: '1551024506-0bccd828d307',
  lemonPie: '1519915028121-7d3463d20b13',
  rainbowCups: '1607478900766-efe13248b125',
  mintCups: '1486427944299-d1955d23e34d',
  strawberryCups: '1563729784474-d77dbb933a9e',
  chocChip: '1499636136210-6f4ee915583e',
  bakeryShelf: '1587241321921-91a834d6d191',
  pinkDrip: '1621303837174-89787a7d4729',
  oreoCups: '1612203985729-70726954388c',
  raspberry: '1565958011703-44f9829ba187',
  mirrorGlaze: '1542826438-bd32f43d626f',
  cookieBasket: '1558961363-fa8fdf82db35',
  chocoCups: '1550617931-e17a7b70dce2',
  mintChocoCup: '1587668178277-295251f900ce',
  bakingHands: '1556484687-30636164638b',
  pearlCake: '1602351447937-745cb720612f',
  sprinkleBar: '1590080875515-8a3a8dc5735e',
  chocolateBun: '1541783245831-57d6fb0926d3',
  toast: '1519671482749-fd09be7ccebf',
};

/** Landscape / portrait / square sources for one photo. */
export function photo(key, { w = 1200, q = 78 } = {}) {
  const id = PHOTOS[key];
  if (!id) throw new Error(`Unknown photo key: ${key}`);
  return {
    key,
    alt: PHOTO_ALT[key] ?? 'Gowsalya Cake Shop',
    src: unsplash(id, { w, q }),
    srcSet: `${unsplash(id, { w: 480, q: 60 })} 480w, ${unsplash(id, { w: 768, q: 70 })} 768w, ${unsplash(id, { w: 1200, q })} 1200w, ${unsplash(id, { w: 1600, q })} 1600w`,
  };
}

/** Accessible descriptions, written for the real subject of each photo. */
export const PHOTO_ALT = {
  chocolateDrip: 'Layer cake coated in glossy dark chocolate drip with chocolate truffle balls on top',
  rainbowSlice: 'Rainbow sprinkle layer cake with a slice cut out showing vanilla cream',
  caramel: 'Dessert plated with a glossy caramel drizzle and cream quenelle',
  lemonPie: 'Lemon meringue tart with a torched, golden meringue top',
  rainbowCups: 'Cupcakes topped with rainbow sprinkles in a bright assortment',
  mintCups: 'Mint buttercream cupcakes on a teal backdrop',
  strawberryCups: 'Cupcakes topped with fresh strawberry frosting',
  chocChip: 'Freshly baked chocolate chip cookies scattered on parchment',
  bakeryShelf: 'Bakery display shelf lined with cakes and bakes',
  pinkDrip: 'Pink drip cake decorated with fresh berries on a pedestal',
  oreoCups: 'Cookies and cream cupcakes with dark crumb tops on a dark plate',
  raspberry: 'Slice of raspberry layer cake with fresh raspberries',
  mirrorGlaze: 'Tall layer cake with a glossy orange mirror glaze',
  cookieBasket: 'Assorted homemade cookies in a woven basket',
  chocoCups: 'Chocolate cupcakes finished with tall chocolate frosting swirls',
  mintChocoCup: 'Single chocolate cupcake topped with a mint green swirl',
  bakingHands: 'Baker dusting a freshly baked cake with powdered sugar',
  pearlCake: 'Chocolate cake decorated with edible sugar pearls',
  sprinkleBar: 'Chocolate sprinkle treats cut into bars',
  chocolateBun: 'Dark chocolate fluted bundt cake with glossy ganache',
  toast: 'Friends toasting glasses together at a celebration',
};

export default photo;
