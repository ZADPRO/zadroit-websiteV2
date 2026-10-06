import React, { useState } from 'react';
import { useApp, type PageId } from '../context/AppContext';
import { companyInfo, navItems, productsData } from '../data/websiteData';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openModal, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast(
      'Subscribed to Zadroit Insights! 🚀',
      'You will receive our monthly engineering whitepapers and product release notes.',
      'success'
    );
    setNewsletterEmail('');
  };

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('linkedin')) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74v-8.37H5.06v8.37z"/>
        </svg>
      );
    }
    if (p.includes('twitter') || p.includes('x')) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    }
    if (p.includes('github')) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    }
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer className="relative bg-[#0F2E1F] border-t border-[#164E35] pt-16 pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#133A27] border border-[#1e583c] mb-14 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6F135]/20 text-[#C6F135] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Zadroit Tech Radar & Engineering Insights
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Stay ahead in Enterprise Cloud & AI Engineering
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Subscribe to get monthly architectural blueprints, benchmark studies, and security insights delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your work email address..."
              className="px-4 py-3 rounded-full bg-[#0F2E1F] border border-[#1e583c] text-white placeholder-slate-400 focus:outline-none focus:border-[#C6F135] text-sm min-w-[280px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#C6F135] hover:bg-[#b4df27] text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1e583c]">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-6 rounded-full bg-[#C6F135]" />
                <span className="w-2.5 h-6 rounded-full bg-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-heading">
                Zadroit<span className="text-[#C6F135]">.</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {companyInfo.tagline}. Driving mission-critical software engineering, cloud architecture, and artificial intelligence innovation for global leaders.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1 font-mono">
              <div>CIN: {companyInfo.cin}</div>
              <div>HQ: {companyInfo.headquarters.city}, {companyInfo.headquarters.state}, {companyInfo.headquarters.country}</div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {companyInfo.socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#133A27] hover:bg-[#C6F135] text-slate-300 hover:text-slate-950 border border-[#1e583c] flex items-center justify-center transition-all duration-200"
                  aria-label={s.platform}
                >
                  {renderSocialIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.id as PageId)}
                    className="hover:text-[#C6F135] transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#133A27] text-[#C6F135] border border-[#1e583c]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Flagship Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productsData.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => navigate('products')}
                    className="hover:text-[#C6F135] transition-colors flex items-center justify-between w-full group"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#C6F135]">
                      {prod.badge}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6F135] mt-0.5 shrink-0" />
                <span>
                  {companyInfo.headquarters.address}, {companyInfo.headquarters.city} - {companyInfo.headquarters.pincode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6F135] shrink-0" />
                <a href={`mailto:${companyInfo.contact.primaryEmail}`} className="hover:text-white transition-colors">
                  {companyInfo.contact.primaryEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6F135] shrink-0" />
                <a href={`tel:${companyInfo.contact.primaryPhone}`} className="hover:text-white transition-colors">
                  {companyInfo.contact.primaryPhone}
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => openModal({ type: 'quote-modal' })}
                  className="w-full py-2 px-3 rounded-full bg-[#C6F135] text-slate-950 font-bold hover:bg-[#b4df27] transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Proposal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Zadroit IT Solutions Private Limited. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#C6F135]">
              <ShieldCheck className="w-4 h-4" />
              ISO 27001 & SOC2 Architecture
            </span>
            <button onClick={() => navigate('contact')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('contact')} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
