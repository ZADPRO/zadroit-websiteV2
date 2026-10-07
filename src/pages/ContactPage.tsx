import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { companyInfo, faqItemsData } from '../data/websiteData';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Building,
  Calendar
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, triggerConfetti } = useApp();

  const [selectedServices, setSelectedServices] = useState<string[]>(['Enterprise Software']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$10,000 - $25,000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItemsData[0].id);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
    ndaRequired: false
  });

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      showToast('Missing Details', 'Please provide your name and email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerConfetti();
      showToast(
        'Inquiry Transmitted Successfully! 🚀',
        `Thank you ${formData.fullName}. Our engineering architects will review your scope and respond with a preliminary blueprint within 24 hours.`,
        'success'
      );
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectDetails: '',
        ndaRequired: false
      });
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            {/* <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> */}
              <div className="flex items-center gap-0">
              {/* Green circle */}
              <div className="w-7 h-7 rounded-full bg-lime-400" />

              {/* First dark semicircle */}
              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />

              {/* Second dark semicircle */}
              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />
            </div>
            Let's Start a Conversation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
            Partner with Zadroit on Your Next Digital Milestone
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind, need to modernize legacy systems, or want to explore our proprietary software platforms? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Grid: Interactive Form (Left) & Contact Info (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Project Inquiry Form */}
          <div className="lg:col-span-7 light-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#090D16] font-heading">
                Request an Architecture Blueprint & Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill out the project scope below. We respect confidentiality and guarantee a 24-hour turnaround.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Pills Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  What services do you require?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Enterprise Software',
                    'Cloud Architecture & DevOps',
                    'AI & Machine Learning',
                    'Web & Mobile Apps',
                    'UI/UX Design',
                    'Cybersecurity VAPT'
                  ].map((svc) => {
                    const isSelected = selectedServices.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleService(svc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#133A27] text-white border-[#133A27] shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Anticipated Budget Range:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< $5k', '$5k - $15k', '$15k - $40k', '$40k+'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                        selectedBudget === b
                          ? 'bg-amber-50 text-amber-900 border-amber-400 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Indrajith S"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Business Email <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="indra@zadroit.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98427 89100"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Project Summary & Requirements:
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Share key requirements, user count, target integrations, or current bottlenecks..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ndaCheckbox"
                  checked={formData.ndaRequired}
                  onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-[#133A27] bg-white border-slate-300"
                />
                <label htmlFor="ndaCheckbox" className="text-xs text-slate-600 cursor-pointer">
                  Send a Mutual Non-Disclosure Agreement (NDA) prior to technical calls.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidential & Secure</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C6F135]" />
                      <span>Transmit Project Scope</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Direct Headquarters & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="light-card rounded-3xl p-6 border border-slate-200 bg-white space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                Salem Corporate Headquarters
              </div>
              <h3 className="text-xl font-black text-[#090D16] font-heading">
                Zadroit IT Solutions Pvt Ltd
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#133A27] shrink-0 mt-0.5" />
                  <span>
                    {companyInfo.headquarters.address}, {companyInfo.headquarters.landmark}, {companyInfo.headquarters.city} - {companyInfo.headquarters.pincode}, {companyInfo.headquarters.state}, India.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`mailto:${companyInfo.contact.primaryEmail}`} className="hover:text-slate-900 transition-colors">
                    {companyInfo.contact.primaryEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={`tel:${companyInfo.contact.primaryPhone}`} className="hover:text-slate-900 transition-colors">
                    {companyInfo.contact.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{companyInfo.contact.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="light-card rounded-3xl p-6 border border-slate-200 bg-slate-50 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                Bangalore R&D Center
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Silicon Oasis Innovation Hub
              </h4>
              <p className="text-xs text-slate-600">
                HSR Layout, Sector 4, Bengaluru, Karnataka 560102.
              </p>
            </div>

            <div className="light-card rounded-3xl p-6 border border-amber-200 bg-amber-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Fast-Track Consultation
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading">
                Book a Free 30-Min Strategy Call
              </h4>
              <p className="text-xs text-slate-600">
                Speak directly with a Senior Solutions Architect to review system architecture and feasibility.
              </p>
              <a
                href={`mailto:${companyInfo.contact.salesEmail}?subject=Schedule%2030-Min%20Technical%20Call`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#133A27] text-white font-bold text-xs shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6F135]" />
                <span>Request Call Schedule</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Quick Answers
          </div>
          <h2 className="text-3xl font-black text-[#090D16] font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqItemsData.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="light-card rounded-2xl border border-slate-200 overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <span className="text-[#133A27]">Q:</span> {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#133A27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-modal-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
