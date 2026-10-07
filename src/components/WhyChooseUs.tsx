import React from "react";
import {
  Cpu,
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const WhyChooseUs: React.FC = () => {
  const { openModal, navigate } = useApp();

  const reasons = [
    {
      id: "engineering",
      title: "Full-Cycle Engineering",
      description:
        "From discovery and cloud architecture to production deployment and automated scaling with zero tech debt.",
      icon: Cpu,
      highlight: "End-to-End Delivery",
      action: "explore",
    },
    {
      id: "roi",
      title: "Measurable Business ROI",
      description:
        "Accelerate time-to-market by 3x with continuous delivery pipelines and performance-tuned software architectures.",
      icon: TrendingUp,
      highlight: "3x Faster Sprints",
      action: "metrics",
    },
    {
      id: "squads",
      title: "Dedicated Senior Squads",
      description:
        "Top 1% veteran engineers, tech leads, and AI architects integrated directly into your workflow and KPIs.",
      icon: Users,
      highlight: "Elite Engineering Talent",
      action: "team",
    },
    {
      id: "security",
      title: "Enterprise Security & 99.9% SLA",
      description:
        "Bank-grade encryption, ISO-ready compliance protocols, and guaranteed round-the-clock uptime commitments.",
      icon: ShieldCheck,
      highlight: "Mission-Critical SLA",
      action: "security",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background ambient dot patterns */}
      <div className="absolute top-12 left-6 w-36 h-36 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-8 w-44 h-44 bg-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Dual-Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs mb-3 transition-transform hover:scale-105 duration-300">
            {/* Logo shape */}
            <div className="flex items-center gap-0 shrink-0">
              {/* Complete circle */}
              <div className="w-5 h-5 rounded-full bg-lime-400" />

              {/* First half circle */}
              <div className="w-2.5 h-5 bg-green-950 rounded-r-full" />

              {/* Second half circle */}
              <div className="w-2.5 h-5 bg-green-950 rounded-r-full" />
            </div>

            {/* Text */}
            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Why Choose Us
            </span>
          </div>

          {/* Main Display Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] tracking-tight leading-[1.14] font-heading">
            Why Our Clients Believe
            <span className="block text-[#133A27] mt-1">We’re Different</span>
          </h2>
        </div>

        {/* ================= MAIN 2-COLUMN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ================= LEFT COLUMN: 3-PIECE COLLAGE + ANIMATED GRAPHIC ================= */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] h-[480px] sm:h-[520px] flex gap-3.5 sm:gap-4 select-none">
              {/* Floating Starburst 1 (Large - bottom-left) */}
              <div className="absolute -bottom-3 -left-3 sm:-left-5 z-20 pointer-events-none animate-float-gentle text-[#ded725] drop-shadow-md">
                <svg
                  viewBox="0 0 100 100"
                  className="w-12 h-12 sm:w-14 sm:h-14 fill-current drop-shadow-[0_4px_12px_rgba(222,215,37,0.45)]"
                >
                  <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                </svg>
              </div>

              {/* Floating Starburst 2 (Small - upper left) */}
              <div className="absolute bottom-16 -left-5 sm:-left-7 z-20 pointer-events-none animate-pulse-glow text-[#ded725]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-[0_2px_8px_rgba(222,215,37,0.35)]"
                >
                  <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                </svg>
              </div>

              {/* Left Tall Image Column (Rounded Vertical Rectangle) */}
              <div className="w-1/2 h-full rounded-[30px] sm:rounded-[36px] overflow-hidden bg-slate-900 shadow-md border border-slate-200/60 relative group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Zadroit collaborative engineering team at work"
                  className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.96] transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-100 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#ded725]" />
                    Collaborative Squads
                  </span>
                </div>
              </div>

              {/* Right Column (Top Image + Bottom Animated Arch Shape) */}
              <div className="w-1/2 h-full flex flex-col justify-between gap-3.5 sm:gap-4">
                {/* Top Image: Team Meeting around Laptop */}
                <div className="w-full h-[58%] rounded-[26px] sm:rounded-[30px] overflow-hidden bg-slate-900 shadow-md border border-slate-200/60 relative group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                    alt="Zadroit tech team in strategic discussion"
                    className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.96] transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-100 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
                    <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#ded725]" />
                      Agile Innovation
                    </span>
                  </div>
                </div>

                {/* Bottom Shape: Vibrant Chartreuse Arch with Smooth Kinetic Serpentine Track */}
                <div className="w-full h-[40%] bg-[#c6f137] rounded-t-[70px] sm:rounded-t-[80px] rounded-b-[24px] sm:rounded-b-[28px] overflow-hidden relative shadow-md border border-[#c8c01c]/60 flex items-center justify-center p-2 group">
                  {/* Kinetic Snake Track SVG with 60fps Smooth Moving Beads */}
                  <svg
                    viewBox="0 0 160 210"
                    className="w-full h-full max-h-[160px] select-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* The Serpentine Track Line */}
                    <path
                      d="M 80 16 
                         C 32 16, 32 49, 80 49 
                         C 128 49, 128 82, 80 82 
                         C 32 82, 32 115, 80 115 
                         C 128 115, 128 148, 80 148 
                         C 32 148, 32 181, 80 181 
                         C 128 181, 128 200, 80 200"
                      stroke="#133A27"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Animated Rolling Ball 1 */}
                    <circle r="6.5" fill="#133A27">
                      <animateMotion
                        path="M 80 16 C 32 16, 32 49, 80 49 C 128 49, 128 82, 80 82 C 32 82, 32 115, 80 115 C 128 115, 128 148, 80 148 C 32 148, 32 181, 80 181 C 128 181, 128 200, 80 200"
                        dur="3.8s"
                        repeatCount="indefinite"
                        keyPoints="0;1;0"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                      />
                    </circle>

                    {/* Animated Rolling Ball 2 (Offset phase for dual bouncing movement) */}
                    <circle r="6.5" fill="#133A27">
                      <animateMotion
                        path="M 80 16 C 32 16, 32 49, 80 49 C 128 49, 128 82, 80 82 C 32 82, 32 115, 80 115 C 128 115, 128 148, 80 148 C 32 148, 32 181, 80 181 C 128 181, 128 200, 80 200"
                        dur="3.8s"
                        begin="-1.9s"
                        repeatCount="indefinite"
                        keyPoints="0;1;0"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                      />
                    </circle>
                  </svg>

                  {/* Subtle top indicator */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#133A27]/20" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: 2x2 CHARTREUSE FEATURE CARD ================= */}
          <div className="lg:col-span-7 flex">
            <div className="w-full bg-[#ded725] rounded-[32px] sm:rounded-[44px] shadow-xl border border-[#c8c01c]/60 p-2 flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background glow highlight */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              {/* 2x2 Feature Quadrants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#133A27]/15 rounded-2xl sm:rounded-3xl overflow-hidden  shadow-inner">
                {reasons.map((item, _index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.action === "explore") {
                          navigate("services");
                        } else if (item.action === "team") {
                          navigate("about");
                        } else {
                          openModal({ type: "quote-modal" });
                        }
                      }}
                      className="bg-[#ded725] p-3 flex flex-col justify-between cursor-pointer group hover:bg-[#d6cf1e] transition-all duration-300 relative"
                    >
                      <div>
                        {/* Blue Circular Icon Badge matching template */}
                        <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#32679a] text-white flex items-center justify-center shadow-md mb-4 sm:mb-5 group-hover:scale-110 group-hover:bg-[#255280] group-hover:shadow-lg transition-all duration-300">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-black text-[#090D16] tracking-tight font-heading group-hover:text-[#133A27] transition-colors flex items-center justify-between">
                          <span>{item.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#133A27] opacity-0 group-hover:opacity-100 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0 ml-1" />
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#18291e] font-medium leading-relaxed mt-2 sm:mt-2.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Micro-Badge */}
                      {/* <div className="mt-4 pt-3 border-t border-[#133A27]/15 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#133A27] bg-[#133A27]/10 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#133A27]" />
                          {item.highlight}
                        </span>

                        <span className="text-[11px] font-extrabold text-[#133A27] uppercase tracking-wider font-mono">
                          0{index + 1}
                        </span>
                      </div> */}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Call to Action Bar inside Card */}
              <div className="mt-2 pt-3 px-6 border-t border-[#133A27]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#133A27]">
                  <span className="w-2 h-2 rounded-full bg-[#133A27] animate-ping" />
                  <span>Ready to accelerate your engineering roadmap?</span>
                </div>

                <button
                  onClick={() => openModal({ type: "quote-modal" })}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white text-xs sm:text-sm font-bold shadow-sm inline-flex items-center justify-center gap-2 transition-all hover:shadow-md cursor-pointer"
                >
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ded725]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
