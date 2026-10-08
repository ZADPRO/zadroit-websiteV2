import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Service, Product, BlogPost, JobOpening } from '../types';
import confetti from 'canvas-confetti';

export type PageId = 'home' | 'about' | 'services' | 'products' | 'blog' | 'careers' | 'contact' | 'blog-detail';

export type ModalState =
  | { type: 'job-apply'; job: JobOpening }
  | { type: 'job-details'; job: JobOpening }
  | { type: 'service-details'; service: Service }
  | { type: 'product-demo'; product?: Product }
  | { type: 'blog-reader'; blog: BlogPost }
  | { type: 'quote-modal'; defaultService?: string }
  | { type: 'search-modal' }
  | null;

export interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentPage: PageId;
  currentBlogId: string | null;
  navigate: (page: PageId | string, options?: { scrollToTop?: boolean; anchor?: string; blogId?: string }) => void;
  navigateToBlog: (blogId: string) => void;
  activeModal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  toasts: ToastInfo[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
}

const parseHashState = (): { page: PageId; blogId: string | null } => {
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!rawHash) return { page: 'home', blogId: null };

  let path = rawHash;
  let queryBlogId: string | null = null;
  if (rawHash.includes('?')) {
    const [cleanPath, query] = rawHash.split('?');
    path = cleanPath;
    const params = new URLSearchParams(query);
    queryBlogId = params.get('id') || params.get('blogId');
  }

  const parts = path.split('/').filter(Boolean);
  const base = parts[0]?.toLowerCase();

  if (base === 'blog') {
    if (parts.length > 1 && parts[1]) {
      return { page: 'blog-detail', blogId: parts[1] };
    }
    if (queryBlogId) {
      return { page: 'blog-detail', blogId: queryBlogId };
    }
    return { page: 'blog', blogId: null };
  }

  if (base === 'blog-detail') {
    const bId = parts[1] || queryBlogId;
    return { page: 'blog-detail', blogId: bId || null };
  }

  const validPages: PageId[] = ['home', 'about', 'services', 'products', 'blog', 'careers', 'contact', 'blog-detail'];
  if (validPages.includes(base as PageId)) {
    return { page: base as PageId, blogId: null };
  }

  return { page: 'home', blogId: null };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ page: initialPage, blogId: initialBlogId }] = useState(parseHashState);
  const [currentPage, setCurrentPage] = useState<PageId>(initialPage);
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(initialBlogId);

  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const { page, blogId } = parseHashState();
      setCurrentPage(page);
      setCurrentBlogId(blogId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setActiveModal((prev) => (prev?.type === 'search-modal' ? null : { type: 'search-modal' }));
      }
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (
    page: PageId | string,
    options?: { scrollToTop?: boolean; anchor?: string; blogId?: string }
  ) => {
    if (page === 'blog-detail' || page.startsWith('blog/')) {
      const blogId = options?.blogId || (page.startsWith('blog/') ? page.replace('blog/', '') : currentBlogId);
      if (blogId) {
        navigateToBlog(blogId);
        return;
      }
    }

    const targetPage = (page as PageId) || 'home';
    setCurrentPage(targetPage);
    setCurrentBlogId(null);
    window.location.hash = targetPage;
    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToBlog = (blogId: string) => {
    setCurrentPage('blog-detail');
    setCurrentBlogId(blogId);
    window.location.hash = `blog/${encodeURIComponent(blogId)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (modal: ModalState) => {
    setActiveModal(modal);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#FBBF24', '#10B981', '#38BDF8', '#F59E0B']
      });
    } catch {
      // Fallback silently if confetti library is not available
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        currentBlogId,
        navigate,
        navigateToBlog,
        activeModal,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
