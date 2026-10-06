import React from "react";
import {
  companyInfo,
  aboutData,
  milestonesData,
  teamMembersData,
  coreValuesData,
} from "../data/websiteData";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import {
  Sparkles,
  Building,
  Target,
  Eye,
  Award,
  Users,
  MapPin,
  Calendar,
  Globe2,
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
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            <div className="flex items-center gap-0">
              {/* Green circle */}
              <div className="w-7 h-7 rounded-full bg-lime-400" />

              {/* First dark semicircle */}
              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />

              {/* Second dark semicircle */}
              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />
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

        {/* ================= ABOUT STORY & METRICS BENTO (MATCHING REFERENCE TEMPLATE) ================= */}
        <div className="mt-14 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Side: 2-Row Media Collage & Geometric Accents */}
            <div className="lg:col-span-6 space-y-4">
              {/* Row 1: Top Image + Stack of 3 Geometric Arches/Circle */}
              <div className="flex items-end gap-5 sm:gap-6">
                {/* Top Image Card */}
                <div className="flex-1 relative overflow-hidden rounded-[26px] shadow-sm bg-slate-100 aspect-[16/11]">
                  <img
                    src={aboutData.topImage}
                    alt="Zadroit collaborative team"
                    className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.98] hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Stack of 3 Geometric Shapes (2 Outline Semicircles + 1 Solid Lime-Yellow Circle) - ENLARGED */}
                <div className="flex flex-col items-center justify-end gap-3.5 sm:gap-4 md:gap-5 pb-0.5 shrink-0">
                  {/* Outline Arch 1 */}
                  <div className="w-20 h-12 sm:w-26 sm:h-14 md:w-30 md:h-14 border-2 sm:border-[2.5px] border-slate-300 rounded-t-full bg-transparent" />
                  {/* Outline Arch 2 */}
                  <div className="w-20 h-12 sm:w-26 sm:h-14 md:w-30 md:h-14 border-2 sm:border-[2.5px] border-slate-300 rounded-t-full bg-transparent" />
                  {/* Solid Lime-Yellow Circle */}
                  <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-30 md:h-30 rounded-full bg-[#ded725] shadow-sm" />
                </div>
              </div>

              {/* Row 2: Bottom Wide Landscape Image */}
              <div className="w-full">
                {/* Bottom Wide Image Card */}
                <div className="w-full relative overflow-hidden rounded-[26px] shadow-sm bg-slate-100 aspect-[21/10]">
                  <img
                    src={aboutData.bottomImage}
                    alt="Zadroit enterprise software discussion"
                    className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.98] hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Description, Skill Sliders, and Action Button */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {aboutData.storyDescription}
              </p>

              {/* Range Sliders / Skill Metric Bars (Dynamic from JSON) */}
              <div className="space-y-5 pt-2">
                {aboutData.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 mb-2">
                      <span>{skill.label}</span>
                      <span className="font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="relative w-full h-2 rounded-full bg-[#133A27] overflow-visible">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#133A27]"
                        style={{ width: `${skill.percentage}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-[#ded725] border-2 border-white shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                        style={{ left: `${skill.percentage}%` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#133A27]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Lime Pill Button */}
              <div className="pt-3">
                <button
                  type="button"
                  className="px-8 py-3 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#133A27] font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
                >
                  {aboutData.buttonText}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 4-Column Key Stats Counter with Dual Capsule Separators (Dynamic from JSON) */}
          <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
            {aboutData.stats.map((stat, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="relative flex items-center">
                  {/* Vertical line */}

                  {/* Complete circle */}
                  <div className="relative z-10 w-7 h-7 rounded-full bg-lime-400" />
                  <div className="absolute left-[28px] top-1/2 -translate-y-1/2 h-[70px] w-[1.5px] bg-green-950" />

                  {/* First half circle */}
                  <div
                    className="relative z-10 w-4 h-7 bg-green-950 rounded-r-full"
                   
                  />

                  {/* Second half circle */}
                   <div
                    className="relative z-10 w-4 h-7 bg-green-950 rounded-r-full"
                   
                  />

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
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="light-card rounded-3xl p-8 border-l-4 border-l-[#133A27] bg-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-[#133A27]" />
            </div>
            <h3 className="text-2xl font-black text-[#090D16] font-heading mb-3">
              {aboutData.vision.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {aboutData.vision.description}
            </p>
          </div>

          <div className="light-card rounded-3xl p-8 border-l-4 border-l-amber-500 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-[#090D16] font-heading mb-3">
              {aboutData.mission.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {aboutData.mission.description}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Guiding Principles
          </div>
          <h2 className="text-3xl font-black text-[#090D16] font-heading">
            The Values That Power Every Line of Code
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValuesData.map((val) => (
            <div
              key={val.id}
              className="light-card rounded-3xl p-6 relative flex flex-col justify-between bg-white"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3 inline-block">
                  {val.highlight}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones & Journey Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 rounded-3xl border border-slate-200 my-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            Our Track Record
          </div>
          <h2 className="text-3xl font-black text-[#090D16] font-heading">
            Key Milestones in Our Growth Story
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestonesData.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative"
            >
              <div className="text-2xl font-black text-[#133A27] font-heading mb-2">
                {m.year}
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading mb-2">
                {m.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-amber-600" />
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
          {teamMembersData.map((member) => (
            <div
              key={member.id}
              className="light-card rounded-3xl p-6 flex flex-col justify-between bg-white"
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

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#133A27]">
                  {member.department}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-amber-600 mb-3">
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
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#133A27] text-slate-600 hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locations & Global Hubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </section>
    </div>
  );
};
