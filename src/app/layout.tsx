import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileServiceLinks } from "@/components/layout/MobileServiceLinks";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { SmoothAnchorScroll } from "@/components/layout/SmoothAnchorScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image" },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: browser ekstenzije dodaju atribute na <html>
    // data-scroll-behavior: Next pri prelasku na drugu stranicu skroluje trenutno, bez klizanja
    <html
      lang="sr-Latn"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#sadrzaj"
          className="sr-only z-100 rounded-md bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Preskoči na sadržaj
        </a>
        <JsonLd data={organizationSchema()} />
        <NavigationProgress />
        <SmoothAnchorScroll />
        <Header megaMenu={<MegaMenu />} mobileServices={<MobileServiceLinks />} />
        <main id="sadrzaj" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
