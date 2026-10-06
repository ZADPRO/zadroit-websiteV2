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
      showToast('Link Copied', 'Article link copied to clipboard.', 'info');
    }
  };

  const relatedBlogs = blogPostsData
    .filter((b) => b.id !== blog.id && (b.category === blog.category || b.tags.some((t) => blog.tags.includes(t))))
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl animate-modal-in my-8">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Meta Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {blog.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.publishedDate}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading leading-tight">
            {blog.title}
          </h1>

          {/* Author info */}
          <div className="mt-4 flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-amber-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                  {blog.author.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{blog.author.name}</div>
                <div className="text-xs text-slate-400">{blog.author.role}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>

        {/* Cover Graphic / Placeholder */}
        <div className="mb-8">
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
        <div className="prose prose-invert max-w-none space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          {blog.content.map((paragraph, idx) => (
            <p key={idx} className="leading-7">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            Tags:
          </span>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white mb-4">Related Engineering Insights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBlogs.map((rb) => (
                <div
                  key={rb.id}
                  onClick={() => openModal({ type: 'blog-reader', blog: rb })}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group"
                >
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                    {rb.category}
                  </span>
                  <h5 className="text-sm font-semibold text-slate-200 group-hover:text-white mt-1 line-clamp-2">
                    {rb.title}
                  </h5>
                  <div className="mt-2 flex items-center text-xs text-amber-400 font-medium gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
