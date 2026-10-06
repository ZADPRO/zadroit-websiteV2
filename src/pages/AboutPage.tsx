import React from "react";
import {
  companyInfo,
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
  const milestones = [
    {
      year: "2023",
      title: "Company Inception in Salem",
      description:
        "Zadroit IT Solutions Private Limited officially incorporated on May 8, 2023, with a core mission to engineer enterprise-grade software and cloud architectures for Indian and global enterprises.",
    },
    {
      year: "2024",
      title: "Proprietary IP: Medpredit & ZadSports Launch",
      description:
        'Developed copyrighted AI diagnostic platform "Medpredit" and pioneered automated sports venue booking platform "ZadSports" integrated with proprietary IoT floodlight relays.',
    },
    {
      year: "2025",
      title: "Bangalore Innovation Hub & ZadERP",
      description:
        "Expanded operations to Bangalore R&D center, deployed ZadERP to over 40+ supply chain and manufacturing organizations with 99.99% uptime SLA.",
    },
    {
      year: "2026",
      title: "Global Expansion & Multi-Cloud Solutions",
      description:
        "Delivering high-throughput distributed systems, custom RAG AI agents, and cybersecurity audits for clients across North America, Europe, Singapore, and India.",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / About Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            {/* <Building className="w-3.5 h-3.5 text-emerald-600" /> */}
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
            About Us
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
            Architecting the Future of Enterprise Software & Intelligent
            Automation
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Headquartered in Salem, Tamil Nadu, with research operations in
            Bangalore, Zadroit IT Solutions Private Limited is a specialized
            technology engineering company building high-throughput distributed
            applications, AI diagnostic engines, and scalable multi-cloud
            infrastructure.
          </p>
        </div>

        {/* Story & Legacy Bento */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5">
            <ImagePlaceholder
              alt="Zadroit Salem Headquarters and Tech Campus"
              category="Corporate Innovation"
              label="Zadroit Salem Campus & Engineering Lab"
              aspectRatio="video"
              dimensionsHint="800 × 600"
              iconType="service"
            />
          </div>
          <div className="lg:col-span-7 light-card rounded-3xl p-8 sm:p-10 space-y-6 bg-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Our Origin & Purpose
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
              Rooted in Engineering Rigor, Driven by Global Impact
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded with the belief that modern software should be impeccably
              designed, fault-tolerant, and laser-focused on real business ROI,
              Zadroit has grown from a specialized engineering team in Salem
              into a full-cycle digital transformation partner.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We bridge the gap between complex deep-tech systems (AI inference,
              distributed Kafka pipelines, Kubernetes microservices) and
              intuitive, high-conversion human experiences.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-500 font-mono">
                  Incorporated
                </div>
                <div className="text-lg font-black text-[#133A27] font-heading">
                  May 8, 2023
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono">CIN</div>
                <div className="text-xs font-bold text-amber-700 font-mono truncate">
                  {companyInfo.cin}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono">
                  Delivery Model
                </div>
                <div className="text-lg font-black text-emerald-700 font-heading">
                  Global Agile
                </div>
              </div>
            </div>
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
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To be recognized as the premier global engineering powerhouse that
              turns complex computational challenges into elegant,
              hyper-scalable software, shaping how enterprises automate
              intelligence in the AI era.
            </p>
          </div>

          <div className="light-card rounded-3xl p-8 border-l-4 border-l-amber-500 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-[#090D16] font-heading mb-3">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To empower startups and established enterprises with resilient
              software architectures, state-of-the-art AI tooling, and
              transparent agile delivery that drives exponential operational
              efficiency and sustainable revenue growth.
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
          {milestones.map((m, idx) => (
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
