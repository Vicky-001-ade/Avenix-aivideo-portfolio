import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  Sparkles,
  Globe,
  Layers,
  ArrowRight,
} from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import cardVisual1 from '../assets/images/lifestyle_pod_still_1790332813205.jpg';
import cardVisual2 from '../assets/images/fitness_cyber_still_1790332786693.jpg';
import cardVisual3 from '../assets/images/central_ai_portal_world_hero_1790428500522.jpg';
import cardVisual4 from '../assets/images/hero_cinematic_visual_1790332675440.jpg';
import cardVisual5 from '../assets/images/visuals_futuristic_arch_1790332712746.jpg';

interface ServicesSectionProps {
  onInquireService?: (serviceName: string) => void;
}

interface SocialProofCard {
  id: string;
  orderIndex: number; // 0 to 4 (1st to 5th entrance order)
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
  bannerImage: string;
  isFeatured?: boolean;
  tier: 'outer' | 'inner' | 'center';
}

const SOCIAL_PROOF_CARDS: SocialProofCard[] = [
  {
    id: 'testimonial-1-daniel',
    orderIndex: 0,
    name: 'Daniel K.',
    role: 'YouTuber / Content Creator',
    rating: 5,
    quote:
      '“Avenix has completely changed how I create content. The visuals are next level and hold viewer retention from the very first frame!”',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    bannerImage: cardVisual1,
    tier: 'outer',
  },
  {
    id: 'testimonial-2-sarah',
    orderIndex: 1,
    name: 'Sarah L.',
    role: 'Brand Marketer',
    rating: 5,
    quote:
      '“Incredible quality and speed! Avenix made our global campaign vision a reality with breathtaking detail. Highly recommend!”',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    bannerImage: cardVisual2,
    tier: 'inner',
  },
  {
    id: 'testimonial-3-james',
    orderIndex: 2,
    name: 'James T.',
    role: 'Filmmaker & Creative Director',
    rating: 5,
    quote:
      '“The AI visuals from Avenix are absolutely mind-blowing. It feels like my imagination has no limits now — every frame looks like a blockbuster studio production.”',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
    bannerImage: cardVisual3,
    isFeatured: true,
    tier: 'center',
  },
  {
    id: 'testimonial-4-priya',
    orderIndex: 3,
    name: 'Priya S.',
    role: 'Creative Director',
    rating: 5,
    quote:
      '“Avenix delivers cinematic quality with zero hassle. It’s the ultimate creative partner for modern luxury brands and creators.”',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    bannerImage: cardVisual4,
    tier: 'inner',
  },
  {
    id: 'testimonial-5-olamide',
    orderIndex: 4,
    name: 'Olamide R.',
    role: 'Digital Artist',
    rating: 5,
    quote:
      '“The level of detail, atmospheric lighting, and realism is incredible. Avenix has become an essential part of my creative process.”',
    avatar:
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=240&q=80',
    bannerImage: cardVisual5,
    tier: 'outer',
  },
];

const TRUST_METRICS = [
  {
    id: 'metric-projects',
    value: '180',
    suffix: '+',
    label: 'PROJECTS DELIVERED',
    sublabel: 'Bespoke AI Campaigns & Films',
    icon: Layers,
  },
  {
    id: 'metric-visuals',
    value: '10K',
    suffix: '+',
    label: 'AI VISUALS CREATED',
    sublabel: 'From Ideas to Cinematic Reality',
    icon: Sparkles,
  },
  {
    id: 'metric-clients',
    value: '1K',
    suffix: '+',
    label: 'HAPPY CLIENTS',
    sublabel: 'Trust Avenix Worldwide',
    icon: Users,
  },
  {
    id: 'metric-industries',
    value: '30',
    suffix: '+',
    label: 'INDUSTRIES SERVED',
    sublabel: 'A Global Creative Footprint',
    icon: Globe,
  },
];

const AMBIENT_PARTICLES = [
  { top: '14%', left: '8%', size: 4, delay: '0s', duration: '6s' },
  { top: '22%', left: '88%', size: 5, delay: '1.2s', duration: '7.5s' },
  { top: '68%', left: '5%', size: 3, delay: '2.4s', duration: '5.5s' },
  { top: '74%', left: '93%', size: 4, delay: '0.8s', duration: '6.8s' },
  { top: '42%', left: '18%', size: 3, delay: '1.7s', duration: '6.2s' },
  { top: '38%', left: '81%', size: 3.5, delay: '2.9s', duration: '7s' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquireService }) => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const stageTrackRef = useRef<HTMLDivElement>(null);

  // Progressive card entrance reveal (1 -> 2 -> 3 -> 4 -> 5)
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  // Continuous horizontal scroll progress (0.0 = Card 1 ... 4.0 = Card 5)
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const [smoothProgress, setSmoothProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [stepWidth, setStepWidth] = useState<number>(270);

  // Touch drag tracking for tablet & mobile horizontal swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartProgressRef = useRef<number>(0);

  // Measure viewport to set optimal horizontal card spacing across Desktop, Tablet, and Mobile
  useEffect(() => {
    const updateStepWidth = () => {
      const vw = window.innerWidth;
      if (vw >= 1280) {
        setStepWidth(286);
      } else if (vw >= 1024) {
        setStepWidth(248);
      } else if (vw >= 768) {
        setStepWidth(272);
      } else {
        setStepWidth(Math.min(288, Math.max(236, vw * 0.74)));
      }
    };

    updateStepWidth();
    window.addEventListener('resize', updateStepWidth);
    return () => window.removeEventListener('resize', updateStepWidth);
  }, []);

  // Trigger progressive 1 -> 2 -> 3 -> 4 -> 5 entrance when section enters viewport
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Controlled sequential entrance reveal: Card 1 -> Card 2 -> Card 3 -> Card 4 -> Card 5
  useEffect(() => {
    if (!hasEntered) return;

    const timers: number[] = [];
    for (let i = 1; i <= 5; i++) {
      const t = window.setTimeout(() => {
        setRevealedCount((prev) => Math.max(prev, i));
      }, (i - 1) * 180);
      timers.push(t);
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [hasEntered]);

  // Smooth 60fps requestAnimationFrame inertia loop connecting scroll input to horizontal card motion
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0015) {
        const next = current + diff * 0.12;
        currentProgressRef.current = next;
        setSmoothProgress(next);

        const rounded = Math.max(0, Math.min(4, Math.round(next)));
        setActiveCardIndex((prev) => (prev !== rounded ? rounded : prev));
      } else if (current !== target) {
        currentProgressRef.current = target;
        setSmoothProgress(target);
        const rounded = Math.max(0, Math.min(4, Math.round(target)));
        setActiveCardIndex((prev) => (prev !== rounded ? rounded : prev));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Convert vertical page scroll inside the pinned section runway into horizontal card progress (0 -> 4)
  useEffect(() => {
    const syncScrollToHorizontalCards = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;

      if (rect.top < viewportH * 0.85 && rect.bottom > 0) {
        setHasEntered(true);
      }

      const totalPinnedRunway = Math.max(1, el.offsetHeight - viewportH);
      const scrolledInside = -rect.top;

      if (scrolledInside <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      if (scrolledInside >= totalPinnedRunway) {
        targetProgressRef.current = 4;
        setRevealedCount(5);
        return;
      }

      // Use a tiny entry buffer (6%) and exit buffer (8%) so Card 1 and Card 5 each have a clean focal moment
      const entryBuffer = totalPinnedRunway * 0.06;
      const activeRunway = totalPinnedRunway * 0.86;
      const normalized = Math.max(
        0,
        Math.min(1, (scrolledInside - entryBuffer) / Math.max(1, activeRunway))
      );

      const nextTarget = normalized * 4; // Maps 0..1 -> Card 0..Card 4
      targetProgressRef.current = nextTarget;

      // Ensure cards reveal progressively as user scrolls
      const stepReveal = Math.min(5, Math.max(1, Math.ceil(( normalized * 5 ) + 0.5)));
      setRevealedCount((prev) => Math.max(prev, stepReveal));
    };

    syncScrollToHorizontalCards();
    window.addEventListener('scroll', syncScrollToHorizontalCards, { passive: true });
    window.addEventListener('resize', syncScrollToHorizontalCards);
    return () => {
      window.removeEventListener('scroll', syncScrollToHorizontalCards);
      window.removeEventListener('resize', syncScrollToHorizontalCards);
    };
  }, []);

  // Support horizontal trackpad swipe gestures when pinned in the section
  useEffect(() => {
    const stageEl = stageTrackRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      // If user performs a horizontal two-finger trackpad swipe, convert it smoothly into runway scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        const atStart = targetProgressRef.current <= 0.02 && e.deltaX < 0;
        const atEnd = targetProgressRef.current >= 3.98 && e.deltaX > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          window.scrollBy({ top: e.deltaX * 1.35, behavior: 'auto' });
        }
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, []);

  // Scroll the page to the exact runway offset for a given card index (0..4)
  const scrollToCardIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(4, index));
    targetProgressRef.current = clamped;
    setActiveCardIndex(clamped);

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const sectionTopDoc = window.scrollY + rect.top;
    const viewportH = window.innerHeight || 800;
    const totalPinnedRunway = Math.max(1, el.offsetHeight - viewportH);

    // Only adjust window scroll if the section is currently in/near the pinned viewport
    if (rect.top <= 80 && rect.bottom >= viewportH - 80) {
      const entryBuffer = totalPinnedRunway * 0.06;
      const activeRunway = totalPinnedRunway * 0.86;
      const targetScrollY = sectionTopDoc + entryBuffer + (clamped / 4) * activeRunway;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  const handleSelectCard = (index: number) => {
    scrollToCardIndex(index);
  };

  const handlePrevCard = () => {
    const nextIdx = Math.max(0, activeCardIndex - 1);
    scrollToCardIndex(nextIdx);
  };

  const handleNextCard = () => {
    const nextIdx = Math.min(SOCIAL_PROOF_CARDS.length - 1, activeCardIndex + 1);
    scrollToCardIndex(nextIdx);
  };

  // Touch drag handlers for smooth horizontal swiping on Tablet & Mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartProgressRef.current = targetProgressRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const dx = touchStartXRef.current - e.touches[0].clientX;
    const dy = touchStartYRef.current - e.touches[0].clientY;

    // If predominantly horizontal swipe, directly scrub the horizontal card track
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      const deltaCards = dx / (stepWidth * 0.85);
      const nextProg = Math.max(0, Math.min(4, touchStartProgressRef.current + deltaCards));
      targetProgressRef.current = nextProg;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    // Gently settle onto the nearest card after a horizontal touch drag
    const snapped = Math.max(0, Math.min(4, Math.round(targetProgressRef.current)));
    scrollToCardIndex(snapped);
  };

  const handleJoinClick = () => {
    if (onInquireService) {
      onInquireService('AI Visual & Video Production');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Trusted By Visionaries — Social Proof"
      className="relative transition-colors min-h-[290vh] md:min-h-[320vh] lg:min-h-[350vh]"
      style={{
        backgroundColor: 'transparent',
        backgroundImage:
          theme === 'dark'
            ? 'linear-gradient(180deg, rgba(6, 13, 26, 0) 0%, rgba(7, 17, 38, 0.82) 12%, rgba(5, 12, 28, 0.92) 50%, rgba(7, 17, 38, 0.82) 88%, rgba(6, 13, 26, 0) 100%)'
            : 'linear-gradient(180deg, rgba(247, 250, 253, 0) 0%, rgba(233, 243, 254, 0.78) 12%, rgba(226, 239, 253, 0.88) 50%, rgba(233, 243, 254, 0.78) 88%, rgba(247, 250, 253, 0) 100%)',
      }}
    >
      {/* Sticky Pinned Showcase Stage — Locks section in view while vertical scroll drives horizontal card movement (Card 1 -> Card 5) */}
      <div className="sticky top-0 h-screen h-[100dvh] flex flex-col justify-center py-6 sm:py-8 lg:py-10 overflow-hidden">
        {/* Atmospheric Volumetric Blue Illumination & Floating Energy Particles */}
        {theme === 'dark' && (
          <>
            <div
              aria-hidden="true"
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1140px] h-[680px] pointer-events-none rounded-full blur-[175px]"
              style={{
                background:
                  'radial-gradient(ellipse 68% 56% at 50% 50%, rgba(22, 119, 255, 0.20) 0%, rgba(56, 189, 248, 0.09) 44%, transparent 82%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[420px] pointer-events-none rounded-full blur-[120px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
              }}
            />
          </>
        )}

        {theme === 'light' && (
          <div
            aria-hidden="true"
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1080px] h-[640px] pointer-events-none rounded-full blur-[165px]"
            style={{
              background:
                'radial-gradient(ellipse 68% 56% at 50% 50%, rgba(42, 140, 255, 0.12) 0%, rgba(92, 169, 255, 0.06) 46%, transparent 82%)',
            }}
          />
        )}

        {/* Subtle Floating Ambient Energy Particles */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {AMBIENT_PARTICLES.map((p, idx) => (
            <span
              key={idx}
              className="absolute rounded-full animate-pulse"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: p.delay,
                animationDuration: p.duration,
                backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF',
                boxShadow:
                  theme === 'dark'
                    ? '0 0 14px 2px rgba(56, 189, 248, 0.75)'
                    : '0 0 10px 1px rgba(42, 140, 255, 0.45)',
                opacity: theme === 'dark' ? 0.55 : 0.35,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-10 relative z-10 flex flex-col justify-between">
          {/* =================================================================
              SECTION HEADER: AVENIX Emblem, Eyebrow, Title & Subtitle
              ================================================================= */}
          <div
            className={`max-w-4xl mx-auto text-center mb-4 sm:mb-6 lg:mb-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Subtle Centered AVENIX Brand Mark */}
            <div className="flex justify-center mb-2">
              <img
                src={avenixLogo}
                alt="AVENIX"
                className="h-6 sm:h-7 w-auto object-contain select-none opacity-90 drop-shadow-[0_0_16px_rgba(56,189,248,0.28)]"
              />
            </div>

            {/* Eyebrow: — SOCIAL PROOF — */}
            <div className="inline-flex items-center gap-3.5 mb-2.5">
              <span
                className="w-8 sm:w-10 h-[1.5px] rounded-full"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, transparent 0%, #38BDF8 100%)'
                      : 'linear-gradient(90deg, transparent 0%, #2A8CFF 100%)',
                }}
              />
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.32em] font-semibold font-mono-tech"
                style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
              >
                SOCIAL PROOF
              </span>
              <span
                className="w-8 sm:w-10 h-[1.5px] rounded-full"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, #38BDF8 0%, transparent 100%)'
                      : 'linear-gradient(90deg, #2A8CFF 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Main Headline */}
            <h2
              className="font-display text-2xl sm:text-4xl md:text-[44px] xl:text-[50px] font-extrabold tracking-tight leading-[1.08]"
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
            >
              Trusted By Visionaries.{' '}
              <span
                className="block sm:inline bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 50%, #BAE6FD 100%)'
                      : 'linear-gradient(90deg, #1D74DF 0%, #2A8CFF 50%, #5CA9FF 100%)',
                }}
              >
                Powered By Imagination.
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 font-normal leading-relaxed"
              style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}
            >
              Helping brands, creators, and businesses transform ideas into cinematic AI
              experiences.
            </p>
          </div>

          {/* =================================================================
              SCROLL-CONTROLLED HORIZONTAL 5-CARD TESTIMONIAL SHOWCASE
              Vertical scroll input moves the cards horizontally across the stage
              from Card 1 -> Card 2 -> Card 3 -> Card 4 -> Card 5
              ================================================================= */}
          <div
            ref={stageTrackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[340px] sm:h-[370px] lg:h-[395px] xl:h-[415px] flex items-center justify-center overflow-visible select-none"
          >
            {SOCIAL_PROOF_CARDS.map((card, idx) => {
              const isRevealed = revealedCount >= idx + 1;

              // Relative horizontal distance from the current scroll-driven focal point
              const relativeOffset = idx - smoothProgress;
              const absDist = Math.abs(relativeOffset);

              // Continuous focus weight (1.0 when centered in spotlight, 0.0 when >= 1 step away)
              const focusWeight = Math.max(0, 1 - absDist);
              const isFocusedCard = activeCardIndex === idx;

              // Horizontal translation driven directly by scroll progress
              const translateX = relativeOffset * stepWidth;

              // Entrance vertical slide + dynamic arch elevation
              const entranceY = isRevealed ? 0 : 44;
              const archLiftY = -focusWeight * 12 + Math.min(2, absDist) * 6;
              const translateY = entranceY + archLiftY;

              // Smooth scale hierarchy: largest in center spotlight, stepping down on both sides
              const baseScale =
                1.07 - Math.min(absDist, 1) * 0.11 - Math.max(0, absDist - 1) * 0.06;
              const scale = isRevealed ? Math.max(0.8, baseScale) : 0.88;

              // Smooth opacity falloff for peripheral cards
              const computedOpacity = !isRevealed
                ? 0
                : absDist <= 2.15
                ? Math.max(0.42, 1 - absDist * 0.18)
                : Math.max(0.15, 0.58 - (absDist - 2) * 0.32);

              // Dynamic z-index so the focused center card always sits above neighbors
              const zIndex = Math.round(40 - absDist * 10);

              return (
                <article
                  key={card.id}
                  onClick={() => handleSelectCard(idx)}
                  style={{
                    transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(
                      1
                    )}px, 0) scale(${scale.toFixed(3)})`,
                    opacity: computedOpacity,
                    zIndex,
                    transition: isRevealed
                      ? 'opacity 360ms ease, border-color 350ms ease, box-shadow 350ms ease'
                      : 'transform 680ms cubic-bezier(0.16, 1, 0.3, 1), opacity 680ms ease',
                  }}
                  className={`group absolute w-[256px] sm:w-[286px] lg:w-[296px] xl:w-[318px] h-[325px] sm:h-[350px] lg:h-[372px] xl:h-[388px] rounded-[22px] overflow-hidden backdrop-blur-xl border cursor-pointer select-none flex flex-col justify-between will-change-[transform,opacity] ${
                    isFocusedCard
                      ? theme === 'dark'
                        ? 'bg-[#08152E]/92 border-sky-400/80 hover:border-sky-300 shadow-[0_26px_70px_-12px_rgba(0,0,0,0.92),0_0_52px_-8px_rgba(56,189,248,0.46)]'
                        : 'bg-white/96 border-[#2A8CFF] shadow-[0_26px_64px_-12px_rgba(17,24,39,0.20),0_0_48px_-8px_rgba(42,140,255,0.34)]'
                      : theme === 'dark'
                      ? 'bg-[#071124]/84 border-white/12 hover:border-sky-400/50 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.82)]'
                      : 'bg-[#FCFDFE]/92 border-[#DCE5F0] hover:border-[#2A8CFF]/55 shadow-[0_16px_36px_-12px_rgba(17,24,39,0.10)]'
                  }`}
                >
                  {/* Animated Holographic Top & Bottom Edge Highlights */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-4 top-0 h-[1.5px] z-20 pointer-events-none transition-opacity duration-500 ${
                      isFocusedCard ? 'opacity-100' : 'opacity-35 group-hover:opacity-100'
                    }`}
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.9) 35%, #FFFFFF 50%, rgba(56, 189, 248, 0.9) 65%, transparent 100%)',
                      boxShadow: '0 0 14px rgba(56, 189, 248, 0.85)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-8 bottom-0 h-[1px] z-20 pointer-events-none transition-opacity duration-500 ${
                      isFocusedCard ? 'opacity-90' : 'opacity-20 group-hover:opacity-85'
                    }`}
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 50%, transparent 100%)',
                      boxShadow: '0 0 12px rgba(22, 119, 255, 0.7)',
                    }}
                  />

                  {/* Glowing Tech Corner Brackets */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-2 left-2 w-3.5 h-3.5 rounded-tl-[12px] border-t-[1.5px] border-l-[1.5px] z-20 transition-opacity duration-300 ${
                      isFocusedCard
                        ? 'border-sky-300 opacity-100'
                        : 'border-sky-400/70 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-2 right-2 w-3.5 h-3.5 rounded-tr-[12px] border-t-[1.5px] border-r-[1.5px] z-20 transition-opacity duration-300 ${
                      isFocusedCard
                        ? 'border-sky-300 opacity-100'
                        : 'border-sky-400/70 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-2 left-2 w-3.5 h-3.5 rounded-bl-[12px] border-b-[1.5px] border-l-[1.5px] z-20 transition-opacity duration-300 ${
                      isFocusedCard
                        ? 'border-sky-300 opacity-100'
                        : 'border-sky-400/70 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-2 right-2 w-3.5 h-3.5 rounded-br-[12px] border-b-[1.5px] border-r-[1.5px] z-20 transition-opacity duration-300 ${
                      isFocusedCard
                        ? 'border-sky-300 opacity-100'
                        : 'border-sky-400/70 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Top AI Artwork Header Banner */}
                  <div className="relative w-full h-36 sm:h-40 lg:h-44 overflow-hidden shrink-0">
                    <img
                      src={card.bannerImage}
                      alt={`${card.name} AI visual showcase`}
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Smooth Bottom Dissolve Mask into Card Body */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          theme === 'dark'
                            ? isFocusedCard
                              ? 'linear-gradient(180deg, rgba(8, 21, 46, 0.05) 0%, rgba(8, 21, 46, 0.45) 62%, #08152E 100%)'
                              : 'linear-gradient(180deg, rgba(7, 17, 36, 0.08) 0%, rgba(7, 17, 36, 0.52) 64%, #071124 100%)'
                            : 'linear-gradient(180deg, rgba(15, 23, 42, 0.04) 0%, rgba(252, 253, 254, 0.55) 68%, #FCFDFE 100%)',
                      }}
                    />
                  </div>

                  {/* Card Content Body: Avatar, Name, Role, Stars & Testimonial Quote */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between -mt-8 px-4 sm:px-5 pb-4 sm:pb-5">
                    <div>
                      {/* User Profile Lockup */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`relative rounded-full overflow-hidden shrink-0 border-2 w-11 h-11 sm:w-12 sm:h-12 ${
                            theme === 'dark'
                              ? 'border-sky-400/80 shadow-[0_0_16px_rgba(56,189,248,0.45)]'
                              : 'border-[#2A8CFF] shadow-[0_0_14px_rgba(42,140,255,0.30)]'
                          }`}
                        >
                          <img
                            src={card.avatar}
                            alt={card.name}
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="font-display font-bold tracking-tight truncate text-sm sm:text-base"
                            style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                          >
                            {card.name}
                          </h3>
                          <p
                            className="truncate font-medium text-[11px]"
                            style={{ color: theme === 'dark' ? '#94A3B8' : '#475569' }}
                          >
                            {card.role}
                          </p>

                          {/* 5-Star Rating */}
                          <div
                            className="flex items-center gap-1 mt-1"
                            aria-label={`${card.rating} out of 5 stars`}
                          >
                            {Array.from({ length: card.rating }).map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${
                                  theme === 'dark'
                                    ? 'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]'
                                    : 'text-[#2A8CFF]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote
                        className="font-normal leading-relaxed text-xs sm:text-[13px] line-clamp-4"
                        style={{
                          color:
                            theme === 'dark'
                              ? isFocusedCard
                                ? '#F1F5F9'
                                : '#CBD5E1'
                              : isFocusedCard
                              ? '#1E293B'
                              : '#334155',
                        }}
                      >
                        {card.quote}
                      </blockquote>
                    </div>

                    {/* Subtle Holographic Bottom Reflection Line */}
                    <div
                      aria-hidden="true"
                      className="mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.2em]"
                      style={{
                        borderColor:
                          theme === 'dark'
                            ? 'rgba(255, 255, 255, 0.07)'
                            : 'rgba(42, 140, 255, 0.14)',
                        color: '#64748B',
                      }}
                    >
                      <span>VERIFIED PARTNER</span>
                      <span style={{ color: theme === 'dark' ? '#38BDF8' : '#1D74DF' }}>
                        0{idx + 1} // 05
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =================================================================
              CAROUSEL / SPOTLIGHT NAVIGATION CONTROLS (Reference-Inspired)
              ================================================================= */}
          <div
            className={`mt-3 sm:mt-4 flex items-center justify-center gap-4 transition-all duration-700 ${
              revealedCount >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              type="button"
              onClick={handlePrevCard}
              aria-label="Highlight previous testimonial"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/25 bg-white/5 text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/15'
                  : 'border-[#CBD8E8] bg-white text-[#1E293B] hover:border-[#2A8CFF] hover:text-[#2A8CFF] shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
              {SOCIAL_PROOF_CARDS.map((c, idx) => {
                const active = activeCardIndex === idx;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCard(idx)}
                    aria-label={`Highlight ${c.name} testimonial`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      active
                        ? theme === 'dark'
                          ? 'w-6 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]'
                          : 'w-6 bg-[#2A8CFF] shadow-[0_0_10px_rgba(42,140,255,0.55)]'
                        : theme === 'dark'
                        ? 'w-2 bg-white/25 hover:bg-white/45'
                        : 'w-2 bg-[#CBD8E8] hover:bg-[#94A3B8]'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNextCard}
              aria-label="Highlight next testimonial"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/25 bg-white/5 text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/15'
                  : 'border-[#CBD8E8] bg-white text-[#1E293B] hover:border-[#2A8CFF] hover:text-[#2A8CFF] shadow-sm'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* =================================================================
              TRUST METRICS BAR (Below Testimonial Cards)
              ================================================================= */}
          <div
            className={`mt-4 sm:mt-6 rounded-[22px] border backdrop-blur-xl px-5 py-4 sm:px-7 sm:py-5 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              revealedCount >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${
              theme === 'dark'
                ? 'bg-[#060F20]/85 border-white/12 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_-12px_rgba(22,119,255,0.22)]'
                : 'bg-white/90 border-[#DCE5F0] shadow-[0_20px_50px_-15px_rgba(17,24,39,0.10),0_0_36px_-12px_rgba(42,140,255,0.15)]'
            }`}
          >
            {/* Subtle Top Specular Line */}
            <div
              aria-hidden="true"
              className="absolute inset-x-16 top-0 h-[1px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.65) 50%, transparent 100%)',
              }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-4 items-center">
              {/* 4 Core Trust Metrics */}
              <div className="col-span-2 lg:col-span-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
                {TRUST_METRICS.map((metric, mIdx) => {
                  const IconComponent = metric.icon;
                  return (
                    <div
                      key={metric.id}
                      className={`flex items-center gap-3 sm:gap-3.5 ${
                        mIdx > 0
                          ? theme === 'dark'
                            ? 'lg:border-l lg:border-white/10 lg:pl-5'
                            : 'lg:border-l lg:border-[#DCE5F0] lg:pl-5'
                          : ''
                      }`}
                    >
                      {/* Futuristic Icon Badge */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 hover:scale-105 ${
                          theme === 'dark'
                            ? 'bg-sky-500/10 border-sky-400/30 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                            : 'bg-[#EBF4FF] border-[#2A8CFF]/30 text-[#2A8CFF]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-baseline gap-0.5">
                          <span
                            className="font-display text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight tabular-nums"
                            style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                          >
                            {metric.value}
                          </span>
                          <span
                            className="font-display text-lg sm:text-xl font-bold"
                            style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
                          >
                            {metric.suffix}
                          </span>
                        </div>
                        <div
                          className="text-[9.5px] sm:text-[10.5px] font-mono-tech uppercase tracking-[0.16em] font-semibold truncate"
                          style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
                        >
                          {metric.label}
                        </div>
                        <div
                          className="hidden sm:block text-[10.5px] truncate"
                          style={{ color: theme === 'dark' ? '#94A3B8' : '#475569' }}
                        >
                          {metric.sublabel}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Callout Accent ("Join the Creators Choosing Avenix") */}
              <div
                className={`col-span-2 lg:col-span-2 hidden sm:flex items-center justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-5 ${
                  theme === 'dark' ? 'border-white/10' : 'border-[#DCE5F0]'
                }`}
              >
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className="group text-left inline-flex flex-col items-start cursor-pointer"
                >
                  <span
                    className="text-xs italic font-medium leading-snug transition-colors"
                    style={{ color: theme === 'dark' ? '#BAE6FD' : '#1D74DF' }}
                  >
                    Join the Creators Choosing Avenix
                  </span>
                  <span
                    className="mt-0.5 inline-flex items-center gap-1.5 text-[10px] font-mono-tech uppercase tracking-[0.2em] font-semibold"
                    style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

