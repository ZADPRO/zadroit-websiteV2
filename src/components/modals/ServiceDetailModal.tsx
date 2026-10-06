import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Service } from '../../types';
import { X, CheckCircle, Cpu, Clock, TrendingUp, DollarSign, ArrowRight, Shield } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';

interface ServiceDetailModalProps {
  service: Service;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service }) => {
  const { closeModal, openModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in my-8">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {service.category}
            </span>
            {service.isPopular && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                ★ Highly Requested
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{service.title}</h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">{service.fullDesc}</p>
        </div>

        {/* Visual / Asset Placeholder */}
        <div className="mb-6">
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
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Proven ROI Metric</span>
            </div>
            <div className="text-sm font-bold text-emerald-300">{service.roiMetric}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Estimated Delivery</span>
            </div>
            <div className="text-sm font-bold text-amber-300">{service.deliveryTimeline}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span>Starting Estimate</span>
            </div>
            <div className="text-sm font-bold text-blue-300">{service.startingPrice || 'Custom Quote'}</div>
          </div>
        </div>

        {/* Deliverables & Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              Key Deliverables & Milestones
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Key Advantages & SLA
            </h4>
            <ul className="space-y-2">
              {service.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Core Technology Stack:
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Need a custom SLA or dedicated squad? Let's discuss your roadmap.
          </div>
          <button
            onClick={() => {
              closeModal();
              openModal({ type: 'quote-modal', defaultService: service.title });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Request Proposal & Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
