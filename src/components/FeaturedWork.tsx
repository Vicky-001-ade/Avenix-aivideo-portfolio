/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tv,
  Sparkles,
  Globe,
  Infinity as InfinityIcon,
  VolumeX,
  Volume2,
} from 'lucide-react';

import heroImg from '../assets/images/hero_cinematic_visual_1790332675440.jpg';
import archImg from '../assets/images/visuals_futuristic_arch_1790332712746.jpg';
import jewelryImg from '../assets/images/jewelry_commercial_still_1790332761081.jpg';
import beautyImg from '../assets/images/beauty_serum_still_1790332774451.jpg';
import fitnessImg from '../assets/images/fitness_cyber_still_1790332786693.jpg';
import lifestyleImg from '../assets/images/lifestyle_pod_still_1790332813205.jpg';

interface FeaturedWorkProps {
  onSelectProject: (project: Project) => void;
}

// 7 Projects strictly specified in the user prompt
const SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'luxury-perfume-hero',
    number: '01',
    title: 'Luxury Perfume Campaign',
    category: 'Luxury Product Commercial',
    status: 'AI Generated',
    client: 'AURA PRIVÉE / Paris',
    year: '2026',
    duration: '0:35',
    description:
      'Submerged crystal flacon immersed in hyper-detailed caustic fluid simulation, refractive illumination, and bespoke cinematic luxury pacing.',
    longDescription:
      'Commissioned as a flagship European fragrance campaign, this piece merges physical fluid simulations with generative micro-caustic lighting. Rendered with custom refractive light anchors and sub-surface dispersion, the flacon emerges from abyssal azure waters with zero-gravity fluid dynamics.',
    image: beautyImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790340949/Perfume_bottle_in_luxury_water_20260925135254_wjgfn4.mp4',
    tools: ['Google Veo 2', 'Runway Gen-3 Alpha', 'ComfyUI', 'DaVinci Resolve Studio'],
    aspectSpan: 'col-span-12 lg:col-span-8',
    metrics: '99.4% Client Approval · 4.8M Global Reach',
    directorNote:
      'Water refraction at macro scale is the ultimate test of generative physics. We locked the index of refraction (IOR) to 1.52 with an anamorphic 50mm virtual lens.',
    promptExcerpt:
      'extreme cinematic macro shot of faceted crystal perfume bottle submerged in pristine turquoise water, slow-motion caustic light patterns dancing across luxury flacon, liquid bubbles ascending, 8k cinematic rim lighting',
  },
  {
    id: 'modern-villa-showcase',
    number: '02',
    title: 'Modern Villa Showcase',
    category: 'Luxury Architecture',
    status: 'AI Generated',
    client: 'Vespera Architectural Group',
    year: '2026',
    duration: '0:42',
    description:
      'Nocturnal cantilevered architectural residence illuminated with warm interior tungsten rays and misty mountain dusk.',
    longDescription:
      'Designed for a high-end architectural firm, this cinematic film explores modern brutalist concrete, expansive infinity pool reflections, and ambient blue-hour atmosphere created through spatial AI rendering.',
    image: archImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790545787/Modern_architectural_villa_at_night_20260927224634_bsldcg.mp4',
    tools: ['Midjourney v6.1', 'Google Veo 2', 'Premiere Pro', 'Unreal Engine 5'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '+320% Architectural Inquiries',
    directorNote:
      'Balancing architectural geometry with volumetric night fog requires strict horizontal camera tracking and soft floor lamp accents.',
    promptExcerpt:
      'architectural drone flyby of minimalist glass and concrete luxury villa at night, glowing warm interior lighting, still reflecting infinity pool, distant misty mountain silhouettes, cinematic anamorphic 4k',
  },
  {
    id: 'audiophile-hardware-film',
    number: '03',
    title: 'Audiophile Hardware',
    category: 'Product Commercial',
    status: 'AI Generated',
    client: 'Kaelen Acoustic Labs',
    year: '2026',
    duration: '0:38',
    description:
      'Zero-gravity exploded assembly exploring precision-machined titanium components and ferrofluid acoustic drivers.',
    longDescription:
      'A technical commercial demonstrating planar magnetic headphone transducers. Atmospheric bass vibrations visually sculpt liquid ferrofluid around matte titanium enclosures.',
    image: heroImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790544715/Audiophile_hardware_floating_in___20260927223123_xdk8ac.mp4',
    tools: ['Runway Gen-3 Alpha', 'FLUX.1 Pro', 'After Effects', 'ElevenLabs'],
    aspectSpan: 'col-span-12 lg:col-span-6',
    metrics: 'Featured on AI Design Awards 2026',
    directorNote:
      'Translating auditory resonance into tactile visual movement using magnetic fluid particles that react to virtual sound pulses.',
    promptExcerpt:
      'matte titanium audiophile hardware floating in zero gravity, internal exploded mechanical drivers, responsive liquid ferrofluid droplets, deep obsidian studio lighting with cyan edge glow',
  },
  {
    id: 'luxury-watch-campaign',
    number: '04',
    title: 'Luxury Watch Campaign',
    category: 'Luxury Branding',
    status: 'AI Generated',
    client: 'Chronos Genève',
    year: '2026',
    duration: '0:30',
    description:
      'Macro horological film highlighting sapphire crystal bevels, satin brushed bezel finishes, and dark mineral staging.',
    longDescription:
      'Capturing the intricate mechanical choreography of a perpetual calendar movement with cinematic lighting passes and microscopic focus racking.',
    image: lifestyleImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790546792/Luxury_watch_on_dark_surface_20260927230605_iwcbos.mp4',
    tools: ['Google Veo 2', 'FLUX.1 Dev', 'DaVinci Resolve', 'Topaz Video AI'],
    aspectSpan: 'col-span-12 lg:col-span-6',
    metrics: '12M+ Social Impressions',
    directorNote:
      'Horology requires millimeter perfection on gear teeth and dial guilloché. We used depth pass compositing to preserve mechanical realism.',
    promptExcerpt:
      'extreme macro commercial pan across luxury Swiss chronograph watch resting on black obsidian slate, razor-sharp metallic chamfers, luminous hands, soft blue rim light, 8k commercial film',
  },
  {
    id: 'performance-training-film',
    number: '05',
    title: 'Performance Training',
    category: 'Fitness Commercial',
    status: 'AI Generated',
    client: 'Apex Athletic Systems',
    year: '2026',
    duration: '0:28',
    description:
      'High-intensity athletic conditioning commercial capturing explosive biomechanics, kinetic camera movement, and volumetric gym atmosphere.',
    longDescription:
      'Engineered for a high-performance sportswear brand, this film merges high-frame-rate physical human motion with volumetric atmospheric gym lighting.',
    image: fitnessImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790542633/Athletic_individual_training_in_gym_20260927215538_jsgg87.mp4',
    tools: ['Higgsfield AI', 'Runway Gen-3', 'CapCut Pro', 'Premiere Pro'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '+185% Engagement vs Traditional Shoots',
    directorNote:
      'Kinetic camera acceleration combined with authentic muscle contraction creates palpable adrenaline without artificial artifacts.',
    promptExcerpt:
      'cinematic tracking shot of elite athlete training in dark industrial gym, chalk dust suspended in volumetric light beams, intense focus, sweat droplets, anamorphic lens flare',
  },
  {
    id: 'diamond-ring-visual',
    number: '06',
    title: 'Diamond Ring Visual',
    category: 'Jewelry Commercial',
    status: 'AI Generated',
    client: 'Solitaire Haute Joaillerie',
    year: '2026',
    duration: '0:32',
    description:
      'Zero-gravity diamond ring suspended over deep dark pool caustics with prismatic dispersion and razor-sharp crystal reflections.',
    longDescription:
      'Exploring the optical fire and scintillation of an 8-carat cushion cut diamond ring suspended in zero gravity over tranquil liquid mirrors.',
    image: jewelryImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790541364/Diamond_ring_suspended_over_water_20260927213136_kf8bnw.mp4',
    tools: ['Google Veo 2', 'Midjourney v6.1', 'After Effects', 'ComfyUI'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: 'Luxury Jewelry Campaign of the Year',
    directorNote:
      'Controlling chromatic dispersion so the diamond emits realistic prismatic flares instead of muddy halos.',
    promptExcerpt:
      'flawless diamond platinum solitaire ring hovering over calm water mirror, electric cyan and royal blue light refractions, crystal clear slow motion, luxury jewelry commercial',
  },
  {
    id: 'luxury-skincare-visual',
    number: '07',
    title: 'Luxury Skincare Visual',
    category: 'Beauty Commercial',
    status: 'AI Generated',
    client: 'Aura Cellulaire',
    year: '2026',
    duration: '0:26',
    description:
      'Micro fluid dynamics exploring bioluminescent cyan serum beads gliding over frosted laboratory glass with sub-surface scattering.',
    longDescription:
      'A visual celebration of clinical elegance and organic vitality, showcasing sub-surface light dispersion inside a luminous botanical serum formulation.',
    image: beautyImg,
    videoSrc:
      'https://res.cloudinary.com/tl7exdl8/video/upload/v1790538652/Cyan_bead_sliding_down_bottle_20260927204716_puzj1d.mp4',
    tools: ['FLUX.1 Pro', 'Kling AI 1.5', 'DaVinci Resolve Studio'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '4.2x Paid Social Conversion Rate',
    directorNote:
      'Capturing fluid viscosity: the droplet decelerates naturally along the frosted bottle curvature while catching cyan backlight.',
    promptExcerpt:
      'extreme macro photography of glowing cyan hydration bead slowly sliding down frosted glass serum bottle, micro air bubbles, crisp studio lighting, luxury beauty commercial',
  },
];

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectProject }) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoadingMap, setVideoLoadingMap] = useState<Record<string, boolean>>({
    'luxury-perfume-hero': true,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastWheelTimeRef = useRef(0);
  const isInteractingWithCarouselRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const projectsCount = SHOWCASE_PROJECTS.length;
  const currentProject = SHOWCASE_PROJECTS[activeIndex];

  // Control videos: Play the active center video, pause inactive ones to preserve resources
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;
      if (idx === activeIndex) {
        videoEl.muted = isMuted;
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy prevented playback, video will play on user interaction
          });
        }
      } else {
        videoEl.pause();
      }
    });
  }, [activeIndex, isMuted]);

  // Handle video loaded
  const handleVideoLoadedData = (projectId: string) => {
    setVideoLoadingMap((prev) => ({ ...prev, [projectId]: false }));
  };

  // Carousel navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 < projectsCount ? prev + 1 : prev));
  }, [projectsCount]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  const handleJumpToIndex = (idx: number) => {
    if (idx >= 0 && idx < projectsCount) {
      setActiveIndex(idx);
    }
  };

  // Scroll Lock Interaction:
  // When inside the Selected Work section, mouse wheel down/up shifts through projects
  // When at project 0 and scrolling up -> let natural page scroll happen
  // When at last project (6) and scrolling down -> let natural page scroll happen
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only engage scroll lock if the section is comfortably in the viewport
      const isInFocus = rect.top <= 120 && rect.bottom >= viewportHeight * 0.55;
      if (!isInFocus) return;

      const now = Date.now();
      const deltaY = e.deltaY;

      // Small threshold to avoid accidental micro-scrolls
      if (Math.abs(deltaY) < 18) return;

      // If scrolling down:
      if (deltaY > 0) {
        if (activeIndex < projectsCount - 1) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 420) {
            lastWheelTimeRef.current = now;
            setActiveIndex((prev) => Math.min(projectsCount - 1, prev + 1));
          }
        }
        // If already at last project, allow default scroll to next section
      }
      // If scrolling up:
      else if (deltaY < 0) {
        if (activeIndex > 0) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 420) {
            lastWheelTimeRef.current = now;
            setActiveIndex((prev) => Math.max(0, prev - 1));
          }
        }
        // If already at first project, allow default scroll back to hero
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, projectsCount]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  const handleViewAllProjects = () => {
    // Smoothly scroll to the motion showcase or open the hero project detail
    const motionSection = document.getElementById('motion-showcase');
    if (motionSection) {
      motionSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSelectProject(currentProject);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden select-none outline-none transition-colors duration-500"
      style={{
        backgroundColor: theme === 'dark' ? '#060D1A' : '#F7FAFD',
      }}
    >
      {/* =========================================================================
          BACKGROUND ATMOSPHERIC EFFECTS: Cyan Neons, Volumetric Beam & Laser Grids
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        {/* Deep radial illumination centered around the showcase */}
        <div
          className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[720px] rounded-full blur-[160px] opacity-70 transition-opacity duration-700"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(22, 119, 255, 0.22) 0%, rgba(56, 189, 248, 0.12) 40%, rgba(6, 13, 26, 0) 75%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.14) 0%, rgba(92, 169, 255, 0.08) 45%, rgba(247, 250, 253, 0) 75%)',
          }}
        />

        {/* Ambient Top Subtle Laser Horizon */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-35"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.6) 50%, transparent 100%)',
          }}
        />

        {/* Dark Metallic Cybernetic Grid Floor at bottom */}
        <div className="avenix-metallic-floor absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none opacity-85" />
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* =========================================================================
            TOP ROW / LAYOUT: Left Content Panel + Right Layered Showcase
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* =====================================================================
              LEFT CONTENT PANEL (Inspired by reference screenshot)
              ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Section label with futuristic cyan neon line accent */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span
                className="text-xs uppercase tracking-[0.28em] font-semibold font-mono-tech"
                style={{
                  color: theme === 'dark' ? '#38BDF8' : '#1D74DF',
                }}
              >
                SELECTED WORK
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] mb-5 sm:mb-6"
              style={{
                color: theme === 'dark' ? '#FFFFFF' : '#111827',
              }}
            >
              Ideas Into Motion.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300">
                Results Into Reality.
              </span>
            </h2>

            {/* Supporting Text */}
            <p
              className="text-sm sm:text-lg leading-relaxed font-normal mb-7 sm:mb-8 max-w-xl"
              style={{
                color: theme === 'dark' ? '#94A3B8' : '#334155',
              }}
            >
              A curated collection of premium AI-generated commercials, luxury product visuals,
              cinematic storytelling projects, and high-end brand content crafted with precision and
              creativity.
            </p>

            {/* CTA Button: View All Projects */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={handleViewAllProjects}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider font-mono-tech uppercase transition-all duration-300 border shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98]"
                style={{
                  backgroundColor:
                    theme === 'dark' ? 'rgba(11, 20, 38, 0.85)' : '#FFFFFF',
                  borderColor:
                    theme === 'dark' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(42, 140, 255, 0.45)',
                  color: theme === 'dark' ? '#FFFFFF' : '#111827',
                }}
              >
                {/* Button Hologram Glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-transparent pointer-events-none"
                />
                <span className="relative z-10">View All Projects</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              {/* Quick Audio Mute / Unmute Toggle for Active Video */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 rounded-full border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 backdrop-blur-md bg-white/[0.04] transition-all"
                title={isMuted ? 'Unmute video audio' : 'Mute video'}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>

            {/* Achievement Metrics List (Under the button) with futuristic dividers & subtle neon glow lines */}
            <div
              className="p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all"
              style={{
                backgroundColor:
                  theme === 'dark' ? 'rgba(11, 20, 38, 0.55)' : 'rgba(255, 255, 255, 0.8)',
                borderColor:
                  theme === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(42, 140, 255, 0.18)',
              }}
            >
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3.5 sm:gap-4">
                {/* Metric 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/25 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold font-display text-white tracking-tight">
                      50+
                    </div>
                    <div className="text-xs text-slate-400 font-mono-tech">
                      Projects Delivered
                    </div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/25 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold font-display text-white tracking-tight">
                      100%
                    </div>
                    <div className="text-xs text-slate-400 font-mono-tech">
                      Custom Creative Direction
                    </div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start gap-3 pt-3 border-t border-white/10 min-[420px]:border-t-0 min-[420px]:pt-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/25 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold font-display text-white tracking-tight">
                      Global
                    </div>
                    <div className="text-xs text-slate-400 font-mono-tech">
                      Client Reach
                    </div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex items-start gap-3 pt-3 border-t border-white/10 min-[420px]:border-t-0 min-[420px]:pt-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/25 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <InfinityIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold font-display text-white tracking-tight">
                      Unlimited
                    </div>
                    <div className="text-xs text-slate-400 font-mono-tech">
                      Creative Possibilities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT SHOWCASE AREA: Layered Floating-Card Carousel
              - Center card is the largest featured project (Luxury Perfume Campaign initially)
              - Side cards appear partially visible and slightly behind
              - Glassmorphism, futuristic borders, neon glow, depth shadows
              ===================================================================== */}
          <div className="lg:col-span-7 relative flex flex-col items-center w-full">
            {/* 3D Carousel Stage */}
            <div
              className="avenix-showcase-perspective relative w-full h-[350px] xs:h-[400px] sm:h-[490px] md:h-[530px] flex items-center justify-center overflow-hidden sm:overflow-visible"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {SHOWCASE_PROJECTS.map((project, idx) => {
                // Calculate position relative to activeIndex
                const offset = idx - activeIndex;
                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isFarLeft = offset < -1;
                const isFarRight = offset > 1;

                // Only render items within window (-2, -1, 0, 1, 2)
                if (Math.abs(offset) > 2) {
                  return null;
                }

                // Transform styles based on relative offset and screen width
                let transformStyle = '';
                let zIndex = 10;
                let opacity = 0;
                let filter = 'none';

                if (isCenter) {
                  transformStyle = 'translateX(0%) translateZ(0px) scale(1) rotateY(0deg)';
                  zIndex = 30;
                  opacity = 1;
                  filter = 'none';
                } else if (isLeft) {
                  transformStyle = isMobile
                    ? 'translateX(-34%) translateZ(-70px) scale(0.85) rotateY(6deg)'
                    : 'translateX(-48%) translateZ(-90px) scale(0.82) rotateY(9deg)';
                  zIndex = 20;
                  opacity = 0.65;
                  filter = 'brightness(0.72) saturate(0.85)';
                } else if (isRight) {
                  transformStyle = isMobile
                    ? 'translateX(34%) translateZ(-70px) scale(0.85) rotateY(-6deg)'
                    : 'translateX(48%) translateZ(-90px) scale(0.82) rotateY(-9deg)';
                  zIndex = 20;
                  opacity = 0.65;
                  filter = 'brightness(0.72) saturate(0.85)';
                } else if (isFarLeft) {
                  transformStyle = isMobile
                    ? 'translateX(-58%) translateZ(-120px) scale(0.72) rotateY(10deg)'
                    : 'translateX(-78%) translateZ(-160px) scale(0.68) rotateY(16deg)';
                  zIndex = 10;
                  opacity = 0.2;
                  filter = 'blur(2px) brightness(0.5)';
                } else if (isFarRight) {
                  transformStyle = isMobile
                    ? 'translateX(58%) translateZ(-120px) scale(0.72) rotateY(-10deg)'
                    : 'translateX(78%) translateZ(-160px) scale(0.68) rotateY(-16deg)';
                  zIndex = 10;
                  opacity = 0.2;
                  filter = 'blur(2px) brightness(0.5)';
                }

                const isHovered = hoveredCardId === project.id;
                const isVideoLoading = videoLoadingMap[project.id] ?? false;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (isCenter) {
                        onSelectProject(project);
                      } else {
                        handleJumpToIndex(idx);
                      }
                    }}
                    onMouseEnter={() => setHoveredCardId(project.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      filter,
                    }}
                    className={`avenix-showcase-card absolute top-1/2 -translate-y-1/2 w-[90%] xs:w-[86%] sm:w-[80%] md:w-[480px] lg:w-[520px] aspect-[16/11] rounded-2xl md:rounded-3xl cursor-pointer ${
                      isCenter
                        ? 'avenix-card-glow-active ring-1 ring-cyan-400/40'
                        : 'avenix-card-glow-inactive ring-1 ring-white/10 hover:ring-cyan-400/30'
                    }`}
                  >
                    {/* Glassmorphism Inner Container with HUD Corner Brackets */}
                    <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950/80 backdrop-blur-xl border border-white/10 group">
                      {/* Futuristic corner accents on center card */}
                      {isCenter && (
                        <>
                          <div className="avenix-hud-corner-tl" />
                          <div className="avenix-hud-corner-tr" />
                          <div className="avenix-hud-corner-bl" />
                          <div className="avenix-hud-corner-br" />
                        </>
                      )}

                      {/* Video Media Background */}
                      <div className="relative w-full h-full overflow-hidden">
                        {/* High-res poster image */}
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                            isCenter && isHovered ? 'scale-105' : 'scale-100'
                          }`}
                        />

                        {/* Video Element (Autoplays when center, paused when side) */}
                        {project.videoSrc && (
                          <video
                            ref={(el) => {
                              videoRefs.current[idx] = el;
                            }}
                            src={project.videoSrc}
                            autoPlay={isCenter}
                            playsInline
                            muted={isMuted}
                            loop
                            preload="metadata"
                            onLoadedData={() => handleVideoLoadedData(project.id)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              isCenter ? 'opacity-100' : 'opacity-40'
                            }`}
                          />
                        )}

                        {/* Loading shimmer if video is still buffering on center card */}
                        {isCenter && isVideoLoading && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-cyan-900/30 to-blue-950/40 animate-pulse pointer-events-none" />
                        )}

                        {/* Cinematic gradient scrims */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                        {/* Top Metadata Badges */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-mono-tech tracking-wider uppercase font-semibold bg-black/60 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              {project.id === 'luxury-perfume-hero'
                                ? 'FEATURED HERO'
                                : project.category.toUpperCase().includes('LUXURY')
                                ? 'AI CINEMATIC'
                                : 'AI GENERATED'}
                            </span>

                            {project.status && (
                              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech tracking-wider text-slate-300 bg-white/10 backdrop-blur-sm border border-white/15">
                                {project.status}
                              </span>
                            )}
                          </div>

                          <div className="text-[10px] sm:text-[11px] font-mono-tech text-white/75 bg-black/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm border border-white/10">
                            {project.duration}
                          </div>
                        </div>

                        {/* Bottom Content Overlay */}
                        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-end justify-between gap-3 sm:gap-4">
                          <div className="max-w-[76%] sm:max-w-[80%]">
                            <h3
                              className={`font-display font-bold tracking-tight text-white mb-1 transition-colors ${
                                isCenter
                                  ? 'text-lg sm:text-2xl md:text-3xl'
                                  : 'text-base sm:text-xl text-slate-200'
                              }`}
                            >
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-cyan-300/90 font-mono-tech">
                              <span>{project.category}</span>
                              <span className="opacity-50">·</span>
                              <span className="text-slate-400 hidden sm:inline">{project.client}</span>
                            </div>
                          </div>

                          {/* Circular Action Button at bottom right (inspired by reference image) */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(project);
                            }}
                            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg shrink-0 ${
                              isCenter
                                ? 'border-cyan-400/60 bg-black/60 text-cyan-300 hover:bg-cyan-500 hover:text-black hover:scale-110 shadow-cyan-500/25'
                                : 'border-white/20 bg-black/40 text-white/60 hover:text-white'
                            }`}
                            title="Inspect project details"
                          >
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>

                        {/* Subtle light sweep glint on hover */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-cyan-400/[0.07] to-transparent"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===================================================================
                BOTTOM SHOWCASE CONTROLS: Arrow Buttons & Project Progress
                =================================================================== */}
            <div className="w-full mt-5 sm:mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 px-1 sm:px-6">
              {/* Counter / Category indicator */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="font-mono-tech text-xs tracking-widest text-cyan-400 font-bold shrink-0">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(projectsCount).padStart(2, '0')}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[280px]">
                  {currentProject.title}
                </span>
              </div>

              {/* Progress dots / bar */}
              <div className="hidden sm:flex items-center gap-1.5">
                {SHOWCASE_PROJECTS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleJumpToIndex(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeIndex
                        ? 'w-7 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to project ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Circular Arrow Buttons (matches reference screenshot) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    activeIndex === 0
                      ? 'border-white/10 text-white/20 cursor-not-allowed'
                      : 'border-white/25 text-white hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] active:scale-95 bg-slate-900/60'
                  }`}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === projectsCount - 1}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    activeIndex === projectsCount - 1
                      ? 'border-white/10 text-white/20 cursor-not-allowed'
                      : 'border-white/25 text-white hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] active:scale-95 bg-slate-900/60'
                  }`}
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Subtle Scroll/Swipe Cue */}
            <div className="mt-3 text-[11px] font-mono-tech text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Scroll wheel or swipe horizontally to navigate projects</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SHELF HUD BAR: 4 Achievement Metrics (Matches Reference Image)
            ========================================================================= */}
        <div
          className="mt-16 md:mt-24 p-6 sm:p-8 rounded-2xl md:rounded-3xl border backdrop-blur-xl relative overflow-hidden"
          style={{
            backgroundColor:
              theme === 'dark' ? 'rgba(11, 19, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            borderColor:
              theme === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(42, 140, 255, 0.22)',
            boxShadow:
              theme === 'dark'
                ? '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(22, 119, 255, 0.15)'
                : '0 20px 50px -15px rgba(17, 24, 39, 0.08), 0 0 30px -5px rgba(42, 140, 255, 0.1)',
          }}
        >
          {/* Subtle Top Glowing Line */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Metric 1 */}
            <div className="flex items-center gap-4 justify-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <div
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  50+
                </div>
                <div className="text-xs font-mono-tech tracking-wider uppercase text-slate-400">
                  Projects Delivered
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4 justify-start pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  100%
                </div>
                <div className="text-xs font-mono-tech tracking-wider uppercase text-slate-400">
                  Custom Creative Direction
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-4 justify-start pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  Global
                </div>
                <div className="text-xs font-mono-tech tracking-wider uppercase text-slate-400">
                  Client Reach
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4 justify-start pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)] shrink-0">
                <InfinityIcon className="w-6 h-6" />
              </div>
              <div>
                <div
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  Unlimited
                </div>
                <div className="text-xs font-mono-tech tracking-wider uppercase text-slate-400">
                  Creative Possibilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
