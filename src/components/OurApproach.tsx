import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export interface ApproachStep {
  step: string; // e.g. "01"
  title: string;
  description: string;
}

interface OurApproachProps {
  titleLine1?: string;
  titleLine2?: string;
  badgeText?: string;
  description?: string;
  steps?: ApproachStep[];
  className?: string;
}

export const OurApproach: React.FC<OurApproachProps> = ({
  titleLine1 = "Step-by-Step to",
  titleLine2 = "Your Growth",
  badgeText = "Our Approach",
  description = "We combine strategic discovery, precision execution, and continuous optimization to transform your vision into high-performing, scalable digital realities.",
  steps = [
    {
      step: "01",
      title: "Discover & Strategize",
      description:
        "We deeply analyze your business goals, target audience, and technology landscape to construct a tailored roadmap for sustainable growth.",
    },
    {
      step: "02",
      title: "Execute & Optimize",
      description:
        "Our engineering squads build with high-velocity agile sprints, continuous testing, and real-time feedback loops for maximum efficiency.",
    },
    {
      step: "03",
      title: "Analyze & Grow",
      description:
        "We deploy scalable cloud infrastructure, monitor performance metrics, and iteratively enhance systems to accelerate your long-term success.",
    },
  ],
  className = "",
}) => {
  return (
    <section
      className={`py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative ${className}`}
    >
      {/* ================= SECTION HEADER ================= */}
      <ScrollReveal variant="fade-up">
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16 flex flex-col items-center">
          {/* Centered Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-3">
              <div className="flex items-center gap-0">
                <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              </div>
              {badgeText}
            </div>
          )}

          {/* Centered Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] font-heading tracking-tight leading-[1.14]">
            <span>{titleLine1}</span>
            {titleLine2 && (

              <span>{titleLine2}</span>

            )}
          </h2>

          {/* Centered Paragraph Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl sm:max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </ScrollReveal>

      {/* Ambient background blue glow/smudge */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#32679a]/10 rounded-full blur-3xl pointer-events-none -z-10" /> */}

      {/* ================= 3-STEP CARDS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-10">
        {steps.map((item, idx) => (
          <ScrollReveal
            key={item.step}
            variant="fade-up"
            delay={idx * 120}
            className="h-full"
          >
            <div className="relative bg-white/95 rounded-[28px] sm:rounded-[32px] overflow-hidden border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(50,103,154,0.16)] hover:border-[#d3cc11]/50 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between h-full group">
              {/* Blue Smudge Effects inside the Card */}
              {/* <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#d3cc11]/30 rounded-full blur-2xl pointer-events-none group-hover:scale-130 group-hover:bg-[#32679a]/45 transition-all duration-700 ease-out" /> */}
              {/* <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#5F88B0]/20 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-all duration-700 ease-out" /> */}
              {/* <div className="absolute inset-0 bg-gradient-to-b from-[#ded725] via-transparent to-[#ded725]/10 pointer-events-none" /> */}

              {/* Card Content */}
              <div className="p-6 sm:p-7 relative z-10 flex-1 flex flex-col justify-start">
                {/* Top Row: Title + Step Number */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#090D16] font-heading tracking-tight group-hover:text-[#32679a] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-200/90 group-hover:text-[#ded725]/80 font-heading leading-none shrink-0 select-none pointer-events-none transition-colors duration-300">
                    {item.step}
                  </span>
                </div>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
