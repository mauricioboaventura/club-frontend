// In-memory cache for client-side API calls.
// Prevents redundant network requests when the user navigates between pages
// during the same session. TTL is 5 minutes by default.
// On the server side, Next.js `next: { revalidate }` handles caching via the
// Data Cache — this module only kicks in for client-component useEffect calls.

type CacheEntry<T> = { data: T; expiresAt: number };

const store = new Map<string, CacheEntry<unknown>>();

export const TTL = {
  SHORT: 1 * 60 * 1000,   // 2 min  — rankings (dinâmico)
  DEFAULT: 1 * 60 * 1000, // 5 min  — torneios, restaurantes, páginas
  LONG: 1 * 60 * 1000,   // 10 min — banners (semi-estático)
} as const;

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = TTL.DEFAULT,
): Promise<T> {
  const now = Date.now();
  const entry = store.get(key) as CacheEntry<T> | undefined;

  if (entry && entry.expiresAt > now) {
    return entry.data;
  }

  const data = await fetcher();
  store.set(key, { data, expiresAt: now + ttlMs });
  return data;
}

/** Remove all cached entries (use after mutations to force fresh data). */
export function invalidateCache(keyPrefix?: string): void {
  if (!keyPrefix) {
    store.clear();
    return;
  }
  for (const key of Array.from(store.keys())) {
    if (key.startsWith(keyPrefix)) store.delete(key);
  }
}
