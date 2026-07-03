import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Globe2,
  GitCompare,
  CalendarCheck,
  BookOpen,
  MessageCircle,
  Info,
} from "lucide-react";

type Item = {
  to: string;
  label: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const ALL: Record<string, Item> = {
  services: { to: "/services", label: "Visa Services", desc: "Tourist, family, business & student visa packages.", Icon: Briefcase },
  countries: { to: "/countries", label: "Destination Countries", desc: "Explore visa pathways to 25+ countries.", Icon: Globe2 },
  compare: { to: "/compare", label: "Compare Visas", desc: "Compare requirements side-by-side.", Icon: GitCompare },
  book: { to: "/book", label: "Book a Consultation", desc: "Schedule a 1-to-1 with a senior consultant.", Icon: CalendarCheck },
  blog: { to: "/blog", label: "Visa Insights Blog", desc: "Guides, updates & policy changes.", Icon: BookOpen },
  contact: { to: "/contact", label: "Contact Us", desc: "Talk to our Northampton team.", Icon: MessageCircle },
  about: { to: "/about", label: "About Travel Links", desc: "Our story, expertise & success rate.", Icon: Info },
};

export function RelatedLinks({
  keys,
  title = "Explore more",
  subtitle,
}: {
  keys: (keyof typeof ALL)[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 px-5 lg:px-8 bg-gradient-soft">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((k) => {
            const it = ALL[k];
            if (!it) return null;
            return (
              <Link
                key={k}
                to={it.to}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <it.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-semibold group-hover:text-primary">{it.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
