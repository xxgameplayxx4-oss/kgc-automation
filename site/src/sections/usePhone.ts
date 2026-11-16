import { useSyncExternalStore } from 'react';

/** Phone width: below 48rem (768px). */
export const PHONE_QUERY = '(max-width: 47.9375rem)';
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(PHONE_QUERY);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
const get = () => window.matchMedia(PHONE_QUERY).matches;
export const usePhone = () => useSyncExternalStore(subscribe, get, () => false);
