import React from "react";
import {
  aboutData,
  milestonesData,
  teamMembersData,
} from "../data/websiteData";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { ScrollReveal } from "../components/ScrollReveal";
import { OurApproach } from "../components/OurApproach";
import { ZadroitEdge } from "../components/ZadroitEdge";
import {
  Target,
  Eye,
  ExternalLink,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / About Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
              <div className="flex items-center gap-0">
                <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                {/* First half circle */}
                <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                {/* Second half circle */}
                <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
              </div>
              {aboutData.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
              {aboutData.heading}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {aboutData.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* ================= ABOUT STORY & METRICS BENTO (MATCHING REFERENCE TEMPLATE) ================= */}
        <div className="mt-14 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Side: 2-Row Media Collage & Geometric Accents */}
            <ScrollReveal variant="fade-right" className="lg:col-span-6 space-y-4">
              {/* Row 1: Top Image + Stack of 3 Geometric Arches/Circle */}
              <div className="flex items-end gap-5 sm:gap-6">
                {/* Top Image Card */}
                <div className="flex-1 relative overflow-hidden rounded-[26px] shadow-sm bg-slate-100 aspect-[16/11] group">
                  <img
                    src={aboutData.topImage}
                    alt="Zadroit collaborative team"
                    className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.98] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </div>

                {/* Stack of 3 Geometric Shapes (2 Outline Semicircles + 1 Solid Lime-Yellow Circle) - ENLARGED */}
                <div className="flex flex-col items-center justify-end   shrink-0">
                  {/* Outline Arch 1 */}
                  <div className="w-20 h-12 sm:w-26 sm:h-12 md:w-34 md:h-16 border-2 sm:border-[2.5px] border-[#32679a] rounded-t-full bg-transparent" />
                  {/* Outline Arch 2 */}
                  <div className="w-20 h-12 sm:w-26 sm:h-12 md:w-34 md:h-16 border-2 sm:border-[2.5px] border-[#32679a] rounded-t-full bg-transparent" />
                  {/* Solid Lime-Yellow Circle */}
                  <div className="w-24 h-24 sm:w-26 sm:h-26 md:w-34 md:h-34 rounded-full bg-[#ded725] shadow-sm" />
                </div>
              </div>

              {/* Row 2: Bottom Wide Landscape Image */}
              <div className="w-full">
                {/* Bottom Wide Image Card */}
                <div className="w-full relative overflow-hidden rounded-[26px] shadow-sm bg-slate-100 aspect-[21/10] group">
                  <img
                    src={aboutData.bottomImage}
                    alt="Zadroit enterprise software discussion"
                    className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.98] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Right Side: Description, Skill Sliders, and Action Button */}
            <ScrollReveal variant="fade-left" className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13273B] leading-relaxed">
                The Story Behind{" "}
                <span className="text-[#32679a] text-3xl sm:text-4xl">
                  ZAdroit IT Solutions
                </span>
              </h2>
              <hr />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {aboutData.storyDescription}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {aboutData.description}
              </p>
            </ScrollReveal>
          </div>

          {/* Bottom 4-Column Key Stats Counter with Dual Capsule Separators (Dynamic from JSON) */}
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
              {aboutData.stats.map((stat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="relative flex items-center">
                    {/* Complete circle */}
                    <div className="relative z-10 w-7 h-7 rounded-full bg-[#2B5984]" />
                    <div className="absolute left-[27px] top-1/2 -translate-y-1/2 h-[70px] w-[1.3px] bg-[#13273B]" />

                    {/* First half circle */}
                    <div className="relative z-10 w-4 h-7 bg-[#5F88B0] rounded-r-full" />

                    {/* Second half circle */}
                    <div className="relative z-10 w-4 h-7 bg-[#5F88B0] rounded-r-full" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] font-heading tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= VISION & MISSION / ABOUT SHOWCASE SECTION ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative overflow-hidden bg-white border-b-1 border-slate-200/80">
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

            {/* LEFT SIDE: Content, Vision & Mission Cards */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-left">
              {/* Main Display Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#13273B] font-heading tracking-tight leading-[1.18]">
                Transforming Ideas <br />
                <span className="text-[#32679a]">into Digital Reality</span>
              </h2>

              {/* Vision & Mission Cards */}
              <div className="space-y-2.5 pt-0.5">
                {/* Vision Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-[#32679a]/50 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#32679a]/10 border border-[#32679a]/20 flex items-center justify-center text-[#32679a] shrink-0 group-hover:scale-105 transition-transform">
                      <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#32679a]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-[#13273B] font-heading">
                          {aboutData.vision.title}
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#32679a]/10 text-[#32679a] font-mono">
                          Horizon
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {aboutData.vision.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-[#ded725]/80 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#ded725]/25 border border-[#ded725]/50 flex items-center justify-center text-[#13273B] shrink-0 group-hover:scale-105 transition-transform">
                      <Target className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#13273B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-[#13273B] font-heading">
                          {aboutData.mission.title}
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ded725]/25 text-[#13273B] font-mono">
                          Execution
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {aboutData.mission.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: 4-Image Geometric Collage */}
            <div className="lg:col-span-6 relative p-1 sm:p-2">
              {/* 4 Images 2-Row Asymmetric Collage */}
              <div className="space-y-2.5 sm:space-y-3 relative z-10">

                {/* Row 1: Top-Left (Wider + Top-Left Blue Arch) + Top-Right (Portrait) */}
                <div className="flex gap-2.5 sm:gap-3 items-stretch">
                  {/* Image 1: Top-Left (Increased Width, ~64% width, Top-Left Curved Arc + 3D Blue Pill Arch Frame) */}
                  <div className="relative flex-[1.75] group">
                    {/* Thick 3D Blue Top-Left Arch Bracket Frame */}
                    <svg
                      className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 w-40 sm:w-44 h-40 sm:h-44 pointer-events-none z-0 overflow-visible"
                      viewBox="0 0 160 160"
                      fill="none"
                    >
                      <path
                        d="M 10 144 L 10 44 A 34 34 0 0 1 44 10 L 144 10"
                        stroke="#ded725"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="drop-shadow-md"
                      />
                    </svg>

                    <div className="w-full h-44 sm:h-52 rounded-tl-[34px] sm:rounded-tl-[40px] rounded-tr-lg rounded-bl-lg rounded-br-lg overflow-hidden shadow-md bg-slate-100 relative z-10">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                        alt="Zadroit team collaborating on laptops"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Image 2: Top-Right (Portrait, ~36% width + Top-Right Curved Arc) */}
                  <div className="relative flex-1 group">
                    <div className="w-full h-44 sm:h-52 rounded-tr-[34px] sm:rounded-tr-[40px] rounded-tl-lg rounded-bl-lg rounded-br-lg overflow-hidden shadow-md bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                        alt="Zadroit software architect"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Bottom-Left (Portrait + Sparkle Stars) + Bottom-Right (Wide + Bottom-Right Blue Arch) */}
                <div className="flex gap-2.5 sm:gap-3 items-stretch">
                  {/* Image 3: Bottom-Left (Portrait, ~42% width + Decorative Blue Sparkle Stars) */}
                  <div className="relative flex-1 group">
                    <div className="w-full h-38 sm:h-46 rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-slate-100 relative z-10">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                        alt="Zadroit technology specialist"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Decorative Organic Curved 4-Point Sparkle Stars */}
                    <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 pointer-events-none z-30 drop-shadow-[0_0_15px_#ded725]">
                      {/* Top-Left Medium Sparkle Star */}
                      <div className="absolute -top-2.5 -left-1 z-30 pointer-events-none opacity-90 animate-pulse-glow">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ded725] drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
                        </svg>
                      </div>

                      {/* Center Main Large Sparkle Star */}
                      <div className="ml-1.5 z-30 pointer-events-none">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-[#32679a] drop-shadow-md"
                          viewBox="0 0 100 100"
                          fill="currentColor"
                        >
                          <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
                        </svg>
                      </div>

                      {/* Bottom-Left Small Sparkle Star */}
                      <div className="absolute -bottom-1 -left-1.5 z-30 pointer-events-none opacity-85">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#32679a] drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Image 4: Bottom-Right (Wide, ~58% width + Bottom-Right Curved Arc + 3D Blue Pill Arch Frame) */}
                  <div className="relative flex-[1.4] group">
                    <div className="w-full h-38 sm:h-46 rounded-br-[34px] sm:rounded-br-[40px] rounded-tl-lg rounded-tr-lg rounded-bl-lg overflow-hidden shadow-md bg-slate-100 relative z-10">
                      <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                        alt="Zadroit engineers programming"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Thick 3D Blue Bottom-Right Arch Bracket Frame */}
                    <svg
                      className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-40 sm:w-44 h-40 sm:h-44 pointer-events-none z-0 overflow-visible"
                      viewBox="0 0 160 160"
                      fill="none"
                    >
                      <path
                        d="M 16 150 L 116 150 A 34 34 0 0 0 150 116 L 150 16"
                        stroke="#ded725"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="drop-shadow-md"
                      />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= OUR APPROACH SECTION ================= */}
      <OurApproach />

      {/* ================= THE ZADROIT EDGE (CARD GRID) ================= */}
      <ZadroitEdge />

      {/* Milestones & Journey Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 rounded-3xl border border-slate-200 my-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#32679A]/10 text-[#13273B] border border-[#32679A]/20 text-xs font-bold mb-2">
              <div className="flex items-center gap-0">
                <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              </div>
              Our Track Record
            </div>
            <h2 className="text-3xl font-black text-[#090D16] font-heading">
              Key Milestones in Our Growth Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestonesData.map((m, idx) => (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 90}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#32679a]/40 transition-all relative"
              >
                <div className="text-2xl font-black text-[#32679a] font-heading mb-2">
                  {m.year}
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ded725]/25 text-[#13273B] border border-[#ded725]/40 text-xs font-bold mb-2">
              <div className="flex items-center gap-0">
                <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
                <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              </div>
              Leadership & Core Architects
            </div>
            <h2 className="text-3xl font-black text-[#090D16] font-heading">
              Meet the Minds Behind Zadroit
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A passionate collective of software architects, AI researchers, and
              product designers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembersData.map((member, idx) => (
              <ScrollReveal
                key={member.id}
                variant="fade-up"
                delay={idx * 100}
                className="light-card rounded-3xl p-6 flex flex-col justify-between bg-white border border-slate-200/80 hover:border-[#32679a]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <ImagePlaceholder
                    src={member.avatarPlaceholder}
                    alt={member.name}
                    category={member.department}
                    label={member.name}
                    aspectRatio="square"
                    dimensionsHint="400 × 400"
                    className="mb-4"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#32679a]">
                    {member.department}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#32679a] mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#32679a] text-slate-600 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Locations & Global Hubs */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="light-card rounded-3xl p-8 sm:p-12 border border-slate-200 bg-slate-50">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                Physical Presence & Global Delivery
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
                Headquartered in Salem, Delivering Globally
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Our distributed delivery pods allow seamless 24/7 collaboration
                across Indian Standard Time, North American EST/PST, and
                European time zones.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-[#133A27] font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  Salem Headquarters
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  4/128, Meyyanur Tech Corridor, Salem 636004
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Building className="w-4 h-4" />
                  Bangalore Tech Hub
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  HSR Layout, Sector 4, Silicon Oasis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};
