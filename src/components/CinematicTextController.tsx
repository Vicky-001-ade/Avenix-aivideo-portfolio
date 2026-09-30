import React, { useEffect } from 'react';

/**
 * Non-Destructive Cinematic Text Animation Controller
 * - Preserves 100% of React's virtual DOM tree (never replaces or removes child nodes).
 * - Never leaves cards, images, or sections hidden at opacity: 0.
 * - Uses IntersectionObserver + Web Animations API + CSS keyframes to smoothly
 *   reveal headings, subheadings, eyebrows, and key text blocks as the user scrolls,
 *   plus a subtle scroll-linked depth feel on section headings.
 */
export const CinematicTextController: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    const animatedSet = new WeakSet<HTMLElement>();

    // Collect all section text targets (strictly without mutating child nodes)
    const getTargets = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'main section:not(#hero):not(#services):not(#testimonials) h2, main section:not(#hero):not(#services):not(#testimonials) h3, main section:not(#hero):not(#services):not(#testimonials) h4, main section:not(#hero):not(#services):not(#testimonials) p, main section:not(#hero):not(#services):not(#testimonials) blockquote, footer h2, footer p'
        )
      );

      // Also include section eyebrow labels next to the blue dot indicator
      const eyebrows = Array.from(
        document.querySelectorAll<HTMLElement>(
          'main section:not(#hero):not(#services):not(#testimonials) span.font-mono-tech'
        )
      ).filter((el) => {
        const parent = el.parentElement;
        if (!parent) return false;
        return Boolean(parent.querySelector('span.rounded-full'));
      });

      return [...eyebrows, ...elements].filter((el) => {
        if (el.closest('button, a, input, select, textarea')) return false;
        return true;
      });
    };

    const playCinematicReveal = (el: HTMLElement, staggerIndex: number) => {
      if (animatedSet.has(el)) return;
      animatedSet.add(el);

      if (reducedMotion || typeof el.animate !== 'function') {
        return;
      }

      const tag = el.tagName.toLowerCase();
      const isHeading = tag === 'h2' || tag === 'h3';
      const isEyebrow = tag === 'span' && el.classList.contains('font-mono-tech');

      const delay = Math.min(staggerIndex, 5) * 75;

      if (isEyebrow) {
        el.animate(
          [
            {
              opacity: 0,
              transform: 'translate3d(-10px, 0, 0)',
              clipPath: 'inset(0 100% 0 0)',
            },
            {
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              clipPath: 'inset(0 0% 0 0)',
            },
          ],
          {
            duration: 720,
            delay,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          }
        );
      } else if (isHeading) {
        el.animate(
          [
            {
              opacity: 0,
              transform: 'translate3d(0, 26px, 0) scale(0.975)',
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              transform: 'translate3d(0, 0, 0) scale(1)',
              filter: 'blur(0px)',
            },
          ],
          {
            duration: 860,
            delay: delay + 40,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'both',
          }
        );
      } else {
        el.animate(
          [
            {
              opacity: 0,
              transform: 'translate3d(0, 18px, 0)',
              filter: 'blur(5px)',
            },
            {
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              filter: 'blur(0px)',
            },
          ],
          {
            duration: 800,
            delay: delay + 95,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          }
        );
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Group intersecting entries in the current frame so sibling elements stagger naturally
        let batchIndex = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            playCinematicReveal(target, batchIndex);
            batchIndex++;
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    const targets = getTargets();
    targets.forEach((el) => observer.observe(el));

    // Subtle scroll-linked depth for section h2 headings
    const sectionHeadings = Array.from(
      document.querySelectorAll<HTMLElement>(
        'main section:not(#hero):not(#services):not(#testimonials) h2'
      )
    );

    let rafId = 0;
    let ticking = false;

    const updateScrollDepth = () => {
      ticking = false;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const center = vh * 0.5;

      for (let i = 0; i < sectionHeadings.length; i++) {
        const h = sectionHeadings[i];
        const rect = h.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) continue;

        const elCenter = rect.top + rect.height * 0.5;
        const norm = Math.max(-1, Math.min(1, (elCenter - center) / (vh * 0.6)));
        const driftY = norm * 3.5;
        h.style.setProperty('--scroll-drift-y', `${driftY.toFixed(2)}px`);
      }
    };

    const handleScroll = () => {
      if (!ticking && !reducedMotion) {
        ticking = true;
        rafId = requestAnimationFrame(updateScrollDepth);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollDepth();

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return null;
};
