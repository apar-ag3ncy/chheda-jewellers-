import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata, localBusinessJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { flags } from "@/config/flags";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#0b3a2d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="antialiased">
        {/* No-JS fallback: the loader overlay is only removed by JS, so hide it
            entirely when scripts are unavailable — content is never trapped. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{ __html: ".cj-loader{display:none!important}" }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:font-body focus:text-sm focus:text-green-deep"
        >
          Skip to content
        </a>

        <SmoothScroll>
          {flags.loaderEnabled ? <Loader /> : null}
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          {flags.floatingChatEnabled ? <WhatsAppButton /> : null}
        </SmoothScroll>

        <script
          type="application/ld+json"
          // schema.org structured data for local SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
