import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { servicesData } from "../data/websiteData";
import {
  ArrowRight,
  Sparkles,
  Calculator,
  Users,
  ChevronDown,
} from "lucide-react";
import type { Service } from "../types";

export const ServicesPage: React.FC = () => {
  const { openModal } = useApp();
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [showEstimator, setShowEstimator] = useState<boolean>(false);

  // Estimator State
  const [estimatorService, setEstimatorService] = useState(
    "enterprise-software",
  );
  const [estimatorScope, setEstimatorScope] = useState<
    "mvp" | "standard" | "enterprise"
  >("standard");
  const [needAiAddon, setNeedAiAddon] = useState(false);
  const [needDevOpsAddon, setNeedDevOpsAddon] = useState(true);

  // Take the primary 9 services matching the screenshot or all available
  const displayServices = servicesData.slice(0, visibleCount);
  const hasMore = visibleCount < servicesData.length;

  const handleLoadMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + 6, servicesData.length));
    } else {
      setShowEstimator(true);
      const estimatorEl = document.getElementById("cost-estimator");
      if (estimatorEl) {
        estimatorEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Dynamic cost & timeline calculation
  const calculateEstimate = () => {
    let base = 3500;
    let weeks = "4 - 6 Weeks";

    if (estimatorService === "enterprise-software") base = 4800;
    if (estimatorService === "ai-data-intelligence") base = 5200;
    if (estimatorService === "cloud-devops") base = 3400;
    if (estimatorService === "web-mobile-apps") base = 4000;
    if (estimatorService === "cybersecurity-audit") base = 2800;

    let multiplier = 1;
    if (estimatorScope === "mvp") {
      multiplier = 0.8;
      weeks = "3 - 5 Weeks";
    } else if (estimatorScope === "standard") {
      multiplier = 1.2;
      weeks = "6 - 10 Weeks";
    } else if (estimatorScope === "enterprise") {
      multiplier = 2.4;
      weeks = "12 - 20 Weeks";
    }

    let addonCost = 0;
    if (needAiAddon) addonCost += 1800;
    if (needDevOpsAddon) addonCost += 1200;

    const totalEstimate = Math.round(base * multiplier + addonCost);
    return {
      priceFormatted: `$${totalEstimate.toLocaleString()} - $${Math.round(totalEstimate * 1.35).toLocaleString()}`,
      inrFormatted: `₹${(Math.round(totalEstimate * 85) / 100000).toFixed(1)}L - ₹${(Math.round(totalEstimate * 1.35 * 85) / 100000).toFixed(1)}L`,
      timeline: weeks,
    };
  };

  const estimateResult = calculateEstimate();

  // Helper to render an individual Service Card matching the layout
  const renderServiceCard = (service: Service, index: number) => {
    // Column 2 items in grid (index 1, 4, 7...) have text on top and image on bottom
    const isTextOnTop = service.imagePosition === "bottom" || index % 3 === 1;

    const imageSrc =
      service.image ||
      service.imagePlaceholder ||
      "/images/services/social-media.jpg";

    // Sub-component for Image block (grayscale by default, color on hover)
    const imageBlock = (
      <div
        key="image"
        className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden relative bg-slate-900 shadow-inner"
      >
        <img
          src={imageSrc}
          alt={service.title}
          className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            // Fallback gracefully if image fails
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>
    );

    // Sub-component for Text block (white by default, highlighted green on hover)
    const textBlock = (
      <div
        key="text"
        className="w-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between bg-white text-slate-900 border border-slate-100 shadow-xs group-hover:bg-[#ded725] group-hover:text-slate-950 group-hover:shadow-md transition-all duration-300"
      >
        <div>
          <h3 className="text-lg sm:text-[19px] font-extrabold font-heading tracking-tight leading-snug text-[#090D16] group-hover:text-slate-950 transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-[13px] mt-2.5 leading-relaxed line-clamp-3 text-slate-500 font-normal group-hover:text-slate-900 group-hover:font-medium transition-colors">
            {service.shortDesc}
          </p>
        </div>

        <div className="mt-4 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal({ type: "service-details", service });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-all group/link cursor-pointer"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </button>
        </div>
      </div>
    );

    return (
      <div
        key={service.id || index}
        onClick={() => openModal({ type: "service-details", service })}
        className="bg-[#f2f4f7] border border-slate-200/80 rounded-[28px] p-3.5 sm:p-4 flex flex-col gap-3.5 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      >
        {isTextOnTop ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-20 bg-white min-h-screen">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-30 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-30 pointer-events-none" />

      {/* ================= HERO HEADER (MATCHING SCREENSHOT) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Dual Pill Capsule Icon + Our Services Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
                <div className="flex items-center gap-0">
                  <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                  {/* First half circle */}
                  <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                  {/* Second half circle */}
                  <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
                </div>
                Our Services
              </div>
            </div>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#090D16] tracking-tight font-heading leading-[1.18] mt-1">
            Boost Your Brand with Our Expertise
          </h1>
        </div>
      </section>

      {/* ================= 9-CARD SERVICES GRID (MATCHING SCREENSHOT) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayServices.map((service, idx) =>
            renderServiceCard(service, idx),
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-[#ded725] hover:bg-[#ded725] text-[#32679a] hover:text-[#32679a] text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Load More</span>

              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              {/*           
            // : (
            //   <Sparkles className="w-3.5 h-3.5 text-[#bef264]" />
            // )
         */}
            </button>
          </div>
        )}
      </section>

      {/* ================= COLLAPSIBLE PROJECT COST ESTIMATOR & ENGAGEMENT MODELS ================= */}
      {/* <section
        id="cost-estimator"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <div className="border-t border-slate-200/80 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                Planning Tools
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
                Interactive Project Cost & Timeline Estimator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Customize your technical parameters to calculate approximate
                sprint timeline and investment.
              </p>
            </div>

            <button
              onClick={() => setShowEstimator(!showEstimator)}
              className="self-start sm:self-auto px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{showEstimator ? "Hide Estimator" : "Open Estimator"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showEstimator ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showEstimator && (
            <div className="light-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-xl relative overflow-hidden mb-16 animate-modal-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Primary Service Domain:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        {
                          id: "enterprise-software",
                          title: "Enterprise Software",
                          price: "$4,800",
                        },
                        {
                          id: "ai-data-intelligence",
                          title: "AI & Machine Learning",
                          price: "$5,200",
                        },
                        {
                          id: "cloud-devops",
                          title: "Cloud & DevOps",
                          price: "$3,400",
                        },
                        {
                          id: "web-mobile-apps",
                          title: "Web & Mobile Apps",
                          price: "$4,000",
                        },
                        {
                          id: "cybersecurity-audit",
                          title: "Security & VAPT",
                          price: "$2,800",
                        },
                        {
                          id: "social-media-marketing",
                          title: "Digital Growth",
                          price: "$2,200",
                        },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setEstimatorService(s.id)}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                            estimatorService === s.id
                              ? "bg-[#133A27] text-white border-[#133A27] shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <div className="font-bold truncate">{s.title}</div>
                          <div className="text-[10px] opacity-80">
                            {s.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Project Complexity & Scope:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: "mvp",
                          title: "Lean MVP",
                          desc: "Core validation",
                        },
                        {
                          id: "standard",
                          title: "Production App",
                          desc: "Custom workflows",
                        },
                        {
                          id: "enterprise",
                          title: "Enterprise Suite",
                          desc: "High scale",
                        },
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setEstimatorScope(tier.id as any)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            estimatorScope === tier.id
                              ? "bg-emerald-50 text-emerald-900 border-emerald-400 font-bold shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900">
                            {tier.title}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {tier.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needAiAddon}
                        onChange={(e) => setNeedAiAddon(e.target.checked)}
                        className="w-4 h-4 rounded text-[#133A27] accent-[#133A27]"
                      />
                      <span>Include Custom AI / LLM Workflow (+ $1,800)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needDevOpsAddon}
                        onChange={(e) => setNeedDevOpsAddon(e.target.checked)}
                        className="w-4 h-4 rounded text-[#133A27] accent-[#133A27]"
                      />
                      <span>Zero-Downtime CI/CD & Kubernetes (+ $1,200)</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 rounded-3xl bg-[#133A27] text-white shadow-xl flex flex-col justify-between text-center space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#bef264] font-mono">
                      Estimated Investment
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white font-heading mt-2">
                      {estimateResult.priceFormatted}
                    </div>
                    <div className="text-xs text-[#bef264] font-semibold mt-1">
                      Approx. {estimateResult.inrFormatted}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-left space-y-2 text-xs">
                    <div className="flex justify-between text-slate-200">
                      <span>Sprint Timeline:</span>
                      <strong className="text-white">
                        {estimateResult.timeline}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>SLA Guarantee:</span>
                      <strong className="text-[#bef264]">99.99% Uptime</strong>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span>Source Code Ownership:</span>
                      <strong className="text-white">100% Client Owned</strong>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openModal({
                        type: "quote-modal",
                        defaultService: estimatorService,
                      })
                    }
                    className="w-full py-3.5 rounded-full bg-[#bef264] hover:bg-[#aee64a] text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Get Official SOW & Roadmap</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section> */}

      {/* ================= ENGAGEMENT MODELS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-center max-w-3xl mx-auto">
          {/* Dual Pill Capsule Icon + Our Services Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
                <div className="flex items-center gap-0">
                  <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                  {/* First half circle */}
                  <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                  {/* Second half circle */}
                  <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
                </div>
                Collaboration Frameworks
              </div>
            </div>
          </div>

          {/* Main Display Headline */}
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#090D16] tracking-tight font-heading leading-[1.18] ">
            Flexible Engagement Models
          </h4>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="light-card rounded-3xl p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-blue-700 font-bold text-sm">
                01
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Dedicated Growth Squad
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                A dedicated team (Growth Strategist, Content Creator,
                Performance Marketer, Tech Specialist) working as an embedded
                extension of your company.
              </p>
            </div>
            <div className="text-xs text-[#32679a] font-semibold pt-2 border-t border-slate-100">
              Best for: Scaling companies & fast-moving campaigns
            </div>
          </div>

          <div className="light-card rounded-3xl p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-700 font-bold text-sm">
                02
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Fixed-Price Milestone Delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Clearly defined project scope with agreed milestone
                deliverables, guaranteed delivery timeline, and structured
                billing tranches.
              </p>
            </div>
            <div className="text-xs text-[#32679a] font-semibold pt-2 border-t border-slate-100">
              Best for: Website launches, video production & audit reviews
            </div>
          </div>

          <div className="light-card rounded-3xl p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-700 font-bold text-sm">
                03
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Agile Performance Retainer
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Flexible monthly retainer for continuous A/B testing, ongoing
                SEO optimization, paid ad management, and conversion rate
                optimization.
              </p>
            </div>
            <div className="text-xs text-[#32679a] font-semibold pt-2 border-t border-slate-100">
              Best for: Continuous brand scaling & ROI optimization
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
