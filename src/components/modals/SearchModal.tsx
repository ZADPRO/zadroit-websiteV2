import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { servicesData, productsData, blogPostsData, jobOpeningsData } from '../../data/websiteData';
import { Search, X, Layers, Box, BookOpen, Briefcase, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { closeModal, openModal } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const cleanQuery = query.toLowerCase().trim();

  const matchingServices = cleanQuery
    ? servicesData.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.shortDesc.toLowerCase().includes(cleanQuery) ||
          s.techStack.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingProducts = cleanQuery
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.tagline.toLowerCase().includes(cleanQuery) ||
          p.shortDesc.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingBlogs = cleanQuery
    ? blogPostsData.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.excerpt.toLowerCase().includes(cleanQuery) ||
          b.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingJobs = cleanQuery
    ? jobOpeningsData.filter(
        (j) =>
          j.title.toLowerCase().includes(cleanQuery) ||
          j.department.toLowerCase().includes(cleanQuery) ||
          j.skills.some((s) => s.toLowerCase().includes(cleanQuery))
      )
    : [];

  const totalResults =
    matchingServices.length + matchingProducts.length + matchingBlogs.length + matchingJobs.length;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 pt-16 sm:pt-24 pb-12"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-900/20 animate-modal-in overflow-hidden select-text">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, products, blog insights, careers, or tech stack..."
            className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 font-medium focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeModal}
            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-bold hover:bg-slate-200 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5">
          {!cleanQuery ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-500">Type a keyword to find anything across Zadroit</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['ZadERP', 'Medpredit', 'Cloud DevOps', 'AI & ML', 'Full-Stack React', 'Cybersecurity'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#133A27] hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-slate-600">No matching results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for generic terms like "AI", "Cloud", "ERP", or "Careers".</p>
            </div>
          ) : (
            <>
              {/* Matching Services */}
              {matchingServices.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Engineering Services ({matchingServices.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingServices.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'service-details', service: s });
                        }}
                        className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#133A27]">
                            {s.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#133A27] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-amber-600" />
                    Proprietary Software ({matchingProducts.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'product-demo', product: p });
                        }}
                        className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#133A27] flex items-center gap-2">
                            <span>{p.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                              {p.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">{p.shortDesc}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#133A27] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Blogs */}
              {matchingBlogs.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Articles & Insights ({matchingBlogs.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingBlogs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'blog-reader', blog: b });
                        }}
                        className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#133A27]">
                            {b.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">{b.excerpt}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#133A27] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Jobs */}
              {matchingJobs.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    Careers & Positions ({matchingJobs.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingJobs.map((j) => (
                      <div
                        key={j.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'job-apply', job: j });
                        }}
                        className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#133A27] flex items-center gap-2">
                            <span>{j.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {j.department}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{j.location} • {j.type} • {j.salaryRange}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#133A27] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Navigate with mouse or touch</span>
          <div className="flex items-center gap-1.5">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shadow-2xs">ESC</kbd>
            <span>to dismiss</span>
          </div>
        </div>
      </div>
    </div>
  );
};
