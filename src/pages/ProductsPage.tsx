import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { productsData } from "../data/websiteData";
import { ProductCollage } from "../components/ProductCollage";
import { Sparkles, CheckCircle2, Server } from "lucide-react";

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
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${selectedCategory === cat
                ? "bg-[#13273B] text-white shadow-md scale-105"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:scale-102"
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
              key={`${selectedCategory}-${product.id}`}
              style={{ animationDelay: `${idx * 120}ms` }}
              className="animate-fade-in-up light-card rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-slate-300 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden group relative"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#32679a]/8 via-[#ded725]/8 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10 ${isEven ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Product Info */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between space-y-5 ${isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Tags on left, Logo badge on right */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ded725]/20 text-[#13273B] border border-[#ded725]/40 shadow-xs">
                          {product.badge}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#32679a] border border-blue-200/80 shadow-xs">
                          {product.category}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                          {product.status}
                        </span>
                      </div>

                      <div className="h-12 w-32 sm:w-36 bg-slate-50 rounded-xl px-3 py-1.5 flex items-center justify-center border border-slate-200 shadow-sm shrink-0 overflow-hidden">
                        <img
                          src={product.logo || "/assets/product logo/ZADPRO-05.png"}
                          alt={`${product.name} Logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/ProductLogo/ZADPRO-05.png";
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Name */}
                    <h2 className="text-3xl sm:text-4xl font-black text-[#090D16] font-heading group-hover:text-[#13273B] transition-colors">
                      {product.name}
                    </h2>

                    <p className="text-base text-[#32679a] font-semibold">
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
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 hover:scale-[1.01] transition-all duration-300"
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
                    {/* <div>
                      <div className="text-xs text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#32679a]" />
                        Architecture & Stack:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.techBadges.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-[#13273B] hover:text-white hover:border-[#13273B] transition-all duration-300 cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div> */}

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                      {product.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:bg-[#F9F8D8] hover:border-[#E5E055] hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <div className="text-[10px] text-slate-500 font-medium">
                            {m.label}
                          </div>
                          <div className="text-base font-black text-[#13273B] font-heading mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        openModal({ type: "product-demo", product })
                      }
                      className="px-6 py-3 rounded-full bg-[#13273B] hover:bg-[#32679a] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#ded725]" />
                      <span>Book 1-on-1 Guided Demo</span>
                      {/* <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" /> */}
                    </button>

                    {/* <button
                      onClick={() =>
                        openModal({
                          type: "quote-modal",
                          defaultService: product.name,
                        })
                      }
                      className="px-5 py-3 rounded-full bg-slate-100 hover:bg-[#ded725] hover:text-slate-950 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      <span>Licensing & Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button> */}
                  </div>
                </div>

                {/* Right Visual Image Showcase / 2-3 Image Collage */}
                <div
                  className={`lg:col-span-6 flex flex-col h-full min-h-[460px] lg:min-h-full ${isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                  <ProductCollage
                    images={product.images}
                    captions={product.imageCaptions}
                    productName={product.name}
                    category={product.category}
                    fallbackPlaceholder={product.imagePlaceholder}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Deployment & Enterprise Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="light-card rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border border-slate-200 bg-slate-50 text-center shadow-md hover:shadow-xl transition-all duration-500">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
              <Server className="w-3.5 h-3.5 text-blue-600" />
              Enterprise Deployment Options
            </div>
            <h3 className="text-3xl font-black text-[#090D16] font-heading">
              Flexible Deployment to Match Your Security Policies
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              All Zadroit products can be consumed as managed SaaS or deployed
              directly inside your private AWS/Azure VPC or air-gapped
              on-premise datacenter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-sm font-bold text-slate-900 mb-1.5">
                  Managed Cloud SaaS
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  99.99% SLA, continuous updates, automated backups, and 24/7
                  Zadroit DevOps management.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-sm font-bold text-amber-700 mb-1.5">
                  Private Cloud VPC
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Deployed within your organization's AWS, GCP, or Azure account
                  under your strict IAM policies.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-sm font-bold text-emerald-700 mb-1.5">
                  Air-Gapped On-Premise
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
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
