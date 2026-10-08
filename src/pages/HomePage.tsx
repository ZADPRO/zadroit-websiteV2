import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import {
  companyInfo,
  servicesData,
  productsData,
  testimonialsData,
} from "../data/websiteData";
import { CollageImageHero } from "../components/CollageImageHero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
  Quote,
  Sparkles,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { navigate, openModal } = useApp();

  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
  const [isTestimonialPaused, setIsTestimonialPaused] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTestimonialCards = isMobile ? 1 : 2;
  const maxTestimonialIndex = Math.max(
    0,
    testimonialsData.length - visibleTestimonialCards,
  );

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev <= 0 ? maxTestimonialIndex : prev - 1));
  };

  useEffect(() => {
    if (isTestimonialPaused) return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev >= maxTestimonialIndex ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialPaused, maxTestimonialIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextTestimonial();
    } else if (distance < -50) {
      prevTestimonial();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
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
    <div className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-28 bg-white">
      {/* Subtle background dot matrix patterns */}
      <div className="absolute top-14 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-20 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-dots opacity-30 pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 lg:pb-13">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <ScrollReveal variant="fade-right" className="lg:col-span-6 space-y-5 text-left">
            {/* Main Display Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] tracking-tight leading-[1.15] font-stencil">
                Innovate & Scale With
              </h1>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#244A6F] tracking-tight leading-[1.15] font-stencil mt-1">
                ZAdroit IT Solutions
              </h1>
            </div>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              We provide outsourced enterprise IT services, custom mobile/web
              application development, SAP & Oracle ERP integration, cloud
              computing, and AI-driven automation for businesses worldwide.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Explore More Pill Button */}
              <button
                onClick={() => openModal({ type: "quote-modal" })}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#32679a] font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Explore More</span>
                <ArrowRight className="w-4 h-4 !text-[#32679a] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* View All Services Link */}
              <button
                onClick={() => navigate("services")}
                className="text-sm sm:text-base font-bold text-[#0F172A] hover:text-[#133A27] underline underline-offset-8 decoration-slate-300 hover:decoration-[#133A27] transition-all cursor-pointer"
              >
                View All Services
              </button>
            </div>

            {/* Trust Stats Counter */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/80 max-w-xl">
              {/* Stat 1 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex items-center shrink-0">
                  <div className="relative z-10 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#2B5984]" />
                  <div className="absolute left-[16px] sm:left-[24px] top-1/2 -translate-y-1/2 h-[34px] sm:h-[48px] w-[1px] bg-[#13273B]/50" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#133A27] font-heading leading-tight truncate">
                    {companyInfo.stats.projectsCompleted}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">
                    Projects Delivered
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex items-center shrink-0">
                  <div className="relative z-10 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#2B5984]" />
                  <div className="absolute left-[16px] sm:left-[24px] top-1/2 -translate-y-1/2 h-[34px] sm:h-[48px] w-[1px] bg-[#13273B]/50" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#133A27] font-heading leading-tight truncate">
                    {companyInfo.stats.clientSatisfaction}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex items-center shrink-0">
                  <div className="relative z-10 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#2B5984]" />
                  <div className="absolute left-[16px] sm:left-[24px] top-1/2 -translate-y-1/2 h-[34px] sm:h-[48px] w-[1px] bg-[#13273B]/50" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                  <div className="relative z-10 w-2 h-4 sm:w-3.5 sm:h-6 bg-[#5F88B0] rounded-r-full" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-black text-[#133A27] font-heading leading-tight truncate">
                    {companyInfo.stats.uptimeSLA}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">
                    Uptime SLA
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 4-Piece Split Collage Hero Component */}
          <ScrollReveal variant="fade-left" delay={150} className="lg:col-span-6 flex justify-center">
            <CollageImageHero />
          </ScrollReveal>
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
      {/* ================= OUR SERVICES (MATCHING REFERENCE IMAGE IN YELLOW/FOREST THEME) ================= */}
      <section className="py-12 sm:py-16 w-full bg-[#F9F8D8] border-y border-[#E5E055] relative overflow-hidden">
        {/* Subtle top & bottom diagonal stripes pattern from reference image */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-stripes-pattern opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-stripes-pattern opacity-60 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B5C8DB]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#B5C8DB]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal variant="fade-up">
            {/* Top Header Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
              <div>
                {/* Dual-Capsule Badge */}
                <div className="inline-flex items-center gap-2 mb-4 group cursor-default">
                  <div className="flex items-center gap-0">
                    <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                    {/* First half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                    {/* Second half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#13273B] tracking-wide uppercase">
                    Our Services
                  </span>
                </div>

                {/* Main Display Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#13273B] font-heading tracking-tight leading-[1.12]">
                  Boost Your Brand with Our Expertise
                </h2>
              </div>

              {/* Top Right More Button */}
              <div>
                <button
                  onClick={() => navigate("services")}
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#ded725] text-[#143225] hover:text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 text-[#143225] group-hover:text-slate-950 group-hover:translate-x-1.5 transition-all duration-300" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {servicesData.slice(0, 3).map((service, index) => {
              // Service 2 (index 1 / content-marketing) is the highlighted yellow theme card with inverted layout
              const isCenterHighlighted = index === 1 || service.isHighlighted;
              const isTextOnTop =
                service.imagePosition === "bottom" || index === 1;
              const imageSrc =
                service.image || "/images/services/social-media.jpg";

              // Image Component
              const ImageBlock = (
                <div
                  key="image"
                  className="w-full h-48 sm:h-52 rounded-[20px] overflow-hidden relative bg-slate-900 shadow-inner group/img"
                >
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              );

              // Text Content Block
              const TextBlock = (
                <div
                  key="text"
                  className={`w-full rounded-[20px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${isCenterHighlighted
                    ? "bg-[#ded725] text-slate-950"
                    : "bg-[#32679a]/75 border-0 border-[#F9F8D8] text-white"
                    }`}
                >
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl font-black font-heading tracking-tight ${isCenterHighlighted
                        ? "text-slate-950"
                        : "text-white group-hover:text-[#F9F8D8] transition-colors"
                        }`}
                    >
                      {service.title}
                    </h3>

                    {/* Divider line matching screenshot */}
                    <div
                      className={`h-px my-3.5 ${isCenterHighlighted ? "bg-slate-950/15" : "bg-white/10"
                        }`}
                    />

                    <p
                      className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${isCenterHighlighted
                        ? "text-slate-900 font-medium"
                        : "text-slate-300 font-normal"
                        }`}
                    >
                      {service.shortDesc}
                    </p>
                  </div>
                </div>
              );

              if (isCenterHighlighted) {
                return (
                  <ScrollReveal
                    key={service.id}
                    variant="fade-up"
                    delay={index * 120}
                  >
                    <div
                      onClick={() =>
                        openModal({ type: "service-details", service })
                      }
                      className="bg-[#ded725] border-2 border-[#ded725] ring-4 ring-[#ded725]/20 rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between gap-3.5 shadow-2xl shadow-[#ded725]/20 hover:-translate-y-2 hover:shadow-[#ded725]/35 transition-all duration-500 ease-out cursor-pointer group h-full"
                    >
                      {TextBlock}
                      {ImageBlock}
                    </div>
                  </ScrollReveal>
                );
              }

              return (
                <ScrollReveal
                  key={service.id}
                  variant="fade-up"
                  delay={index * 120}
                >
                  <div
                    onClick={() =>
                      openModal({ type: "service-details", service })
                    }
                    className="bg-[#32679a] border border-[#27533d] rounded-[28px] p-3.5 sm:p-4 flex flex-col justify-between gap-3.5 shadow-xl hover:-translate-y-2 hover:border-[#ded725]/40 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer group h-full"
                  >
                    {isTextOnTop ? (
                      <>
                        {TextBlock}
                        {ImageBlock}
                      </>
                    ) : (
                      <>
                        {ImageBlock}
                        {TextBlock}
                      </>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROPRIETARY PRODUCTS MARQUEE SECTION ================= */}
      <section className="py-16 sm:py-20 bg-white/95 text-white relative overflow-hidden border-b border-slate-800">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-stripes-pattern opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-stripes-pattern opacity-60 pointer-events-none" />

        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#ded725]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[#32679a]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                {/* Dual-Capsule Badge */}
                <div className="inline-flex items-center gap-2 mb-4 group cursor-default">
                  <div className="flex items-center gap-0">
                    <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                    {/* First half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                    {/* Second half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#13273B] tracking-wide uppercase">
                    Flagship Products
                  </span>
                </div>

                {/* Main Display Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#13273B]  font-heading tracking-tight leading-[1.12]">
                  Scalable enterprise software <br />
                  engineered by Zadroit
                </h2>
              </div>
              <div>
                <button
                  onClick={() => navigate("products")}
                  className="px-4 py-3 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#090D16] font-extrabold text-xs sm:text-sm shadow-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-4 h-4 text-[#090D16] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ================= MARQUEE CONTAINER ================= */}
        <div className="relative w-full overflow-hidden  group/marquee select-none [--gap:1.5rem] sm:[--gap:2rem] [--duration:35s]">
          {/* Left & Right gradient fade masks for seamless edges */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20" /> */}

          <div className="flex w-fit gap-[var(--gap)]">
            {/* Track 1 */}
            <div className="flex shrink-0 items-stretch gap-[var(--gap)] marquee-horizontal marquee-pause-on-hover">
              {productsData.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openModal({ type: "product-demo", product })}
                  className="w-[300px] sm:w-[360px] bg-[#32679a] hover:bg-[#255280] border border-white/15 hover:border-[#ded725]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#ded725]/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group/card shrink-0"
                >
                  <div>
                    {/* Top Row: Logo & Category Badge */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="h-12 w-32 sm:w-36 bg-white/95 rounded-xl px-3 py-1.5 flex items-center justify-center border border-white/20 shadow-sm group-hover/card:scale-105 transition-transform duration-300 overflow-hidden">
                        <img
                          src={
                            product.logo || "/assets/product logo/ZADPRO-05.png"
                          }
                          alt={`${product.name} Logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/ProductLogo/ZADPRO-05.png";
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#32679a]/30 text-[#ded725] border border-[#ded725]/20 shrink-0">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name & Tagline */}
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover/card:text-[#ded725] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8eb2d5] mt-0.5 mb-2 line-clamp-1">
                      {product.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ded725] flex items-center gap-1.5 group-hover/card:underline">
                      Explore Product Details
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-700 group-hover/card:bg-[#ded725] text-slate-300 group-hover/card:text-slate-950 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for infinite seamless loop) */}
            <div
              className="flex shrink-0 items-stretch gap-[var(--gap)] marquee-horizontal marquee-pause-on-hover"
              aria-hidden="true"
            >
              {productsData.map((product) => (
                <div
                  key={`${product.id}-duplicate`}
                  onClick={() => openModal({ type: "product-demo", product })}
                  className="w-[300px] sm:w-[360px] bg-[#32679a] hover:bg-[#255280] border border-white/15 hover:border-[#ded725]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-[#ded725]/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group/card shrink-0"
                >
                  <div>
                    {/* Top Row: Logo & Category Badge */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="h-12 w-32 sm:w-36 bg-white/95 rounded-xl px-3 py-1.5 flex items-center justify-center border border-white/20 shadow-sm group-hover/card:scale-105 transition-transform duration-300 overflow-hidden">
                        <img
                          src={
                            product.logo || "/assets/product logo/ZADPRO-05.png"
                          }
                          alt={`${product.name} Logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/ProductLogo/ZADPRO-05.png";
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#32679a]/30 text-[#ded725] border border-[#ded725]/20 shrink-0">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name & Tagline */}
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover/card:text-[#ded725] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8eb2d5] mt-0.5 mb-2 line-clamp-1">
                      {product.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ded725] flex items-center gap-1.5 group-hover/card:underline">
                      Explore Product Details
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-700 group-hover/card:bg-[#ded725] text-slate-300 group-hover/card:text-slate-950 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS & CLIENT IMPACT (CAROUSEL) ================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        {/* Decorative background dot pattern */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal variant="fade-up">
            {/* Header Row with Title and Navigation Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Verified Client Outcomes
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] font-heading tracking-tight">
                  Trusted by High-Growth Companies & CIOs
                </h2>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#13273B] hover:text-white hover:border-[#13273B] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#13273B] hover:text-white hover:border-[#13273B] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Carousel Viewport & Sliding Track */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div
              className="overflow-hidden relative -mx-3 px-3 py-2"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateX(-${testimonialIndex * (100 / visibleTestimonialCards)
                    }%)`,
                }}
              >
                {testimonialsData.map((t) => (
                  <div key={t.id} className="w-full md:w-1/2 shrink-0 px-3">
                    <div className="light-card rounded-3xl p-7 sm:p-9 flex flex-col justify-between bg-white h-full border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-500 relative group overflow-hidden select-none">
                      {/* Decorative watermark quote mark */}
                      <Quote className="absolute right-6 top-6 w-24 h-24 text-slate-100/90 -rotate-12 pointer-events-none group-hover:text-amber-50 group-hover:scale-105 transition-all duration-500" />

                      <div className="relative z-10">
                        {/* Rating & Project Badge */}
                        <div className="flex items-center justify-between gap-2 mb-5">
                          <div className="flex items-center gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-amber-500 fill-amber-500 drop-shadow-xs"
                              />
                            ))}
                          </div>

                          {t.projectDelivered && (
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[220px]">
                              {t.projectDelivered}
                            </span>
                          )}
                        </div>

                        {/* Quote Text */}
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8 font-normal">
                          "{t.quote}"
                        </p>
                      </div>

                      {/* Author & Verification Footer */}
                      <div className="relative z-10 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-[#13273B] text-[#ded725] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                            {t.clientName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-heading">
                              {t.clientName}
                              {t.verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {t.clientRole},{" "}
                              <strong className="text-slate-700">
                                {t.company}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-slate-600 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 shrink-0">
                          {t.country}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Indicators / Dots */}
            <div className="flex items-center justify-center gap-2.5 mt-10">
              {Array.from({ length: maxTestimonialIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`transition-all duration-300 rounded-full h-2.5 cursor-pointer ${testimonialIndex === idx
                    ? "w-8 bg-[#13273B]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= HIGH-CONVERTING BOTTOM CTA BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ScrollReveal variant="zoom-in">
          <div className="relative rounded-3xl bg-[#EFF3F7] text-white p-8 sm:p-14 overflow-hidden shadow-xl text-center">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#32679A]/20 text-[#13273B] text-xs font-bold">
                {/* <Sparkles className="w-3.5 h-3.5" /> */}
                Let's Build Something Exceptional
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#13273B] font-heading leading-tight">
                Ready to Accelerate Your Enterprise Digital Transformation?
              </h2>

              <p className="text-base text-[#13273B]">
                Partner with Zadroit's dedicated software engineers and AI
                architects. We turn complex business challenges into reliable,
                high-yield digital assets.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openModal({ type: "quote-modal" })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#BFB920] hover:bg-[#DED725]/80 text-slate-950 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Request Custom Project Scope</span>
                </button>

                <button
                  onClick={() => navigate("contact")}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#BFB920] hover:bg-[#DED725]/80 text-black font-bold text-base border border-white/20 transition-all"
                >
                  Schedule 30-Min Strategy Call
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
