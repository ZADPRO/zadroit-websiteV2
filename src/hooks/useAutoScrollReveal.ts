import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Global hook that observes any element with `.scroll-reveal`, `[data-reveal]`,
 * semantic `<section>`, or `.reveal-group > *` and applies smooth entrance animations
 * when scrolled into the viewport.
 */
export const useAutoScrollReveal = () => {
  const { currentPage } = useApp();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    // Small delay to allow the new page DOM to mount and settle
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              entry.target.classList.remove('reveal-hidden');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      // Select targets: explicit reveal classes, sections, bento cards, grid items
      const elements = document.querySelectorAll<HTMLElement>(
        '.scroll-reveal, [data-reveal], .reveal-child, section:not(.no-reveal)'
      );

      elements.forEach((el) => {
        // If not already revealed
        if (!el.classList.contains('is-revealed')) {
          el.classList.add('reveal-init');
          
          // If custom delay not present and it's a child element, calculate stagger
          if (!el.style.transitionDelay && el.dataset.delay) {
            el.style.transitionDelay = `${el.dataset.delay}ms`;
          }
          
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 60);

    return () => clearTimeout(timeout);
  }, [currentPage]);
};
