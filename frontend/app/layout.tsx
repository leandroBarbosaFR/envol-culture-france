import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieConsent } from '@/components/cookie-consent';
import { sanityFetch, SanityLive } from '@/lib/sanity/live';
import { absoluteUrl, siteUrl } from '@/lib/site';
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
  const title = seo?.metaTitle ?? 'Envol Culture en France';
  const description = seo?.metaDescription ?? '';
  const shareImage = seo?.shareImage as string | undefined;

  return {
    // Without this every canonical and og:image stays relative, which crawlers
    // and social scrapers cannot resolve.
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      // Pages set a bare title; this appends the SHORT name. Using the full
      // meta title here pushed page titles past 90 characters, well beyond
      // what search results display.
      template: '%s · Envol Culture',
    },
    description,
    applicationName: title,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: title,
      locale: 'fr_FR',
      url: '/',
      title,
      description,
      images: shareImage ? [{ url: shareImage }] : undefined,
    },
    twitter: {
      card: shareImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
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
        <script
          type="application/ld+json"
          // Structured data for the association itself. Search engines read this
          // for the knowledge panel; it is inert markup, not executable page JS.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: contact?.organisationName ?? 'Association ENVOL',
              url: siteUrl,
              logo: absoluteUrl('/favicon.ico'),
              email: contact?.email || undefined,
              telephone: contact?.phone || undefined,
              address: contact?.addressLine1
                ? {
                    '@type': 'PostalAddress',
                    streetAddress: [contact.addressLine1, contact.addressLine2]
                      .filter(Boolean)
                      .join(', '),
                    postalCode: contact.postalCode || undefined,
                    addressLocality: contact.city || undefined,
                    addressCountry: 'FR',
                  }
                : undefined,
            }),
          }}
        />
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
