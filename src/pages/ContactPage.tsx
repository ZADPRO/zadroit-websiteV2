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
  Sparkles,
  ChevronDown,
  Building,
  Calendar,
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
                        className={`p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm cursor-pointer transition-colors ${
                          formData.interestedService === svc.name
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
                      isOpen ? "rotate-180 text-[#133A27]" : ""
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
