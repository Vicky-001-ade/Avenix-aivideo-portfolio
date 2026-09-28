import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AIVisual } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AIVisualsGalleryProps {
  onSelectVisual: (visual: AIVisual) => void;
}

interface VisualGroupCardData {
  id: string;
  groupKey: 'fashion' | 'serum' | 'watch' | 'villa';
  title: string;
  subtitleTags: [string, string, string];
  category: AIVisual['category'];
  images: [string, string];
  imageTitles: [string, string];
  dimensions: string;
  tools: string;
  lightingSetup: string;
  prompts: [string, string];
}

const CENTER_FEATURED_VISUAL = {
  id: 'avenix-center-featured',
  title: 'Cybernetic Sovereign',
  subtitleTags: ['Sci-Fi', 'Concept Art', 'AI Generated'] as [string, string, string],
  category: 'Character' as AIVisual['category'],
  image:
    'https://res.cloudinary.com/tl7exdl8/image/upload/v1790442940/hero_cinematic_visual_1790332675440.jpg_20260926181515_xyoodn.jpg',
  dimensions: '4096 × 2304',
  tools: 'Midjourney v6.1 · FLUX.1 Pro · Magnific AI',
  lightingSetup: 'Anamorphic cybernetic blue rim lighting with volumetric atmospheric haze',
  prompt:
    'cinematic futuristic portrait in monumental sci-fi citadel, intricate cybernetic armor details, luminous electric blue accents, shallow depth of field, 8k editorial key art',
};

const VISUAL_GROUPS: VisualGroupCardData[] = [
  {
    id: 'avenix-group-fashion-arch',
    groupKey: 'fashion',
    title: 'Monolith Rotunda',
    subtitleTags: ['Fashion', 'Architecture', 'AI Generated'],
    category: 'Fashion',
    images: [
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441255/Model_walking_through_concrete_r__20260926174653_tyqdss.jpg',
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441291/Model_walking_in_concrete_rotunda_20260926174724_fitgoa.jpg',
    ],
    imageTitles: [
      'Monolith Rotunda — Editorial Walk I',
      'Monolith Rotunda — Architectural Study II',
    ],
    dimensions: '3840 × 2160',
    tools: 'Midjourney v6.1 · Custom Architectural LoRA',
    lightingSetup: 'High-contrast brutalist skylight shaft with soft natural bounce',
    prompts: [
      'editorial avant-garde model walking through monumental brutalist concrete rotunda, dramatic architectural light shafts, luxury campaign photography, 8k',
      'high-fashion silhouette framed inside circular brutalist concrete rotunda architecture, minimalist luxury mood, medium format film look',
    ],
  },
  {
    id: 'avenix-group-serum',
    groupKey: 'serum',
    title: 'Lumière Elixir',
    subtitleTags: ['Beauty', 'Product Visual', 'AI Generated'],
    category: 'Beauty',
    images: [
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441438/Serum_bottle_on_reflective_surface_20260926175016_s2bnpv.jpg',
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441488/Glass_serum_bottle_on_surface_20260926175041_t8yvwn.jpg',
    ],
    imageTitles: [
      'Lumière Elixir — Reflective Obsidian Surface',
      'Lumière Elixir — Sculpted Glass Vessel',
    ],
    dimensions: '3840 × 2160',
    tools: 'FLUX.1 Pro · ControlNet Depth · Neural Relight',
    lightingSetup: 'Precision specular rim strips with liquid caustic refraction',
    prompts: [
      'luxury botanical glass serum bottle resting on dark reflective water surface, studio macro lighting, crisp glass caustics and micro droplets, 8k commercial still',
      'minimalist sculpted glass skincare serum bottle on textured architectural stone surface, soft diffused luxury studio lighting, ultra-sharp commercial photography',
    ],
  },
  {
    id: 'avenix-group-watch',
    groupKey: 'watch',
    title: 'Chronos Caliber',
    subtitleTags: ['Horology', 'Product Visual', 'AI Generated'],
    category: 'Product',
    images: [
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790440788/Luxury_mechanical_wristwatch_on___20260926173825_mbodwz.jpg',
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790440853/Luxury_watch_on_base_20260926173953_gyiwr8.jpg',
    ],
    imageTitles: [
      'Chronos Caliber — Mechanical Tourbillon Macro',
      'Chronos Caliber — Monolith Pedestal Showcase',
    ],
    dimensions: '3840 × 2160',
    tools: 'Midjourney v6.1 · Magnific Precision Upscale',
    lightingSetup: 'Micro-focused jewelers key light with brushed metallic highlights',
    prompts: [
      'ultra-luxury mechanical wristwatch with exposed tourbillon movement on dark architectural pedestal, dramatic sapphire crystal reflection, macro horology photography',
      'bespoke Swiss luxury chronograph watch poised on sculpted dark stone base, subtle blue-steel studio rim light, razor-sharp metallic textures',
    ],
  },
  {
    id: 'avenix-group-villa',
    groupKey: 'villa',
    title: 'Nocturne Sanctuary',
    subtitleTags: ['Architecture', 'Luxury Villa', 'AI Generated'],
    category: 'Architecture',
    images: [
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441141/Modern_architectural_villa_at_night_20260926174504_rzntjo.jpg',
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441121/Modern_luxury_villa_at_night_20260926174230_rvwt6f.jpg',
    ],
    imageTitles: [
      'Nocturne Sanctuary — Cantilevered Night Villa I',
      'Nocturne Sanctuary — Infinity Reflection II',
    ],
    dimensions: '3840 × 2160',
    tools: 'Midjourney v6.1 · Krea AI Enhancer',
    lightingSetup: 'Twilight blue-hour ambient sky balanced with warm interior architectural glow',
    prompts: [
      'modernist luxury architectural villa at night with floor-to-ceiling glass, infinity pool reflecting twilight blue sky and warm interior illumination, 8k architectural digest',
      'ultra-modern cliffside luxury villa at night, geometric concrete and glass volumes, mirror-calm water reflections, cinematic nocturnal atmosphere',
    ],
  },
];

export const AIVisualsGallery: React.FC<AIVisualsGalleryProps> = ({ onSelectVisual }) => {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  // Preload all 9 high-resolution Cloudinary gallery images on mount so transitions never flicker
  useEffect(() => {
    const allUrls = [
      CENTER_FEATURED_VISUAL.image,
      ...VISUAL_GROUPS.flatMap((group) => group.images),
    ];
    allUrls.forEach((url) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    });
  }, []);

  // Synchronized 3.5-second (3500ms) smooth infinite crossfade loop for all 4 paired containers
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleSelectCenterpiece = () => {
    onSelectVisual({
      id: CENTER_FEATURED_VISUAL.id,
      title: CENTER_FEATURED_VISUAL.title,
      category: CENTER_FEATURED_VISUAL.category,
      image: CENTER_FEATURED_VISUAL.image,
      aspectClass: 'aspect-[16/9]',
      dimensions: CENTER_FEATURED_VISUAL.dimensions,
      tools: CENTER_FEATURED_VISUAL.tools,
      prompt: CENTER_FEATURED_VISUAL.prompt,
      lightingSetup: CENTER_FEATURED_VISUAL.lightingSetup,
    });
  };

  const handleSelectGroupCard = (group: VisualGroupCardData) => {
    onSelectVisual({
      id: `${group.id}-${activeSlide}`,
      title: group.imageTitles[activeSlide],
      category: group.category,
      image: group.images[activeSlide],
      aspectClass: 'aspect-[16/10]',
      dimensions: group.dimensions,
      tools: group.tools,
      prompt: group.prompts[activeSlide],
      lightingSetup: group.lightingSetup,
    });
  };

  const renderSurroundingCard = (group: VisualGroupCardData, gridPlacementClasses: string) => {
    return (
      <article
        key={group.id}
        onClick={() => handleSelectGroupCard(group)}
        data-cursor="view"
        className={`group cursor-pointer relative rounded-[22px] overflow-hidden border transition-all duration-500 select-none ${gridPlacementClasses} ${
          theme === 'dark'
            ? 'bg-[#091120] border-white/10 hover:border-sky-400/55 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.78)] hover:shadow-[0_22px_48px_-10px_rgba(22,119,255,0.28)]'
            : 'bg-[#FCFDFE] border-[#DCE5F0] hover:border-[#2A8CFF]/65 shadow-[0_16px_38px_-12px_rgba(17,24,39,0.12)] hover:shadow-[0_22px_48px_-10px_rgba(42,140,255,0.24)]'
        }`}
      >
        {/* Dual-Image Crossfade Stage — Both images stay mounted to prevent flicker or layout shift */}
        <div className="relative w-full h-full min-h-[260px] sm:min-h-[275px] lg:min-h-0 overflow-hidden bg-[#060C18]">
          <div className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
            {/* Base Image (Index 0) stays at opacity-100 so card background never bleeds through */}
            <img
              src={group.images[0]}
              alt={group.imageTitles[0]}
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
            />
            {/* Top Crossfade Image (Index 1) smoothly fades between 0 and 100 over 1200ms */}
            <img
              src={group.images[1]}
              alt={group.imageTitles[1]}
              decoding="async"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center select-none will-change-[opacity] transition-opacity duration-[1200ms] ease-in-out ${
                activeSlide === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Cinematic Dark Vignette & Blue Hover Illumination */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(180deg, rgba(4, 9, 20, 0.14) 0%, rgba(4, 9, 20, 0.18) 48%, rgba(3, 8, 18, 0.88) 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 85% 90%, rgba(42, 140, 255, 0.24) 0%, transparent 60%)',
            }}
          />

          {/* Top-Right Subtle Dual-Frame Progress Indicator */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/10">
            <span
              className={`h-1 rounded-full transition-all duration-500 ${
                activeSlide === 0 ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/35'
              }`}
            />
            <span
              className={`h-1 rounded-full transition-all duration-500 ${
                activeSlide === 1 ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/35'
              }`}
            />
          </div>

          {/* Bottom Content Lockup: Title, Dot-Separated Tags & Glassmorphic Arrow Circle */}
          <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg sm:text-[19px] font-bold text-white tracking-tight leading-snug group-hover:text-sky-300 transition-colors duration-300 truncate">
                {group.title}
              </h3>
              <div className="mt-1 flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[11px] font-mono-tech text-slate-200/80">
                <span>{group.subtitleTags[0]}</span>
                <span aria-hidden="true" className="text-sky-400">
                  •
                </span>
                <span>{group.subtitleTags[1]}</span>
                <span aria-hidden="true" className="text-sky-400">
                  •
                </span>
                <span>{group.subtitleTags[2]}</span>
              </div>
            </div>

            {/* Reference-inspired Circular Arrow Button */}
            <span
              aria-hidden="true"
              className="shrink-0 w-9 h-9 rounded-full border border-white/25 bg-black/35 backdrop-blur-md text-white/90 flex items-center justify-center transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-500/25 group-hover:text-white group-hover:translate-x-0.5"
            >
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="visuals" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient Atmospheric Blue Glow Behind Centerpiece */}
      {theme === 'dark' && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[640px] pointer-events-none rounded-full blur-[180px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 58% at 50% 50%, rgba(22, 119, 255, 0.14) 0%, rgba(56, 189, 248, 0.06) 48%, transparent 82%)',
          }}
        />
      )}
      {theme === 'light' && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[640px] pointer-events-none rounded-full blur-[175px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 58% at 50% 50%, rgba(42, 140, 255, 0.10) 0%, rgba(92, 169, 255, 0.05) 50%, transparent 82%)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Reference-Inspired Editorial Section Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          {/* Eyebrow with Horizontal Accent Line */}
          <div className="flex items-center gap-3.5 mb-4">
            <span
              className="w-8 h-[2px] rounded-full"
              style={{
                backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF',
                boxShadow:
                  theme === 'dark'
                    ? '0 0 12px rgba(56, 189, 248, 0.65)'
                    : '0 0 10px rgba(42, 140, 255, 0.35)',
              }}
            />
            <span
              className="text-xs uppercase tracking-[0.28em] font-semibold font-mono-tech"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              AI VISUALS
            </span>
          </div>

          {/* Editorial Headline */}
          <h2
            className="font-display text-4xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-[1.08]"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
          >
            Imagination into Stunning{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 55%, #BAE6FD 100%)'
                    : 'linear-gradient(90deg, #1D74DF 0%, #2A8CFF 55%, #5CA9FF 100%)',
              }}
            >
              Visuals.
            </span>
          </h2>

          <p
            className="text-base sm:text-lg max-w-xl mt-4 font-normal leading-relaxed"
            style={{ color: theme === 'dark' ? '#A7ADB8' : '#334155' }}
          >
            From cinematic scenes to futuristic concepts, our AI visuals bring ideas to life with
            stunning detail, emotion, and creativity.
          </p>
        </div>

        {/* ===================================================================
            EDITORIAL SYMMETRICAL GALLERY GRID
            - Desktop (lg: >= 1024px): 12-column exhibition layout with 2 stacked
              cards on the left (cols 1-3), the Large Featured Centerpiece in
              the exact center (cols 4-9, spanning both rows), and 2 stacked
              cards on the right (cols 10-12).
            - Tablet (sm/md: 640px – 1023px): Balanced 2-column layout with the
              Featured Centerpiece spanning both columns in the center row.
            - Mobile (< 640px): Single-column stacked layout preserving image
              transitions and centerpiece prominence.
            =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-5 md:gap-6 xl:gap-7 lg:h-[620px] xl:h-[660px]">
          {/* GROUP 1: FASHION / ARCHITECTURE (Left Top on Desktop, Row 1 Col 1 on Tablet) */}
          {renderSurroundingCard(
            VISUAL_GROUPS[0],
            'sm:col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-1'
          )}

          {/* GROUP 2: SERUM PRODUCT VISUALS (Left Bottom on Desktop, Row 1 Col 2 on Tablet) */}
          {renderSurroundingCard(
            VISUAL_GROUPS[1],
            'sm:col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-2'
          )}

          {/* =================================================================
              CENTER FEATURED VISUAL (Visual Anchor in the Exact Center)
              ================================================================= */}
          <article
            onClick={handleSelectCenterpiece}
            data-cursor="view"
            className={`group cursor-pointer relative rounded-[24px] overflow-hidden border transition-all duration-500 select-none sm:col-span-2 lg:col-start-4 lg:col-span-6 lg:row-start-1 lg:row-span-2 min-h-[390px] sm:min-h-[430px] lg:min-h-0 ${
              theme === 'dark'
                ? 'bg-[#081020] border-sky-400/35 hover:border-sky-400/75 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85),0_0_48px_-10px_rgba(22,119,255,0.32)] hover:shadow-[0_28px_72px_-10px_rgba(0,0,0,0.9),0_0_64px_-6px_rgba(56,189,248,0.45)]'
                : 'bg-[#FCFDFE] border-[#2A8CFF]/45 hover:border-[#2A8CFF] shadow-[0_24px_58px_-14px_rgba(17,24,39,0.18),0_0_42px_-10px_rgba(42,140,255,0.22)] hover:shadow-[0_28px_66px_-12px_rgba(17,24,39,0.22),0_0_54px_-8px_rgba(42,140,255,0.34)]'
            }`}
          >
            {/* Subtle Top Perimeter Specular Highlight */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[1px] z-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(125, 211, 252, 0.75) 50%, transparent 100%)',
              }}
            />

            {/* Featured Centerpiece Image */}
            <div className="relative w-full h-full min-h-[390px] sm:min-h-[430px] lg:min-h-0 overflow-hidden bg-[#050B16]">
              <img
                src={CENTER_FEATURED_VISUAL.image}
                alt={CENTER_FEATURED_VISUAL.title}
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />

              {/* Multi-layered Cinematic Gradient & Blue Ambient Rim Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(4, 9, 20, 0.12) 0%, rgba(4, 9, 20, 0.14) 50%, rgba(3, 8, 18, 0.90) 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 95%, rgba(22, 119, 255, 0.28) 0%, transparent 62%)',
                }}
              />

              {/* Top-Left Featured Centerpiece Label */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-[0.22em] text-sky-200/90">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Featured Centerpiece</span>
              </div>

              {/* Bottom Hero Caption & Circular Arrow Button */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8 z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-sky-200 transition-colors duration-300">
                    {CENTER_FEATURED_VISUAL.title}
                  </h3>
                  <div className="mt-1.5 flex items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-[13px] font-mono-tech text-slate-200/85">
                    <span>{CENTER_FEATURED_VISUAL.subtitleTags[0]}</span>
                    <span aria-hidden="true" className="text-sky-400">
                      •
                    </span>
                    <span>{CENTER_FEATURED_VISUAL.subtitleTags[1]}</span>
                    <span aria-hidden="true" className="text-sky-400">
                      •
                    </span>
                    <span>{CENTER_FEATURED_VISUAL.subtitleTags[2]}</span>
                  </div>
                </div>

                {/* Circular Glassmorphic Arrow Button */}
                <span
                  aria-hidden="true"
                  className="shrink-0 w-11 h-11 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-500/30 group-hover:scale-105 group-hover:translate-x-0.5 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>

          {/* GROUP 3: LUXURY WATCH VISUALS (Right Top on Desktop, Row 3 Col 1 on Tablet) */}
          {renderSurroundingCard(
            VISUAL_GROUPS[2],
            'sm:col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-1'
          )}

          {/* GROUP 4: LUXURY VILLA VISUALS (Right Bottom on Desktop, Row 3 Col 2 on Tablet) */}
          {renderSurroundingCard(
            VISUAL_GROUPS[3],
            'sm:col-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-2'
          )}
        </div>

        {/* Reference-Inspired Bottom Exhibition Status Bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-[11px] font-mono-tech uppercase tracking-[0.24em]">
            <span
              className="w-6 h-[2px] rounded-full"
              style={{ backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
            />
            <span style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}>AI VISUALS</span>
            <span
              aria-hidden="true"
              style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
            >
              •
            </span>
            <span style={{ color: theme === 'dark' ? '#94A3B8' : '#475569' }}>CREATIVITY</span>
            <span
              aria-hidden="true"
              style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
            >
              •
            </span>
            <span style={{ color: theme === 'dark' ? '#94A3B8' : '#475569' }}>
              LIMITLESS POSSIBILITIES
            </span>
          </div>

          {/* Synchronized Slideshow Cycle Indicators */}
          <div className="flex items-center gap-2" aria-label="Gallery rotation indicator">
            <button
              type="button"
              onClick={() => setActiveSlide(0)}
              aria-label="Show visual variation 1"
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === 0
                  ? theme === 'dark'
                    ? 'w-7 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]'
                    : 'w-7 bg-[#2A8CFF] shadow-[0_0_10px_rgba(42,140,255,0.5)]'
                  : theme === 'dark'
                  ? 'w-3 bg-white/20 hover:bg-white/40'
                  : 'w-3 bg-[#CBD8E8] hover:bg-[#94A3B8]'
              }`}
            />
            <button
              type="button"
              onClick={() => setActiveSlide(1)}
              aria-label="Show visual variation 2"
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === 1
                  ? theme === 'dark'
                    ? 'w-7 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]'
                    : 'w-7 bg-[#2A8CFF] shadow-[0_0_10px_rgba(42,140,255,0.5)]'
                  : theme === 'dark'
                  ? 'w-3 bg-white/20 hover:bg-white/40'
                  : 'w-3 bg-[#CBD8E8] hover:bg-[#94A3B8]'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

