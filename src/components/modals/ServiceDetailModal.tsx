import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Service } from '../../types';
import { X, CheckCircle2, Cpu, Clock, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';

interface ServiceDetailModalProps {
  service: Service;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service }) => {
  const { closeModal, openModal } = useApp();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 pt-16 sm:pt-24 pb-12"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/20 animate-modal-in my-auto select-text">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              {service.category}
            </span>
            {service.isPopular && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                ★ Highly Requested
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">{service.title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">{service.fullDesc}</p>
        </div>

        {/* Visual / Asset Placeholder */}
        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200">
          <ImagePlaceholder
            src={service.imagePlaceholder}
            alt={service.title}
            category={service.category}
            label={`${service.title} Architecture`}
            aspectRatio="wide"
            dimensionsHint="1200 × 500"
            iconType="service"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Proven ROI Metric</span>
            </div>
            <div className="text-base font-black text-emerald-900 font-heading">{service.roiMetric}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Estimated Delivery</span>
            </div>
            <div className="text-base font-black text-amber-900 font-heading">{service.deliveryTimeline}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>Starting Estimate</span>
            </div>
            <div className="text-base font-black text-blue-900 font-heading">{service.startingPrice || 'Custom Quote'}</div>
          </div>
        </div>

        {/* Deliverables & Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Key Deliverables & Milestones
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Key Advantages & SLA
            </h4>
            <ul className="space-y-2">
              {service.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            Core Technology Stack:
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Need a custom SLA or dedicated squad? Let's discuss your roadmap.
          </div>
          <button
            onClick={() => {
              closeModal();
              openModal({ type: 'quote-modal', defaultService: service.title });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Proposal & Quote</span>
            <ArrowRight className="w-4 h-4 text-[#ded725]" />
          </button>
        </div>
      </div>
    </div>
  );
};
