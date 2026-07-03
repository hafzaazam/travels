import { useEffect, useRef, useState } from "react";
import { Clock, FileCheck2, Globe2, Users } from "lucide-react";

type Item = {
  value: number;
  suffix: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  chart: "bar" | "bars" | "dots" | "pulse";
};

const ITEMS: Item[] = [
  { value: 10, suffix: "+", label: "Years Experience", Icon: Clock, chart: "bar" },
  { value: 12000, suffix: "+", label: "Successful Applications", Icon: FileCheck2, chart: "bars" },
  { value: 25, suffix: "+", label: "Destination Countries", Icon: Globe2, chart: "dots" },
  { value: 98, suffix: "%", label: "Client Satisfaction", Icon: Users, chart: "pulse" },
];

function formatValue(n: number, target: number) {
  if (target >= 1000) {
    return `${(n / 1000).toFixed(n >= 1000 ? 0 : 1)}K`;
  }
  return n.toLocaleString();
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    setN(0);
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.floor(eased * to));
          if (p < 1) requestAnimationFrame(tick);
          else setN(to);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{formatValue(n, to)}{suffix}</span>;
}

function MicroChart({ kind }: { kind: Item["chart"] }) {
  if (kind === "bar") {
    return (
      <div className="mt-4 w-20 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full w-full rounded-full bg-gradient-brand" />
      </div>
    );
  }
  if (kind === "bars") {
    const heights = ["h-2", "h-3", "h-4", "h-3", "h-4"];
    return (
      <div className="mt-4 flex items-end gap-1 h-4">
        {heights.map((h, i) => (
          <div
            key={i}
            className={`w-1 ${h} rounded-full bg-primary/40`}
            style={{ opacity: 0.5 + i * 0.1 }}
          />
        ))}
      </div>
    );
  }
  if (kind === "dots") {
    return (
      <div className="mt-4 flex -space-x-2">
        <div className="w-6 h-6 rounded-full border-2 border-white bg-muted" />
        <div className="w-6 h-6 rounded-full border-2 border-white bg-primary/30" />
        <div className="w-6 h-6 rounded-full border-2 border-white bg-primary/70" />
      </div>
    );
  }
  return (
    <div className="mt-4 flex gap-1">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative -mt-10 sm:-mt-16 z-10 px-3 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-brand opacity-15 blur-2xl transition duration-1000 group-hover:opacity-25 group-hover:duration-200" />

          <div className="relative grid grid-cols-2 md:flex md:flex-row items-stretch md:items-center justify-between glass rounded-2xl sm:rounded-3xl lg:rounded-[2rem] px-3 py-4 sm:px-6 sm:py-6 md:px-6 md:py-6 lg:px-8 lg:py-10 gap-2 sm:gap-4 md:gap-2 lg:gap-4 overflow-hidden shadow-glow">
            {ITEMS.map((it, idx) => (
              <div key={it.label} className="contents md:flex md:flex-1 md:items-center">
                <div className="flex-1 flex flex-col items-center text-center px-1 sm:px-2 lg:px-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
                  <div className="mb-2 sm:mb-3 lg:mb-4 p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-primary/10 text-primary">
                    <it.Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="font-display text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-gradient-brand">
                    <Counter to={it.value} suffix={it.suffix} />
                  </div>
                  <p className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-muted-foreground uppercase tracking-wider lg:tracking-widest mt-0.5 sm:mt-1 leading-tight">
                    {it.label}
                  </p>
                  <div className="hidden lg:block"><MicroChart kind={it.chart} /></div>
                </div>
                {idx < ITEMS.length - 1 && (
                  <div className="hidden md:block w-px h-10 lg:h-16 bg-gradient-to-b from-transparent via-border to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
