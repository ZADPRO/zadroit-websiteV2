import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { AIAssistantWidget } from './components/AIAssistantWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';

// Modals
import { JobApplyModal } from './components/modals/JobApplyModal';
import { DemoRequestModal } from './components/modals/DemoRequestModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { BlogReaderModal } from './components/modals/BlogReaderModal';
import { QuickQuoteModal } from './components/modals/QuickQuoteModal';
import { SearchModal } from './components/modals/SearchModal';

const MainLayout: React.FC = () => {
  const { currentPage, activeModal } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'products':
        return <ProductsPage />;
      case 'blog':
        return <BlogPage />;
      case 'careers':
        return <CareersPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Dynamic Page Content */}
      <main className="flex-grow">{renderCurrentPage()}</main>

      {/* Global Footer */}
      <Footer />

      {/* Floating AI Assistant Widget */}
      {/* <AIAssistantWidget /> */}

      {/* Global Toast Alerts */}
      <ToastNotification />

      {/* Active Modals */}
      {activeModal && (
        <>
          {activeModal.type === 'job-apply' && <JobApplyModal job={activeModal.job} />}
          {activeModal.type === 'product-demo' && <DemoRequestModal product={activeModal.product} />}
          {activeModal.type === 'service-details' && <ServiceDetailModal service={activeModal.service} />}
          {activeModal.type === 'blog-reader' && <BlogReaderModal blog={activeModal.blog} />}
          {activeModal.type === 'quote-modal' && <QuickQuoteModal defaultService={activeModal.defaultService} />}
          {activeModal.type === 'search-modal' && <SearchModal />}
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
