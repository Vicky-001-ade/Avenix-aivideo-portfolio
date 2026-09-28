import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LuminousMicroParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  kind: 'luminous' | 'dust' | 'cyanSpeck';
  alpha: number;
  depth: number;
  phase: number;
  phaseSpeed: number;
}

interface FlowingLightTrail {
  yRatio: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  alpha: number;
  depth: number;
  isCyan: boolean;
}

export const LightThemeAmbientBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (theme !== 'light') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    // Smoothly interpolated cursor & scroll tracking
    const state = {
      targetMouseX: width * 0.58,
      targetMouseY: height * 0.38,
      currentMouseX: width * 0.58,
      currentMouseY: height * 0.38,
      targetScrollY: window.scrollY || 0,
      currentScrollY: window.scrollY || 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      state.targetMouseX = e.clientX;
      state.targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      state.targetScrollY = window.scrollY || 0;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // 1. Subtle Flowing Light Trails (delicate gossamer studio light ribbons)
    const trailCount = isMobile ? 3 : 5;
    const trails: FlowingLightTrail[] = [];
    for (let i = 0; i < trailCount; i++) {
      trails.push({
        yRatio: 0.18 + (i / trailCount) * 0.68,
        amplitude: isMobile ? 22 + i * 8 : 34 + i * 12,
        wavelength: 0.0014 + i * 0.00035,
        speed: 0.0022 + i * 0.0006,
        phase: i * 1.4,
        alpha: 0.034 + (i % 2) * 0.014,
        depth: 0.25 + i * 0.12,
        isCyan: i % 2 === 1,
      });
    }

    // 2. Micro-particles, Fine Luminous Points & Faint Cinematic Dust (no generic bubbles)
    const luminousCount = isMobile ? 12 : 26;
    const dustCount = isMobile ? 18 : 42;
    const cyanSpeckCount = isMobile ? 6 : 14;

    const particles: LuminousMicroParticle[] = [];

    for (let i = 0; i < luminousCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.11,
        vy: -0.025 - Math.random() * 0.075,
        radius: 1.0 + Math.random() * 1.3,
        kind: 'luminous',
        alpha: 0.14 + Math.random() * 0.12,
        depth: 0.35 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.006,
      });
    }

    for (let i = 0; i < dustCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.09,
        vy: -0.015 - Math.random() * 0.055,
        radius: 0.6 + Math.random() * 0.95,
        kind: 'dust',
        alpha: 0.08 + Math.random() * 0.09,
        depth: 0.15 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.004 + Math.random() * 0.006,
      });
    }

    for (let i = 0; i < cyanSpeckCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        radius: 1.1 + Math.random() * 1.4,
        kind: 'cyanSpeck',
        alpha: 0.11 + Math.random() * 0.1,
        depth: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.006,
      });
    }

    let time = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.0025;

      // Smooth damping for cursor and scroll
      state.currentMouseX += (state.targetMouseX - state.currentMouseX) * 0.032;
      state.currentMouseY += (state.targetMouseY - state.currentMouseY) * 0.032;
      state.currentScrollY += (state.targetScrollY - state.currentScrollY) * 0.04;

      const normMouseX = (state.currentMouseX / width - 0.5) * 2;
      const normMouseY = (state.currentMouseY / height - 0.5) * 2;
      const scrollPhase = state.currentScrollY * 0.0006;

      // A. Scroll-reactive & slow-drifting studio light field
      const fieldX =
        width * (0.52 + Math.sin(time + scrollPhase) * 0.14) + normMouseX * 28;
      const fieldY =
        height * (0.42 + Math.cos(time * 0.7 + scrollPhase) * 0.12) + normMouseY * 22;
      const studioLight = ctx.createRadialGradient(
        fieldX,
        fieldY,
        20,
        fieldX,
        fieldY,
        Math.max(width, height) * 0.58
      );
      studioLight.addColorStop(0, 'rgba(42, 140, 255, 0.045)');
      studioLight.addColorStop(0.38, 'rgba(92, 169, 255, 0.025)');
      studioLight.addColorStop(0.72, 'rgba(147, 197, 253, 0.012)');
      studioLight.addColorStop(1, 'rgba(247, 250, 253, 0)');
      ctx.fillStyle = studioLight;
      ctx.fillRect(0, 0, width, height);

      // B. Subtle cursor-responsive ambient light pool (desktop)
      if (!isMobile) {
        const cursorLight = ctx.createRadialGradient(
          state.currentMouseX,
          state.currentMouseY,
          8,
          state.currentMouseX,
          state.currentMouseY,
          420
        );
        cursorLight.addColorStop(0, 'rgba(42, 140, 255, 0.04)');
        cursorLight.addColorStop(0.42, 'rgba(92, 169, 255, 0.02)');
        cursorLight.addColorStop(1, 'rgba(247, 250, 253, 0)');
        ctx.fillStyle = cursorLight;
        ctx.fillRect(0, 0, width, height);
      }

      // C. Render Subtle Flowing Light Trails
      for (let t = 0; t < trails.length; t++) {
        const tr = trails[t];
        if (!reducedMotion) {
          tr.phase += tr.speed;
        }

        const baseY =
          ((tr.yRatio * height - (state.currentScrollY * 0.08 * tr.depth) % height) + height) %
          height;
        const parallaxY = normMouseY * 18 * tr.depth;

        ctx.beginPath();
        const step = isMobile ? 24 : 16;
        for (let x = 0; x <= width; x += step) {
          const wave1 = Math.sin(x * tr.wavelength + tr.phase) * tr.amplitude;
          const wave2 =
            Math.cos(x * tr.wavelength * 0.6 - tr.phase * 0.7) * (tr.amplitude * 0.45);
          const y = baseY + wave1 + wave2 + parallaxY;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const trailGrad = ctx.createLinearGradient(0, baseY, width, baseY);
        trailGrad.addColorStop(0, 'rgba(42, 140, 255, 0)');
        trailGrad.addColorStop(
          0.25,
          tr.isCyan
            ? `rgba(92, 169, 255, ${tr.alpha})`
            : `rgba(42, 140, 255, ${tr.alpha})`
        );
        trailGrad.addColorStop(0.5, `rgba(255, 255, 255, ${tr.alpha * 1.35})`);
        trailGrad.addColorStop(
          0.75,
          tr.isCyan
            ? `rgba(92, 169, 255, ${tr.alpha})`
            : `rgba(42, 140, 255, ${tr.alpha})`
        );
        trailGrad.addColorStop(1, 'rgba(42, 140, 255, 0)');

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }

      // D. Render Fine Luminous Points & Micro-Particles with Gentle Cursor Gravity/Parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.baseX += p.vx;
          p.baseY += p.vy;
          p.phase += p.phaseSpeed;

          const pad = 24;
          if (p.baseX < -pad) p.baseX = width + pad;
          if (p.baseX > width + pad) p.baseX = -pad;
          if (p.baseY < -pad) p.baseY = height + pad;
          if (p.baseY > height + pad) p.baseY = -pad;
        }

        // Subtle parallax + scroll depth offset
        const scrollOffsetY = (state.currentScrollY * 0.05 * p.depth) % height;
        let drawX = p.baseX + (reducedMotion ? 0 : normMouseX * 15 * p.depth);
        let drawY =
          ((p.baseY - scrollOffsetY + height) % height) +
          (reducedMotion ? 0 : normMouseY * 15 * p.depth);

        // Very gentle gravitational response when near cursor (desktop)
        if (!isMobile && !reducedMotion) {
          const dx = state.currentMouseX - drawX;
          const dy = state.currentMouseY - drawY;
          const distSq = dx * dx + dy * dy;
          const maxDist = 260;
          if (distSq < maxDist * maxDist && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const pull = (1 - dist / maxDist) * 8 * p.depth;
            drawX += (dx / dist) * pull;
            drawY += (dy / dist) * pull;
          }
        }

        const breath = reducedMotion ? 1 : 0.84 + Math.sin(p.phase) * 0.16;
        const currentAlpha = p.alpha * breath;

        if (p.kind === 'luminous') {
          // Soft luminous cerulean halo + fine bright core
          const halo = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.radius * 5.2
          );
          halo.addColorStop(0, `rgba(42, 140, 255, ${currentAlpha * 0.48})`);
          halo.addColorStop(0.45, `rgba(92, 169, 255, ${currentAlpha * 0.20})`);
          halo.addColorStop(1, 'rgba(247, 250, 253, 0)');

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 5.2, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42, 140, 255, ${currentAlpha * 1.1})`;
          ctx.fill();
        } else if (p.kind === 'cyanSpeck') {
          // Subtle soft sky-blue luminous point
          const halo = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.radius * 4.5
          );
          halo.addColorStop(0, `rgba(92, 169, 255, ${currentAlpha * 0.45})`);
          halo.addColorStop(0.5, `rgba(125, 190, 255, ${currentAlpha * 0.18})`);
          halo.addColorStop(1, 'rgba(247, 250, 253, 0)');

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42, 140, 255, ${currentAlpha})`;
          ctx.fill();
        } else {
          // Faint digital/cinematic dust micro-particle
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42, 140, 255, ${currentAlpha})`;
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme, reducedMotion]);

  // Render strictly in Light Theme only
  if (theme !== 'light') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Warm White Studio Foundation with Subtle Cerulean-Blue Undertones */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #FAFBFD 0%, #F5F9FE 28%, #F2F7FD 52%, #F6F9FD 76%, #FAFBFD 100%)',
        }}
      />

      {/* 2. Diffused Cerulean & Soft Sky-Blue Light Fields */}
      <div
        className="absolute -top-[10%] right-[2%] w-[780px] h-[700px] rounded-full blur-[180px] opacity-80"
        style={{
          background:
            'radial-gradient(circle, rgba(42, 140, 255, 0.085) 0%, rgba(92, 169, 255, 0.042) 45%, transparent 76%)',
        }}
      />

      <div
        className="absolute top-[32%] -left-[8%] w-[840px] h-[680px] rounded-full blur-[190px] opacity-75"
        style={{
          background:
            'radial-gradient(circle, rgba(42, 140, 255, 0.07) 0%, rgba(92, 169, 255, 0.036) 48%, transparent 78%)',
        }}
      />

      <div
        className="absolute bottom-[4%] right-[8%] w-[860px] h-[660px] rounded-full blur-[185px] opacity-75"
        style={{
          background:
            'radial-gradient(circle, rgba(42, 140, 255, 0.068) 0%, rgba(92, 169, 255, 0.034) 50%, transparent 78%)',
        }}
      />

      {/* 3. Subtle Interactive Atmospheric Canvas (Flowing Light Trails, Luminous Points & Micro-Dust) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 4. Soft Warm-Cerulean Edge Vignette & Studio Diffusion Grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 58%, rgba(226, 236, 249, 0.34) 100%)',
        }}
      />
      <div
        className="absolute inset-0 film-grain"
        style={{ opacity: 0.015 }}
      />
    </div>
  );
};
