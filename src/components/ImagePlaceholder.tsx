import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Layers, Box, Cpu } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  className?: string;
  label?: string;
  category?: string;
  dimensionsHint?: string;
  iconType?: 'default' | 'product' | 'service' | 'ai' | 'avatar';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  className = '',
  label,
  category,
  dimensionsHint = '1200 × 800',
  iconType = 'default'
}) => {
  const [imageError, setImageError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'wide':
        return 'aspect-[21/9]';
      default:
        return '';
    }
  };

  const renderIcon = () => {
    switch (iconType) {
      case 'product':
        return <Box className="w-10 h-10 text-amber-400 stroke-[1.5]" />;
      case 'service':
        return <Layers className="w-10 h-10 text-blue-400 stroke-[1.5]" />;
      case 'ai':
        return <Cpu className="w-10 h-10 text-emerald-400 stroke-[1.5]" />;
      default:
        return <ImageIcon className="w-10 h-10 text-slate-400 stroke-[1.5]" />;
    }
  };

  // If user provided a real valid image path that didn't error out
  if (src && !imageError) {
    return (
      <div className={`relative overflow-hidden rounded-2xl group ${getAspectClass()} ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs text-slate-300 font-medium px-2 py-1 rounded bg-slate-900/80 backdrop-blur-sm border border-slate-700">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  // Modern Agency Styled Placeholder Graphic
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 border border-slate-800/80 group flex flex-col items-center justify-center p-6 text-center select-none shadow-inner ${getAspectClass()} ${className}`}
    >
      {/* Decorative Grid Mesh & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl group-hover:bg-blue-600/25 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />

      {/* Center Icon & Branding */}
      <div className="relative z-10 flex flex-col items-center max-w-[85%]">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center mb-3 shadow-lg group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300">
          {renderIcon()}
        </div>

        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1.5">
            {category}
          </span>
        )}

        <h4 className="text-sm font-semibold text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
          {label || alt}
        </h4>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Placeholder ({dimensionsHint})</span>
        </div>
      </div>

      {/* Floating corner tech markers */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-950/60">
        ZADROIT ASSET
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 opacity-60">
        SVG / PNG
      </div>
    </div>
  );
};
