import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { JobOpening } from '../../types';
import { sendEmailToAdmin } from '../../services/emailService';
import { X, Briefcase, MapPin, Upload, CheckCircle2, Send, AlertCircle } from 'lucide-react';

interface JobApplyModalProps {
  job: JobOpening;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job }) => {
  const { closeModal, showToast } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    currentCompany: '',
    experienceYears: '',
    noticePeriod: 'Immediate to 15 Days',
    coverNote: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast('Missing Details', 'Please fill in your name, email, and phone number.', 'warning');
      return;
    }

    setIsSubmitting(true);

    sendEmailToAdmin({
      subject: `Job Application: ${job.title} - ${formData.fullName}`,
      senderName: formData.fullName,
      senderEmail: formData.email,
      phone: formData.phone,
      formType: 'Job Application',
      data: {
        position_applied: job.title,
        job_id: job.id,
        department: job.department,
        job_location: job.location,
        experience_years: formData.experienceYears || 'Not specified',
        notice_period: formData.noticePeriod,
        current_company: formData.currentCompany || 'Not specified',
        linkedin: formData.linkedin || 'Not provided',
        portfolio: formData.portfolio || 'Not provided',
        resume_filename: fileName || 'Not uploaded',
        cover_note: formData.coverNote || 'No cover note provided',
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Application Submitted! 🎉',
        `Thank you ${formData.fullName}. Your application for "${job.title}" has been received. Our talent team will review and contact you within 48 hours.`,
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

        {/* Job Header Info */}
        <div className="mb-6 pb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              {job.department}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {job.location}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {job.type}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">{job.title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Compensation: <strong className="text-emerald-700 font-bold">{job.salaryRange}</strong>
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
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
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    placeholder="e.g. 4.5 Years"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    GitHub / Portfolio / Behance
                  </label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.fullName || !formData.email || !formData.phone) {
                      showToast('Please fill required fields', 'Name, email, and phone are mandatory.', 'warning');
                      return;
                    }
                    setStep(2);
                  }}
                  className="px-6 py-2.5 text-[#32679a] rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className=' text-[#32679a] '>Continue to Resume & Notes</span>
                  {/* <Sparkles className="w-4 h-4 text-[#ded725]" /> */}
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Attach Resume / CV (PDF or DOCX)
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#32679a] rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-[#32679a] transition-colors" />
                  {fileName ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{fileName}</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Click or drag your resume file here
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Maximum file size: 10MB (PDF, DOCX)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Notice Period
                  </label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  >
                    <option value="Immediate">Immediate Joiner</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="Serving Notice">Currently Serving Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Company / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.currentCompany}
                    onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                    placeholder="e.g. Tech Solutions Ltd."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Why do you want to join Zadroit? (Brief Note)
                </label>
                <textarea
                  rows={3}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder="Share a short note about your core strengths and what excites you about Zadroit..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#ded725]" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Zadroit is an equal opportunity employer. Your data is protected under our privacy policy.</span>
        </div>
      </div>
    </div>
  );
};
