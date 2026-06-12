import { createClient } from '@sanity/client';
import type { QueryParams } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'khbx2r3z';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'blog';

export const sanity = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2026-02-26',
});

const builder = createImageUrlBuilder(sanity);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function safeSanityFetch<T>(
  query: string,
  params?: QueryParams,
  fallback: T = [] as T,
): Promise<T> {
  try {
    return params ? await sanity.fetch<T>(query, params) : await sanity.fetch<T>(query);
  } catch (error) {
    console.warn('[sanity] fetch failed; using fallback content.', error);
    return fallback;
  }
}
