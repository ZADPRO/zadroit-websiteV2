import React from 'react';
import { useApp } from '../../context/AppContext';
import type { BlogPost } from '../../types';
import { blogPostsData } from '../../data/websiteData';
import { X, Calendar, Clock, Tag, Share2, ArrowRight } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';

interface BlogReaderModalProps {
  blog: BlogPost;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ blog }) => {
  const { closeModal, openModal, showToast } = useApp();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied! 📋', `Article link for "${blog.title}" copied to clipboard.`, 'info');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const relatedBlogs = blogPostsData
    .filter((b) => b.id !== blog.id && (b.category === blog.category || b.tags.some((t) => blog.tags.includes(t))))
    .slice(0, 2);

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 pt-16 sm:pt-24 pb-12 select-text"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-slate-900/20 animate-modal-in my-auto">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Meta Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
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

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#090D16] font-heading leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Author info & Share bar */}
          <div className="mt-4 flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d3cc11] to-[#ded725] p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black text-[#32679a]">
                  {blog.author.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author.name}</div>
                <div className="text-xs text-slate-500 font-medium">{blog.author.role}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>

        {/* Cover Graphic / Placeholder */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
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
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
          {blog.content.map((paragraph, idx) => (
            <p key={idx} className="leading-7 text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mr-1">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            Tags:
          </span>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Consultation CTA */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#d3cc11]  text-[#32679a]  flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {blog.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have questions about this architecture?</div>
              <div className="text-xs text-slate-500">Consult with {blog.author.name} ({blog.author.role}) directly.</div>
            </div>
          </div>

          <button
            onClick={() => {
              closeModal();
              openModal({ type: 'quote-modal', defaultService: blog.title });
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#d3cc11] hover:bg-[#ded725] text-[#32679a] text-xs sm:text-sm font-bold shadow-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            {/* <Sparkles className="w-4 h-4 text-[#ded725]" /> */}
            <span>Consult Author</span>
          </button>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-sm font-black text-[#090D16] font-heading mb-4">Related Engineering Insights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBlogs.map((rb) => (
                <div
                  key={rb.id}
                  onClick={() => openModal({ type: 'blog-reader', blog: rb })}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#32679a] hover:bg-white cursor-pointer transition-all group shadow-2xs hover:shadow-md"
                >
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    {rb.category}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#133A27] mt-1 line-clamp-2">
                    {rb.title}
                  </h5>
                  <div className="mt-2 flex items-center text-xs text-[#133A27] font-bold gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
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
