import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { companyInfo, faqItemsData } from "../data/websiteData";
import { sendEmailToAdmin } from "../services/emailService";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Building,
  Calendar,
  HelpCircle,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItemsData[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interestedService: "Web & Mobile App Development",
    serviceCategory: "IT Service",
    projectDetails: "",
  });

  const availableServices = [
    { name: "Web & Mobile App Development", category: "IT Service" },
    { name: "Enterprise Software Suite (ZadERP)", category: "Enterprise" },
    { name: "Cloud Architecture & DevOps", category: "Cloud" },
    { name: "AI & Machine Learning (Medpredit)", category: "Healthcare AI" },
    {
      name: "Sports Ground & Tournament Management (ZadSports)",
      category: "Sports Tech",
    },
    {
      name: "Multi-Cloud Governance & FinOps (ZadCloud)",
      category: "Cloud Platform",
    },
    {
      name: "Headless E-Commerce Solutions (ZadCommerce)",
      category: "E-Commerce",
    },
    {
      name: "Industrial IoT & Telemetry Analytics (ZadPulse)",
      category: "IoT & Analytics",
    },
    { name: "UI/UX Product Design & Prototyping", category: "Design" },
    { name: "Cybersecurity & VAPT Audit", category: "Security" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      showToast(
        "Missing Required Fields",
        "Please provide your full name and email address.",
        "warning",
      );
      return;
    }

    if (!formData.projectDetails.trim()) {
      showToast(
        "Missing Requirements",
        "Please describe your project details or requirements.",
        "warning",
      );
      return;
    }

    sendEmailToAdmin({
      subject: `New Project Inquiry from ${formData.fullName}`,
      senderName: formData.fullName,
      senderEmail: formData.email,
      phone: formData.phone,
      formType: "Contact Form / Project Inquiry",
      data: {
        interested_service: formData.interestedService,
        service_category: formData.serviceCategory,
        project_requirements: formData.projectDetails,
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        "Message Sent Successfully! 🚀",
        `Thank you ${formData.fullName}. Your project inquiry has been dispatched to Zadroit admin. We'll be in touch soon!`,
        "success",
      );

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        interestedService: "Web & Mobile App Development",
        serviceCategory: "IT Service",
        projectDetails: "",
      });
    }, 400);
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            <div className="flex items-center gap-0">
              <div className="w-7 h-7 rounded-full bg-lime-400" />

              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />

              <div
                className="w-3.5 h-7 bg-green-950"
                style={{
                  borderRadius: "0 32px 32px 0",
                }}
              />
            </div>
            Let's Start a Conversation
          </div> */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
            <div className="flex items-center gap-0">
              <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

              {/* First half circle */}
              <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

              {/* Second half circle */}
              <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
            </div>
            Let's Start a Conversation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
            Partner with Zadroit on Your Next Digital Milestone
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind, need to modernize legacy systems, or want to
            explore our proprietary software platforms? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Grid: Interactive Form (Left) & Contact Info (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Project Inquiry Form matching exact screenshot */}
          <div className="lg:col-span-7 bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-slate-200/90 shadow-2xl shadow-slate-900/5 relative">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] font-heading tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Submitting this form dispatches your project details directly to
                us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl sm:rounded-2xl border border-sky-100 bg-[#f8fbfe] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Email Address & Phone Number (2-Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="xyz@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl sm:rounded-2xl border border-sky-100 bg-[#f8fbfe] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl sm:rounded-2xl border border-sky-100 bg-[#f8fbfe] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Interested Service / Product */}
              <div className="relative">
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  Interested Service / Product
                </label>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border border-sky-100 bg-[#f8fbfe] text-slate-900 text-sm flex items-center justify-between gap-3 cursor-pointer hover:border-sky-300 transition-all select-none"
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {formData.interestedService}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#e0e7ff] text-[#4338ca]">
                      {formData.serviceCategory}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    Choose
                  </button>
                </div>

                {/* Interactive Dropdown Selector */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-2 max-h-64 overflow-y-auto animate-modal-in">
                    {availableServices.map((svc) => (
                      <div
                        key={svc.name}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            interestedService: svc.name,
                            serviceCategory: svc.category,
                          });
                          setIsDropdownOpen(false);
                        }}
                        className={`p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm cursor-pointer transition-colors ${formData.interestedService === svc.name
                          ? "bg-sky-50 text-[#0284c7] font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                          }`}
                      >
                        <span>{svc.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {svc.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details & Requirements */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  Project Details & Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your requirements"
                  value={formData.projectDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDetails: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl sm:rounded-2xl border border-sky-100 bg-[#f8fbfe] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6E27A] focus:border-transparent transition-all placeholder:text-slate-400 font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#ded725] hover:bg-[#d3cc11] text-[#32679a] font-extrabold text-sm sm:text-base shadow-lg shadow-[#E6E27A]/25 hover:shadow-xl hover:shadow-[#E6E27A]/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send a message to zadroit</span>
                      <Send className="w-4 h-4 text-[#32679a]" />
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
                Salem Headquarters
              </div>
              <h3 className="text-xl font-black text-[#090D16] font-heading">
                Zadroit IT Solutions Pvt Ltd
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#133A27] shrink-0 mt-0.5" />
                  <span>
                    {companyInfo.headquarters.address},{" "}
                    {companyInfo.headquarters.landmark},{" "}
                    {companyInfo.headquarters.city} -{" "}
                    {companyInfo.headquarters.pincode},{" "}
                    {companyInfo.headquarters.state}, India.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a
                    href={`mailto:${companyInfo.contact.primaryEmail}`}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {companyInfo.contact.primaryEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={`tel:${companyInfo.contact.primaryPhone}`}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {companyInfo.contact.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{companyInfo.contact.workingHours}</span>
                </div>
              </div>
            </div>

            {/* <div className="light-card rounded-3xl p-6 border border-slate-200 bg-slate-50 space-y-3">
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
            </div> */}

            <div className="light-card rounded-3xl p-6 border border-amber-200 bg-amber-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Fast-Track Consultation
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading">
                Book a Free 30-Min Strategy Call
              </h4>
              <p className="text-xs text-slate-600">
                Speak directly with a Senior Solutions Architect to review
                system architecture and feasibility.
              </p>
              <a
                href={`mailto:${companyInfo.contact.salesEmail}?subject=Schedule%2030-Min%20Technical%20Call`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ded725] text-white font-bold text-xs shadow-sm transition-all"
              >
                {/* <Sparkles className="w-3.5 h-3.5 " /> */}
                <span className="text-[#32679a]">Request Call Schedule</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Subtle background ambient light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#32679A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#32679A]/10 text-[#13273B] border border-[#32679A]/20 text-xs font-bold mb-3">
            <div className="flex items-center gap-0">
              <div className="w-4 h-4 rounded-full bg-[#2B5984]" />
              <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
              <div className="w-2 h-4 bg-[#5F88B0] rounded-r-full" />
            </div>
            Quick Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#090D16] font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our engineering process, security standards, and partnership models.
          </p>
        </div>

        <div className="space-y-3.5 relative z-10">
          {faqItemsData.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 overflow-hidden bg-white border ${
                  isOpen
                    ? "border-[#32679a]/40 shadow-md ring-1 ring-[#32679a]/15 bg-gradient-to-b from-white to-slate-50/40"
                    : "border-slate-200/90 shadow-sm hover:border-[#32679a]/30 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5 flex-1 pr-2">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 font-mono transition-colors ${
                        isOpen
                          ? "bg-[#32679a] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-bold font-heading leading-snug transition-colors ${
                        isOpen ? "text-[#32679a]" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                      {faq.category}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-[#32679a] text-white rotate-180 shadow-xs"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-modal-in">
                    <div className="flex items-start gap-3 pt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ded725] mt-2 shrink-0" />
                      <p className="flex-1 text-slate-600 leading-relaxed text-sm sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F8FC] via-white to-[#FDFDE8]/60 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#32679a]/10 border border-[#32679a]/20 flex items-center justify-center text-[#32679a] shrink-0">
              <HelpCircle className="w-6 h-6 text-[#32679a]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#13273B] font-heading">
                Still have questions about our services?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Can't find what you're looking for? Reach out directly to our solutions architecture team.
              </p>
            </div>
          </div>

          <a
            href={`mailto:${companyInfo.contact.primaryEmail}?subject=Technical%20Inquiry%20from%20Website`}
            className="px-5 py-2.5 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#13273B] font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Ask Our Team</span>
            <Send className="w-3.5 h-3.5 text-[#13273B]" />
          </a>
        </div>
      </section>
    </div>
  );
};
