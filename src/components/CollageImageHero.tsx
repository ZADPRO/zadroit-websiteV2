import React, { useState, useEffect } from 'react';

interface CollageImageHeroProps {
  autoPlayInterval?: number; // interval in milliseconds, default 3500ms
}

export const CollageImageHero: React.FC<CollageImageHeroProps> = ({
  autoPlayInterval = 3500,
}) => {
  const [currentPresetIndex, setCurrentPresetIndex] = useState<number>(0);

  const samplePresets = [
    {
      name: 'Agency Team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Creative Studio',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Tech Founders',
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  // Continuous automatic transition between presets (always autoplay)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPresetIndex((prevIndex) => (prevIndex + 1) % samplePresets.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, samplePresets.length]);

  // Helper to render slice with master coordinate alignment & smooth transition
  const renderSlice = (sliceStyle: React.CSSProperties) => (
    <div className="w-full h-full relative overflow-hidden bg-slate-100">
      {samplePresets.map((preset, idx) => {
        const isActive = currentPresetIndex === idx;
        return (
          <div
            key={preset.url}
            className={`absolute bg-no-repeat transition-all duration-[1200ms] ease-in-out will-change-[opacity,transform,filter] grayscale group-hover:grayscale-0 contrast-[1.12] brightness-[0.98] ${
              isActive
                ? 'opacity-100 scale-100 blur-0 z-10 pointer-events-auto'
                : 'opacity-0 scale-105 blur-[6px] pointer-events-none z-0'
            }`}
            style={{
              backgroundImage: `url(${preset.url})`,
              backgroundSize: '100% 100%',
              ...sliceStyle,
            }}
          />
        );
      })}
    </div>
  );

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none group">
      {/* SVG ClipPaths Defining the Exact Organic Curves */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          {/* Card 1 (Left Card): Smooth outward convex curve on right edge with rounded corners */}
          <clipPath id="exactCard1Clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.10,0 L 0.80,0 C 0.90,0 0.96,0.06 0.98,0.18 C 1.03,0.36 1.03,0.64 0.98,0.82 C 0.96,0.94 0.90,1 0.80,1 L 0.10,1 C 0.04,1 0,0.94 0,0.86 L 0,0.14 C 0,0.06 0.04,0 0.10,0 Z" />
          </clipPath>

          {/* Card 2 (Top Right Card): Slanted aerodynamic top-right, deep bottom-left scoop curve */}
          <clipPath id="exactCard2Clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0 L 0.74,0 C 0.84,0 0.92,0.06 0.96,0.18 L 1,0.76 C 1.01,0.88 0.94,1 0.84,1 L 0.45,1 C 0.25,1 0.08,0.94 0.02,0.68 L 0,0.16 C 0,0.06 0.03,0 0.08,0 Z" />
          </clipPath>

          {/* Card 3 (Middle Right Card): Smooth rounded corners, convex outward capsule right edge */}
          <clipPath id="exactCard3Clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0 L 0.82,0 C 0.90,0 0.96,0.08 0.98,0.20 C 1.03,0.38 1.03,0.62 0.98,0.80 C 0.96,0.92 0.90,1 0.82,1 L 0.08,1 C 0.02,1 0,0.92 0,0.80 L 0,0.20 C 0,0.08 0.02,0 0.08,0 Z" />
          </clipPath>

          {/* Card 4 (Bottom Right Card): Angled dynamic shape with slanted left and right edges */}
          <clipPath id="exactCard4Clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.16,0 L 0.90,0 C 0.96,0 0.99,0.08 0.98,0.20 L 0.86,0.76 C 0.82,0.90 0.74,1 0.60,1 L 0.16,1 C 0.06,1 0,0.92 0,0.78 L 0.06,0.22 C 0.08,0.10 0.11,0 0.16,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* OPTION 2: EXACT SIGNATURE COLLAGE TEMPLATE (ALWAYS ACTIVE & AUTOPLAYING)   */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[1.15/1] max-w-[560px] mx-auto">
        {/* Top-Left Subtle Gray Dot Matrix Pattern */}
        <div className="absolute top-[3%] left-[3%] w-24 h-16 pointer-events-none z-0 opacity-70">
          <svg className="w-full h-full text-slate-300" fill="currentColor" viewBox="0 0 100 70">
            <circle cx="10" cy="14" r="3.8" />
            <circle cx="34" cy="10" r="4.2" />
            <circle cx="58" cy="16" r="3.8" />
            <circle cx="82" cy="12" r="3.5" />
            <circle cx="20" cy="38" r="4.2" />
            <circle cx="44" cy="36" r="4.5" />
            <circle cx="68" cy="40" r="3.8" />
            <circle cx="30" cy="62" r="3.6" />
          </svg>
        </div>

        {/* ================= PIECE 1: LEFT CARD (Curved Right Edge ')') ================= */}
        <div
          className="absolute left-[17%] top-[24%] w-[31%] h-[48%] z-10 group/card drop-shadow-sm"
          style={{ clipPath: 'url(#exactCard1Clip)' }}
        >
          {renderSlice({
            width: '235.5%',
            height: '183.3%',
            left: '-6.5%',
            top: '-41.7%',
          })}
        </div>

        {/* ================= PIECE 2: TOP RIGHT CARD (Slanted Aerodynamic Curve + Bottom-Left Scoop) ================= */}
        <div
          className="absolute left-[47%] top-[7%] w-[40%] h-[27%] z-10 group/card drop-shadow-sm"
          style={{ clipPath: 'url(#exactCard2Clip)' }}
        >
          {renderSlice({
            width: '182.5%',
            height: '325.9%',
            left: '-80.0%',
            top: '-11.1%',
          })}
        </div>

        {/* ================= PIECE 3: MIDDLE RIGHT CARD (Outward Curved Edge) ================= */}
        <div
          className="absolute left-[51%] top-[36%] w-[37%] h-[27%] z-10 group/card drop-shadow-sm"
          style={{ clipPath: 'url(#exactCard3Clip)' }}
        >
          {renderSlice({
            width: '197.3%',
            height: '325.9%',
            left: '-97.3%',
            top: '-118.5%',
          })}
        </div>

        {/* ================= PIECE 4: BOTTOM RIGHT CARD (Angled / Dynamic Base) ================= */}
        <div
          className="absolute left-[47%] top-[65%] w-[40%] h-[27%] z-10 group/card drop-shadow-sm"
          style={{ clipPath: 'url(#exactCard4Clip)' }}
        >
          {renderSlice({
            width: '182.5%',
            height: '325.9%',
            left: '-80.0%',
            top: '-225.9%',
          })}
        </div>

        {/* ================= ROTATING "HIRE US" SCALLOPED BADGE ================= */}
        <div className="absolute left-[8%] top-[56%] z-30 pointer-events-auto">
          <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
            <svg
              className="w-full h-full animate-spin-slow text-[#787414] drop-shadow-xl"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="hireUsCirclePathExact"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              {/* 24-point smooth scalloped circle path matching reference exactly */}
              <path
                fill="currentColor"
                d="M 98.50 50.00 C 98.70 52.48, 93.71 57.69, 91.56 59.00 C 89.41 60.30, 89.87 67.70, 87.41 69.53 C 84.95 71.36, 78.47 73.38, 75.67 75.74 C 72.87 78.09, 67.33 82.34, 64.28 83.65 C 61.22 84.95, 54.60 84.95, 61.55 83.65 C 58.49 82.34, 52.95 78.09, 50.15 75.74 C 47.35 73.38, 40.87 71.36, 38.41 69.53 C 35.95 67.70, 36.41 60.30, 34.26 59.00 C 32.11 57.69, 27.12 52.48, 27.32 50.00 Z"
              />
              {/* Clean dense 24-point scalloped seal */}
              <path
                fill="currentColor"
                d="M 98.50 50.00 C 98.70 52.48, 93.71 57.69, 91.56 59.00 C 89.41 60.30, 89.87 67.70, 87.41 69.53 C 84.95 71.36, 78.47 73.38, 75.67 75.74 C 72.87 78.09, 67.33 82.34, 64.28 83.65 C 61.22 84.95, 54.60 84.95, 51.55 83.65 C 48.49 82.34, 42.95 78.09, 40.15 75.74 C 37.35 73.38, 30.87 71.36, 28.41 69.53 C 25.95 67.70, 26.41 60.30, 24.26 59.00 C 22.11 57.69, 17.12 52.48, 17.32 50.00 C 17.12 47.52, 22.11 42.31, 24.26 41.00 C 26.41 39.70, 25.95 32.30, 28.41 30.47 C 30.87 28.64, 37.35 26.62, 40.15 24.26 C 42.95 21.91, 48.49 17.66, 51.55 16.35 C 54.60 15.05, 61.22 15.05, 64.28 16.35 C 67.33 17.66, 72.87 21.91, 75.67 24.26 C 78.47 26.62, 84.95 28.64, 87.41 30.47 C 89.87 32.30, 89.41 39.70, 91.56 41.00 C 93.71 42.31, 98.70 47.52, 98.50 50.00 Z"
              />
              <circle cx="50" cy="50" r="48" fill="#787414" />
              {/* 24 Scalloped Teeth around perimeter */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                return (
                  <circle
                    key={i}
                    cx={50 + 44 * Math.cos((angle * Math.PI) / 180)}
                    cy={50 + 44 * Math.sin((angle * Math.PI) / 180)}
                    r="6"
                    fill="#787414"
                  />
                );
              })}
              {/* Text along circle */}
              <text className="text-[9px] font-black uppercase tracking-[3.6px] fill-[#32679a] font-mono">
                <textPath href="#hireUsCirclePathExact" startOffset="0%">
                  • HIRE US • HIRE US • HIRE US
                </textPath>
              </text>
            </svg>

            {/* Inner Circle with Flight Arrow */}
            <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#DED725] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#787414]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
        </div>

        {/* ================= FLOATING SPARKLE STARS ================= */}
        {/* Main Large Sparkle Star (Bottom Right Outer) */}
        <div className="absolute left-[78%] top-[69%] z-30 pointer-events-none animate-pulse-glow">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 text-[#DED725] drop-shadow-md"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
          </svg>
        </div>

        {/* Medium Sparkle Star (Overlapping Forearm in Card 4) */}
        <div className="absolute left-[71%] top-[68%] z-30 pointer-events-none opacity-95">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#DED725] drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
          </svg>
        </div>

        {/* Small Sparkle Star (Lower Center) */}
        <div className="absolute left-[73%] top-[78%] z-30 pointer-events-none opacity-85">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DED725]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
