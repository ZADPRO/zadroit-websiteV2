import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Product } from '../../types';
import { productsData } from '../../data/websiteData';
import { X, Sparkles, Building, Mail, User, Phone, Send, ShieldCheck } from 'lucide-react';

interface DemoRequestModalProps {
  product?: Product;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ product: initialProduct }) => {
  const { closeModal, showToast, triggerConfetti } = useApp();
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || productsData[0].id
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    preferredDate: '',
    preferredTime: '11:00 AM IST',
    teamSize: '10 - 50 Employees',
    useCase: ''
  });

  const selectedProduct = productsData.find((p) => p.id === selectedProductId) || productsData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName) {
      showToast('Required Information Missing', 'Please fill in your name, work email, and company.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerConfetti();
      showToast(
        'Demo Request Confirmed! 🚀',
        `We have scheduled your 1-on-1 architecture walkthrough for ${selectedProduct.name}. A calendar invite has been dispatched to ${formData.workEmail}.`,
        'success'
      );
      closeModal();
    }, 1200);
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
        <div className="mb-6 pb-5 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Live Guided Walkthrough
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
            Schedule a Demo for <span className="text-[#133A27]">{selectedProduct.name}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Experience real-time workflows, test feature modules, and ask direct technical questions to our engineering architects.
          </p>
        </div>

        {/* Product selector tabs */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-2">Select Product:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {productsData.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProductId(p.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                  selectedProductId === p.id
                    ? 'bg-[#133A27] text-white border-[#133A27] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="font-bold">{p.name}</div>
                <div
                  className={`text-[10px] truncate ${
                    selectedProductId === p.id ? 'text-slate-200' : 'text-slate-500'
                  }`}
                >
                  {p.category}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Full Name</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Anand R"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Work Email</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="anand@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Company Name</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Acme Corp"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Phone Number</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-xs transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Time Slot</label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-xs transition-all"
              >
                <option value="11:00 AM IST">11:00 AM IST</option>
                <option value="02:00 PM IST">02:00 PM IST</option>
                <option value="04:30 PM IST">04:30 PM IST</option>
                <option value="07:00 PM IST">07:00 PM IST (US Morning)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Team Size</label>
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-xs transition-all"
              >
                <option value="1 - 10 Employees">1 - 10 Employees</option>
                <option value="10 - 50 Employees">10 - 50 Employees</option>
                <option value="50 - 250 Employees">50 - 250 Employees</option>
                <option value="250+ Enterprise">250+ Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Specific Objectives / Key Integration Questions:
            </label>
            <textarea
              rows={2}
              value={formData.useCase}
              onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
              placeholder="Tell us what workflows or features you want to focus on during the walkthrough..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#32679a] focus:ring-2 focus:ring-[#32679a]/20 text-sm transition-all resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Includes 30-day sandbox trial credentials</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Scheduling Walkthrough...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#ded725]" />
                  <span>Confirm Live Demo</span>
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
