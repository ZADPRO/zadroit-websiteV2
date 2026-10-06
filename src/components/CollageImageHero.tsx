import React, { useState, useEffect, useRef } from 'react';
import { Upload, ArrowUpRight, Play, Pause, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CollageImageHeroProps {
  initialImage?: string;
  autoPlayInterval?: number; // interval in milliseconds, default 3000ms (3 seconds)
}

export const CollageImageHero: React.FC<CollageImageHeroProps> = ({
  autoPlayInterval = 4000
}) => {
  const { showToast, triggerConfetti } = useApp();
  const [templateOption, setTemplateOption] = useState<'option1' | 'option2'>('option2'); // Option 2 matches reference image by default
  const [currentPresetIndex, setCurrentPresetIndex] = useState<number>(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isGrayscale, setIsGrayscale] = useState<boolean>(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const samplePresets = [
    {
      name: 'Agency Team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Creative Studio',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Tech Founders',
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  // Automatic transition between presets (when playing)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || customImage) return;

    const interval = setInterval(() => {
      setCurrentPresetIndex((prevIndex) => (prevIndex + 1) % samplePresets.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, customImage, samplePresets.length, autoPlayInterval]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        showToast('Invalid File', 'Please upload a valid image file (PNG, JPG, WEBP).', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          triggerConfetti();
          showToast('Image Updated! 🎨', 'Your image has been split into the 4-piece agency collage.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (idx: number) => {
    setCustomImage(null);
    setCurrentPresetIndex(idx);
  };

  // Helper to render slice with master coordinate alignment & smooth transition
  const renderSlice = (sliceStyle: React.CSSProperties) => (
    <div className="w-full h-full relative overflow-hidden bg-slate-100">
      {samplePresets.map((preset, idx) => {
        const isActive = !customImage && currentPresetIndex === idx;
        return (
          <div
            key={preset.url}
            className={`absolute bg-no-repeat transition-all duration-[1200ms] ease-in-out will-change-[opacity,transform,filter] ${
              isGrayscale ? 'grayscale contrast-[1.12] brightness-[0.98]' : ''
            } ${
              isActive
                ? 'opacity-100 scale-100 blur-0 z-10 pointer-events-auto'
                : 'opacity-0 scale-105 blur-[6px] pointer-events-none z-0'
            }`}
            style={{
              backgroundImage: `url(${preset.url})`,
              backgroundSize: '100% 100%',
              ...sliceStyle
            }}
          />
        );
      })}

      {customImage && (
        <div
          className={`absolute bg-no-repeat transition-all duration-[1200ms] ease-in-out will-change-[opacity,transform,filter] ${
            isGrayscale ? 'grayscale contrast-[1.12] brightness-[0.98]' : ''
          } opacity-100 scale-100 blur-0 z-10`}
          style={{
            backgroundImage: `url(${customImage})`,
            backgroundSize: '100% 100%',
            ...sliceStyle
          }}
        />
      )}
    </div>
  );

  // Helper for Option 1 grid layout
  const renderImageLayersOpt1 = (innerClasses: string, bgPosition: string) => (
    <>
      {samplePresets.map((preset, idx) => {
        const isActive = !customImage && currentPresetIndex === idx;
        return (
          <div
            key={preset.url}
            className={`${innerClasses} bg-cover bg-no-repeat transition-all duration-[1200ms] ease-in-out will-change-[opacity,transform,filter] ${
              isGrayscale ? 'grayscale contrast-[1.15] brightness-[0.96]' : ''
            } ${
              isActive
                ? 'opacity-100 scale-100 blur-0 z-10 pointer-events-auto'
                : 'opacity-0 scale-110 blur-[10px] pointer-events-none z-0'
            }`}
            style={{
              backgroundImage: `url(${preset.url})`,
              backgroundPosition: bgPosition
            }}
          />
        );
      })}

      {customImage && (
        <div
          className={`${innerClasses} bg-cover bg-no-repeat transition-all duration-[1200ms] ease-in-out will-change-[opacity,transform,filter] ${
            isGrayscale ? 'grayscale contrast-[1.15] brightness-[0.96]' : ''
          } opacity-100 scale-100 blur-0 z-10`}
          style={{
            backgroundImage: `url(${customImage})`,
            backgroundPosition: bgPosition
          }}
        />
      )}
    </>
  );

  return (
    <div
      className="relative w-full max-w-[580px] mx-auto select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden file input for custom image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* SVG ClipPaths Defining the Exact Organic Curves from the Annotated Red & Blue Lines */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          {/* Card 1 (Left Card): Smooth outward convex curve on right edge (Blue Line ')') with rounded corners */}
          <clipPath id="exactCard1Clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.10,0 L 0.80,0 C 0.90,0 0.96,0.06 0.98,0.18 C 1.03,0.36 1.03,0.64 0.98,0.82 C 0.96,0.94 0.90,1 0.80,1 L 0.10,1 C 0.04,1 0,0.94 0,0.86 L 0,0.14 C 0,0.06 0.04,0 0.10,0 Z" />
          </clipPath>

          {/* Card 2 (Top Right Card): Slanted aerodynamic top-right, deep bottom-left scoop curve (Red Line) */}
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
      {/* OPTION 2: EXACT REFERENCE SIGNATURE COLLAGE TEMPLATE (100% ACCURATE)      */}
      {/* ========================================================================= */}
      {templateOption === 'option2' && (
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
              top: '-41.7%'
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
              top: '-11.1%'
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
              top: '-118.5%'
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
              top: '-225.9%'
            })}
          </div>

          {/* ================= ROTATING "HIRE US" SCALLOPED BADGE ================= */}
          <div className="absolute left-[8%] top-[56%] z-30 pointer-events-auto">
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
              <svg
                className="w-full h-full animate-spin-slow text-[#133A27] drop-shadow-xl"
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
                <circle cx="50" cy="50" r="48" fill="#133A27" />
                {/* 24 Scalloped Teeth around perimeter */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <circle
                      key={i}
                      cx={50 + 44 * Math.cos((angle * Math.PI) / 180)}
                      cy={50 + 44 * Math.sin((angle * Math.PI) / 180)}
                      r="6"
                      fill="#133A27"
                    />
                  );
                })}
                {/* Text along circle */}
                <text className="text-[9px] font-black uppercase tracking-[3.6px] fill-[#C6F135] font-mono">
                  <textPath href="#hireUsCirclePathExact" startOffset="0%">
                    • HIRE US • HIRE US • HIRE US
                  </textPath>
                </text>
              </svg>

              {/* Inner Lime Circle with Dark Green Flight Arrow (diagonal arrow with crossbar wing) */}
              <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C6F135] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#133A27]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="9 6 18 6 18 15" />
                  <line x1="8" y1="14" x2="14" y2="8" />
                </svg>
              </div>
            </div>
          </div>

          {/* ================= FLOATING LIME 4-POINT SPARKLE STARS ================= */}
          {/* Main Large Sparkle Star (Bottom Right Outer) */}
          <div className="absolute left-[78%] top-[69%] z-30 pointer-events-none animate-pulse-glow">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-[#C6F135] drop-shadow-md"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
            </svg>
          </div>

          {/* Medium Sparkle Star (Overlapping Forearm in Card 4) */}
          <div className="absolute left-[71%] top-[68%] z-30 pointer-events-none opacity-95">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6F135] drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
            </svg>
          </div>

          {/* Small Sparkle Star (Lower Center) */}
          <div className="absolute left-[73%] top-[78%] z-30 pointer-events-none opacity-85">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6F135]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OPTION 1: CLASSIC 4-PIECE ARCH GRID COLLAGE TEMPLATE                       */}
      {/* ========================================================================= */}
      {templateOption === 'option1' && (
        <div className="relative w-full aspect-[1.12/1] grid grid-cols-12 gap-3.5 p-2">
          {/* Piece 1: Left Tall Arch Card */}
          <div className="col-span-6 h-full relative overflow-hidden rounded-t-[100px] rounded-b-[28px] bg-slate-100 border border-slate-200 shadow-md group/card">
            {renderImageLayersOpt1('w-[205%] h-full absolute top-0 left-0', 'left center')}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />
          </div>

          {/* Pieces 2, 3, 4: Right Column */}
          <div className="col-span-6 h-full flex flex-col justify-between gap-3.5">
            {/* Top Right Card */}
            <div className="relative w-full h-[31.5%] overflow-hidden rounded-tr-[75px] rounded-tl-[20px] rounded-b-[20px] bg-slate-100 border border-slate-200 shadow-sm group/card">
              {renderImageLayersOpt1('w-[205%] h-[317%] absolute -top-0 -left-[105%]', 'right top')}
            </div>

            {/* Middle Right Card */}
            <div className="relative w-full h-[31.5%] overflow-hidden rounded-[20px] bg-slate-100 border border-slate-200 shadow-sm group/card">
              {renderImageLayersOpt1('w-[205%] h-[317%] absolute -top-[108%] -left-[105%]', 'right center')}
            </div>

            {/* Bottom Right Card */}
            <div className="relative w-full h-[31.5%] overflow-hidden rounded-br-[75px] rounded-tl-[20px] rounded-bl-[20px] bg-slate-100 border border-slate-200 shadow-sm group/card">
              {renderImageLayersOpt1('w-[205%] h-[317%] absolute -top-[217%] -left-[105%]', 'right bottom')}
            </div>
          </div>

          {/* Option 1 Badge */}
          {/* <div className="absolute left-[2%] bottom-[-2%] -translate-x-1/2 z-20 pointer-events-auto">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <svg className="w-full h-full animate-spin-slow text-[#133A27] drop-shadow-lg " viewBox="0 0 100 100">
                <defs>
                  <path id="hireUsCirclePathOpt1" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <path fill="currentColor" d="M50 0 L58 8 L69 4 L74 15 L86 16 L87 27 L98 33 L94 44 L100 53 L92 61 L93 72 L83 77 L79 88 L68 88 L61 97 L50 93 L39 97 L32 88 L21 88 L17 77 L7 72 L8 61 L0 53 L6 44 L2 33 L13 27 L14 16 L26 15 L31 4 L42 8 Z" />
                <text className="text-[9.5px] font-extrabold uppercase tracking-[3.2px] fill-[#C6F135] font-mono">
                  <textPath href="#hireUsCirclePathOpt1" startOffset="0%">
                    • HIRE US • HIRE US • HIRE US
                  </textPath>
                </text>
              </svg>
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C6F135] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#133A27] stroke-[3]" />
              </div>
            </div>
          </div> */}
          <div className="absolute left-[2%] bottom-[-2%] -translate-x-1/2 z-20 pointer-events-auto">
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
              <svg
                className="w-full h-full animate-spin-slow text-[#133A27] drop-shadow-xl"
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
                <circle cx="50" cy="50" r="48" fill="#133A27" />
                {/* 24 Scalloped Teeth around perimeter */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <circle
                      key={i}
                      cx={50 + 44 * Math.cos((angle * Math.PI) / 180)}
                      cy={50 + 44 * Math.sin((angle * Math.PI) / 180)}
                      r="6"
                      fill="#133A27"
                    />
                  );
                })}
                {/* Text along circle */}
                <text className="text-[9px] font-black uppercase tracking-[3.6px] fill-[#C6F135] font-mono">
                  <textPath href="#hireUsCirclePathExact" startOffset="0%">
                    • HIRE US • HIRE US • HIRE US
                  </textPath>
                </text>
              </svg>

              {/* Inner Lime Circle with Dark Green Flight Arrow (diagonal arrow with crossbar wing) */}
              <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C6F135] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#133A27]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="9 6 18 6 18 15" />
                  <line x1="8" y1="14" x2="14" y2="8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Option 1 Sparkle Star */}
          <div className="absolute right-[-8px] bottom-[-8px] sm:right-[-12px] sm:bottom-[-12px] z-20 pointer-events-none animate-pulse-glow">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#C6F135] drop-shadow-md" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C50 32, 68 50, 100 50 C68 50, 50 68, 50 100 C50 68, 32 50, 0 50 C32 50, 50 32, 50 0 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING CONTROLS BAR WITH OPTION 1 / OPTION 2 TEMPLATE SWITCHER           */}
      {/* ========================================================================= */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        {/* Template Selector Button: Option 1 vs Option 2 */}
        <div className="flex items-center gap-1 bg-slate-900 text-white p-1 rounded-full shadow-sm border border-slate-800">
          <button
            type="button"
            onClick={() => setTemplateOption('option2')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              templateOption === 'option2'
                ? 'bg-[#C6F135] text-[#133A27] shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Option 2: Exact Screenshot Signature Layout"
          >
            <Sparkles className="w-3 h-3" />
            <span>Option 2 (Screenshot)</span>
          </button>

          <button
            type="button"
            onClick={() => setTemplateOption('option1')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              templateOption === 'option1'
                ? 'bg-[#C6F135] text-[#133A27] shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Option 1: Classic Arch Grid Layout"
          >
            <Layers className="w-3 h-3" />
            <span>Option 1 (Arch)</span>
          </button>
        </div>

        {/* Upload Custom Image */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded-full bg-[#133A27] text-[#C6F135] hover:bg-[#0c2619] font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          title="Upload an image to split it across the 4 collage cards"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Image</span>
        </button>

        {/* Grayscale Toggle */}
        <button
          type="button"
          onClick={() => setIsGrayscale(!isGrayscale)}
          className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
            isGrayscale
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          {isGrayscale ? 'Grayscale' : 'Color'}
        </button>

        {/* Preset Switcher & Auto-Play Controls (3s smooth smudge transitions) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
          {samplePresets.map((preset, idx) => {
            const isActive = !customImage && currentPresetIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`relative px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#133A27] font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title={preset.name}
              >
                {isActive && isAutoPlaying && !isHovered && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
                )}
                <span>Preset {idx + 1}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-white transition-all cursor-pointer ml-0.5"
            title={isAutoPlaying ? 'Pause Auto Slideshow' : 'Start Auto Slideshow'}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>

        {customImage && (
          <button
            type="button"
            onClick={() => {
              setCustomImage(null);
              setIsAutoPlaying(true);
            }}
            className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold hover:bg-amber-200 transition-all flex items-center gap-1 cursor-pointer"
            title="Resume Preset Slideshow"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Presets</span>
          </button>
        )}
      </div>
    </div>
  );
};
