import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieConsent } from '@/components/cookie-consent';
import { sanityFetch, SanityLive } from '@/lib/sanity/live';
import {
  siteHeaderQuery,
  siteFooterQuery,
  siteContactQuery,
  cookieBannerQuery,
  seoGlobalQuery,
} from '@/lib/sanity/queries';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await sanityFetch({ query: seoGlobalQuery, stega: false });
  return {
    title: seo?.metaTitle ?? 'Envol Culture en France',
    description: seo?.metaDescription ?? '',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    { data: header },
    { data: footer },
    { data: contact },
    { data: cookieBanner },
  ] = await Promise.all([
    sanityFetch({ query: siteHeaderQuery }),
    sanityFetch({ query: siteFooterQuery }),
    sanityFetch({ query: siteContactQuery }),
    sanityFetch({ query: cookieBannerQuery }),
  ]);

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader header={header} />
        <main className="flex-1">{children}</main>
        <SiteFooter
          footer={footer}
          contact={contact}
          cookieManageLabel={cookieBanner?.manageLabel ?? undefined}
        />
        <CookieConsent settings={cookieBanner} />
        <SanityLive />
      </body>
    </html>
  );
}
