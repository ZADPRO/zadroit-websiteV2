import React, { useState, useEffect } from 'react';
import { useApp, type PageId } from '../context/AppContext';
import { navItems } from '../data/websiteData';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import logo from '../../public/logo.png';

export const Navbar: React.FC = () => {
  const { currentPage, navigate, openModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    navigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'py-3.5 light-nav shadow-sm'
        : 'py-5 bg-white/90 backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo matching template: Capsule icon + Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* <div className="flex items-center gap-1">
              <span className="w-3 h-7 rounded-full bg-[#C6F135]" />
              <span className="w-3 h-7 rounded-full bg-[#133A27]" />
            </div>

            <div className="flex items-center">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0F172A] font-heading group-hover:text-[#133A27] transition-colors">
                Zadroit<span className="text-[#84CC16]">.</span>
              </span>
            </div> */}
            <div
              className="flex items-center gap-1"
            >
              <img src={logo} alt="Zadroit"
                className='w-28 h-12' />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as PageId)}
                  className={`relative py-1 text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'text-[#133A27] font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] rounded-full bg-[#84CC16]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right CTA Button matching template */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
          

            {/* Dark Green Pill CTA */}
            <button
              onClick={() => openModal({ type: 'quote-modal' })}
              className="px-6 py-2.5 rounded-full bg-[#ded725] hover:bg-[#d3cc11] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Get A Quote</span>
              <ArrowRight className="w-4 h-4 text-[#32679a] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openModal({ type: 'search-modal' })}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 mt-3 shadow-xl animate-modal-in">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as PageId)}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-semibold flex items-center justify-between ${isActive
                    ? 'bg-slate-100 text-[#133A27] font-bold border-l-4 border-[#84CC16]'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal({ type: 'quote-modal' });
              }}
              className="w-full py-3 rounded-full bg-[#133A27] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>Get A Quote</span>
              <ArrowRight className="w-4 h-4 text-[#C6F135]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
