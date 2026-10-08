import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { blogPostsData, getBlogPostById } from '../data/websiteData';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  // Share2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Copy,
  Check,
  BookOpen
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { currentBlogId, navigate, navigateToBlog, openModal, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  // Find blog by id or slug
  const blog = currentBlogId ? getBlogPostById(currentBlogId) : undefined;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast(
        'Link Copied! 📋',
        `Article link for "${blog?.title || 'Article'}" copied to clipboard.`,
        'success'
      );
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // const handleTwitterShare = () => {
  //   if (!blog) return;
  //   const text = encodeURIComponent(`Read "${blog.title}" on Zadroit Engineering Tech Radar: `);
  //   const url = encodeURIComponent(window.location.href);
  //   window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  // };

  // const handleLinkedInShare = () => {
  //   if (!blog) return;
  //   const url = encodeURIComponent(window.location.href);
  //   window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  // };

  if (!blog) {
    return (
      <div className="pt-28 pb-20 bg-white min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Article Not Found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            The engineering article you are looking for might have been moved, renamed, or is currently unavailable.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('blog')}
              className="px-6 py-2.5 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#142C42] font-bold text-sm shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>
            <button
              onClick={() => navigate('home')}
              className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm inline-flex items-center justify-center cursor-pointer transition-all"
            >
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Related blogs
  const relatedBlogs = blogPostsData
    .filter((b) => b.id !== blog.id && (b.category === blog.category || b.tags.some((t) => blog.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="relative pt-24 pb-20 bg-white">
      {/* Background subtle accents */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-dots opacity-30 pointer-events-none" />
      <div className="absolute top-[40rem] right-10 w-48 h-48 bg-dots opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb Bar */}
        <div className="pt-4 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
          <button
            onClick={() => navigate('blog')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#142C42] hover:text-[#32679a] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Publications</span>
          </button>

          {/* Breadcrumb path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            <button onClick={() => navigate('home')} className="hover:text-slate-900 cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button onClick={() => navigate('blog')} className="hover:text-slate-900 cursor-pointer">Blog</button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">{blog.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <div className="pt-8 pb-8">
          {/* Category & Read Info Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-[#F3F1B1] text-[#13273B] border border-[#EDE985]">
              {blog.category}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {blog.publishedDate}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {blog.readTime}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#090D16] font-heading leading-tight tracking-tight mt-2">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {blog.excerpt}
          </p>

          {/* Author bar + Action Buttons */}
          <div className="mt-8 pt-6 pb-4 border-t border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Author Profile */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#ded725] p-0.5 shadow-sm flex items-center justify-center">
                <span className="text-sm font-black text-[#142C42]">
                  {blog.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author.name}</div>
                <div className="text-xs text-slate-500 font-medium">{blog.author.role}</div>
              </div>
            </div>

            {/* Social Share & Link Copier */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                title="Copy link to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              {/* <button
                onClick={handleLinkedInShare}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0077B5] hover:text-white text-slate-600 transition-colors cursor-pointer"
                title="Share on LinkedIn"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTwitterShare}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white text-slate-600 transition-colors cursor-pointer"
                title="Share on X"
              >
                <span className="text-xs font-bold">𝕏</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <ImagePlaceholder
            src={blog.coverImagePlaceholder}
            alt={blog.title}
            category={blog.category}
            label={blog.title}
            aspectRatio="wide"
            dimensionsHint="1200 × 630"
          />
        </div>

        {/* Article Body Content */}
        <div className="max-w-3xl mx-auto">
          {/* Key Insight Pull Quote */}
          <div className="my-6 p-6 rounded-2xl bg-amber-50/70 border-l-4 border-[#ded725] flex items-start gap-4">
            <Quote className="w-6 h-6 text-[#142C42] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                "{blog.content[0]}"
              </p>
              <div className="mt-2 text-xs font-bold text-[#142C42]">
                — {blog.author.name}, {blog.author.role}
              </div>
            </div>
          </div>

          {/* Full Paragraphs */}
          <div className="space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg font-normal pt-4">
            {blog.content.map((paragraph, idx) => (
              <p key={idx} className="leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Architecture Highlights & Key Takeaways Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#142C42]">
              <Sparkles className="w-5 h-5 text-[#32679a]" />
              <h3 className="text-lg font-black font-heading text-slate-900">
                Key Architectural Takeaways & Implementation Notes
              </h3>
            </div>
            <ul className="space-y-3 pt-2 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Production-tested design pattern verified across enterprise scale workloads.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero-downtime integration guardrails with automated monitoring and drift detection.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full compliance with strict security, encryption at rest, and audit trail requirements.</span>
              </li>
            </ul>
          </div>

          {/* Tags List */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-[#32679a]" />
              Topic Tags:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Consultation CTA */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#ded725] text-[#142C42] flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                {blog.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Have questions about this architecture?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Consult with {blog.author.name} ({blog.author.role}) directly.
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal({ type: 'quote-modal', defaultService: blog.title })}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-[#142C42] text-xs sm:text-sm font-bold shadow-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 hover:scale-[1.02]"
            >
              <span>Consult Author</span>
              <ArrowRight className="w-4 h-4 text-[#142C42]" />
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#32679a]">
                  Engineering Radar
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#090D16] font-heading mt-1">
                  Related Insights & Blueprints
                </h3>
              </div>
              <button
                onClick={() => navigate('blog')}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#142C42] hover:text-[#32679a] transition-colors"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rb) => (
                <div
                  key={rb.id}
                  onClick={() => navigateToBlog(rb.id)}
                  className="light-card rounded-3xl p-5 border border-slate-200 bg-white hover:border-[#142C42] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <ImagePlaceholder
                      src={rb.coverImagePlaceholder}
                      alt={rb.title}
                      category={rb.category}
                      aspectRatio="video"
                      dimensionsHint="600 × 340"
                      className="mb-3.5"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="text-[#32679a] font-bold uppercase tracking-wider text-[10px]">
                        {rb.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {rb.readTime}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#142C42] transition-colors line-clamp-2 font-heading">
                      {rb.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {rb.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#142C42] font-bold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
