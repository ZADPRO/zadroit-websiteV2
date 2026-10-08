import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { servicesData } from '../../data/websiteData';
import { sendEmailToAdmin } from '../../services/emailService';
import { X, Calculator, Send } from 'lucide-react';

interface QuickQuoteModalProps {
  defaultService?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ defaultService }) => {
  const { closeModal, showToast } = useApp();
  const [selectedService, setSelectedService] = useState<string>(
    defaultService || servicesData[0].title
  );
  const [projectType, setProjectType] = useState<'New Build' | 'Modernize Existing' | 'Dedicated Squad' | 'Consulting'>(
    'New Build'
  );
  const [budgetRange, setBudgetRange] = useState<string>('$5,000 - $15,000');
  const [timeline, setTimeline] = useState<string>('4 - 8 Weeks');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectScope: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Missing Contact Info', 'Please enter your name and email.', 'warning');
      return;
    }

    setIsSubmitting(true);

    sendEmailToAdmin({
      subject: `Quick Quote Request - ${selectedService} (${formData.name})`,
      senderName: formData.name,
      senderEmail: formData.email,
      phone: formData.phone,
      formType: 'Quick Quote Proposal Request',
      data: {
        service: selectedService,
        project_type: projectType,
        budget_range: budgetRange,
        timeline: timeline,
        company: formData.company || 'Not provided',
        project_scope: formData.projectScope || 'Not provided',
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Quote Request Sent! 📋',
        `Thank you ${formData.name}. Details have been dispatched to our engineering team. We will review and contact you within 24 hours.`,
        'success'
      );
      closeModal();
    }, 400);
  };

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
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/20 animate-modal-in my-auto select-text">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            Instant Project Scope & Estimate
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
            Request an Engineering Proposal
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Configure your technical requirements to receive an accurate scope, architecture plan, and cost estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Primary Service:
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
            >
              {servicesData.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Project Type Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Project Model:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['New Build', 'Modernize Existing', 'Dedicated Squad', 'Consulting'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${projectType === type
                    ? 'bg-[#ded725] text-white border-[#d3cc11] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              >
                <option value="< $5,000">Less than $5,000 / ₹3.5L (MVP / Audit)</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000 / ₹4L - ₹12L (Standard Project)</option>
                <option value="$15,000 - $40,000">$15,000 - $40,000 / ₹12L - ₹35L (Enterprise Scale)</option>
                <option value="$40,000+">$40,000+ / ₹35L+ (Multi-Year Transformation)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Expected Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              >
                <option value="Urgent (2 - 4 Weeks)">Urgent Sprint (2 - 4 Weeks)</option>
                <option value="4 - 8 Weeks">Standard MVP (4 - 8 Weeks)</option>
                <option value="2 - 4 Months">Quarterly Release (2 - 4 Months)</option>
                <option value="Flexible / Retainer">Ongoing Agile Retainer</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Indrajith"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="indrajith@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98427 00000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Project Description / Key Requirements:
            </label>
            <textarea
              rows={2}
              value={formData.projectScope}
              onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
              placeholder="Tell us what you're building, target users, or key integrations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all resize-none"
            />
          </div>

          {/* Submission button */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            {/* <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strict NDA & 100% confidentiality guaranteed</span>
            </div> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#d3cc11] hover:bg-[#ded725] text-[#32679a] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Generating Proposal...</span>
              ) : (
                <>
                  {/* <Sparkles className="w-4 h-4 text-[#ded725]" /> */}
                  <span>Request Itemized Quote</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
