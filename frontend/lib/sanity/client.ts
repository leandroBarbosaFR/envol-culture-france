import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'yrndrbta',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
});
