/** Navigation model — desktop links, mobile links and footer columns. */

import { CATEGORIES } from './products';

export const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Menu', href: '#menu', id: 'menu', hasDropdown: true },
  { label: 'Customized', href: '#custom-cakes', id: 'custom-cakes' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

/** Section ids the navbar highlights while scrolling (matches sitemap). */
export const TRACKED_SECTIONS = [
  'home',
  'about',
  'menu',
  'custom-cakes',
  'gallery',
  'reviews',
  'contact',
];

/** The dropdown under "Menu". */
export const MENU_DROPDOWN = CATEGORIES.map((c) => ({
  label: c.name,
  href: `#${c.id}`,
  id: c.id,
  tagline: c.tagline,
  icon: c.icon,
}));

export const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Menu', href: '#menu' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Reviews', href: '#reviews' },
    ],
  },
  {
    title: 'Order',
    links: [
      { label: 'Order Now', href: '#order' },
      { label: 'Customized Cakes', href: '#customized-cakes' },
      { label: 'Chocolate Varieties', href: '#chocolate-varieties' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
];

export default NAV_LINKS;
