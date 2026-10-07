import React, { useState } from "react";
import { Maximize2, Layers, Eye, Sparkles } from "lucide-react";

interface ProductCollageProps {
  images?: string[];
  captions?: string[];
  productName: string;
  category: string;
  fallbackPlaceholder?: string;
  onOpenDemo?: () => void;
}

export const ProductCollage: React.FC<ProductCollageProps> = ({
  images = [],
  captions = [],
  productName,
  category,
  fallbackPlaceholder,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null);

  // Ensure we have at least 2-3 images to display
  const displayImages = images.length > 0 ? images : [
    fallbackPlaceholder || "/images/products/zaderp-1.jpg",
    "/images/products/zaderp-2.jpg",
    "/images/products/zaderp-3.jpg",
  ];

  const displayCaptions = captions.length > 0 ? captions : [
    "Platform Architecture",
    "Live Analytics & Metrics",
    "Operations & Workflows",
  ];

  const primaryImage = displayImages[activeIdx] || displayImages[0];
  const primaryCaption = displayCaptions[activeIdx] || `${productName} Interface`;

  // Secondary images (excluding active or showing all remaining)
  const secondaryItems = displayImages
    .map((img, idx) => ({ img, caption: displayCaptions[idx] || `Module ${idx + 1}`, idx }))
    .filter((item) => item.idx !== activeIdx);

  // If 3 total images, secondaryItems has 2 items. If 2 images, it has 1 item.
  const isSingleSecondary = secondaryItems.length === 1;

  return (
    <div className="w-full h-full flex flex-col gap-3.5 sm:gap-4 justify-between select-none">
      {/* ================= PRIMARY FEATURED IMAGE ================= */}
      <div
        onClick={() => setLightboxImg({ src: primaryImage, caption: primaryCaption })}
        className="flex-[1.4] min-h-[220px] sm:min-h-[270px] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl bg-slate-900/10 group/main cursor-pointer transition-all duration-500"
      >
        {/* Main Image */}
        <img
          src={primaryImage}
          alt={`${productName} - ${primaryCaption}`}
          className="w-full h-full object-cover group-hover/main:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";
          }}
        />

        {/* Ambient Overlay & Glass Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/85 via-[#090D16]/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge Pills */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#ded725]" />
            <span>{category}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-mono opacity-90 group-hover/main:opacity-100 transition-opacity">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Live View</span>
          </div>
        </div>

        {/* Bottom Caption & Expand Trigger */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
          <div className="space-y-0.5 max-w-[80%]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#ded725] font-bold block">
              Featured Snapshot
            </span>
            <h4 className="text-white text-xs sm:text-sm font-bold truncate drop-shadow-sm">
              {primaryCaption}
            </h4>
          </div>

          <button
            type="button"
            title="Expand image preview"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImg({ src: primaryImage, caption: primaryCaption });
            }}
            className="w-8 h-8 rounded-full bg-white/25 hover:bg-[#ded725] text-white hover:text-slate-950 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-md group-hover/main:scale-110 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ================= SECONDARY COLLAGE TILES ================= */}
      <div
        className={`flex-1 min-h-[130px] sm:min-h-[160px] grid gap-3 sm:gap-4 ${
          isSingleSecondary ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {secondaryItems.map((item) => (
          <div
            key={item.idx}
            onClick={() => setActiveIdx(item.idx)}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg bg-slate-900/10 group/sub cursor-pointer transition-all duration-300 hover:border-[#ded725] hover:-translate-y-0.5"
          >
            <img
              src={item.img}
              alt={`${productName} - ${item.caption}`}
              className="w-full h-full object-cover group-hover/sub:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80";
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-[#090D16]/20 to-transparent pointer-events-none group-hover/sub:from-[#090D16]/65 transition-colors" />

            {/* Caption & Switch Icon */}
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <div className="self-end opacity-0 group-hover/sub:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20 text-[10px] text-[#ded725] font-semibold">
                  <Eye className="w-3 h-3" />
                  <span>Click to feature</span>
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-300 font-semibold block">
                  Snapshot #{item.idx + 1}
                </span>
                <p className="text-white text-[11px] sm:text-xs font-bold leading-tight line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl animate-modal-in"
          >
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#ded725] font-mono uppercase font-bold">
                  {productName} • High-Resolution View
                </span>
                <h3 className="text-white font-bold text-sm sm:text-base mt-0.5">
                  {lightboxImg.caption}
                </h3>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="p-2 sm:p-4 bg-slate-950 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="w-auto h-auto max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
