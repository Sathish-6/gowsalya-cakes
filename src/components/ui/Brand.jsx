import bannerSrc from '../../assets/branding/banner.svg';
const logoSrc = `${import.meta.env.BASE_URL}gowsalya-splash-logo.png`;

/**
 * Single source of truth for the brand artwork.
 *
 * The uploaded circular artwork is the source of truth for the logo. The wide
 * banner remains a separate decorative brand asset.
 */

export const LOGO = logoSrc;
export const BANNER = bannerSrc;

/** Circular brand mark — used in the navbar, footer, contact card and FAB. */
export function LogoMark({ className = 'h-12 w-12', alt = 'Gowsalya Cake Shop logo', ...rest }) {
  return (
    <img
      src={LOGO}
      alt={alt}
      width="420"
      height="420"
      className={`rounded-full object-contain ring-2 ring-white/70 ring-offset-2 ring-offset-cream-50 ${className}`}
      {...rest}
    />
  );
}

/** Logo plus wordmark lockup, used across the navbar and footer. */
export function BrandLockup({
  className = '',
  logoClass = 'h-11 w-11',
  titleClass = 'font-display text-lg leading-tight',
  subtitleClass = 'text-berry-600',
  subtitle = true,
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={`${logoClass} shrink-0 shadow-gold`} />
      <span className="flex flex-col">
        <span className={`${titleClass} font-bold text-choco-800`}>Gowsalya</span>
        {subtitle ? (
          <span
            className={`font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${subtitleClass}`}
          >
            Cake Shop
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** Wide brand banner plate. */
export function BrandBanner({ className = '', alt = 'Gowsalya Cake Shop' }) {
  return (
    <img
      src={BANNER}
      alt={alt}
      className={`h-auto w-full rounded-2xl object-cover shadow-soft ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

export default BrandLockup;
