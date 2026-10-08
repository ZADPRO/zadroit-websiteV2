import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const ScrollProgressBar: React.FC = () => {
  const { currentPage } = useApp();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  // Track user scroll progress (0% to 100%)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page navigation loading sweep effect
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[120] pointer-events-none h-[3px]">
      {/* Dynamic Scroll Progress Fill Bar */}
      <div
        className="h-full bg-gradient-to-r from-[#32679a] via-[#ded725] to-[#32679a] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(222,215,37,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Quick Nav Loading Pulse */}
      {isNavigating && (
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ded725] to-transparent animate-pulse" />
      )}
    </div>
  );
};
