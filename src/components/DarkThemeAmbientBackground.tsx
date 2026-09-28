import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface DarkDustParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  kind: 'speck' | 'energy' | 'bloom';
  alpha: number;
  depth: number;
  phase: number;
  phaseSpeed: number;
}

export const DarkThemeAmbientBackground: React.FC = () => {
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
    if (theme !== 'dark') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    const mouse = {
      targetX: width * 0.55,
      targetY: height * 0.4,
      currentX: width * 0.55,
      currentY: height * 0.4,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Restrained, atmospheric particle counts
    const bloomCount = isMobile ? 4 : 7;
    const energyCount = isMobile ? 10 : 22;
    const speckCount = isMobile ? 18 : 38;

    const particles: DarkDustParticle[] = [];

    // 1. Soft volumetric blue light blooms
    for (let i = 0; i < bloomCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.09,
        vy: (Math.random() - 0.5) * 0.09,
        radius: isMobile ? 35 + Math.random() * 35 : 50 + Math.random() * 60,
        kind: 'bloom',
        alpha: 0.024 + Math.random() * 0.022,
        depth: 0.25 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.003 + Math.random() * 0.004,
      });
    }

    // 2. Subtle blue energy particles drifting slowly
    for (let i = 0; i < energyCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -0.03 - Math.random() * 0.1,
        radius: 1.2 + Math.random() * 1.6,
        kind: 'energy',
        alpha: 0.14 + Math.random() * 0.16,
        depth: 0.35 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.006 + Math.random() * 0.007,
      });
    }

    // 3. Soft microscopic cinematic dust specks
    for (let i = 0; i < speckCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.02 - Math.random() * 0.08,
        radius: 0.6 + Math.random() * 1.1,
        kind: 'speck',
        alpha: 0.11 + Math.random() * 0.15,
        depth: 0.15 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.008,
      });
    }

    let time = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;

      // Smoothly interpolate mouse position
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.03;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.03;

      const normMouseX = (mouse.currentX / width - 0.5) * 2;
      const normMouseY = (mouse.currentY / height - 0.5) * 2;

      // Subtle slow-drifting volumetric ambient light beam on canvas
      const driftX = width * 0.5 + Math.sin(time) * (width * 0.12);
      const driftY = height * 0.38 + Math.cos(time * 0.8) * (height * 0.08);
      const ambientBeam = ctx.createRadialGradient(
        driftX,
        driftY,
        20,
        driftX,
        driftY,
        Math.max(width, height) * 0.55
      );
      ambientBeam.addColorStop(0, 'rgba(22, 119, 255, 0.042)');
      ambientBeam.addColorStop(0.45, 'rgba(15, 46, 108, 0.024)');
      ambientBeam.addColorStop(1, 'rgba(6, 12, 24, 0)');
      ctx.fillStyle = ambientBeam;
      ctx.fillRect(0, 0, width, height);

      // Restrained cursor-responsive volumetric blue glow (desktop)
      if (!isMobile) {
        const cursorLight = ctx.createRadialGradient(
          mouse.currentX,
          mouse.currentY,
          10,
          mouse.currentX,
          mouse.currentY,
          440
        );
        cursorLight.addColorStop(0, 'rgba(36, 128, 255, 0.045)');
        cursorLight.addColorStop(0.45, 'rgba(18, 72, 168, 0.02)');
        cursorLight.addColorStop(1, 'rgba(6, 12, 24, 0)');
        ctx.fillStyle = cursorLight;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.baseX += p.vx;
          p.baseY += p.vy;
          p.phase += p.phaseSpeed;

          const pad = p.radius + 30;
          if (p.baseX < -pad) p.baseX = width + pad;
          if (p.baseX > width + pad) p.baseX = -pad;
          if (p.baseY < -pad) p.baseY = height + pad;
          if (p.baseY > height + pad) p.baseY = -pad;
        }

        // Restrained parallax displacement (-14px to +14px max)
        const parallaxX = reducedMotion ? 0 : normMouseX * 14 * p.depth;
        const parallaxY = reducedMotion ? 0 : normMouseY * 14 * p.depth;

        const drawX = p.baseX + parallaxX;
        const drawY = p.baseY + parallaxY;

        const breath = reducedMotion ? 1 : 0.82 + Math.sin(p.phase) * 0.18;
        const currentAlpha = p.alpha * breath;

        if (p.kind === 'bloom') {
          const grad = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.radius
          );
          grad.addColorStop(0, `rgba(38, 132, 255, ${currentAlpha * 1.2})`);
          grad.addColorStop(0.5, `rgba(18, 68, 158, ${currentAlpha * 0.6})`);
          grad.addColorStop(1, 'rgba(6, 12, 24, 0)');

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (p.kind === 'energy') {
          // Soft blue energy particle with delicate atmospheric halo
          const haloGrad = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.radius * 4.2
          );
          haloGrad.addColorStop(0, `rgba(77, 163, 255, ${currentAlpha * 0.55})`);
          haloGrad.addColorStop(0.45, `rgba(22, 119, 255, ${currentAlpha * 0.22})`);
          haloGrad.addColorStop(1, 'rgba(6, 12, 24, 0)');

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius * 4.2, 0, Math.PI * 2);
          ctx.fillStyle = haloGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 204, 255, ${currentAlpha})`;
          ctx.fill();
        } else {
          // Microscopic cinematic dust speck
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(205, 228, 255, ${currentAlpha})`;
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
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme, reducedMotion]);

  if (theme !== 'dark') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Rich Cinematic Blue-Based Dark Foundation (Deep Navy, Midnight Blue, Dark Indigo, Charcoal) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #050914 0%, #071124 26%, #09162E 48%, #081226 74%, #050A15 100%)',
        }}
      />

      {/* 2. Large Diffused Volumetric Blue & Indigo Illumination Zones */}
      <div
        className="absolute -top-[10%] right-[2%] w-[760px] h-[680px] rounded-full blur-[175px] opacity-80"
        style={{
          background:
            'radial-gradient(circle, rgba(22, 119, 255, 0.14) 0%, rgba(16, 56, 138, 0.08) 45%, transparent 76%)',
        }}
      />

      <div
        className="absolute top-[34%] -left-[8%] w-[820px] h-[680px] rounded-full blur-[185px] opacity-75"
        style={{
          background:
            'radial-gradient(circle, rgba(28, 84, 196, 0.11) 0%, rgba(15, 32, 82, 0.06) 50%, transparent 78%)',
        }}
      />

      <div
        className="absolute bottom-[4%] right-[8%] w-[840px] h-[640px] rounded-full blur-[180px] opacity-75"
        style={{
          background:
            'radial-gradient(circle, rgba(22, 119, 255, 0.10) 0%, rgba(20, 42, 105, 0.055) 52%, transparent 78%)',
        }}
      />

      {/* 3. Interactive Cinematic Dust & Energy Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 4. Subtle Vignette & Studio Film Grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 52%, rgba(3, 6, 14, 0.48) 100%)',
        }}
      />
      <div
        className="absolute inset-0 film-grain"
        style={{ opacity: 0.03 }}
      />
    </div>
  );
};
