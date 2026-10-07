import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { productsData } from "../data/websiteData";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Sparkles, CheckCircle2, ArrowRight, Cpu, Server } from "lucide-react";

export const ProductsPage: React.FC = () => {
  const { openModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Enterprise",
    "Healthcare AI",
    "Sports Tech",
    "Cloud Infrastructure",
    "E-Commerce",
    "IoT & Analytics",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / Products Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {/* Dual Pill Capsule Icon + Our Services Label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985] text-xs font-bold mb-4">
                  <div className="flex items-center gap-0">
                    <div className="w-5 h-5 rounded-full bg-[#2B5984]" />

                    {/* First half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />

                    {/* Second half circle */}
                    <div className="w-2.5 h-5 bg-[#5F88B0] rounded-r-full" />
                  </div>
                  Our Products
                </div>
              </div>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#090D16] tracking-tight font-heading leading-[1.18] mt-1">
              Zadroit Flagship Software & Enterprise Products
            </h1>
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Engineered in-house to solve mission-critical challenges across
            healthcare, supply chains, sports facilities, and cloud
            infrastructure. Available as SaaS or custom enterprise deployments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#133A27] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Showcase List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {filteredProducts.map((product, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={product.id}
              className="light-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-md overflow-hidden"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Product Info */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {product.badge}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {product.category}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {product.status}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading">
                    {product.name}
                  </h2>

                  <p className="text-base text-amber-700 font-semibold">
                    {product.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.fullDesc}
                  </p>

                  {/* Core Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.features.map((feat, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#133A27]" />
                      Architecture & Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.techBadges.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                    {product.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center"
                      >
                        <div className="text-[10px] text-slate-500">
                          {m.label}
                        </div>
                        <div className="text-base font-extrabold text-[#133A27] font-heading mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        openModal({ type: "product-demo", product })
                      }
                      className="px-6 py-3 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C6F135]" />
                      <span>Book 1-on-1 Guided Demo</span>
                    </button>

                    <button
                      onClick={() =>
                        openModal({
                          type: "quote-modal",
                          defaultService: product.name,
                        })
                      }
                      className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5"
                    >
                      <span>Licensing & Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Visual Image Placeholder */}
                <div className="lg:col-span-6">
                  <ImagePlaceholder
                    src={product.imagePlaceholder}
                    alt={`${product.name} Interface`}
                    category={product.category}
                    label={`${product.name} Enterprise Architecture`}
                    aspectRatio="video"
                    dimensionsHint="1200 × 750"
                    iconType="product"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Deployment & Enterprise Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="light-card rounded-3xl p-8 sm:p-12 border border-slate-200 bg-slate-50 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
              <Server className="w-3.5 h-3.5 text-blue-600" />
              Enterprise Deployment Options
            </div>
            <h3 className="text-3xl font-black text-[#090D16] font-heading">
              Flexible Deployment to Match Your Security Policies
            </h3>
            <p className="text-sm text-slate-600">
              All Zadroit products can be consumed as managed SaaS or deployed
              directly inside your private AWS/Azure VPC or air-gapped
              on-premise datacenter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-slate-900 mb-1">
                  Managed Cloud SaaS
                </div>
                <div className="text-xs text-slate-600">
                  99.99% SLA, continuous updates, automated backups, and 24/7
                  Zadroit DevOps management.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-amber-700 mb-1">
                  Private Cloud VPC
                </div>
                <div className="text-xs text-slate-600">
                  Deployed within your organization's AWS, GCP, or Azure account
                  under your strict IAM policies.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-sm font-bold text-emerald-700 mb-1">
                  Air-Gapped On-Premise
                </div>
                <div className="text-xs text-slate-600">
                  Compliant with healthcare and banking data sovereignty. Zero
                  external internet dependence.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
