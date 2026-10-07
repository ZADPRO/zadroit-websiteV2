import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { jobOpeningsData, culturePerksData } from "../data/websiteData";
import {
  Sparkles,
  MapPin,
  Cpu,
  Home,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Laptop,
  Users,
  
} from "lucide-react";

export const CareersPage: React.FC = () => {
  const { openModal } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedLocation, _setSelectedLocation] = useState<string>("All");

  const departments = [
    "All",
    "Engineering",
    "AI & Data",
    "Design",
    "Cloud & DevOps",
  ];
  // const locations = ["All", "Salem HQ", "Bangalore Hub", "Remote"];

  const filteredJobs = jobOpeningsData.filter((job) => {
    const matchesDept =
      selectedDept === "All" || job.department === selectedDept;
    const matchesLoc =
      selectedLocation === "All" ||
      (selectedLocation === "Remote" &&
        job.location.toLowerCase().includes("remote")) ||
      (selectedLocation === "Salem HQ" &&
        job.location.toLowerCase().includes("salem")) ||
      (selectedLocation === "Bangalore Hub" &&
        job.location.toLowerCase().includes("bangalore"));

    return matchesDept && matchesLoc;
  });

  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#133A27]" />;
      case "Home":
        return <Home className="w-6 h-6 text-emerald-600" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-purple-600" />;
      case "Laptop":
        return <Laptop className="w-6 h-6 text-indigo-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#133A27]" />;
    }
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
            <div className="flex items-center gap-0">
              <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

              {/* First half circle */}
              <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

              {/* Second half circle */}
              <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
            </div>
           We're Hiring Visionaries & Builders
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
            Build the Future of Deep Tech & AI Platforms
          </h1>
           

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join Zadroit's high-performance engineering culture in Salem,
            Bangalore, or Remote. We offer competitive pay, equity ESOPs,
            cutting-edge tech stacks, and relentless support for your personal
            growth.
          </p>
        </div>

        
      </section>

      {/* Perks & Benefits Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
            Why Engineers & Designers Love Zadroit
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A people-first workplace designed to help you do the best work of
            your career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturePerksData.map((perk) => (
            <div
              key={perk.id}
              className="light-card rounded-3xl p-6 flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getPerkIcon(perk.icon)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {perk.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Filter & Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              Current Openings ({filteredJobs.length})
            </div>
            <h2 className="text-3xl font-black text-[#090D16] font-heading">
              Find Your Next Career Move
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center pb-6 gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedDept === dept
                  ? "bg-[#ded725] text-[#142C42] shadow-sm"
                  : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              {dept}
            </button>
          ))}

          {/* <span className="text-slate-300 hidden sm:inline">|</span> */}
          {/* 
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLocation === loc
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {loc}
              </button>
            ))} */}
        </div>
        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="light-card rounded-3xl p-6 sm:p-8 bg-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {job.department}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {job.type}
                  </span>
                  {job.isUrgent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                       Urgent Need
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {job.shortDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-bold text-amber-700">
                    {job.salaryRange}
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => openModal({ type: "job-apply", job })}
                  className="w-full lg:w-auto px-7 py-3 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#142C42] font-bold text-sm shadow-sm flex items-center justify-center gap-2"
                >
                  {/* <Sparkles className="w-4 h-4 text-[#C6F135]" /> */}
                  <span>Apply for Role</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

