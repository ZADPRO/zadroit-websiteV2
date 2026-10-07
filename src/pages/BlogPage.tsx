import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { blogPostsData } from "../data/websiteData";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Search, Clock, ArrowRight, ChevronRight, Send } from "lucide-react";

export const BlogPage: React.FC = () => {
  const { openModal, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [subEmail, setSubEmail] = useState("");

  const categories = [
    "All",
    "Cloud Architecture",
    "AI & Innovation",
    "Enterprise Engineering",
    "UI/UX Design",
    "Cybersecurity",
    "Product Strategy",
  ];

  const filteredBlogs = blogPostsData.filter((b) => {
    const matchesCategory =
      selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost =
    blogPostsData.find((b) => b.featured) || blogPostsData[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes("@")) {
      showToast(
        "Invalid Email",
        "Please enter a valid email address.",
        "warning",
      );
      return;
    }
    const recipient = "indumathi.r@zadroit.com";
    const subject = encodeURIComponent("Newsletter Subscription - Zadroit Tech Radar");
    const emailBody = `Subscriber Email: ${subEmail}

---
Dispatched from Zadroit Blog & Tech Radar Subscription Form`;
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(
      emailBody
    )}`;

    showToast(
      "Subscribed to Tech Radar! 🚀",
      "Subscription details sent to indumathi.r@zadroit.com.",
      "success",
    );
    window.location.href = mailtoUrl;
    setSubEmail("");
  };

  return (
    <div className="relative overflow-hidden pt-24 pb-16 bg-white">
      {/* Background dot matrix */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-96 right-10 w-48 h-48 bg-dots opacity-40 pointer-events-none" />

      {/* Hero / Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
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
                  Zadroit Publications & Tech Radar
                </div>
              </div>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#090D16] tracking-tight font-heading leading-[1.18] mt-1">
              Engineering Insights, Architecture Blueprints & AI
            </h1>
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Practical guides and architectural case studies authored by Zadroit
            software architects, data scientists, and DevOps leads.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or technology (e.g. LLM, Cloud, Docker)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#ded725] text-black shadow-sm"
                  : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Spotlight Banner */}
      {!searchQuery && selectedCategory === "All" && featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            onClick={() =>
              openModal({ type: "blog-reader", blog: featuredPost })
            }
            className="light-card rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-md cursor-pointer group hover:border-[#133A27] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  Featured Blueprint
                </span>
                <span className="text-xs text-[#32679a] font-bold">
                  {featuredPost.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#090D16] font-heading group-hover:text-[#142C42] transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                <span>By {featuredPost.author.name}</span>
                <span>•</span>
                <span>{featuredPost.publishedDate}</span>
                <span>•</span>
                <span className="text-amber-700 font-bold">
                  {featuredPost.readTime}
                </span>
              </div>

              <div className="pt-2">
                <button className="px-6 py-2.5 rounded-full bg-[#ded725] text-[#142C42] font-bold text-xs sm:text-sm group-hover:bg-[#ded725] transition-colors flex items-center gap-2 shadow-sm">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 text-[#142C42] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImagePlaceholder
                src={featuredPost.coverImagePlaceholder}
                alt={featuredPost.title}
                category={featuredPost.category}
                aspectRatio="wide"
                dimensionsHint="1200 × 630"
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <p className="text-base font-medium">
              No articles found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-sm text-[#133A27] font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => openModal({ type: "blog-reader", blog })}
                className="light-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <div>
                  <ImagePlaceholder
                    src={blog.coverImagePlaceholder}
                    alt={blog.title}
                    category={blog.category}
                    aspectRatio="video"
                    dimensionsHint="800 × 450"
                    className="mb-4"
                  />

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="text-[#133A27] font-bold uppercase tracking-wider text-[10px]">
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#133A27] transition-colors line-clamp-2 font-heading">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#133A27] flex items-center justify-center font-bold text-white text-[11px]">
                      {blog.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-slate-900 font-semibold">
                        {blog.author.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {blog.publishedDate}
                      </div>
                    </div>
                  </div>

                  <div className="text-[#133A27] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tech Newsletter Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="light-card rounded-3xl p-8 sm:p-12 border border-slate-200 bg-slate-50 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-[#090D16] font-heading">
              Never Miss an Engineering Breakthrough
            </h3>
            <p className="text-sm text-slate-600">
              Get notified when we publish new microservice blueprints, AI case
              studies, and performance benchmarks. No spam, ever.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#133A27] text-sm shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#133A27] hover:bg-[#0c2619] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#C6F135]" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
