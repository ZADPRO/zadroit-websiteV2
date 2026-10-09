import React, { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Briefcase,
  Sliders,
  Maximize2,
  Lightbulb,
  Handshake,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Play,
  Pause,
  TrendingUp,
  Cpu,
  Lock,
  Activity,
} from "lucide-react";

export interface EdgePillar {
  id: string;
  step: string;
  tabLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  metricLabel: string;
  metricValue: string;
  highlights: string[];
  visualType: "business" | "custom" | "scale" | "ai" | "partner" | "security";
}

const edgePillars: EdgePillar[] = [
  {
    id: "business",
    step: "01",
    tabLabel: "Business First",
    title: "Business-First Engineering",
    tagline: "Technology tailored to your balance sheet, not tech hype.",
    description:
      "We begin every initiative by analyzing your core business KPIs, operational bottlenecks, and ROI projections. We only recommend architectural choices that directly drive measurable commercial outcomes.",
    icon: Briefcase,
    tag: "Outcome-Driven",
    metricLabel: "Value Alignment",
    metricValue: "100% KPI-Driven",
    highlights: [
      "Rigorous pre-build technical ROI & unit economics audit",
      "Direct milestone alignment with your revenue targets",
      "Executive reporting dashboards for C-level transparency",
    ],
    visualType: "business",
  },
  {
    id: "custom",
    step: "02",
    tabLabel: "Tailored Solutions",
    title: "Tailored Architecture, Never Templated",
    tagline: "Custom-crafted systems built for your exact operational workflows.",
    description:
      "Cookie-cutter templates create technical debt. We design modular, decoupled software architectures engineered specifically for your proprietary data models, existing ERPs, and compliance requirements.",
    icon: Sliders,
    tag: "Zero Lock-In",
    metricLabel: "Custom Fit",
    metricValue: "0% Rigid Templates",
    highlights: [
      "Custom domain-driven data models & API gateways",
      "Seamless integration with legacy ERP (SAP, Oracle, Zoho)",
      "Full IP & source code ownership handed over to you",
    ],
    visualType: "custom",
  },
  {
    id: "scale",
    step: "03",
    tabLabel: "Scalable by Design",
    title: "Resilient & Scalable by Design",
    tagline: "Cloud-native infrastructure built to handle 100x traffic surges.",
    description:
      "We engineer enterprise software on distributed, auto-scaling cloud foundations with microservices, Redis caching, and automated failover protocols that effortlessly scale with your customer base.",
    icon: Maximize2,
    tag: "High Resilience",
    metricLabel: "Availability SLA",
    metricValue: "99.95% Guaranteed",
    highlights: [
      "Multi-region auto-scaling Kubernetes & serverless clusters",
      "Sub-100ms API response latency under peak concurrency",
      "Automated zero-downtime blue/green CI/CD deployment",
    ],
    visualType: "scale",
  },
  {
    id: "ai",
    step: "04",
    tabLabel: "Practical AI",
    title: "Practical, Production-Grade AI",
    tagline: "AI that automates workflows and drives real productivity gains.",
    description:
      "We cut through AI hype by deploying pragmatic Retrieval-Augmented Generation (RAG) agents, predictive forecasting models, and automated OCR pipelines directly into your operational workflows.",
    icon: Lightbulb,
    tag: "Tangible ROI",
    metricLabel: "Time to Value",
    metricValue: "3x Faster ROI",
    highlights: [
      "Custom RAG search agents on your private enterprise data",
      "Automated document processing & intelligent classification",
      "Strict data privacy with on-prem or isolated cloud LLMs",
    ],
    visualType: "ai",
  },
  {
    id: "partner",
    step: "05",
    tabLabel: "Long-Term Partner",
    title: "A Dedicated Long-Term Partner",
    tagline: "Continuous innovation and proactive care long after launch.",
    description:
      "Launching is just day one. Our veteran engineering squads remain integrated with your team to deliver continuous telemetry monitoring, monthly feature sprints, and proactive security hardening.",
    icon: Handshake,
    tag: "Continuous Care",
    metricLabel: "Support Response",
    metricValue: "< 15 Min SLA",
    highlights: [
      "24/7 proactive telemetry monitoring & automated alerts",
      "Dedicated senior squads integrated with your roadmaps",
      "Quarterly architectural reviews and modernization sprints",
    ],
    visualType: "partner",
  },
  {
    id: "security",
    step: "06",
    tabLabel: "Enterprise Security",
    title: "Bank-Grade Enterprise Security",
    tagline: "Zero-trust protocols, compliance readiness, and data encryption.",
    description:
      "Security is engineered into every layer of our stack. From AES-256 encryption in transit and at rest to role-based access control (RBAC) and automated vulnerability scanning, your data stays inviolable.",
    icon: ShieldCheck,
    tag: "Zero Breach",
    metricLabel: "Security Rating",
    metricValue: "SOC 2 & ISO Ready",
    highlights: [
      "End-to-end AES-256 data encryption & HSM key management",
      "Automated SAST/DAST static code security pipelines",
      "Granular RBAC, audit logging, and SSO/MFA integration",
    ],
    visualType: "security",
  },
];

interface ZadroitEdgeCarouselProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ZadroitEdgeCarousel: React.FC<ZadroitEdgeCarouselProps> = ({
  badgeText = "The ZAdroit Edge",
  title = "What Makes ZAdroit Different",
  subtitle = "We focus on outcomes over buzzwords, building systems engineered for real-world reliability, enterprise security, and sustainable scale.",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const slideDuration = 6000; // 6 seconds per slide

  const activeItem = edgePillars[activeIndex];
  const IconComponent = activeItem.icon;

  // Auto-slide with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const increment = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % edgePillars.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeIndex, slideDuration]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % edgePillars.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + edgePillars.length) % edgePillars.length);
  };

  // Render dynamic interactive visual for the right column
  const renderInteractiveVisual = (pillar: EdgePillar) => {
    switch (pillar.visualType) {
      case "business":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ded725]/30 text-[#13273B] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5 text-[#13273B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Capital Efficiency</div>
                  <div className="text-[11px] text-slate-500">Capex vs. Opex optimization</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                +42% Gain
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#32679a]/15 text-[#32679a] flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5 text-[#32679a]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sprint Delivery Rate</div>
                  <div className="text-[11px] text-slate-500">Predictable 2-week agile cycles</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#32679a] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                98.4% On-Time
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#13273B] text-white shadow-md">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">Business ROI Milestone</span>
                <span className="text-[#ded725] font-mono font-bold">Phase 1 Complete</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-[#ded725] h-full rounded-full transition-all duration-1000 w-[85%]" />
              </div>
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                <span>Architecture Config</span>
                <span className="text-[#ded725] font-bold">CUSTOM_MODULES</span>
              </div>
              <div className="text-emerald-400 text-[11px] leading-relaxed">
                ✓ Core ERP Gateway: <span className="text-slate-300">Connected</span>
              </div>
              <div className="text-emerald-400 text-[11px] leading-relaxed">
                ✓ Domain Data Pipeline: <span className="text-slate-300">Proprietary</span>
              </div>
              <div className="text-emerald-400 text-[11px] leading-relaxed">
                ✓ Source Code Ownership: <span className="text-[#ded725]">100% Client IP</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Modules</div>
                <div className="text-sm font-black text-slate-900 font-heading">Decoupled</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Lock-in</div>
                <div className="text-sm font-black text-emerald-600 font-heading">Zero</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase">APIs</div>
                <div className="text-sm font-black text-[#32679a] font-heading">Rest/gRPC</div>
              </div>
            </div>
          </div>
        );

      case "scale":
        return (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  Cluster Status: Healthy
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500">Auto-Scaling Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold">API Latency</div>
                  <div className="font-mono font-bold text-slate-900 text-sm">38 ms</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold">Load Capacity</div>
                  <div className="font-mono font-bold text-emerald-600 text-sm">100k req/s</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#32679a] text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-[#ded725]" />
                <span className="font-bold">Multi-Cloud Orchestration</span>
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                99.95% SLA
              </span>
            </div>
          </div>
        );

      case "ai":
        return (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-[#ded725]">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Model Execution
                </span>
                <span className="text-emerald-400">READY</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Target: <span className="text-white font-bold">Proprietary RAG Vector Engine</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Accuracy: <span className="text-emerald-400 font-bold">99.4% F1-Score</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Latency: <span className="text-[#ded725] font-bold">140ms Token Generation</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F3F1B1] border border-[#EDE985] text-[#13273B] text-xs font-bold flex items-center justify-between">
              <span>Enterprise Data Isolation</span>
              <span className="bg-[#13273B] text-white px-2 py-0.5 rounded text-[10px] font-mono">
                Zero Public Leakage
              </span>
            </div>
          </div>
        );

      case "partner":
        return (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">Proactive SLA Monitoring</span>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active 24/7
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center justify-between">
                  <span>Incident Response Time</span>
                  <span className="font-mono font-bold text-slate-900">&lt; 15 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dedicated Senior Leads</span>
                  <span className="font-mono font-bold text-slate-900">Always Included</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#13273B] text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ded725]" />
                <span className="font-bold">Quarterly Roadmap Review</span>
              </div>
              <span className="text-[#ded725] font-mono font-bold">Continuous</span>
            </div>
          </div>
        );

      case "security":
      default:
        return (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#32679a]" />
                  Zero-Trust Architecture
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  AES-256
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Compliance</div>
                  <div className="font-bold text-slate-900">SOC 2 / ISO</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Access Control</div>
                  <div className="font-bold text-emerald-600">Granular RBAC</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#32679a] text-white flex items-center justify-between text-xs">
              <span className="font-bold">Automated SAST/DAST Audits</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                100% Passes
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      className={`py-14 sm:py-20 bg-slate-50/70 rounded-3xl border border-slate-200/80 my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}
    >
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ded725]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#32679a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ================= SECTION HEADER ================= */}
      <ScrollReveal variant="fade-up">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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

      {/* ================= INTERACTIVE TAB RAIL ================= */}
      <ScrollReveal variant="fade-up" delay={80}>
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 pt-1 mb-8 no-scrollbar select-none">
          {edgePillars.map((pillar, index) => {
            const isActive = activeIndex === index;
            const TabIcon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => goToSlide(index)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#13273B] text-white shadow-md shadow-slate-900/20 scale-102"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black ${
                    isActive
                      ? "bg-[#ded725] text-[#13273B]"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {pillar.step}
                </div>
                <TabIcon className="w-3.5 h-3.5 opacity-80" />
                <span>{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ================= MAIN FEATURE SHOWCASE STAGE ================= */}
      <ScrollReveal variant="fade-up" delay={120}>
        <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Top Active Progress Bar */}
          <div className="w-full bg-slate-100 h-1 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#32679a] to-[#ded725] h-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Card Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
            {/* Left Column: Rich Copy, Step, Highlights */}
            <div className="lg:col-span-7 space-y-5">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ded725]/20 text-[#13273B] border border-[#ded725]/50 text-xs font-bold">
                  <IconComponent className="w-4 h-4 text-[#13273B]" />
                  <span>{activeItem.tag}</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-slate-200 font-heading">
                  {activeItem.step} / 06
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#090D16] font-heading tracking-tight leading-tight">
                  {activeItem.title}
                </h3>
                <p className="text-sm font-semibold text-[#32679a] mt-1">
                  {activeItem.tagline}
                </p>
              </div>

              {/* Core Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activeItem.description}
              </p>

              {/* Key Bullet Highlights */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                {activeItem.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#32679a] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Metric Tag */}
              <div className="pt-3 flex items-center gap-4">
                <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#ded725]" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">
                      {activeItem.metricLabel}
                    </span>
                    <span className="text-sm font-black text-[#13273B] font-mono">
                      {activeItem.metricValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Widget Display Box */}
            <div className="lg:col-span-5 bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-inner relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              {/* Background ambient glow inside widget */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ded725]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#32679a]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {renderInteractiveVisual(activeItem)}
              </div>
            </div>
          </div>

          {/* Bottom Toolbar & Carousel Controls */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {edgePillars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-[#32679a]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause + Navigation Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                title={isPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#13273B] hover:text-white hover:border-[#13273B] shadow-2xs transition-all cursor-pointer group"
                aria-label="Previous pillar"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#13273B] hover:text-white hover:border-[#13273B] shadow-2xs transition-all cursor-pointer group"
                aria-label="Next pillar"
              >
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
