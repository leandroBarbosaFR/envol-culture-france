import type { NextConfig } from 'next';

/*
  The accounts side of the site is not built yet: every login / sign-up entry
  point (the header buttons still point at /login and /register from the CMS,
  the footer at /connexion and /inscription) lands on the holding page instead
  of a form that cannot submit. Temporary (307), so nothing is cached by
  browsers or search engines — drop this block, and app/espace-adherent, when
  the real screens ship. The form pages themselves are left untouched under
  app/connexion and app/inscription, ready to be re-enabled.
*/
const MEMBER_AREA_PATHS = ['/connexion', '/inscription', '/login', '/register'];

const nextConfig: NextConfig = {
  async redirects() {
    return MEMBER_AREA_PATHS.map((source) => ({
      source,
      destination: '/espace-adherent',
      permanent: false,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
