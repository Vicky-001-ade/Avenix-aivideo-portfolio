import React, { useEffect, useState } from 'react';
import avenixSplashBg from '../assets/images/avenix_splash_screen_1790435335372.jpg';
import avenixStudioHeroBg from '../assets/images/avenix_studio_hero_bg_1790433695735.jpg';

const HERO_POSTER_URL =
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85';

interface AvenixSplashScreenProps {
  onComplete?: () => void;
}

export const AvenixSplashScreen: React.FC<AvenixSplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(8);
  const [imageReady, setImageReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const startTime = performance.now();
    const MIN_DISPLAY_MS = 1500; // Exactly 1.5 seconds (1500 milliseconds) minimum duration
    const SAFETY_FALLBACK_MS = 8000; // Safety fallback if an external network request ever hangs

    let heroAssetsLoaded = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    // Decode splash image first for immediate crispness, and preload critical Hero assets in parallel
    preloadImage(avenixSplashBg).then(() => {
      if (isMounted) setImageReady(true);
    });

    const waitForWindowLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    Promise.all([
      preloadImage(avenixSplashBg),
      preloadImage(avenixStudioHeroBg),
      preloadImage(HERO_POSTER_URL),
      waitForWindowLoad,
    ]).then(() => {
      heroAssetsLoaded = true;
    });

    let rafId = 0;

    const updateProgress = (now: number) => {
      if (!isMounted) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / MIN_DISPLAY_MS);

      // Smooth cubic ease-out progress curve over the 1500ms duration
      const easedRatio = 1 - Math.pow(1 - timeRatio, 2.6);

      if ((heroAssetsLoaded && elapsed >= MIN_DISPLAY_MS) || elapsed >= SAFETY_FALLBACK_MS) {
        setProgress(100);
        setIsFadingOut(true);
        window.setTimeout(() => {
          if (!isMounted) return;
          setIsRemoved(true);
          onComplete?.();
        }, 600);
        return;
      }

      // If 1500ms has elapsed but critical assets are still finishing, smoothly creep from 92% -> 99%
      if (elapsed >= MIN_DISPLAY_MS && !heroAssetsLoaded) {
        const extraRatio = Math.min(1, (elapsed - MIN_DISPLAY_MS) / 2500);
        const creepVal = Math.min(99, 92 + Math.round(extraRatio * 7));
        setProgress(creepVal);
      } else {
        const targetCap = heroAssetsLoaded ? 99 : 92;
        const nextVal = Math.max(8, Math.min(targetCap, Math.round(easedRatio * targetCap)));
        setProgress(nextVal);
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading AVENIX experience"
      className={`avenix-splash-root fixed inset-0 z-[100] select-none bg-[#040812] transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFadingOut
          ? 'opacity-0 scale-[1.015] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* =====================================================================
          1. DESKTOP LOADING SCREEN (lg: >= 1024px)
          Preserves the exact existing desktop composition, scaling & positioning
          ===================================================================== */}
      <div className="hidden lg:flex relative w-full h-full overflow-hidden flex-col items-center justify-end pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={avenixSplashBg}
            alt="AVENIX"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImageReady(true)}
            className={`w-full h-full object-cover object-center will-change-transform transition-all duration-[1800ms] ease-out ${
              imageReady ? 'opacity-100 scale-[1.035]' : 'opacity-0 scale-100'
            }`}
          />

          {/* Subtle Dark Cinematic Overlay & Vignette for Aesthetic Consistency */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 88% 82% at 50% 46%, rgba(4, 9, 20, 0.18) 0%, rgba(4, 9, 20, 0.46) 68%, rgba(3, 7, 16, 0.82) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(3, 7, 16, 0.92) 0%, rgba(4, 10, 22, 0.52) 55%, transparent 100%)',
            }}
          />
        </div>

        {/* Desktop Centered Refined Blue Progress Line & Minimal Status */}
        <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-between text-[10px] tracking-[0.28em] uppercase font-mono-tech text-sky-200/75">
            <span>AVENIX STUDIO</span>
            <span className="tabular-nums text-sky-400">{progress}%</span>
          </div>

          <div className="relative w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out relative"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, rgba(22, 119, 255, 0.65) 0%, rgba(56, 189, 248, 0.95) 80%, #FFFFFF 100%)',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.85)',
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. TABLET LOADING SCREEN (sm/md: 640px – 1023px)
          Dedicated tablet composition: intelligent framing keeps 100% of the
          AVENIX branding visible without horizontal cropping or empty bars
          ===================================================================== */}
      <div className="hidden sm:flex lg:hidden relative w-full h-full overflow-hidden flex-col items-center justify-center px-6">
        {/* Ambient Studio Atmosphere Backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={avenixSplashBg}
            alt=""
            aria-hidden="true"
            decoding="async"
            className={`w-full h-full object-cover object-center scale-110 blur-2xl transition-opacity duration-1000 ${
              imageReady ? 'opacity-25' : 'opacity-0'
            }`}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(14, 42, 92, 0.24) 0%, rgba(4, 8, 18, 0.88) 65%, #040812 100%)',
            }}
          />
        </div>

        {/* Tablet Focal Stage — Uncropped AVENIX Branding with Feathered Studio Edges */}
        <div className="avenix-splash-stage avenix-splash-mobile-tablet-mask relative overflow-hidden flex items-center justify-center">
          <img
            src={avenixSplashBg}
            alt="AVENIX"
            decoding="async"
            fetchPriority="high"
            data-ready={imageReady ? 'true' : 'false'}
            onLoad={() => setImageReady(true)}
            className={`avenix-splash-focal-img absolute left-1/2 top-1/2 select-none will-change-transform transition-all duration-[1800ms] ease-out ${
              imageReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Subtle Radial & Edge Vignette for Seamless Blending */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 92% 84% at 50% 50%, rgba(4, 9, 20, 0.10) 0%, rgba(4, 9, 20, 0.42) 74%, rgba(4, 8, 18, 0.88) 100%)',
            }}
          />
        </div>

        {/* Tablet Balanced Progress Indicator */}
        <div className="avenix-splash-progress-wrap relative z-10 w-full px-4 flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-between text-[10px] tracking-[0.26em] uppercase font-mono-tech text-sky-200/80">
            <span>AVENIX STUDIO</span>
            <span className="tabular-nums text-sky-400">{progress}%</span>
          </div>

          <div className="relative w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out relative"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, rgba(22, 119, 255, 0.65) 0%, rgba(56, 189, 248, 0.95) 80%, #FFFFFF 100%)',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.85)',
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. MOBILE LOADING SCREEN (< 640px: Small & Large Mobile Devices)
          Dedicated mobile experience: custom mobile crop trims only outer wall
          margins so the central AVENIX 3D logo is bold, centered & uncropped,
          paired with a tightly integrated progress lockup
          ===================================================================== */}
      <div className="flex sm:hidden relative w-full h-full overflow-hidden flex-col items-center justify-center px-4">
        {/* Mobile Ambient Studio Lighting Backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={avenixSplashBg}
            alt=""
            aria-hidden="true"
            decoding="async"
            className={`w-full h-full object-cover object-center scale-125 blur-2xl transition-opacity duration-1000 ${
              imageReady ? 'opacity-20' : 'opacity-0'
            }`}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 95% 60% at 50% 45%, rgba(16, 52, 115, 0.24) 0%, rgba(4, 8, 18, 0.90) 68%, #040812 100%)',
            }}
          />
        </div>

        {/* Mobile Centered Visual & Progress Lockup */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center -translate-y-1">
          {/* Mobile-Optimized Crop Stage */}
          <div className="avenix-splash-stage avenix-splash-mobile-tablet-mask relative overflow-hidden flex items-center justify-center">
            <img
              src={avenixSplashBg}
              alt="AVENIX"
              decoding="async"
              fetchPriority="high"
              data-ready={imageReady ? 'true' : 'false'}
              onLoad={() => setImageReady(true)}
              className={`avenix-splash-focal-img absolute left-1/2 top-1/2 select-none will-change-transform transition-all duration-[1800ms] ease-out ${
                imageReady ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Soft Mobile Vignette Framing */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 94% 82% at 50% 50%, rgba(4, 9, 20, 0.08) 0%, rgba(4, 9, 20, 0.38) 76%, rgba(4, 8, 18, 0.86) 100%)',
              }}
            />
          </div>

          {/* Mobile Integrated Progress Indicator */}
          <div className="avenix-splash-progress-wrap relative z-10 w-full px-3 flex flex-col items-center gap-2.5">
            <div className="w-full flex items-center justify-between text-[9.5px] tracking-[0.24em] uppercase font-mono-tech text-sky-200/80">
              <span>AVENIX STUDIO</span>
              <span className="tabular-nums text-sky-400">{progress}%</span>
            </div>

            <div className="relative w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out relative"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, rgba(22, 119, 255, 0.65) 0%, rgba(56, 189, 248, 0.95) 80%, #FFFFFF 100%)',
                  boxShadow: '0 0 14px rgba(56, 189, 248, 0.85)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
