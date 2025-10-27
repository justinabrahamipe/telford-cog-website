import createCache from '@emotion/cache';

// Create emotion cache for client-side
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
