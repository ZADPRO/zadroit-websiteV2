import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Briefcase,
  Sliders,
  Maximize2,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface EdgePillar {
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  metric: string;
  bullet: string;
}

const edgePillars: EdgePillar[] = [
  {
    title: "Business first",
    description:
      "We recommend technology because it fits your strategic business goals, not simply because it is new.",
    icon: Briefcase,
    tag: "Outcome-Driven",
    metric: "100% Value-Aligned",
    bullet: "Pre-build technical ROI & unit economics audit",
  },
  {
    title: "Tailored, not templated",
    description:
      "Custom-architected digital solutions engineered around how your unique business operates and scales.",
    icon: Sliders,
    tag: "Custom Solutions",
    metric: "Zero Cookie-Cutter",
    bullet: "Custom data models & legacy ERP integration",
  },
  {
    title: "Scalable by design",
    description:
      "Cloud-native, distributed architecture engineered to handle high concurrency and seamless organizational growth.",
    icon: Maximize2,
    tag: "High Resilience",
    metric: "99.95% Uptime SLA",
    bullet: "Auto-scaling microservices & cloud redundancy",
  },
  {
    title: "Practical innovation",
    description:
      "Pragmatic AI, machine learning, and automation deployed where they create tangible, measurable ROI.",
    icon: Lightbulb,
    tag: "Tangible ROI",
    metric: "3x Faster ROI",
    bullet: "Enterprise RAG & automated workflow pipelines",
  },
  {
    title: "A long-term partner",
    description:
      "We provide continuous proactive care, performance tuning, and agile enhancements long after initial launch.",
    icon: Handshake,
    tag: "Continuous Care",
    metric: "24/7 Support SLA",
    bullet: "Dedicated squads & proactive telemetry health",
  },
  {
    title: "Enterprise security",
    description:
      "Bank-grade data encryption, zero-trust protocols, and rigorous ISO/SOC-ready compliance standards built-in.",
    icon: ShieldCheck,
    tag: "Enterprise Security",
    metric: "Zero Breach SLA",
    bullet: "End-to-end AES-256 encryption & RBAC audits",
  },
];

interface ZadroitEdgeProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  items?: EdgePillar[];
  className?: string;
}

export const ZadroitEdge: React.FC<ZadroitEdgeProps> = ({
  badgeText = "The ZAdroit Edge",
  title = "What Makes ZAdroit Different",
  subtitle = "We focus on outcomes over buzzwords, building systems engineered for real-world reliability, enterprise security, and sustainable scale.",
  items = edgePillars,
  className = "",
}) => {
  return (
    <section
      className={`py-16 sm:py-20 bg-slate-50/70 rounded-3xl border border-slate-200/80 my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
    >
      {/* ================= DECORATIVE PATTERNS ================= */}
      {/* Gray Dot Matrix Patterns */}
      <div className="absolute top-6 left-8 w-44 h-36 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute bottom-6 right-8 w-48 h-36 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-12 w-32 h-32 bg-dots opacity-30 pointer-events-none" />

      {/* ================= SECTION HEADER ================= */}
      <ScrollReveal variant="fade-up">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-3 shadow-2xs">
              <div className="flex items-center gap-0">
                <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              </div>
              {badgeText}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] font-heading tracking-tight leading-[1.14]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </ScrollReveal>

      {/* ================= 6-CARD GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch relative z-10">
        {items.map((diff, idx) => {
          const DiffIcon = diff.icon;
          return (
            <ScrollReveal
              key={diff.title}
              variant="fade-up"
              delay={idx * 80}
              className="h-full"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:border-[#32679a]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 group flex flex-col justify-between h-full relative overflow-hidden">
                {/* Top Section: Icon, Tag, Title, Description */}
                <div>
                  {/* Top Row: Icon + Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#ded725]/25 border border-[#ded725]/50 flex items-center justify-center text-[#13273B] group-hover:bg-[#32679a] group-hover:text-white group-hover:border-[#32679a] transition-all duration-300 shrink-0">
                      <DiffIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-[#32679a]/10 group-hover:text-[#32679a] group-hover:border-[#32679a]/20 transition-colors">
                      {diff.tag}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-black text-slate-900 font-heading mb-2.5 group-hover:text-[#32679a] transition-colors">
                    {diff.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {diff.description}
                  </p>

                  {/* Key Feature Bullet */}
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium py-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#32679a] shrink-0" />
                    <span className="line-clamp-1">{diff.bullet}</span>
                  </div>
                </div>

                {/* Bottom Metric Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ded725]" />
                    Impact
                  </span>
                  <span className="font-bold text-[#13273B] font-mono group-hover:text-[#32679a] transition-colors">
                    {diff.metric}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

// Also export as ZadroitEdgeCarousel for backward compatibility
export const ZadroitEdgeCarousel = ZadroitEdge;
