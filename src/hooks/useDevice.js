import { useEffect, useState } from 'react';
import { getDeviceProfile } from '../lib/device';

/**
 * Device capability profile used across the site to decide how much
 * decorative animation is safe to play.
 */
export default function useDevice() {
  const [profile] = useState(getDeviceProfile);
  return profile;
}
