import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { servicesData } from '../../data/websiteData';
import { X, Calculator, Send, ShieldAlert } from 'lucide-react';

interface QuickQuoteModalProps {
  defaultService?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ defaultService }) => {
  const { closeModal, showToast, triggerConfetti } = useApp();
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
    setTimeout(() => {
      setIsSubmitting(false);
      triggerConfetti();
      showToast(
        'Quote Request Received! 📋',
        `Thank you ${formData.name}. Our technical architect will review your project requirements for "${selectedService}" and send an itemized proposal within 24 hours.`,
        'success'
      );
      closeModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in my-8">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Instant Project Scope & Estimate
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">
            Request an Engineering Proposal
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Configure your technical requirements to receive an accurate scope, architecture plan, and cost estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Primary Service:
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-sm"
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
            <label className="block text-xs font-medium text-slate-300 mb-2">Project Model:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['New Build', 'Modernize Existing', 'Dedicated Squad', 'Consulting'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                    projectType === type
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/25'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="< $5,000">Less than $5,000 / ₹3.5L (MVP / Audit)</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000 / ₹4L - ₹12L (Standard Project)</option>
                <option value="$15,000 - $40,000">$15,000 - $40,000 / ₹12L - ₹35L (Enterprise Scale)</option>
                <option value="$40,000+">$40,000+ / ₹35L+ (Multi-Year Transformation)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Expected Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-sm"
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
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Indrajith"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="indrajith@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98427 00000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Project Description / Key Requirements:
            </label>
            <textarea
              rows={2}
              value={formData.projectScope}
              onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
              placeholder="Tell us what you're building, target users, or key integrations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm resize-none"
            />
          </div>

          {/* Submission button */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strict NDA & confidentiality guaranteed</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Proposal...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Request Itemized Quote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
