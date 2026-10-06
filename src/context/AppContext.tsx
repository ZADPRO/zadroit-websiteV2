import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Service, Product, BlogPost, JobOpening } from '../types';
import confetti from 'canvas-confetti';

export type PageId = 'home' | 'about' | 'services' | 'products' | 'blog' | 'careers' | 'contact';

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
  navigate: (page: PageId, options?: { scrollToTop?: boolean; anchor?: string }) => void;
  activeModal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  toasts: ToastInfo[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: PageId[] = ['home', 'about', 'services', 'products', 'blog', 'careers', 'contact'];
    return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
  });

  const [activeModal, setActiveModal] = useState<ModalState>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'about', 'services', 'products', 'blog', 'careers', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
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

  const navigate = (page: PageId, options?: { scrollToTop?: boolean; anchor?: string }) => {
    setCurrentPage(page);
    window.location.hash = page;
    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        navigate,
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
