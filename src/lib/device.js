/**
 * Lightweight device / preference detection.
 *
 * Used to keep the experience premium on capable machines while staying
 * smooth on low-powered phones and for visitors who ask for reduced motion.
 */

const DESKTOP_QUERY = '(min-width: 1024px), (pointer: fine)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function safeMatch(query) {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

function detect() {
  if (typeof window === 'undefined') {
    return { isDesktop: false, isTouch: false, reducedMotion: false, lowPower: false, cores: 8, memory: 8 };
  }

  const cores = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 8;
  const memory = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : 8;
  const saveData = Boolean(navigator.connection?.saveData);
  const reducedMotion = safeMatch(REDUCED_QUERY);
  const isTouch =
    'ontouchstart' in window || (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0);

  // "Low power" = slow CPU, tiny RAM, data saver or explicit reduced motion.
  const lowPower = reducedMotion || saveData || cores <= 2 || memory <= 2;

  return { isDesktop: safeMatch(DESKTOP_QUERY) && !isTouch, isTouch, reducedMotion, lowPower, cores, memory };
}

let cached = null;

/** Memoised device profile (stable for the lifetime of the session). */
export function getDeviceProfile() {
  if (!cached) cached = detect();
  return cached;
}

/** True when decorative/heavy animation should be suppressed. */
export function shouldReduceMotion() {
  return getDeviceProfile().lowPower;
}
