import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "@/assets/travel-links-logo.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SplashScreen } from "@/components/site/SplashScreen";
import { ApplyDialog } from "@/components/site/ApplyDialog";

import { NotFound } from "@/components/site/NotFound";
import { CookieConsent } from "@/components/site/CookieConsent";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ChatWidget } from "@/components/site/ChatWidget";

import { SitePopup } from "@/components/site/SitePopup";


function NotFoundComponent() {
  return <NotFound />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#2157f3" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "author", content: "Travel Links Solution" },
      { name: "publisher", content: "Travel Links Solution" },
      { name: "application-name", content: "Travel Links Solution" },
      { name: "apple-mobile-web-app-title", content: "Travel Links" },
      { name: "keywords", content: "Travel Links Solution, Travel Links Visa Solution, Travel Links Solution Northampton, Travel Links Solution UK, Travellinks Solution, Travellinks Visa Solution, Travel Links, Travel Links UK, Travellinks, Travellinks UK, Travel Links Northampton, Travel Links visa, Travel Links UK visa, Travel Links visa consultancy, Travel Links consultancy, Travellinks visa consultancy, Travellinks Northampton, UK visa consultancy, UK visa consultants, UK visa consultant, UK visa solution, Visa Solution UK, Travel Visa Solution, Travel UK Visa, UK Travel Visa, UK Visa, UK visas, UK visa agency, UK visa services, UK visa advisor, UK visa expert, UK visa help, visa consultancy UK, visa consultants Northampton, visa consultants UK, visa agency UK, visa agency Northampton, best visa consultants UK, best UK visa consultancy, top visa consultants UK, Schengen visa UK, Schengen visa consultants, USA visa UK, US B1 B2 visa UK, Canada visa UK, Australia visa UK, tourist visa UK, family visa UK, spouse visa UK, business visa UK, student visa UK, work visa UK, dependent visa UK, visitor visa UK, travellinks.uk, travel links uk visa, travel links solution reviews, travel links solution contact" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "geo.region", content: "GB-NTH" },
      { name: "geo.placename", content: "Northampton" },
      { name: "geo.position", content: "52.2405;-0.9027" },
      { name: "ICBM", content: "52.2405, -0.9027" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@travellinksuk" },
      { name: "google-site-verification", content: "K0dQ87TuPor7iozdaUVqcpUvexmsiIujw_zsS4ozfAc" },
      { name: "google-site-verification", content: "yLSIOyjrsKv5GcTpyqe3cbK37JDHHdYiSQAvtsKZFgY" },
      { title: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada & Australia Visas" },
      { property: "og:title", content: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada & Australia Visas" },
      { name: "twitter:title", content: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada & Australia Visas" },
      { name: "description", content: "Travel Links Solution — UK-based visa consultancy helping clients worldwide. Expert help with Schengen, USA B1/B2, UK, Canada, Australia, student, work & family visas across 25+ countries. 98% approval rate." },
      { property: "og:description", content: "Travel Links Solution — UK-based visa consultancy helping clients worldwide. Expert help with Schengen, USA B1/B2, UK, Canada, Australia, student, work & family visas across 25+ countries. 98% approval rate." },
      { name: "twitter:description", content: "Travel Links Solution — UK-based visa consultancy helping clients worldwide. Expert help with Schengen, USA B1/B2, UK, Canada, Australia, student, work & family visas across 25+ countries. 98% approval rate." },
      { property: "og:image", content: "https://travellinks.uk/assets/media/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Travel Links Solution — UK Visa Consultancy" },
      { name: "twitter:image", content: "https://travellinks.uk/assets/media/og-image.jpg" },
      { name: "twitter:image:alt", content: "Travel Links Solution — UK Visa Consultancy" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "any", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "mask-icon", href: "/favicon.png", color: "#2157f3" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600&display=swap" },
    ],
    scripts: [
      { src: "https://www.googletagmanager.com/gtag/js?id=G-5NL691N6SK", async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;try{var s=localStorage.getItem('tls-cookie-consent-v1');var c=s?JSON.parse(s):null;var a=c&&c.categories&&c.categories.analytics?'granted':'denied';var f=c&&c.categories&&c.categories.functional?'granted':'denied';gtag('consent','default',{analytics_storage:a,functionality_storage:f,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',security_storage:'granted'});}catch(e){gtag('consent','default',{analytics_storage:'denied',functionality_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',security_storage:'granted'});}gtag('js', new Date());gtag('config', 'G-5NL691N6SK', { anonymize_ip: true });`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["Organization", "TravelAgency", "LocalBusiness"],
              "@id": "https://travellinks.uk/#organization",
              name: "Travel Links Solution",
              alternateName: ["Travel Links", "Travellinks", "Travellinks Solution", "Travel Links UK", "Travellinks UK", "Travel Links Consultancy", "Travel Links UK Visa"],
              url: "https://travellinks.uk",
              logo: "https://travellinks.uk/__l5e/assets-v1/7af30677-21db-4df6-b49b-b973df323810/travel-links-logo.png",
              image: "https://travellinks.uk/__l5e/assets-v1/7af30677-21db-4df6-b49b-b973df323810/travel-links-logo.png",
              email: "contact@travellinks.uk",
              telephone: "+44-787-946-5341",
              priceRange: "££",
              areaServed: "Worldwide",
              address: {
                "@type": "PostalAddress",
                streetAddress: "138 Milton Street",
                addressLocality: "Northampton",
                postalCode: "NN2 7DE",
                addressCountry: "GB",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.2405,
                longitude: -0.9027,
              },
              hasMap: "https://www.google.com/maps?q=Travel+Links+Solution+Northampton",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+44-787-946-5341",
                  email: "contact@travellinks.uk",
                  contactType: "customer service",
                  areaServed: "GB",
                  availableLanguage: ["English"],
                },
              ],
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                worstRating: "1",
                reviewCount: "320",
              },
              sameAs: [
                "https://www.facebook.com/travellinksuk",
                "https://www.instagram.com/travellinksuk",
                "https://www.linkedin.com/company/travel-links-solution",
                "https://twitter.com/travellinksuk",
                "https://www.youtube.com/@travellinksuk",
                "https://uk.trustpilot.com/review/travellinks.uk",
                "https://www.yell.com/biz/travel-links-solution-northampton",
                "https://www.bing.com/maps?q=Travel+Links+Solution+Northampton",
                "https://g.page/travel-links-solution-northampton",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://travellinks.uk/#website",
              url: "https://travellinks.uk",
              name: "Travel Links Solution",
              alternateName: ["Travel Links", "Travellinks", "Travel Links UK", "Travellinks UK"],
              inLanguage: "en-GB",
              publisher: { "@id": "https://travellinks.uk/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://travellinks.uk/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Second Google Search Console verification — TanStack head merges meta by `name`,
            so emit the extra verification tag here as raw HTML so both render. */}
        <meta name="google-site-verification" content="K0dQ87TuPor7iozdaUVqcpUvexmsiIujw_zsS4ozfAc" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <ApplyDialog />
      
      <CookieConsent />
      <WhatsAppButton />
      <SitePopup />
      <ChatWidget />
    </QueryClientProvider>

  );
}

