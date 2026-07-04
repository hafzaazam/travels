import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

import { SectionHeading } from "./Section";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    text: "Tell us your goal and we'll outline your options.",
  },
  {
    icon: ClipboardList,
    title: "Profile Evaluation",
    text: "We assess your eligibility and best pathway.",
  },
  {
    icon: FileText,
    title: "Document Preparation",
    text: "Forms, letters and certified copies — all handled.",
  },
  { icon: Send, title: "Application Submission", text: "Filed correctly the first time." },
  { icon: Loader2, title: "Visa Processing", text: "We track your case and respond to queries." },
  {
    icon: CheckCircle2,
    title: "Visa Approval",
    text: "Receive your visa and travel with confidence.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative text-center outline-none"
    >
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white border-2 border-border relative z-10 shadow-soft">
        <Icon className="h-7 w-7 text-muted-foreground" />
        <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-white text-xs font-bold shadow-glow">
          {index + 1}
        </span>
      </div>

      <h3 className="mt-4 font-display text-base font-semibold text-foreground">
        {step.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
    </motion.div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative">
      <div className="relative flex flex-col justify-center px-5 lg:px-8 bg-gradient-soft overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--foreground)/0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl w-full">
          <SectionHeading
            eyebrow="Our Process"
            title={
              <>
                Six simple steps to your <span className="text-gradient-brand">approved visa</span>
              </>
            }
          />
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-10 hidden lg:block h-0.5 bg-border" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:hidden">
            {STEPS.map((s, i) => (
              <StepCard key={s.title} step={s} index={i} />
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <StepCard key={s.title} step={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
