import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { CONTENT_TAG } from '@/lib/sanity/live';

/*
  Sanity webhook target — what actually gets a publish onto the site.

  `<SanityLive />` can only revalidate while a browser is connected to the site,
  so the normal sequence (edit in the Studio, publish, nobody on the site) left
  the prerendered pages cached with no expiry until the next deploy. Adding
  photos to an album was the visible case: published in Sanity, still absent
  from /galerie/<slug>. The « Revalidation du site (Vercel) » webhook was
  already pointing here — this route is the half that was missing, so every
  delivery since it was created came back 404.

  Webhook settings (sanity.io/manage → API → Webhooks):
    URL      https://www.envol-rlb-asso.fr/api/revalidate
    Dataset  production, trigger on Create + Update + Delete, HTTP POST
    Secret   must match SANITY_REVALIDATE_SECRET in the Vercel project
  Leave the projection empty: the full document is fine, only `_id` and `_type`
  are read.
*/
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
  }

  // `parseBody` also waits out Content Lake's eventual consistency, so the
  // refetch that follows this call cannot read back the pre-publish document.
  const { isValidSignature, body } = await parseBody<{ _id?: string; _type?: string }>(
    request,
    secret,
  );
  if (!isValidSignature) {
    return Response.json({ message: 'Invalid signature' }, { status: 401 });
  }

  /*
    The Studio auto-saves drafts on every keystroke, and each save is a mutation
    the webhook reports — dozens per edited paragraph. None of them change what
    the site renders (we only ever query the published perspective), so purging
    the cache for them would just make every page regenerate for nothing.
  */
  const id = body?._id;
  if (id?.startsWith('drafts.') || id?.startsWith('versions.')) {
    return Response.json({ revalidated: false, reason: 'draft mutation', id });
  }

  // `{ expire: 0 }` rather than the 'max' profile: stale-while-revalidate would
  // serve the old page once more, and the one person guaranteed to reload right
  // after publishing is the editor checking their work.
  revalidateTag(CONTENT_TAG, { expire: 0 });

  return Response.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
}
