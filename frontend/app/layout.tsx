import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { client } from '@/lib/sanity/client';
import { siteHeaderQuery, siteFooterQuery, seoGlobalQuery } from '@/lib/sanity/queries';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await client.fetch(seoGlobalQuery);
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
  const [header, footer] = await Promise.all([
    client.fetch(siteHeaderQuery),
    client.fetch(siteFooterQuery),
  ]);

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader header={header} />
        <main className="flex-1">{children}</main>
        <SiteFooter footer={footer} />
      </body>
    </html>
  );
}
