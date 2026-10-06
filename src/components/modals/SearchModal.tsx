import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { servicesData, productsData, blogPostsData, jobOpeningsData } from '../../data/websiteData';
import { Search, X, Layers, Box, BookOpen, Briefcase, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { closeModal, openModal, navigate } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl animate-modal-in overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/70">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, products, blog insights, careers, or tech stack..."
            className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeModal}
            className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!cleanQuery ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-400">Type a keyword to find anything across Zadroit</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['ZadERP', 'Medpredit', 'Cloud DevOps', 'AI & ML', 'Full-Stack React', 'Cybersecurity'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm">No results found for "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for ERP, Cloud, AI, Flutter, or contact our support team.
              </p>
            </div>
          ) : (
            <>
              {/* Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5" />
                    Proprietary Products ({matchingProducts.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          closeModal();
                          navigate('products');
                        }}
                        className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-amber-400 flex items-center gap-2">
                            {p.name}
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {p.badge}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{p.tagline}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {matchingServices.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
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
                        className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-blue-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-400">
                            {s.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{s.shortDesc}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Posts */}
              {matchingBlogs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Blog & Whitepapers ({matchingBlogs.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingBlogs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'blog-reader', blog: b });
                        }}
                        className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-emerald-400">
                            {b.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{b.excerpt}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Openings */}
              {matchingJobs.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Open Careers ({matchingJobs.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingJobs.map((j) => (
                      <div
                        key={j.id}
                        onClick={() => {
                          closeModal();
                          openModal({ type: 'job-apply', job: j });
                        }}
                        className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 hover:border-purple-500/40 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-purple-400 flex items-center gap-2">
                            {j.title}
                            <span className="text-[10px] text-amber-400 font-mono">
                              {j.salaryRange}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {j.department} • {j.location} • {j.experience}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3.5 h-3.5" /> to select
            </span>
            <span>ESC to close</span>
          </div>
          <span className="text-[11px] text-slate-400">Zadroit Universal Search</span>
        </div>
      </div>
    </div>
  );
};
