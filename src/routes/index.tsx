import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutVisa from "@/assets/about-visa.png.asset.json";
import heroAirport from "@/assets/hero-airport.jpg";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Countries } from "@/components/site/Countries";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { BlogPreview } from "@/components/site/BlogPreview";
import { Testimonials } from "@/components/site/Testimonials";
import { ReviewForm } from "@/components/site/ReviewForm";
import { FAQ, FAQS } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { CTABanner } from "@/components/site/CTABanner";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Reveal } from "@/components/site/Reveal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada & Australia Visas" },
      { name: "description", content: "Travel Links Solution — UK-based visa consultancy helping clients worldwide. Expert help with Schengen, USA B1/B2, UK, Canada, Australia, student, work & family visas across 25+ countries. 98% approval rate." },
      { name: "keywords", content: "visa consultants, global visa consultancy, schengen visa consultants, usa b1 b2 visa help, uk visitor visa, canada study visa, australia tourist visa, work visa consultants, family visit visa, student visa consultants, worldwide visa services, travel visa agency, uk based visa consultants worldwide, Travel Links Solution, Travellinks" },
      { property: "og:title", content: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada, Australia" },
      { property: "og:description", content: "UK-based visa consultancy serving clients worldwide. Schengen, USA, UK, Canada, Australia, student, work & family visas across 25+ countries." },
      { property: "og:url", content: "https://travellinks.uk/" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { name: "twitter:title", content: "Travel Links Solution — Global Visa Consultants" },
      { name: "twitter:description", content: "UK-based, serving worldwide. Schengen, USA, UK, Canada, Australia, student, work & family visas across 25+ countries." },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://travellinks.uk/" },
      { rel: "preload", as: "image", href: heroAirport, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://travellinks.uk/#organization",
          name: "Travel Links Solution",
          alternateName: ["Travellinks", "Travel Links"],
          url: "https://travellinks.uk/",
          logo: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png",
          image: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png",
          description:
            "UK-based visa consultancy helping clients worldwide with Schengen, USA, UK, Canada, Australia, student, work and family visas across 25+ countries.",
          priceRange: "££",
          areaServed: { "@type": "Place", name: "Worldwide" },
          address: {
            "@type": "PostalAddress",
            addressCountry: "GB",
            addressLocality: "Northampton",
          },
          serviceType: [
            "Visa Consultancy",
            "Schengen Visa Assistance",
            "USA B1/B2 Visa Assistance",
            "UK Visitor Visa Assistance",
            "Canada Visa Assistance",
            "Australia Visa Assistance",
            "Student Visa Consultancy",
            "Work Visa Consultancy",
            "Family Visit Visa Consultancy",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Visa Destinations Served",
            itemListElement: [
              "Germany", "France", "Netherlands", "Switzerland", "Iceland", "Sweden",
              "Portugal", "Greece", "Austria", "Italy", "United States", "Canada",
              "Australia", "New Zealand", "Ireland", "Japan", "South Africa",
              "Turkey", "Singapore", "Malaysia", "Thailand", "Morocco",
            ].map((c) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: `${c} Visa Consultancy`, areaServed: { "@type": "Country", name: c } },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://travellinks.uk/",
          name: "Travel Links Solution",
          publisher: { "@id": "https://travellinks.uk/#organization" },
          inLanguage: "en-GB",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="about" className="py-24 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal direction="right" className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                About Us
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                A UK consultancy built on <span className="text-gradient-brand">trust, expertise and results</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Travel Links Solution is a UK-registered visa consultancy with over a decade of experience guiding
                tourists, families and business travellers through complex visa pathways. Our team of senior
                consultants combines deep regulatory knowledge with a genuinely personal approach — so your
                application is in expert hands from day one.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
                >
                  Learn more about us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white px-5 py-3 text-sm font-bold text-primary shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
                >
                  Contact us
                </Link>
              </div>
            </Reveal>
            <Reveal direction="left" delay={150} className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" aria-hidden />
              <img
                src={aboutVisa.url}
                alt="Approved visa document illustration"
                className="relative w-2/3 max-w-[220px] sm:w-full sm:max-w-sm h-auto drop-shadow-[0_30px_60px_rgba(33,87,243,0.35)] animate-float"
                loading="lazy" decoding="async"
              />
            </Reveal>

          </div>
        </section>
        <Services />
        <Countries />
        <WhyUs />
        <Process />
        <BlogPreview />
        <Testimonials />
        <ReviewForm />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
