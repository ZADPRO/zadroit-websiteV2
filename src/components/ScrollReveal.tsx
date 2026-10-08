import React, { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'blur-in'
  | 'scale-up';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number; // 0 to 1
  once?: boolean;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.1,
  once = true,
  className = '',
  as: Component = 'div',
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Determine initial vs visible inline/class transforms
  const getVariantStyles = (): { hidden: string; visible: string } => {
    switch (variant) {
      case 'fade-down':
        return {
          hidden: 'opacity-0 -translate-y-8 blur-[2px]',
          visible: 'opacity-100 translate-y-0 blur-0',
        };
      case 'fade-left':
        return {
          hidden: 'opacity-0 -translate-x-8 blur-[2px]',
          visible: 'opacity-100 translate-x-0 blur-0',
        };
      case 'fade-right':
        return {
          hidden: 'opacity-0 translate-x-8 blur-[2px]',
          visible: 'opacity-100 translate-x-0 blur-0',
        };
      case 'zoom-in':
      case 'scale-up':
        return {
          hidden: 'opacity-0 scale-[0.93] blur-[2px]',
          visible: 'opacity-100 scale-100 blur-0',
        };
      case 'blur-in':
        return {
          hidden: 'opacity-0 blur-md',
          visible: 'opacity-100 blur-0',
        };
      case 'fade-up':
      default:
        return {
          hidden: 'opacity-0 translate-y-7 blur-[2px]',
          visible: 'opacity-100 translate-y-0 blur-0',
        };
    }
  };

  const { hidden, visible } = getVariantStyles();

  return (
    <Component
      ref={elementRef}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform,filter] ${
        isVisible ? visible : hidden
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

// Stagger Container for automatically revealing children with sequential delay
interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number; // ms delay between each child
  baseDelay?: number; // ms initial delay
  variant?: RevealVariant;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 90,
  baseDelay = 0,
  variant = 'fade-up',
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          variant={variant}
          delay={baseDelay + index * staggerDelay}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};
