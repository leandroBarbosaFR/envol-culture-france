import { defineLive } from 'next-sanity/live';
import type { QueryParams } from 'next-sanity';
import { client } from '@/lib/sanity/client';

/**
 * Live Content API wiring. `sanityFetch` tags every query with the sync tags
 * Content Lake returns, and `<SanityLive />` (rendered in the root layout)
 * invalidates those tags when a document is published — so edits reach the
 * site without a redeploy.
 *
 * No viewer token: we only ever render published content. Draft previews and
 * the Presentation tool would need `serverToken`/`browserToken` set to a token
 * with viewer rights; passing `false` opts out and silences the dev warning.
 */
const { sanityFetch: liveFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

export { SanityLive };

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  stega?: boolean;
};

/**
 * `liveFetch` resolves its result type through `ClientReturn`, which needs
 * TypeGen-generated `defineQuery` types to resolve against. Our queries are
 * plain `groq` strings, so every result would collapse to `{}` — whereas
 * `client.fetch` fell back to `any`. This wrapper keeps the call sites typed
 * exactly as they were before the Live Content migration.
 *
 * Drop it once queries move to `defineQuery` + `sanity typegen generate`,
 * which gives real result types instead of `any`.
 */
export const sanityFetch = liveFetch as (
  options: SanityFetchOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<{ data: any }>;
