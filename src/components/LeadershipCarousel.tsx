import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { teamMembersData } from "../data/websiteData";
import { useApp } from "../context/AppContext";
import { ScrollReveal } from "./ScrollReveal";
import type { TeamMember } from "../types";

// Clean LinkedIn Icon SVG
const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

// Organic blob clipPath IDs and border-radius presets
const BLOB_STYLES = [
  {
    clipId: "blob-shape-0",
    borderRadius: "50% 50% 45% 55% / 45% 55% 45% 55%",
  },
  {
    clipId: "blob-shape-1",
    borderRadius: "45% 55% 62% 38% / 42% 48% 52% 58%",
  },
  {
    clipId: "blob-shape-2",
    borderRadius: "52% 48% 38% 62% / 54% 46% 54% 46%",
  },
  {
    clipId: "blob-shape-3",
    borderRadius: "42% 58% 58% 42% / 46% 54% 46% 54%",
  },
  {
    clipId: "blob-shape-4",
    borderRadius: "48% 52% 44% 56% / 52% 42% 58% 48%",
  },
  {
    clipId: "blob-shape-5",
    borderRadius: "44% 56% 50% 50% / 48% 52% 48% 52%",
  },
];

export const LeadershipCarousel: React.FC = () => {
  const { navigate } = useApp();
  const total = teamMembersData.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  const touchStartX = useRef<number | null>(null);
  const prevSlotsRef = useRef<{ [key: number]: number }>({});

  const currentLeader: TeamMember = teamMembersData[currentIndex] || teamMembersData[0];

  // Track window resize for responsive orbital coordinates
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = useCallback((targetIdx: number) => {
    if (targetIdx === currentIndex) return;
    let diff = ((targetIdx - currentIndex) % total + total) % total;
    if (diff > total / 2) {
      diff -= total;
    }
    setDirection(diff >= 0 ? 1 : -1);
    setCurrentIndex(targetIdx);
  }, [currentIndex, total]);

  // Continuous auto-rotation carousel (pauses when hovered)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile responsiveness
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  /**
   * Compute Deterministic Staggered Arc Orbital Coordinates:
   *  - Active Center: Slot 0 (X = 0, Y = 0, scale 1.0)
   *  - Inner Satellites (Left / Right): Slot ±1 (X = ±240px, Y = +75px, scale 0.58)
   *  - Outer Satellites (Left / Right): Slot ±2 (X = ±430px, Y = +160px, scale 0.48)
   *  - Hidden Pockets (Left / Right): Slot ±3 (X = ±510px, Y = +220px, scale 0.25, opacity 0)
   */
  const getOrbitStyles = (itemIndex: number) => {
    const isDesktop = windowWidth >= 1024;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    // Orbital radius and elevation parameters based on screen size
    const rx1 = isDesktop ? 240 : isTablet ? 185 : 130;
    const ry1 = isDesktop ? 75 : isTablet ? 55 : 38;
    const rx2 = isDesktop ? 430 : isTablet ? 330 : 215;
    const ry2 = isDesktop ? 160 : isTablet ? 120 : 75;

    let offset = ((itemIndex - currentIndex) % total + total) % total;
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    }

    // Assign wrapping boundary items to the appropriate hidden exit pocket based on rotation direction
    let slot = offset;
    if (Math.abs(offset) === Math.floor(total / 2)) {
      slot = direction === 1 ? -Math.floor(total / 2) : Math.floor(total / 2);
    }

    let x = 0;
    let y = 0;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 30;
    let pointerEvents: "auto" | "none" = "auto";
    const isActive = slot === 0;

    if (slot === 0) {
      // Active center profile (100% ALWAYS mapped to currentIndex)
      x = 0;
      y = 0;
      scale = 1.0;
      opacity = 1.0;
      zIndex = 30;
    } else if (slot === 1) {
      // Inner-Right profile
      x = rx1;
      y = ry1;
      scale = isDesktop ? 0.58 : isTablet ? 0.52 : 0.42;
      opacity = 0.88;
      zIndex = 20;
    } else if (slot === 2) {
      // Outer-Right profile
      x = rx2;
      y = ry2;
      scale = isDesktop ? 0.48 : isTablet ? 0.40 : 0.32;
      opacity = isDesktop ? 0.78 : isTablet ? 0.65 : 0;
      zIndex = 10;
      if (!isDesktop && !isTablet) pointerEvents = "none";
    } else if (slot === -1) {
      // Inner-Left profile
      x = -rx1;
      y = ry1;
      scale = isDesktop ? 0.58 : isTablet ? 0.52 : 0.42;
      opacity = 0.88;
      zIndex = 20;
    } else if (slot === -2) {
      // Outer-Left profile
      x = -rx2;
      y = ry2;
      scale = isDesktop ? 0.48 : isTablet ? 0.40 : 0.32;
      opacity = isDesktop ? 0.78 : isTablet ? 0.65 : 0;
      zIndex = 10;
      if (!isDesktop && !isTablet) pointerEvents = "none";
    } else if (slot >= 3) {
      // Hidden Right Pocket (Off-screen right)
      x = rx2 + 80;
      y = ry2 + 60;
      scale = 0.25;
      opacity = 0;
      zIndex = 0;
      pointerEvents = "none";
    } else {
      // Hidden Left Pocket (Off-screen left)
      x = -rx2 - 80;
      y = ry2 + 60;
      scale = 0.25;
      opacity = 0;
      zIndex = 0;
      pointerEvents = "none";
    }

    const prevSlot = prevSlotsRef.current[itemIndex] ?? slot;
    const isWrapJump = Math.abs(prevSlot - slot) > 2;

    const transition = isWrapJump
      ? "none"
      : "transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1), opacity 0.65s ease, filter 0.65s ease";

    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      pointerEvents,
      isActive,
      transition,
      slot,
    };
  };

  // Keep previous slot record updated after render
  useEffect(() => {
    teamMembersData.forEach((_, idx) => {
      let offset = ((idx - currentIndex) % total + total) % total;
      if (offset > Math.floor(total / 2)) {
        offset -= total;
      }
      let slot = offset;
      if (Math.abs(offset) === Math.floor(total / 2)) {
        slot = direction === 1 ? -Math.floor(total / 2) : Math.floor(total / 2);
      }
      prevSlotsRef.current[idx] = slot;
    });
  }, [currentIndex, direction, total]);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative select-none bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Leadership & Core Architects Carousel"
    >
      {/* SVG Clip Path Definitions for Organic Curved Polygon Silhouettes */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          {/* Active Center Organic Heptagon / Curved Polygon */}
          <clipPath id="blob-shape-0" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.01 C 0.72 0.01 0.94 0.18 0.97 0.42 C 1.0 0.66 0.86 0.92 0.68 0.98 C 0.5 1.03 0.32 0.98 0.18 0.9 C 0.02 0.8 -0.01 0.6 0.02 0.42 C 0.06 0.18 0.28 0.01 0.5 0.01 Z" />
          </clipPath>

          {/* Organic Shape 1 (Top-Right) */}
          <clipPath id="blob-shape-1" clipPathUnits="objectBoundingBox">
            <path d="M 0.45 0.02 C 0.78 0.04 0.98 0.25 0.95 0.6 C 0.92 0.86 0.74 0.98 0.45 0.96 C 0.18 0.93 0.02 0.73 0.05 0.43 C 0.08 0.15 0.2 0.01 0.45 0.02 Z" />
          </clipPath>

          {/* Organic Shape 2 (Bottom-Right) */}
          <clipPath id="blob-shape-2" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.04 C 0.86 0.08 0.98 0.34 0.93 0.7 C 0.86 0.96 0.55 0.99 0.3 0.93 C 0.08 0.86 0.01 0.61 0.05 0.36 C 0.09 0.12 0.26 0.02 0.5 0.04 Z" />
          </clipPath>

          {/* Organic Shape 3 (Top-Left) */}
          <clipPath id="blob-shape-3" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.03 C 0.82 0.01 0.96 0.25 0.93 0.6 C 0.9 0.85 0.7 0.98 0.45 0.96 C 0.18 0.93 0.02 0.76 0.05 0.46 C 0.08 0.18 0.22 0.05 0.5 0.03 Z" />
          </clipPath>

          {/* Organic Shape 4 (Bottom-Left) */}
          <clipPath id="blob-shape-4" clipPathUnits="objectBoundingBox">
            <path d="M 0.35 0.04 C 0.72 0.01 0.96 0.2 0.98 0.55 C 1 0.82 0.75 0.98 0.45 0.96 C 0.15 0.93 0.01 0.72 0.05 0.4 C 0.09 0.16 0.18 0.07 0.35 0.04 Z" />
          </clipPath>

          {/* Organic Shape 5 */}
          <clipPath id="blob-shape-5" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.02 C 0.8 0.04 0.96 0.28 0.94 0.62 C 0.9 0.88 0.72 0.98 0.48 0.96 C 0.2 0.93 0.04 0.76 0.05 0.48 C 0.06 0.2 0.24 0.02 0.5 0.02 Z" />
          </clipPath>
        </defs>
      </svg>

      <ScrollReveal variant="fade-up">
        {/* Section Heading with Brand Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ded725]/25 text-[#13273B] border border-[#ded725]/40 text-xs font-bold mb-3 shadow-xs">
            <div className="flex items-center gap-0">
              <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
              <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
            </div>
            Leadership & Core Architects
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading tracking-tight">
            Meet the Minds Behind Zadroit
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            A passionate collective of software architects, AI researchers, and engineering leaders shaping next-generation digital platforms.
          </p>
        </div>

        {/* 3D Staggered Orbital Carousel Stage */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col items-center justify-start pt-2">

          {/* Ambient Glowing Halo behind center profile */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-tr from-[#32679a]/25 via-blue-400/20 to-[#26c698]/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Left and Right Manual Navigation Arrows (Snugly flanking the center profile with ZERO overlap on side profiles) */}
          <div className="absolute top-22 sm:top-26 md:top-28 left-1/2 -translate-x-1/2 w-full max-w-[290px] sm:max-w-[320px] md:max-w-[335px] flex items-center justify-between pointer-events-none z-40 px-1">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-[#32679a] text-slate-700 hover:text-[#32679a] flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-110 cursor-pointer"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.4]" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-slate-200/90 shadow-md hover:shadow-lg hover:border-[#32679a] text-slate-700 hover:text-[#32679a] flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-110 cursor-pointer"
              aria-label="Next team member"
            >
              <ChevronRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.4]" />
            </button>
          </div>

          {/* ================= 3D STAGGERED ORBIT PROFILE ITEMS ================= */}
          <div className="relative w-full h-72 sm:h-80 md:h-[330px] flex items-center justify-center">
            {teamMembersData.map((member, idx) => {
              const { x, y, scale, opacity, zIndex, pointerEvents, isActive, transition } = getOrbitStyles(idx);
              const blobStyle = BLOB_STYLES[idx % BLOB_STYLES.length];

              return (
                <div
                  key={member.id}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents,
                    transition,
                  }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer will-change-transform group"
                  onClick={() => !isActive && handleSelect(idx)}
                >
                  {/* Container with Organic Mask & Soft Glow */}
                  <div
                    className={`relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 overflow-hidden bg-slate-900 transition-all duration-700 ${isActive
                      ? "shadow-2xl ring-4 ring-[#32679a]/20 drop-shadow-[0_20px_35px_rgba(50,103,154,0.3)]"
                      : "shadow-md hover:scale-105 hover:shadow-xl"
                      }`}
                    style={{
                      clipPath: `url(#${isActive ? "blob-shape-0" : blobStyle.clipId})`,
                      borderRadius: blobStyle.borderRadius,
                    }}
                  >
                    {/* Member Photo (100% CLEAR by default) */}
                    <img
                      src={member.image || member.avatarPlaceholder}
                      alt={member.name}
                      className={`w-full h-full object-cover object-top transition-all duration-500 ${isActive
                        ? "grayscale-0 contrast-[1.04] brightness-100 scale-100"
                        : "grayscale contrast-[1.1] brightness-[0.96] group-hover:grayscale-0 group-hover:scale-105"
                        }`}
                      loading="lazy"
                    />

                    {/* ONLY ON HOVER: Show clean LinkedIn Icon and Overlay (Otherwise completely clear profile) */}
                    {isActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                        {member.social?.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-4 rounded-full bg-[#0077b5] hover:bg-[#005f93] text-white shadow-lg shadow-black/30 font-semibold text-xs tracking-wide transition-all duration-300 hover:scale-108 cursor-pointer"
                            aria-label={`${member.name} LinkedIn Profile`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <LinkedinIcon className="w-6 h-6" />
                            {/* <span>LinkedIn</span> */}
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Satellite name tooltip on hover */}
                  {!isActive && (
                    <span className="mt-2 text-[11px] font-bold text-slate-500 group-hover:text-[#32679a] transition-colors opacity-0 group-hover:opacity-100 duration-200">
                      {member.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= ACTIVE PROFILE DETAILS (NAME, ROLE, BIO, CTA) ================= */}
          <div
            key={currentLeader.id}
            className="text-center max-w-2xl mx-auto mt-2 sm:mt-4 px-4 animate-fade-in-up"
          >
            {/* Team Member Name in Bold Dark Blue */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#13273B] font-heading tracking-tight">
              {currentLeader.name}
            </h3>

            {/* Job Title in Smaller Light-Gray Text */}
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1 tracking-wide">
              {currentLeader.role}
            </div>

            {/* 2–3 Line Description Paragraph */}
            <p className="mt-3.5 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
              {currentLeader.quote || currentLeader.bio}
            </p>

            {/* Rounded Turquoise/Green "Join the team" Button */}
            <div className="mt-6 sm:mt-7">
              <button
                type="button"
                onClick={() => navigate("careers")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#26c698] hover:bg-[#1fa982] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#26c698]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Join the team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Bottom Dot Nav Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {teamMembersData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex
                  ? "w-6 bg-[#32679a]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};
