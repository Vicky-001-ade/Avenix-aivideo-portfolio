import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowDown, Play, ArrowUpRight } from 'lucide-react';
import avenixStudioHeroBg from '../assets/images/avenix_studio_hero_bg_1790433695735.jpg';

interface HeroSectionProps {
  onOpenVideoReel: () => void;
}

const HERO_POSTER_URL =
  'https://res.cloudinary.com/tl7exdl8/image/upload/v1790341155/593299f7-c458-404b-9fb3-21598d0e1490_vjrykz.jpg';
const HERO_VIDEO_URL =
  'https://res.cloudinary.com/tl7exdl8/video/upload/v1790340949/Perfume_bottle_in_luxury_water_20260925135254_wjgfn4.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVideoReel }) => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoTiltTargetRef = useRef({ x: 0, y: 0, spotX: 50, spotY: 20, hover: 0 });
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTextStageRef = useRef<HTMLDivElement>(null);
  const liquidGlassCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointerTypeRef = useRef<string>('mouse');

  // Trigger subtle entrance reveal on load & detect pointer/hover and reduced-motion capabilities
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 50);

    if (typeof window !== 'undefined') {
      const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      setSupportsHover(hoverQuery.matches);
      setReducedMotion(motionQuery.matches);

      const handleHoverChange = (e: MediaQueryListEvent) => {
        setSupportsHover(e.matches);
      };
      const handleMotionChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      hoverQuery.addEventListener('change', handleHoverChange);
      motionQuery.addEventListener('change', handleMotionChange);

      return () => {
        clearTimeout(timer);
        hoverQuery.removeEventListener('change', handleHoverChange);
        motionQuery.removeEventListener('change', handleMotionChange);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  // Subtle 3D depth & parallax controller for Hero Heading & Supporting Text
  useEffect(() => {
    const stageEl = heroTextStageRef.current;
    const sectionEl = heroSectionRef.current;
    if (!stageEl || !sectionEl || typeof window === 'undefined') return;

    if (reducedMotion) {
      stageEl.style.setProperty('--ht-x', '0');
      stageEl.style.setProperty('--ht-y', '0');
      stageEl.style.setProperty('--ht-load-rx', '0deg');
      stageEl.style.setProperty('--ht-load-y', '0px');
      return;
    }

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const mountTime = performance.now();

    const handleSectionPointerMove = (e: PointerEvent) => {
      if (!supportsHover || e.pointerType !== 'mouse') return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      // Normalized [-0.5, 0.5]
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, nx));
      targetY = Math.max(-0.5, Math.min(0.5, ny));
    };

    const handleSectionPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    sectionEl.addEventListener('pointermove', handleSectionPointerMove, { passive: true });
    sectionEl.addEventListener('pointerleave', handleSectionPointerLeave, { passive: true });

    const animateDepth = (now: number) => {
      const elapsedSec = Math.max(0, (now - mountTime) / 1000);

      // Gentle depth settle when Hero loads (eases from 1 -> 0 over ~1.4s)
      const loadProgress = Math.max(0, Math.min(1, elapsedSec / 1.4));
      const loadEaseOut = 1 - Math.pow(1 - loadProgress, 3);
      const loadFactor = 1 - loadEaseOut;
      const loadRx = (loadFactor * 2.4).toFixed(2);
      const loadY = (loadFactor * 5.0).toFixed(2);

      // On mobile/tablet (non-hover), use a very subtle automatic 3D floating motion
      if (!supportsHover) {
        targetX = Math.sin(elapsedSec * 0.65) * 0.26;
        targetY = Math.cos(elapsedSec * 0.48) * 0.22;
      }

      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;

      stageEl.style.setProperty('--ht-x', currentX.toFixed(4));
      stageEl.style.setProperty('--ht-y', currentY.toFixed(4));
      stageEl.style.setProperty('--ht-load-rx', `${loadRx}deg`);
      stageEl.style.setProperty('--ht-load-y', `${loadY}px`);

      rafId = requestAnimationFrame(animateDepth);
    };

    rafId = requestAnimationFrame(animateDepth);

    return () => {
      sectionEl.removeEventListener('pointermove', handleSectionPointerMove);
      sectionEl.removeEventListener('pointerleave', handleSectionPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [supportsHover, reducedMotion]);

  // Subtle AI Studio Atmospheric Cues: Dynamic Light Formations, Data-Inspired Geometric Structures & Floating Visual Fragments
  useEffect(() => {
    const canvas = liquidGlassCanvasRef.current;
    const sectionEl = heroSectionRef.current;
    if (!canvas || typeof window === 'undefined') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let targetCursorX = 0;
    let targetCursorY = 0;
    let smoothCursorX = 0;
    let smoothCursorY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (!supportsHover || reducedMotion || e.pointerType !== 'mouse' || !sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetCursorX = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      targetCursorY = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    };

    const onPointerLeave = () => {
      targetCursorX = 0;
      targetCursorY = 0;
    };

    if (sectionEl) {
      sectionEl.addEventListener('pointermove', onPointerMove, { passive: true });
      sectionEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    interface StudioFragment {
      xRatio: number;
      yRatio: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      spin: number;
      depthZ: number;
      shape: 'diamond' | 'hex' | 'mote';
      alpha: number;
      phase: number;
    }

    let fragments: StudioFragment[] = [];

    const createStudioFragment = (): StudioFragment => {
      const depthZ = 0.4 + Math.random() * 0.6;
      const roll = Math.random();
      const shape: 'diamond' | 'hex' | 'mote' =
        roll < 0.38 ? 'diamond' : roll < 0.65 ? 'hex' : 'mote';
      return {
        // Concentrated primarily across the center-right studio vista & display area (0.35 -> 0.96)
        xRatio: 0.32 + Math.random() * 0.65,
        yRatio: 0.12 + Math.random() * 0.76,
        vx: (Math.random() - 0.45) * 0.008 * depthZ,
        vy: (-0.004 - Math.random() * 0.008) * depthZ,
        size: (2.2 + Math.random() * 4.2) * depthZ,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.6,
        depthZ,
        shape,
        alpha: 0.28 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 22 : 38;
      fragments = Array.from({ length: count }, () => createStudioFragment());
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const startTime = performance.now();
    let lastTime = startTime;

    const renderFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      const elapsed = Math.max(0, (now - startTime) / 1000);

      if (!supportsHover && !reducedMotion) {
        targetCursorX = Math.sin(elapsed * 0.38) * 0.2;
        targetCursorY = Math.cos(elapsed * 0.28) * 0.16;
      }
      smoothCursorX += (targetCursorX - smoothCursorX) * 0.055;
      smoothCursorY += (targetCursorY - smoothCursorY) * 0.055;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';

      // 1. Subtle Volumetric Studio Display & Skyline Ambient Light Formation (Right / Center-Right)
      const studioLightX = width * 0.68 + smoothCursorX * 22;
      const studioLightY = height * 0.46 + smoothCursorY * 16;
      const pulse = reducedMotion ? 1 : 0.94 + Math.sin(elapsed * 0.6) * 0.06;
      const glowRadius = Math.max(20, Math.min(width, height) * 0.48 * pulse);

      const studioGlow = ctx.createRadialGradient(
        studioLightX,
        studioLightY,
        4,
        studioLightX,
        studioLightY,
        glowRadius
      );

      if (isDark) {
        studioGlow.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        studioGlow.addColorStop(0.45, 'rgba(22, 119, 255, 0.08)');
        studioGlow.addColorStop(1, 'rgba(6, 13, 26, 0)');
      } else {
        studioGlow.addColorStop(0, 'rgba(92, 169, 255, 0.15)');
        studioGlow.addColorStop(0.48, 'rgba(42, 140, 255, 0.08)');
        studioGlow.addColorStop(1, 'rgba(247, 250, 253, 0)');
      }

      ctx.fillStyle = studioGlow;
      ctx.beginPath();
      ctx.arc(studioLightX, studioLightY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Data-Inspired Geometric Structures & Floating Visual Fragments
      for (let i = 0; i < fragments.length; i++) {
        const f = fragments[i];
        if (!reducedMotion) {
          f.xRatio += f.vx * dt;
          f.yRatio += f.vy * dt;
          f.rotation += f.spin * dt;

          if (f.yRatio < 0.08 || f.xRatio < 0.25 || f.xRatio > 0.98) {
            f.xRatio = 0.34 + Math.random() * 0.62;
            f.yRatio = 0.82 + Math.random() * 0.1;
          }
        }

        const px = f.xRatio * width + smoothCursorX * 30 * f.depthZ;
        const py = f.yRatio * height + smoothCursorY * 22 * f.depthZ;
        const twinkle = 0.72 + 0.28 * Math.sin(elapsed * 1.1 + f.phase);
        const alpha = f.alpha * twinkle;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(f.rotation);

        if (f.shape === 'diamond') {
          const s = f.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.35);
          ctx.lineTo(s * 0.85, 0);
          ctx.lineTo(0, s * 1.35);
          ctx.lineTo(-s * 0.85, 0);
          ctx.closePath();

          ctx.strokeStyle = isDark
            ? `rgba(125, 211, 252, ${(alpha * 0.75).toFixed(3)})`
            : `rgba(42, 140, 255, ${(alpha * 0.62).toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        } else if (f.shape === 'hex') {
          const s = f.size * 0.95;
          ctx.beginPath();
          for (let side = 0; side < 6; side++) {
            const a = (side * Math.PI) / 3;
            const hx = Math.cos(a) * s;
            const hy = Math.sin(a) * s;
            if (side === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();

          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${(alpha * 0.68).toFixed(3)})`
            : `rgba(92, 169, 255, ${(alpha * 0.58).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          const r = Math.max(1.2, f.size * 1.1);
          const moteGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          if (isDark) {
            moteGrad.addColorStop(0, `rgba(255, 255, 255, ${(alpha * 0.9).toFixed(3)})`);
            moteGrad.addColorStop(0.5, `rgba(56, 189, 248, ${(alpha * 0.55).toFixed(3)})`);
            moteGrad.addColorStop(1, 'rgba(22, 119, 255, 0)');
          } else {
            moteGrad.addColorStop(0, `rgba(255, 255, 255, ${(alpha * 0.95).toFixed(3)})`);
            moteGrad.addColorStop(0.5, `rgba(92, 169, 255, ${(alpha * 0.55).toFixed(3)})`);
            moteGrad.addColorStop(1, 'rgba(42, 140, 255, 0)');
          }
          ctx.fillStyle = moteGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (sectionEl) {
        sectionEl.removeEventListener('pointermove', onPointerMove);
        sectionEl.removeEventListener('pointerleave', onPointerLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [theme, supportsHover, reducedMotion]);

  // Smooth damped 3D hover tilt, scale & moving border light reflection for Hero Video
  useEffect(() => {
    const frameEl = videoFrameRef.current;
    if (!frameEl || typeof window === 'undefined') return;

    if (reducedMotion || !supportsHover) {
      frameEl.style.setProperty('--vv-rx', '0deg');
      frameEl.style.setProperty('--vv-ry', '0deg');
      frameEl.style.setProperty('--vv-scale', '1');
      frameEl.style.setProperty('--vv-spot-x', '50%');
      frameEl.style.setProperty('--vv-spot-y', '20%');
      frameEl.style.setProperty('--vv-hover', '0');
      return;
    }

    let rafId = 0;
    let curX = 0;
    let curY = 0;
    let curSpotX = 50;
    let curSpotY = 20;
    let curHover = 0;

    const tickVideoTilt = () => {
      const target = videoTiltTargetRef.current;
      // Smooth natural easing (lerp)
      curX += (target.x - curX) * 0.085;
      curY += (target.y - curY) * 0.085;
      curSpotX += (target.spotX - curSpotX) * 0.11;
      curSpotY += (target.spotY - curSpotY) * 0.11;
      curHover += (target.hover - curHover) * 0.085;

      // Subtle 3D rotation (~4 degrees max) toward cursor + floating scale (~1.02x)
      const rx = (-curY * 8.4).toFixed(3); // +/- 4.2 deg
      const ry = (curX * 8.4).toFixed(3);  // +/- 4.2 deg
      const scale = (1 + curHover * 0.02).toFixed(4);

      frameEl.style.setProperty('--vv-rx', `${rx}deg`);
      frameEl.style.setProperty('--vv-ry', `${ry}deg`);
      frameEl.style.setProperty('--vv-scale', scale);
      frameEl.style.setProperty('--vv-spot-x', `${curSpotX.toFixed(1)}%`);
      frameEl.style.setProperty('--vv-spot-y', `${curSpotY.toFixed(1)}%`);
      frameEl.style.setProperty('--vv-hover', curHover.toFixed(3));

      rafId = requestAnimationFrame(tickVideoTilt);
    };

    rafId = requestAnimationFrame(tickVideoTilt);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [supportsHover, reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsHover || reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const x = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    videoTiltTargetRef.current.x = x;
    videoTiltTargetRef.current.y = y;
    videoTiltTargetRef.current.spotX = (x + 0.5) * 100;
    videoTiltTargetRef.current.spotY = (y + 0.5) * 100;
    videoTiltTargetRef.current.hover = 1;
    setMousePos({ x, y });
  };

  const startPlayback = () => {
    if (!videoRef.current) return;
    setIsVideoPlaying(true);
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsVideoPlaying(false);
      });
    }
  };

  const pausePlayback = (resetToStart: boolean) => {
    if (!videoRef.current) return;
    setIsVideoPlaying(false);
    videoRef.current.pause();
    if (resetToStart) {
      videoRef.current.currentTime = 0;
    }
  };

  const toggleTapPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      pausePlayback(false);
    } else {
      startPlayback();
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = e.pointerType;
    if (e.pointerType === 'mouse' && supportsHover) {
      videoTiltTargetRef.current.hover = 1;
      startPlayback();
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && supportsHover) {
      videoTiltTargetRef.current.x = 0;
      videoTiltTargetRef.current.y = 0;
      videoTiltTargetRef.current.spotX = 50;
      videoTiltTargetRef.current.spotY = 20;
      videoTiltTargetRef.current.hover = 0;
      pausePlayback(true);
      setMousePos({ x: 0, y: 0 });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = e.pointerType;
  };

  const handleVideoClick = () => {
    // On touch devices (tablet/mobile) or non-hover pointers, tap toggles play/pause
    if (!supportsHover || lastPointerTypeRef.current !== 'mouse') {
      toggleTapPlayback();
    }
  };

  const handleVideoKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTapPlayback();
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 84;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elPos, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-32 sm:pt-36 lg:pt-36 pb-20 sm:pb-24 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* 0. AVENIX Futuristic AI Visual Production Studio Hero Scene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[0]"
      >
        <img
          src={avenixStudioHeroBg}
          alt=""
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-[72%_center] sm:object-[66%_center] lg:object-center transition-transform duration-1000 ease-out ${
            hasLoaded ? 'scale-100' : 'scale-[1.03]'
          }`}
          style={{
            opacity: theme === 'dark' ? 0.96 : 0.88,
            filter:
              theme === 'dark'
                ? 'saturate(1.16) contrast(1.06) brightness(0.98)'
                : 'saturate(1.18) contrast(1.04) brightness(1.08)',
          }}
        />

        {/* Directional Studio Readability Gradient: keeps the left side visually clean for headline & CTAs while showcasing the AVENIX AI studio & futuristic skyline on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === 'dark'
                ? 'linear-gradient(90deg, rgba(4, 11, 26, 0.90) 0%, rgba(5, 15, 36, 0.72) 32%, rgba(6, 18, 44, 0.24) 58%, rgba(4, 12, 28, 0.08) 82%, rgba(4, 11, 26, 0.20) 100%)'
                : 'linear-gradient(90deg, rgba(248, 251, 254, 0.97) 0%, rgba(244, 248, 253, 0.90) 36%, rgba(235, 243, 252, 0.42) 60%, rgba(226, 238, 252, 0.14) 82%, rgba(238, 245, 253, 0.24) 100%)',
          }}
        />
      </div>

      {/* 1. Subtle Top & Bottom Edge Framing (Leaves the full-width central portal sharp and unobstructed) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(4, 11, 26, 0.46) 0%, transparent 18%, transparent 78%, rgba(6, 13, 26, 0.90) 100%)'
              : 'linear-gradient(180deg, rgba(247, 250, 253, 0.54) 0%, transparent 18%, transparent 78%, rgba(247, 250, 253, 0.92) 100%)',
        }}
      />

      {/* 2. Central Full-Span Volumetric Electric-Blue & Cyan Illumination */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] sm:w-[980px] lg:w-[1240px] h-[520px] sm:h-[640px] pointer-events-none rounded-full blur-[140px] z-[1]"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse 72% 56% at 50% 50%, rgba(22, 119, 255, 0.22) 0%, rgba(14, 165, 233, 0.12) 45%, transparent 82%)'
              : 'radial-gradient(ellipse 72% 56% at 50% 50%, rgba(42, 140, 255, 0.13) 0%, rgba(92, 169, 255, 0.08) 45%, transparent 82%)',
        }}
      />

      {/* 3. Seamless Bottom Seam Transition into Next Section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-[1]"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(to bottom, transparent 0%, rgba(6, 13, 26, 0.65) 65%, rgba(6, 13, 26, 0.95) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(242, 247, 253, 0.68) 65%, rgba(247, 250, 253, 0.96) 100%)',
        }}
      />

      {/* 4. Full-Width Central Dimensional Portal Rings & World-Generation Particles */}
      <div
        aria-hidden="true"
        className="hero-central-portal-mask absolute inset-0 w-full h-full pointer-events-none z-[2]"
      >
        <canvas ref={liquidGlassCanvasRef} className="w-full h-full block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Typography & Intent */}
          <div
            ref={heroTextStageRef}
            className="hero-3d-stage lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="hero-eyebrow-anim flex items-center gap-2 mb-4 sm:mb-6">
              <span
                className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-[#2A8CFF]'
                }`}
              />
              <span
                className="text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.24em] font-semibold font-mono-tech"
                style={{ color: theme === 'dark' ? '#4DA3FF' : '#1D74DF' }}
              >
                AI VIDEO CREATOR • AI VISUAL DESIGNER
              </span>
            </div>

            {/* Main Headline - Slightly reduced, refined curvy futuristic Sora/Outfit letterforms + 3D floating depth plane */}
            <div className="hero-3d-heading-plane">
              <h1
                className="hero-curvy-heading text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[2.85rem] xl:text-[3.25rem] font-semibold mb-6 sm:mb-8 transition-colors break-words"
                style={{
                  textWrap: 'balance',
                  color: theme === 'dark' ? '#FFFFFF' : '#111827',
                }}
              >
                <span className="hero-word-anim" style={{ animationDelay: '180ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-white via-[#F5F7FA] to-[#C9D4E2] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(255,255,255,0.12)]'
                        : 'text-[#111827]'
                    }
                  >
                    TURNING
                  </span>
                </span>{' '}
                <span className="hero-word-anim" style={{ animationDelay: '310ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-white via-[#F5F7FA] to-[#C9D4E2] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(255,255,255,0.12)]'
                        : 'text-[#111827]'
                    }
                  >
                    IMAGINATION
                  </span>
                </span>
                <br />
                <span className="hero-word-anim" style={{ animationDelay: '460ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#F5F7FA] via-[#E2E8F0] to-[#B0BFD2] bg-clip-text text-transparent'
                        : 'text-[#111827]'
                    }
                  >
                    INTO
                  </span>
                </span>{' '}
                <span className="hero-word-anim" style={{ animationDelay: '590ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#F5F7FA] via-[#E2E8F0] to-[#B0BFD2] bg-clip-text text-transparent'
                        : 'text-[#111827]'
                    }
                  >
                    CINEMATIC
                  </span>
                </span>{' '}
                <span className="hero-word-anim" style={{ animationDelay: '720ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent cinematic-gradient-shine'
                        : 'bg-gradient-to-r from-[#1D74DF] via-[#2A8CFF] to-[#5CA9FF] bg-clip-text text-transparent cinematic-gradient-shine'
                    }
                  >
                    AI
                  </span>
                </span>{' '}
                <span className="hero-word-anim" style={{ animationDelay: '850ms' }}>
                  <span
                    className={
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent cinematic-gradient-shine'
                        : 'bg-gradient-to-r from-[#1D74DF] via-[#2A8CFF] to-[#5CA9FF] bg-clip-text text-transparent cinematic-gradient-shine'
                    }
                  >
                    VISUALS.
                  </span>
                </span>
              </h1>
            </div>

            {/* Supporting Statement - Secondary 3D floating depth plane */}
            <div className="hero-3d-subtext-plane">
              <p
                className="hero-subtext-anim text-sm sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-7 sm:mb-10"
                style={{
                  color: theme === 'dark' ? '#A7ADB8' : '#334155',
                }}
              >
                I create cinematic AI videos, product visuals, commercials and social content that combine creative direction, storytelling and emerging AI technology to make brands impossible to ignore.
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-cta-anim flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollTo('work')}
                data-cursor="view"
                className={`w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl font-mono-tech text-xs uppercase tracking-wider font-semibold text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(22,119,255,0.4)] hover:shadow-[0_0_40px_rgba(22,119,255,0.7)]'
                    : 'bg-[#2A8CFF] hover:bg-[#3B97FF] shadow-[0_10px_28px_rgba(42,140,255,0.30)] hover:shadow-[0_12px_34px_rgba(42,140,255,0.42)]'
                }`}
              >
                <span>View My Work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className={`w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-xl font-mono-tech text-xs uppercase tracking-wider font-semibold border transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white hover:border-blue-400/40'
                    : 'border-[#CBD8E8] bg-white/90 hover:bg-[#F2F7FD] text-[#111827] hover:border-[#2A8CFF]/60 shadow-xs'
                }`}
              >
                <span>Let's Create</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              <button
                onClick={onOpenVideoReel}
                data-cursor="play"
                className={`inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-mono-tech uppercase tracking-wider font-semibold transition-colors ${
                  theme === 'dark'
                    ? 'text-blue-500 hover:text-blue-400'
                    : 'text-[#1D74DF] hover:text-[#2A8CFF]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${
                    theme === 'dark'
                      ? 'border-blue-500/40 bg-blue-500/10'
                      : 'border-[#2A8CFF]/45 bg-[#2A8CFF]/10'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Watch Reel (0:45)</span>
              </button>
            </div>

            {/* Quick proof stats adjacency */}
            <div
              className="hero-stats-anim grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-10 mt-6 sm:mt-10 border-t"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#DCE5F0',
              }}
            >
              <div>
                <div
                  className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${
                    theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                  }`}
                >
                  45M+
                </div>
                <div
                  className={`text-[9.5px] sm:text-xs uppercase tracking-wider font-mono-tech mt-0.5 sm:mt-1 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-[#475569] font-medium'
                  }`}
                >
                  Total Reach
                </div>
              </div>
              <div>
                <div
                  className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${
                    theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                  }`}
                >
                  120+
                </div>
                <div
                  className={`text-[9.5px] sm:text-xs uppercase tracking-wider font-mono-tech mt-0.5 sm:mt-1 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-[#475569] font-medium'
                  }`}
                >
                  Films Produced
                </div>
              </div>
              <div>
                <div
                  className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight tabular-nums ${
                    theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                  }`}
                >
                  30+
                </div>
                <div
                  className={`text-[9.5px] sm:text-xs uppercase tracking-wider font-mono-tech mt-0.5 sm:mt-1 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-[#475569] font-medium'
                  }`}
                >
                  Brand Partners
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Showcase Container with Hover Play (Desktop) & Tap Play (Tablet/Mobile) */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{ transitionDelay: reducedMotion ? '60ms' : '260ms' }}
            className={`lg:col-span-5 relative w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasLoaded
                ? 'opacity-100 translate-y-0 scale-100 blur-0'
                : reducedMotion
                ? 'opacity-0'
                : 'opacity-0 translate-y-4 scale-[0.965] blur-[4px]'
            }`}
          >
            {/* Contained Hero Video Box - Cinematic Glass/Metallic Frame + 3D Hover Tilt */}
            <div
              ref={videoFrameRef}
              role="button"
              tabIndex={0}
              aria-label={isVideoPlaying ? 'Pause hero video' : 'Play hero video'}
              aria-pressed={isVideoPlaying}
              data-video-active={isVideoPlaying ? 'true' : 'false'}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onPointerDown={handlePointerDown}
              onClick={handleVideoClick}
              onKeyDown={handleVideoKeyDown}
              data-cursor="play"
              className="hero-video-3d-frame relative p-[1.5px] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {/* Media Container: strict aspect ratio and boundary containment */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] w-full max-h-[520px] rounded-[14.5px] md:rounded-[22.5px] overflow-hidden bg-black select-none">
                {/* 1. Exact Poster Image: visible when paused, smoothly cross-fades */}
                <img
                  src={HERO_POSTER_URL}
                  alt="AI Commercial Film Still - Luxury Perfume Bottle in Water"
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-10 ${
                    isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                />

                {/* 2. Exact Video Source: plays on hover (desktop) or tap (tablet/mobile) */}
                <video
                  ref={videoRef}
                  src={HERO_VIDEO_URL}
                  poster={HERO_POSTER_URL}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className={`w-full h-full object-cover transition-opacity duration-700 ease-out z-20 ${
                    isVideoPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />

                {/* Subtle cinematic gradient vignette */}
                <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Embedded inner frame shadow/bevel depth + subtle moving hover reflection */}
                <div
                  aria-hidden="true"
                  className="hero-video-inner-depth absolute inset-0 z-30 pointer-events-none rounded-[inherit]"
                />
                <div
                  aria-hidden="true"
                  className="hero-video-hover-glint absolute inset-0 z-30 pointer-events-none rounded-[inherit]"
                />

                {/* Centered Minimal Cinematic Play Indicator for Tablet / Mobile (and keyboard focus) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${
                    !supportsHover
                      ? isVideoPlaying
                        ? 'opacity-0 scale-90'
                        : 'opacity-100 scale-100'
                      : 'opacity-0 group-focus-visible:opacity-100'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Restrained breathing outer ring (respects prefers-reduced-motion) */}
                    {!reducedMotion && !isVideoPlaying && (
                      <span
                        className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-blue-400/25 animate-ping"
                        style={{ animationDuration: '3.2s' }}
                      />
                    )}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-950/55 backdrop-blur-md border border-blue-400/35 shadow-[0_0_24px_rgba(22,119,255,0.28)] flex items-center justify-center transition-transform duration-300">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Minimal top bar indicator */}
                <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between text-[11px] font-mono-tech text-white/80 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isVideoPlaying
                          ? `bg-red-500 ${reducedMotion ? '' : 'animate-ping'}`
                          : 'bg-blue-400'
                      }`}
                    />
                    <span className="font-semibold tracking-wider">
                      {isVideoPlaying
                        ? 'PLAYING PREVIEW'
                        : supportsHover
                        ? 'HOVER TO PLAY'
                        : 'TAP TO PLAY'}
                    </span>
                  </div>
                  <div className="tracking-widest opacity-75">4K CINEMATIC</div>
                </div>

                {/* Minimal bottom metadata */}
                <div className="absolute bottom-4 left-4 right-4 z-40 text-white pointer-events-none transition-opacity duration-300">
                  <div className="text-[11px] font-mono-tech text-blue-400 tracking-wider uppercase mb-0.5">
                    AI Commercial
                  </div>
                  <div className="font-heading text-sm sm:text-base font-semibold text-white tracking-tight">
                    Luxury Water & Fragrance Film
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none ${
          theme === 'dark' ? 'opacity-50' : 'opacity-80'
        }`}
      >
        <span
          className={`text-[10px] uppercase tracking-[0.25em] font-mono-tech ${
            theme === 'dark' ? 'text-slate-400' : 'text-[#475569] font-semibold'
          }`}
        >
          Scroll
        </span>
        <ArrowDown
          className={`w-3.5 h-3.5 animate-bounce ${
            theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
          }`}
        />
      </div>
    </section>
  );
};
