import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { servicesData } from '../data/websiteData';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Users
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { openModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Estimator State
  const [estimatorService, setEstimatorService] = useState('enterprise-software');
  const [estimatorScope, setEstimatorScope] = useState<'mvp' | 'standard' | 'enterprise'>('standard');
  const [needAiAddon, setNeedAiAddon] = useState(false);
  const [needDevOpsAddon, setNeedDevOpsAddon] = useState(true);

  const categories = [
    'All',
    'Enterprise Software',
    'Cloud & DevOps',
    'AI & Data Intelligence',
    'Web & Mobile Apps',
    'UI/UX & Product Design',
    'Cybersecurity & Auditing'
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? servicesData
      : servicesData.filter((s) => s.category === selectedCategory);

  // Dynamic cost & timeline calculation
  const calculateEstimate = () => {
    let base = 3500;
    let weeks = '4 - 6 Weeks';

    if (estimatorService === 'enterprise-software') base = 4800;
    if (estimatorService === 'ai-data-intelligence') base = 5200;
    if (estimatorService === 'cloud-devops') base = 3400;
    if (estimatorService === 'web-mobile-apps') base = 4000;
    if (estimatorService === 'cybersecurity-audit') base = 2800;

    let multiplier = 1;
    if (estimatorScope === 'mvp') {
      multiplier = 0.8;
      weeks = '3 - 5 Weeks';
    } else if (estimatorScope === 'standard') {
      multiplier = 1.2;
      weeks = '6 - 10 Weeks';
    } else if (estimatorScope === 'enterprise') {
      multiplier = 2.4;
      weeks = '12 - 20 Weeks';
    }

    let addonCost = 0;
    if (needAiAddon) addonCost += 1800;
    if (needDevOpsAddon) addonCost += 1200;

    const totalEstimate = Math.round(base * multiplier + addonCost);
    return {
      priceFormatted: `$${totalEstimate.toLocaleString()} - $${Math.round(totalEstimate * 1.35).toLocaleString()}`,
      inrFormatted: `₹${(Math.round(totalEstimate * 85) / 100000).toFixed(1)}L - ₹${(Math.round(totalEstimate * 1.35 * 85) / 100000).toFixed(1)}L`,
      timeline: weeks
    };
  };

  const estimateResult = calculateEstimate();

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
            {/* <Layers className="w-3.5 h-3.5 text-emerald-600" /> */}
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
            Our Services
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#090D16] tracking-tight font-heading leading-tight">
            Specialized Software Engineering & Cloud Architecture
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From distributed ERP backends and Kubernetes orchestration to custom LLM agents and cross-platform mobile apps, we engineer high-performance systems with guaranteed SLAs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#133A27] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="light-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white group"
            >
              <div>
                <ImagePlaceholder
                  src={service.imagePlaceholder}
                  alt={service.title}
                  category={service.category}
                  label={service.title}
                  aspectRatio="video"
                  dimensionsHint="800 × 450"
                  iconType="service"
                  className="mb-5"
                />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {service.category}
                  </span>
                  {service.isPopular && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Top Rated
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#133A27] transition-colors font-heading">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-800">Included Deliverables:</div>
                  {service.deliverables.slice(0, 3).map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                      +{service.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500">Estimated Timeline</div>
                  <div className="text-xs font-bold text-[#133A27]">{service.deliveryTimeline}</div>
                </div>

                <button
                  onClick={() => openModal({ type: 'service-details', service })}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#133A27] text-slate-800 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>Details & Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Cost & Timeline Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="light-card rounded-3xl p-8 sm:p-12 border border-slate-200 bg-white shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                Interactive Estimator
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
                Calculate Your Project Timeline & Cost
              </h3>

              <p className="text-sm text-slate-600">
                Select your parameters below to get an instant realistic estimate for budgeting and sprint planning.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Primary Domain:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {servicesData.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setEstimatorService(s.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                        estimatorService === s.id
                          ? 'bg-[#133A27] text-white border-[#133A27] shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold truncate">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</div>
                      <div className="text-[10px] opacity-80">{s.startingPrice}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Project Complexity & Scope:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mvp', title: 'Lean MVP', desc: 'Core validation' },
                    { id: 'standard', title: 'Production App', desc: 'Custom workflows' },
                    { id: 'enterprise', title: 'Enterprise Suite', desc: 'High scale' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setEstimatorScope(tier.id as any)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        estimatorScope === tier.id
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{tier.title}</div>
                      <div className="text-[10px] text-slate-500">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needAiAddon}
                    onChange={(e) => setNeedAiAddon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#133A27]"
                  />
                  <span>Include Custom AI / LLM Workflow (+ $1,800)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needDevOpsAddon}
                    onChange={(e) => setNeedDevOpsAddon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#133A27]"
                  />
                  <span>Zero-Downtime CI/CD & Kubernetes (+ $1,200)</span>
                </label>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#133A27] text-white shadow-xl flex flex-col justify-between text-center space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6F135] font-mono">
                  Estimated Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white font-heading mt-2">
                  {estimateResult.priceFormatted}
                </div>
                <div className="text-xs text-[#C6F135] font-semibold mt-1">
                  Approx. {estimateResult.inrFormatted}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-200">
                  <span>Sprint Timeline:</span>
                  <strong className="text-white">{estimateResult.timeline}</strong>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>SLA Guarantee:</span>
                  <strong className="text-[#C6F135]">99.99% Uptime</strong>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Source Code Ownership:</span>
                  <strong className="text-white">100% Client Owned</strong>
                </div>
              </div>

              <button
                onClick={() => openModal({ type: 'quote-modal' })}
                className="w-full py-3.5 rounded-full bg-[#C6F135] hover:bg-[#b4df27] text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Official SOW & Roadmap</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Collaboration Frameworks
          </div>
          <h2 className="text-3xl font-black text-[#090D16] font-heading">
            Flexible Engagement Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="light-card rounded-3xl p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 text-blue-700 font-bold">
              01
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">Dedicated Engineering Squad</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              A full-time, dedicated pod (Tech Lead, Senior Developers, QA, UI Designer) working as an embedded extension of your core team.
            </p>
            <div className="text-xs text-[#133A27] font-semibold">Best for: Scaling startups & fast product roadmaps</div>
          </div>

          <div className="light-card rounded-3xl p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-700 font-bold">
              02
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">Fixed-Price Milestone Delivery</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Clearly defined PRD with agreed milestone deliverables, guaranteed delivery timeline, and fixed billing tranches.
            </p>
            <div className="text-xs text-[#133A27] font-semibold">Best for: MVPs, ERP rollouts & VAPT audits</div>
          </div>

          <div className="light-card rounded-3xl p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-700 font-bold">
              03
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">Agile Time & Material Retainer</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Flexible hours with monthly billing for dynamic R&D, ongoing AI tuning, cloud cost optimization, and infrastructure maintenance.
            </p>
            <div className="text-xs text-[#133A27] font-semibold">Best for: Continuous R&D & FinOps governance</div>
          </div>
        </div>
      </section>
    </div>
  );
};
