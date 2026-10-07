import React from "react";
import { useApp, type PageId } from "../context/AppContext";
import { productsData } from "../data/websiteData";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import logo from "../../public/logo.png";

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  const latestProducts = productsData.slice(0, 5);

  const footerServices = [
    "Cybersecurity Services",
    "Cloud Computing Solutions",
    "Web & Mobile App Development",
    "Oracle Software Solutions",
    "SAP Integration",
    "AI & Machine Learning Development",
  ];

  const companyLinks: { label: string; id: PageId }[] = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Products", id: "products" },
    { label: "Blog", id: "blog" },
    { label: "Careers", id: "careers" },
    { label: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/zadroit-it-solutions",
    },
    { platform: "X", url: "https://x.com/zadroit_tech" },
    { platform: "Facebook", url: "https://facebook.com/zadroit" },
    { platform: "Instagram", url: "https://instagram.com/zadroit_official" },
    { platform: "GitHub", url: "https://github.com/zadroit-tech" },
  ];

  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74v-8.37H5.06v8.37z" />
        </svg>
      );
    }
    if (p.includes("twitter") || p.includes("x")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }
    if (p.includes("facebook")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    }
    if (p.includes("instagram")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    }
    if (p.includes("github")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    }
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer className="relative bg-[#ded725] border-t border-black/10 pt-12 pb-6 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Links Grid: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10">
          {/* Column 1: Company Profile & Contact Info */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4 text-black">
            <div
              onClick={() => navigate("home")}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <img src={logo} alt="Zadroit" className="w-28 h-12 object-contain" />
            </div>

            <p className="text-sm text-black leading-relaxed max-w-sm font-normal">
              Your trusted partner for custom enterprise software development, cloud infrastructure, AI solutions, SAP integration, and proprietary SaaS platforms.
            </p>

            <div className="pt-2 text-sm text-[#32679a] space-y-2.5 font-semibold">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#32679a] mt-0.5 shrink-0" />
                <span>
                  38/37B, No.1 Logi Street, Gugai, <br /> Salem – 636006, Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#32679a] shrink-0" />
                <a href="tel:04273562462" className="hover:underline">
                  0427 3562462
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#32679a] shrink-0" />
                <a href="mailto:info@zadroit.com" className="hover:underline">
                  info@zadroit.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-3 lg:col-span-4 text-black">
            <h4 className="text-xl font-bold text-[#32679a] mb-4 font-heading">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-black">
              {footerServices.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate("services")}
                    className="hover:opacity-75 transition-opacity text-left text-black font-medium"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products (Latest 5 products, without side heading/badge) */}
          <div className="md:col-span-3 lg:col-span-3 text-black">
            <h4 className="text-xl font-bold text-[#32679a] mb-4 font-heading">
              Products
            </h4>
            <ul className="space-y-3 text-sm text-black">
              {latestProducts.map((prod) => (
                <li key={prod.id}>
                  <button
                    onClick={() => navigate("products")}
                    className="hover:opacity-75 transition-opacity text-left text-black font-medium"
                  >
                    {prod.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Centered Area */}
        <div className="pt-6 pb-2 flex flex-col items-center justify-center gap-5 text-center">
          {/* Social Media Links with #EDE985 Glow & #1B3853 Icons */}
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white text-[#1B3853] shadow-[0_0_18px_#5F88B0,0_2px_8px_rgba(0,0,0,0.06)] border border-[#5F88B0] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_26px_#5F88B0] transition-all duration-200"
                aria-label={s.platform}
              >
                {renderSocialIcon(s.platform)}
              </a>
            ))}
          </div>

          {/* Company Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-black">
            {companyLinks.map((link, idx) => (
              <React.Fragment key={link.id}>
                <button
                  onClick={() => navigate(link.id)}
                  className="hover:opacity-75 transition-opacity text-black"
                >
                  {link.label}
                </button>
                {idx < companyLinks.length - 1 && (
                  <span className="text-[#1B3853] select-none font-normal">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Divider Line */}
          <div className="w-full border-t border-black/15 my-1" />

          {/* Copyright & Privacy Policy */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-black font-medium">
            <span>© {new Date().getFullYear()} ZAdroit IT Solution. All rights reserved.</span>
            <span className="text-[#1B3853] select-none">•</span>
            <button
              onClick={() => navigate("contact")}
              className="text-[#1B3853] font-semibold hover:underline"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
