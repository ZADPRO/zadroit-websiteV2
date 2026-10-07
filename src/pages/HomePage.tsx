import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  companyInfo,
  servicesData,
  productsData,
  testimonialsData,
  processStepsData,
  blogPostsData,
} from "../data/websiteData";
import { CollageImageHero } from "../components/CollageImageHero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Building2,
  CloudLightning,
  BrainCircuit,
  Smartphone,
  Palette,
  Layers,
  ChevronRight,
  Code2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { navigate, openModal } = useApp();
  const [activeProductTab, setActiveProductTab] = useState<string>(
    productsData[0].id,
  );

  const selectedProduct =
    productsData.find((p) => p.id === activeProductTab) || productsData[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-6 h-6 text-[#133A27]" />;
      case "CloudLightning":
        return <CloudLightning className="w-6 h-6 text-amber-600" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-6 h-6 text-blue-600" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-indigo-600" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-pink-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#133A27]" />;
    }
  };

  const marqueeKeywords = [
    "Digital Marketing",
    "Content Marketing",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Enterprise Software",
    "Cloud Architecture & DevOps",
    "AI & Machine Learning",
    "UI/UX Product Design",
    "Full-Stack Web & Mobile",
  ];

  return (
    <div className="relative overflow-hidden pt-20 sm:pt-24 bg-white">
      {/* Subtle background dot matrix patterns */}
      <div className="absolute top-28 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-20 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-dots opacity-30 pointer-events-none" />

      {/* ================= HERO SECTION (MATCHING TEMPLATE) ================= */}
      <section className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-12 pb-10 lg:pb-13">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Badge: Dual Capsule Icon + Text */}
            <div className="inline-flex items-center gap-2 px-1 py-0.5">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-5 rounded-full bg-[#ded725]" />
                <span className="w-2.5 h-5 rounded-full bg-[#32679a]" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Empowering Global Enterprise Operations
              </span>
            </div>

            {/* Main Display Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] tracking-tight leading-[1.12] font-heading">
                Innovate & Scale With
              </h1>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#133a27] tracking-tight leading-[1.12] font-heading">
                ZAdroit IT Solutions
              </h1>
            </div>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              We provide outsourced enterprise IT services, custom mobile/web
              application development, SAP & Oracle ERP integration, cloud
              computing, and AI-driven automation for businesses worldwide.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              {/* Dark Green Explore More Pill Button */}
              <button
                onClick={() => openModal({ type: "quote-modal" })}
                className="px-8 py-3.5 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#32679a] font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4 !text-[#32679a] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* View All Services Link */}
              <button
                onClick={() => navigate("services")}
                className="text-sm sm:text-base font-bold text-[#0F172A] hover:text-[#133A27] underline underline-offset-8 decoration-slate-300 hover:decoration-[#133A27] transition-all"
              >
                View All Services
              </button>
            </div>

            {/* Trust Stats Counter */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#133A27] font-heading">
                  {companyInfo.stats.projectsCompleted}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-500 font-heading">
                  {companyInfo.stats.clientSatisfaction}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Client Satisfaction
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600 font-heading">
                  {companyInfo.stats.uptimeSLA}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Uptime SLA</div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Piece Split Collage Hero Component */}
          <div className="lg:col-span-6 flex justify-center">
            <CollageImageHero />
          </div>
        </div>
      </section>

      {/* ================= BOTTOM DARK GREEN MARQUEE RIBBON (MATCHING TEMPLATE) ================= */}
      <section className="bg-[#ded725] text-[#32679a] py-4 overflow-hidden shadow-inner">
        <div className="flex overflow-hidden relative">
          <div className="animate-marquee flex items-center gap-8 text-sm sm:text-base font-bold whitespace-nowrap">
            {[...marqueeKeywords, ...marqueeKeywords].map((keyword, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="tracking-wide">{keyword}</span>
                {/* Vibrant Lime Starburst Asterisk */}
                <span className="text-[#32679a] text-xl font-black select-none">
                  ✳
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (REFERENCE IMAGE LAYOUT) ================= */}
      <WhyChooseUs />

      {/* ================= SECOND MARQUEE RIBBON (LEFT-TO-RIGHT / REVERSE) ================= */}
      <section className="bg-[#ded725] text-[#32679a] py-4 overflow-hidden shadow-inner">
        <div className="flex overflow-hidden relative">
          <div className="animate-marquee-reverse flex items-center gap-8 text-sm sm:text-base font-bold whitespace-nowrap">
            {[...marqueeKeywords, ...marqueeKeywords].map((keyword, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="tracking-wide">{keyword}</span>
                {/* Vibrant Lime Starburst Asterisk */}
                <span className="text-[#32679a] text-xl font-black select-none">
                  ✳
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= FEATURED SERVICES (LIGHT BENTO GRID) ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Proprietary Software Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading">
            Architected for Speed, Security & Massive Scale
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From legacy modernization to real-time AI agents, we deliver
            mission-critical software solutions tailored to your industry.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.slice(0, 3).map((service) => (
            <div
              key={service.id}
              onClick={() => openModal({ type: "service-details", service })}
              className="light-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#133A27] group-hover:text-white transition-all duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  {service.isPopular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#133A27] transition-colors font-heading">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {service.deliverables.slice(0, 2).map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  ROI:{" "}
                  <span className="text-emerald-700 font-bold">
                    {service.roiMetric.split(" ")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#133A27] group-hover:translate-x-1 transition-transform">
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div> */}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("services")}
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all inline-flex items-center gap-2"
          >
            <span>View All Engineering Services & Estimator</span>
            <ArrowRight className="w-4 h-4 text-[#C6F135]" />
          </button>
        </div>
      </section>

      {/* ================= FLAGSHIP PRODUCTS TABS SHOWCASE ================= */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Zadroit Flagship IP & Turnkey Software
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading">
              Proprietary Enterprise Software Platforms
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Battle-tested, ready-to-deploy platforms engineered by Zadroit to
              accelerate enterprise operations.
            </p>
          </div>

          {/* Product Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
            {productsData.map((prod) => (
              <button
                key={prod.id}
                onClick={() => setActiveProductTab(prod.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                  activeProductTab === prod.id
                    ? "bg-[#133A27] text-white border-[#133A27] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {prod.name}
              </button>
            ))}
          </div>

          {/* Active Product Showcase Card */}
          <div className="light-card rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {selectedProduct.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {selectedProduct.status}
                </span>
              </div>

              <h3 className="text-3xl font-black text-[#090D16] font-heading">
                {selectedProduct.name}
              </h3>
              <p className="text-base text-amber-700 font-semibold">
                {selectedProduct.tagline}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedProduct.shortDesc}
              </p>

              <div className="space-y-2 pt-2">
                {selectedProduct.features.slice(0, 3).map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">{feat.title}:</strong>{" "}
                      {feat.description}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-100">
                {selectedProduct.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center"
                  >
                    <div className="text-xs text-slate-500">{m.label}</div>
                    <div className="text-base font-extrabold text-[#133A27] font-heading">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    openModal({
                      type: "product-demo",
                      product: selectedProduct,
                    })
                  }
                  className="px-6 py-3 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C6F135]" />
                  <span>Book {selectedProduct.name} Demo</span>
                </button>

                <button
                  onClick={() => navigate("products")}
                  className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold"
                >
                  View Full Specifications
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImagePlaceholder
                src={selectedProduct.imagePlaceholder}
                alt={`${selectedProduct.name} Dashboard`}
                category={selectedProduct.category}
                label={`${selectedProduct.name} Platform Preview`}
                aspectRatio="video"
                dimensionsHint="1200 × 750"
                iconType="product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-STEP AGILE PROCESS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            Battle-Tested Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading">
            From Blueprint to Production in 4 Sprints
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Our agile engineering process guarantees transparent progress,
            weekly staging reviews, and zero unexpected surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processStepsData.map((step) => (
            <div
              key={step.step}
              className="light-card rounded-3xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#133A27] font-mono">
                    {step.phase}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-extrabold text-[#133A27]">
                    0{step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="text-[11px] font-semibold text-slate-800">
                  Deliverables:
                </div>
                {step.deliverables.slice(0, 2).map((del, i) => (
                  <div
                    key={i}
                    className="text-[11px] text-slate-600 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] shrink-0" />
                    <span className="truncate">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS & CLIENT IMPACT ================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Verified Client Outcomes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading">
              Trusted by High-Growth Companies & CIOs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="light-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#133A27] text-white flex items-center justify-center font-bold text-sm">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {t.clientName}
                        {t.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {t.clientRole},{" "}
                        <strong className="text-slate-700">{t.company}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-600 px-2 py-1 rounded bg-slate-100 border border-slate-200">
                    {t.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LATEST BLOG INSIGHTS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold mb-2">
              <Code2 className="w-3.5 h-3.5 text-purple-600" />
              Zadroit Tech Publications
            </div>
            <h2 className="text-3xl font-black text-[#090D16] font-heading">
              Latest Engineering Insights & Blueprints
            </h2>
          </div>
          <button
            onClick={() => navigate("blog")}
            className="text-xs font-bold text-[#133A27] hover:underline flex items-center gap-1"
          >
            <span>View All Whitepapers</span>
            <ArrowRight className="w-4 h-4 text-[#84CC16]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPostsData.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => openModal({ type: "blog-reader", blog })}
              className="light-card rounded-3xl p-5 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all"
            >
              <div>
                <ImagePlaceholder
                  src={blog.coverImagePlaceholder}
                  alt={blog.title}
                  category={blog.category}
                  aspectRatio="video"
                  dimensionsHint="800 × 450"
                  className="mb-4"
                />

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <span className="text-[#133A27] font-bold">
                    {blog.category}
                  </span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#133A27] transition-colors line-clamp-2 font-heading">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">By {blog.author.name}</span>
                <span className="text-[#133A27] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HIGH-CONVERTING BOTTOM CTA BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl bg-[#133A27] text-white p-8 sm:p-14 overflow-hidden shadow-xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6F135]/20 text-[#C6F135] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Let's Build Something Exceptional
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading leading-tight">
              Ready to Accelerate Your Enterprise Digital Transformation?
            </h2>

            <p className="text-base text-slate-200">
              Partner with Zadroit's dedicated software engineers and AI
              architects. We turn complex business challenges into reliable,
              high-yield digital assets.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openModal({ type: "quote-modal" })}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C6F135] hover:bg-[#b4df27] text-slate-950 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Request Custom Project Scope</span>
              </button>

              <button
                onClick={() => navigate("contact")}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all"
              >
                Schedule 30-Min Strategy Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
