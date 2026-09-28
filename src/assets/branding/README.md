# Branding assets — how to swap in the real files

The site ships with hand-built vector brand assets that match the
Gowsalya Cake Shop identity (berry pink / maroon, cream, chocolate brown, gold).

| File                                     | Used by                                                   |
| ---------------------------------------- | --------------------------------------------------------- |
| `src/assets/branding/logo.svg`            | Navbar, mobile menu, footer, contact, floating WhatsApp FAB |
| `src/assets/branding/banner.svg`          | Contact section brand plate, decorative banner strip        |
| `public/favicon.svg`                      | Browser tab icon, PWA icon                                 |

## Replacing with the real uploaded artwork

1. Drop the **real circular logo** over `src/assets/branding/logo.svg`
   (keep the same file name — any modern format works, `.png` included:
   rename the file and update the import in `src/components/ui/Brand.jsx`).
2. Drop the **real banner** over `src/assets/branding/banner.svg`.
3. Copy the logo to `public/favicon.svg` for the browser tab.

No other code changes are needed — every section imports from
`src/components/ui/Brand.jsx`, which is the single source of truth.

`Brand.jsx` expects a **square** logo (1:1) and a **wide** banner (roughly 3:1),
so add `object-cover` aware crops: the logo is rendered inside a circular mask
(`rounded-full`), the banner inside a rounded rectangle.
