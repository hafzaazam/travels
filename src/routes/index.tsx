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
      { name: "keywords", content: "visa consultants, visa agency, visa services, travel visa consultants, global visa consultancy, uk visa consultants, schengen visa consultants, usa visa consultants, visa experts uk, travel links, travel links solution, travellinks, travellinks uk, visa consultancy northampton, best visa consultants uk, visa consultants near me, online visa consultants, worldwide visa services, visa help uk, visa application help, immigration consultants uk, visa processing services, visa refusal help, visa appeal consultants, urgent visa services, express visa processing, visa interview preparation, ds-160 help, us b1 b2 visa, uk visitor visa consultants, schengen visa uk, canada visa consultants uk, australia visa from uk, new zealand visa consultants, student visa consultants uk, study abroad consultants, work permit consultants, family visit visa uk, spouse visa uk, dependent visa uk, transit visa help, visa documentation help, cover letter for visa, visa invitation letter, visa financial documents, visa sponsorship letter, visa consultation online, visa consultants london, visa consultants birmingham, visa consultants manchester, visa consultants leicester, cheap visa consultants uk, affordable visa services, 24/7 visa support, emergency visa services, last minute visa help, group visa services, family visa services, corporate visa services, business travel visa, conference visa help, medical visa uk, umrah visa, schengen tourist visa, schengen business visa, multiple entry schengen, single entry schengen, short stay visa, long stay visa, biometric appointment help, vfs appointment booking, tls appointment booking, us visa appointment help, canada biometrics help, uk biometrics enrollment, ircc consultants, ukvi consultants, home office visa help, priority visa service uk, super priority visa, settlement visa uk, indefinite leave to remain, ilr consultants, british citizenship help, naturalisation application, permanent residency consultants, pr consultants canada, express entry consultants, skilled worker visa uk, tier 2 visa, tier 4 visa, graduate route visa, post study work visa, start up visa uk, innovator visa uk, investor visa uk, global talent visa, health and care worker visa, seasonal worker visa, youth mobility visa, working holiday visa australia, working holiday visa new zealand, subclass 500 visa, subclass 600 visa, subclass 482 visa, us b2 tourist visa, us f1 student visa, us j1 visa, us h1b visa, esta application help, eta canada help, eta new zealand, electronic travel authorization, evisa services, turkey e visa, india e visa, dubai visa online, saudi visa online, umrah visa online, qatar visa online, japan tourist visa, singapore visa, malaysia visa, thailand visa, morocco visa help, south africa visa consultants, uk visa, uk visa agency, uk visa services, uk visa from uk, how to apply for uk visa, uk visa requirements, uk visa processing time, uk visa fees, uk visa application, uk visa help, uk tourist visa, uk tourist visa consultants, uk visitor visa, uk student visa, uk student visa consultants, uk work visa, uk work visa consultants, uk business visa, uk business visa consultants, uk family visit visa, uk family visit visa consultants, usa visa, usa visa agency, usa visa services, usa visa from uk, how to apply for usa visa, usa visa requirements, usa visa processing time, usa visa fees, usa visa application, usa visa help, usa tourist visa, usa tourist visa consultants, usa visitor visa, usa visitor visa consultants, usa student visa, usa student visa consultants, usa work visa, usa work visa consultants, usa business visa, usa business visa consultants, usa family visit visa, usa family visit visa consultants, canada visa, canada visa consultants, canada visa agency, canada visa services, canada visa from uk, how to apply for canada visa, canada visa requirements, canada visa processing time, canada visa fees, canada visa application, canada visa help, canada tourist visa, canada tourist visa consultants, canada visitor visa, canada visitor visa consultants, canada student visa, canada student visa consultants, canada work visa, canada work visa consultants, canada business visa, canada business visa consultants, canada family visit visa, canada family visit visa consultants, australia visa, australia visa consultants, australia visa agency, australia visa services, how to apply for australia visa, australia visa requirements, australia visa processing time, australia visa fees, australia visa application, australia visa help, australia tourist visa, australia tourist visa consultants, australia visitor visa, australia visitor visa consultants, australia student visa, australia student visa consultants, australia work visa, australia work visa consultants, australia business visa, australia business visa consultants, australia family visit visa, australia family visit visa consultants, new zealand visa, new zealand visa agency, new zealand visa services, new zealand visa from uk, how to apply for new zealand visa, new zealand visa requirements, new zealand visa processing time, new zealand visa fees, new zealand visa application, new zealand visa help, new zealand tourist visa, new zealand tourist visa consultants, new zealand visitor visa, new zealand visitor visa consultants, new zealand student visa, new zealand student visa consultants, new zealand work visa, new zealand work visa consultants, new zealand business visa, new zealand business visa consultants, new zealand family visit visa, new zealand family visit visa consultants, ireland visa, ireland visa consultants, ireland visa agency, ireland visa services, ireland visa from uk, how to apply for ireland visa, ireland visa requirements, ireland visa processing time, ireland visa fees, ireland visa application, ireland visa help, ireland tourist visa, ireland tourist visa consultants, ireland visitor visa, ireland visitor visa consultants, ireland student visa, ireland student visa consultants, ireland work visa, ireland work visa consultants, ireland business visa, ireland business visa consultants, ireland family visit visa, ireland family visit visa consultants, germany visa, germany visa consultants, germany visa agency, germany visa services, germany visa from uk, how to apply for germany visa, germany visa requirements, germany visa processing time, germany visa fees, germany visa application, germany visa help, germany tourist visa, germany tourist visa consultants, germany visitor visa, germany visitor visa consultants, germany student visa, germany student visa consultants, germany work visa, germany work visa consultants, germany business visa, germany business visa consultants, germany family visit visa, germany family visit visa consultants, france visa, france visa consultants, france visa agency, france visa services, france visa from uk, how to apply for france visa, france visa requirements, france visa processing time, france visa fees, france visa application, france visa help, france tourist visa, france tourist visa consultants, france visitor visa, france visitor visa consultants, france student visa, france student visa consultants, france work visa, france work visa consultants, france business visa, france business visa consultants, france family visit visa, france family visit visa consultants, netherlands visa, netherlands visa consultants, netherlands visa agency, netherlands visa services, netherlands visa from uk, how to apply for netherlands visa, netherlands visa requirements, netherlands visa processing time, netherlands visa fees, netherlands visa application, netherlands visa help, netherlands tourist visa, netherlands tourist visa consultants, netherlands visitor visa, netherlands visitor visa consultants, netherlands student visa, netherlands student visa consultants, netherlands work visa, netherlands work visa consultants, netherlands business visa, netherlands business visa consultants, netherlands family visit visa, netherlands family visit visa consultants, switzerland visa, switzerland visa consultants, switzerland visa agency, switzerland visa services, switzerland visa from uk, how to apply for switzerland visa, switzerland visa requirements, switzerland visa processing time, switzerland visa fees, switzerland visa application, switzerland visa help, switzerland tourist visa, switzerland tourist visa consultants, switzerland visitor visa, switzerland visitor visa consultants, switzerland student visa, switzerland student visa consultants, switzerland work visa, switzerland work visa consultants, switzerland business visa, switzerland business visa consultants, switzerland family visit visa, switzerland family visit visa consultants, iceland visa, iceland visa consultants, iceland visa agency, iceland visa services, iceland visa from uk, how to apply for iceland visa, iceland visa requirements, iceland visa processing time, iceland visa fees, iceland visa application, iceland visa help, iceland tourist visa, iceland tourist visa consultants, iceland visitor visa, iceland visitor visa consultants, iceland student visa, iceland student visa consultants, iceland work visa, iceland work visa consultants, iceland business visa, iceland business visa consultants, iceland family visit visa, iceland family visit visa consultants, sweden visa, sweden visa consultants, sweden visa agency, sweden visa services, sweden visa from uk, how to apply for sweden visa, sweden visa requirements, sweden visa processing time, sweden visa fees, sweden visa application, sweden visa help, sweden tourist visa, sweden tourist visa consultants, sweden visitor visa, sweden visitor visa consultants, sweden student visa, sweden student visa consultants, sweden work visa, sweden work visa consultants, sweden business visa, sweden business visa consultants, sweden family visit visa, sweden family visit visa consultants, portugal visa, portugal visa consultants, portugal visa agency, portugal visa services, portugal visa from uk, how to apply for portugal visa, portugal visa requirements, portugal visa processing time, portugal visa fees, portugal visa application, portugal visa help, portugal tourist visa, portugal tourist visa consultants, portugal visitor visa, portugal visitor visa consultants, portugal student visa, portugal student visa consultants, portugal work visa, portugal work visa consultants, portugal business visa, portugal business visa consultants, portugal family visit visa, portugal family visit visa consultants, greece visa, greece visa consultants, greece visa agency, greece visa services, greece visa from uk, how to apply for greece visa, greece visa requirements, greece visa processing time, greece visa fees, greece visa application, greece visa help, greece tourist visa, greece tourist visa consultants, greece visitor visa, greece visitor visa consultants, greece student visa, greece student visa consultants, greece work visa, greece work visa consultants, greece business visa, greece business visa consultants, greece family visit visa, greece family visit visa consultants, austria visa, austria visa consultants, austria visa agency, austria visa services, austria visa from uk, how to apply for austria visa, austria visa requirements, austria visa processing time, austria visa fees, austria visa application, austria visa help, austria tourist visa, austria tourist visa consultants, austria visitor visa, austria visitor visa consultants, austria student visa, austria student visa consultants, austria work visa, austria work visa consultants, austria business visa, austria business visa consultants, austria family visit visa, austria family visit visa consultants, italy visa, italy visa consultants, italy visa agency, italy visa services, italy visa from uk, how to apply for italy visa, italy visa requirements, italy visa processing time, italy visa fees, italy visa application, italy visa help, italy tourist visa, italy tourist visa consultants, italy visitor visa, italy visitor visa consultants, italy student visa, italy student visa consultants, italy work visa, italy work visa consultants, italy business visa, italy business visa consultants, italy family visit visa, italy family visit visa consultants, spain visa, spain visa consultants, spain visa agency, spain visa services, spain visa from uk, how to apply for spain visa, spain visa requirements, spain visa processing time, spain visa fees, spain visa application, spain visa help, spain tourist visa, spain tourist visa consultants, spain visitor visa, spain visitor visa consultants, spain student visa, spain student visa consultants, spain work visa, spain work visa consultants, spain business visa, spain business visa consultants, spain family visit visa, spain family visit visa consultants, belgium visa, belgium visa consultants, belgium visa agency, belgium visa services, belgium visa from uk, how to apply for belgium visa, belgium visa requirements, belgium visa processing time, belgium visa fees, belgium visa application, belgium visa help, belgium tourist visa, belgium tourist visa consultants, belgium visitor visa, belgium visitor visa consultants, belgium student visa, belgium student visa consultants, belgium work visa, belgium work visa consultants, belgium business visa, belgium business visa consultants, belgium family visit visa, belgium family visit visa consultants, japan visa, japan visa consultants, japan visa agency, japan visa services, japan visa from uk, how to apply for japan visa, japan visa requirements, japan visa processing time, japan visa fees, japan visa application, japan visa help, japan tourist visa consultants, japan visitor visa, japan visitor visa consultants, japan student visa, japan student visa consultants, japan work visa, japan work visa consultants, japan business visa, japan business visa consultants, japan family visit visa, japan family visit visa consultants, singapore visa consultants, singapore visa agency, singapore visa services, singapore visa from uk, how to apply for singapore visa, singapore visa requirements, singapore visa processing time, singapore visa fees, singapore visa application, singapore visa help, singapore tourist visa, singapore tourist visa consultants, singapore visitor visa, singapore visitor visa consultants, singapore student visa, singapore student visa consultants, singapore work visa, singapore work visa consultants, singapore business visa, singapore business visa consultants, singapore family visit visa, singapore family visit visa consultants, malaysia visa consultants, malaysia visa agency, malaysia visa services, malaysia visa from uk, how to apply for malaysia visa, malaysia visa requirements, malaysia visa processing time, malaysia visa fees, malaysia visa application, malaysia visa help, malaysia tourist visa, malaysia tourist visa consultants, malaysia visitor visa, malaysia visitor visa consultants, malaysia student visa, malaysia student visa consultants, malaysia work visa, malaysia work visa consultants, malaysia business visa, malaysia business visa consultants, malaysia family visit visa, malaysia family visit visa consultants, thailand visa consultants, thailand visa agency, thailand visa services, thailand visa from uk, how to apply for thailand visa, thailand visa requirements, thailand visa processing time, thailand visa fees, thailand visa application, thailand visa help, thailand tourist visa, thailand tourist visa consultants, thailand visitor visa, thailand visitor visa consultants, thailand student visa, thailand student visa consultants, thailand work visa, thailand work visa consultants, thailand business visa, thailand business visa consultants, thailand family visit visa, thailand family visit visa consultants, uae visa, uae visa consultants, uae visa agency, uae visa services, uae visa from uk, how to apply for uae visa, uae visa requirements, uae visa processing time, uae visa fees, uae visa application, uae visa help, uae tourist visa, uae tourist visa consultants, uae visitor visa, uae visitor visa consultants, uae student visa, uae student visa consultants, uae work visa, uae work visa consultants, uae business visa, uae business visa consultants, uae family visit visa, uae family visit visa consultants, turkey visa, turkey visa consultants, turkey visa agency, turkey visa services, turkey visa from uk, how to apply for turkey visa, turkey visa requirements, turkey visa processing time, turkey visa fees, turkey visa application, turkey visa help, turkey tourist visa, turkey tourist visa consultants, turkey visitor visa, turkey visitor visa consultants, turkey student visa, turkey student visa consultants, turkey work visa, turkey work visa consultants, turkey business visa, turkey business visa consultants, turkey family visit visa, turkey family visit visa consultants, south africa visa, south africa visa agency, south africa visa services, south africa visa from uk, how to apply for south africa visa, south africa visa requirements, south africa visa processing time, south africa visa fees, south africa visa application, south africa visa help, south africa tourist visa, south africa tourist visa consultants, south africa visitor visa, south africa visitor visa consultants, south africa student visa, south africa student visa consultants, south africa work visa, south africa work visa consultants, south africa business visa, south africa business visa consultants, south africa family visit visa, south africa family visit visa consultants, morocco visa, morocco visa consultants, morocco visa agency, morocco visa services, morocco visa from uk, how to apply for morocco visa, morocco visa requirements, morocco visa processing time, morocco visa fees, morocco visa application, morocco tourist visa, morocco tourist visa consultants, morocco visitor visa, morocco visitor visa consultants, morocco student visa, morocco student visa consultants, morocco work visa, morocco work visa consultants, morocco business visa, morocco business visa consultants, morocco family visit visa, morocco family visit visa consultants" },
      { property: "og:title", content: "Travel Links Solution | Global Visa Consultants — Schengen, USA, UK, Canada, Australia" },
      { property: "og:description", content: "UK-based visa consultancy serving clients worldwide. Schengen, USA, UK, Canada, Australia, student, work & family visas across 25+ countries." },
      { property: "og:url", content: "https://travellinks.uk/" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/9ce134ea-24e9-425c-8bbd-5164ddff1e37/og-image.jpg" },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "Travel Links Solution — UK Visa Consultancy for Schengen, USA, Canada, Australia" },
      { name: "twitter:title", content: "Travel Links Solution — Global Visa Consultants" },
      { name: "twitter:description", content: "UK-based, serving worldwide. Schengen, USA, UK, Canada, Australia, student, work & family visas across 25+ countries." },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/9ce134ea-24e9-425c-8bbd-5164ddff1e37/og-image.jpg" },
      { name: "twitter:image:alt", content: "Travel Links Solution — UK Visa Consultancy" },
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
          "@type": "ItemList",
          "@id": "https://travellinks.uk/#visa-destinations",
          name: "Visa Destinations Served by Travel Links Solution",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: 22,
          itemListElement: [
            "Germany", "France", "Netherlands", "Switzerland", "Iceland", "Sweden",
            "Portugal", "Greece", "Austria", "Italy", "United States", "Canada",
            "Australia", "New Zealand", "Ireland", "Japan", "South Africa",
            "Turkey", "Singapore", "Malaysia", "Thailand", "Morocco",
          ].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: `${c} Visa Consultancy`,
              serviceType: "Visa Consultancy",
              areaServed: { "@type": "Country", name: c },
              provider: { "@id": "https://travellinks.uk/#organization" },
            },
          })),
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
