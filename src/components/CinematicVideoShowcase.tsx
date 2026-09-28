import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

const THUMBNAIL_URL =
  'https://res.cloudinary.com/tl7exdl8/image/upload/v1790444630/202609231734_cover_hcrbw7.jpg';
const VIDEO_URL =
  'https://res.cloudinary.com/tl7exdl8/video/upload/v1790373986/GOODLUCK_VIDEO_wzkbey.mp4';

export const CinematicVideoShowcase: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<number | null>(null);

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [previousVolume, setPreviousVolume] = useState(0.9);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Format seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Preload thumbnail image for crisp immediate display
  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.src = THUMBNAIL_URL;
  }, []);

  // Viewport entrance fade-in observer
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          }
        });
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hideControlsTimeoutRef.current) {
        window.clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  const scheduleControlsAutoHide = () => {
    setControlsVisible(true);
    if (hideControlsTimeoutRef.current) {
      window.clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3200);
  };

  // Start video playback immediately when clicking the thumbnail play button
  const handleStartVideo = () => {
    setIsVideoActive(true);
    setIsEnded(false);
    setControlsVisible(true);

    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = false;
    setIsMuted(false);

    video
      .play()
      .then(() => {
        setIsPlaying(true);
        scheduleControlsAutoHide();
      })
      .catch(() => {
        // Fallback if browser policy requires muted start
        video.muted = true;
        setIsMuted(true);
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            scheduleControlsAutoHide();
          })
          .catch(() => {
            setIsPlaying(false);
          });
      });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        setIsEnded(false);
      }
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          scheduleControlsAutoHide();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
      setControlsVisible(true);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!isMuted) {
      setPreviousVolume(volume > 0 ? volume : 0.8);
    }
    video.muted = true;
    setIsMuted(true);
  };

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    const restored = previousVolume > 0.05 ? previousVolume : 0.85;
    video.muted = false;
    video.volume = restored;
    setVolume(restored);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      handleUnmute();
    } else {
      handleMute();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = parseFloat(e.target.value);
    setVolume(nextVol);

    const video = videoRef.current;
    if (!video) return;

    video.volume = nextVol;
    if (nextVol === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      setPreviousVolume(nextVol);
      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    const video = videoRef.current as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }

    if (container && container.requestFullscreen) {
      container.requestFullscreen().catch(() => {
        if (video?.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      });
    } else if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    if (videoRef.current.duration) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleVideoEnded = () => {
    if (hideControlsTimeoutRef.current) {
      window.clearTimeout(hideControlsTimeoutRef.current);
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setIsPlaying(false);
    setIsEnded(false);
    setIsVideoActive(false);
    setProgress(0);
    setCurrentTime('00:00');
    setControlsVisible(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const total = videoRef.current.duration || 1;
    videoRef.current.currentTime = ratio * total;
    setProgress(ratio * 100);
    setCurrentTime(formatTime(ratio * total));
  };

  const handleTimelineRangeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const nextPct = parseFloat(e.target.value);
    const total = videoRef.current.duration || 1;
    videoRef.current.currentTime = (nextPct / 100) * total;
    setProgress(nextPct);
    setCurrentTime(formatTime((nextPct / 100) * total));
  };

  return (
    <section
      ref={sectionRef}
      id="motion-showcase"
      className="py-24 md:py-32 relative overflow-hidden transition-colors"
      style={{
        backgroundColor: 'transparent',
        backgroundImage:
          theme === 'dark'
            ? 'linear-gradient(180deg, rgba(6, 13, 26, 0) 0%, rgba(8, 20, 44, 0.72) 20%, rgba(7, 17, 38, 0.76) 80%, rgba(6, 13, 26, 0) 100%)'
            : 'linear-gradient(180deg, rgba(247, 250, 253, 0) 0%, rgba(235, 243, 253, 0.72) 20%, rgba(232, 241, 252, 0.76) 80%, rgba(247, 250, 253, 0) 100%)',
      }}
    >
      {/* Ambient Futuristic Blue Glow Behind Display Panel */}
      {theme === 'dark' && (
        <div
          aria-hidden="true"
          className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1080px] h-[680px] pointer-events-none rounded-full blur-[175px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(22, 119, 255, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 82%)',
          }}
        />
      )}

      {theme === 'light' && (
        <div
          aria-hidden="true"
          className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[600px] pointer-events-none rounded-full blur-[165px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(42, 140, 255, 0.11) 0%, rgba(92, 169, 255, 0.05) 48%, transparent 82%)',
          }}
        />
      )}

      {/* =====================================================================
          SECTION HEADER: "Meet The Mind Behind Avenix"
          ===================================================================== */}
      <div
        className={`max-w-5xl mx-auto px-6 md:px-10 mb-12 md:mb-14 text-center relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-4">
          <span
            className="w-7 h-[2px] rounded-full"
            style={{
              backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF',
              boxShadow:
                theme === 'dark'
                  ? '0 0 12px rgba(56, 189, 248, 0.7)'
                  : '0 0 10px rgba(42, 140, 255, 0.35)',
            }}
          />
          <span
            className="text-xs uppercase tracking-[0.28em] font-semibold font-mono-tech"
            style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
          >
            CREATOR INTRODUCTION
          </span>
          <span
            className="w-7 h-[2px] rounded-full"
            style={{
              backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF',
              boxShadow:
                theme === 'dark'
                  ? '0 0 12px rgba(56, 189, 248, 0.7)'
                  : '0 0 10px rgba(42, 140, 255, 0.35)',
            }}
          />
        </div>

        {/* Main Title */}
        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]"
          style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
        >
          Meet The Mind{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                theme === 'dark'
                  ? 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 52%, #BAE6FD 100%)'
                  : 'linear-gradient(90deg, #1D74DF 0%, #2A8CFF 52%, #5CA9FF 100%)',
            }}
          >
            Behind Avenix
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 font-normal leading-relaxed"
          style={{ color: theme === 'dark' ? '#A7ADB8' : '#334155' }}
        >
          A short introduction to my creative process, vision, and the future of AI-powered visual
          storytelling.
        </p>
      </div>

      {/* =====================================================================
          FUTURISTIC AI DISPLAY PANEL — VIDEO SHOWCASE FRAME
          ===================================================================== */}
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.98]'
        }`}
      >
        {/* Outer Futuristic Glassmorphic AI Panel Chassis */}
        <div
          className={`group/frame relative rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-2 sm:p-3 md:p-4 transition-all duration-500 backdrop-blur-xl border ${
            theme === 'dark'
              ? 'bg-[#071022]/80 border-sky-400/25 hover:border-sky-400/55 shadow-[0_32px_80px_-18px_rgba(0,0,0,0.88),0_0_55px_-12px_rgba(22,119,255,0.28)] hover:shadow-[0_36px_90px_-16px_rgba(0,0,0,0.92),0_0_75px_-8px_rgba(56,189,248,0.42)]'
              : 'bg-white/85 border-[#2A8CFF]/30 hover:border-[#2A8CFF]/65 shadow-[0_28px_68px_-18px_rgba(17,24,39,0.18),0_0_48px_-12px_rgba(42,140,255,0.20)] hover:shadow-[0_32px_78px_-16px_rgba(17,24,39,0.22),0_0_64px_-8px_rgba(42,140,255,0.32)]'
          }`}
        >
          {/* Top & Bottom Neon Specular Light Strips */}
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-[1.5px] pointer-events-none z-20 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.85) 30%, #FFFFFF 50%, rgba(56, 189, 248, 0.85) 70%, transparent 100%)',
              boxShadow: '0 0 18px rgba(56, 189, 248, 0.8)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-16 bottom-0 h-[1px] pointer-events-none z-20 opacity-75"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.75) 50%, transparent 100%)',
              boxShadow: '0 0 14px rgba(22, 119, 255, 0.65)',
            }}
          />

          {/* Futuristic Corner Bracket Accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-2.5 w-5 h-5 rounded-tl-[18px] border-t-2 border-l-2 border-sky-400/70 z-20 transition-colors duration-300 group-hover/frame:border-sky-300"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 right-2.5 w-5 h-5 rounded-tr-[18px] border-t-2 border-r-2 border-sky-400/70 z-20 transition-colors duration-300 group-hover/frame:border-sky-300"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 left-2.5 w-5 h-5 rounded-bl-[18px] border-b-2 border-l-2 border-sky-400/70 z-20 transition-colors duration-300 group-hover/frame:border-sky-300"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 right-2.5 w-5 h-5 rounded-br-[18px] border-b-2 border-r-2 border-sky-400/70 z-20 transition-colors duration-300 group-hover/frame:border-sky-300"
          />

          {/* Top Bezel Header Bar inside the AI Display Panel */}
          <div className="flex items-center justify-between px-3 sm:px-4 pb-2.5 pt-1 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.22em]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}>
                AVENIX // CREATOR VISION FEED
              </span>
            </div>

            <div
              className="hidden sm:flex items-center gap-2.5"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL BRAND INTRODUCTION</span>
            </div>
          </div>

          {/* Inner Video Viewport Stage */}
          <div
            ref={containerRef}
            onMouseMove={isVideoActive ? scheduleControlsAutoHide : undefined}
            onMouseEnter={() => setControlsVisible(true)}
            className="relative aspect-video w-full rounded-[18px] sm:rounded-[20px] md:rounded-[22px] overflow-hidden bg-[#040812] border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.85)] select-none"
          >
            {/* ===============================================================
                1. INITIAL THUMBNAIL STATE (Displayed ONLY before playback starts)
                =============================================================== */}
            <div
              onClick={!isVideoActive ? handleStartVideo : undefined}
              role={!isVideoActive ? 'button' : undefined}
              tabIndex={!isVideoActive ? 0 : -1}
              aria-label="Play Meet The Mind Behind Avenix introduction video"
              onKeyDown={
                !isVideoActive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStartVideo();
                      }
                    }
                  : undefined
              }
              data-cursor="play"
              className={`group/thumb absolute inset-0 z-20 cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVideoActive
                  ? 'opacity-0 scale-[1.04] pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
            >
              {/* High-Resolution Cover Thumbnail with Hover Zoom */}
              <img
                src={THUMBNAIL_URL}
                alt="Meet The Mind Behind Avenix — Video Thumbnail"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-[1.045]"
              />

              {/* Subtle Dark Cinematic Vignette & Hover Blue Illumination */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 85% 78% at 50% 48%, rgba(4, 9, 20, 0.12) 0%, rgba(4, 10, 22, 0.44) 68%, rgba(3, 7, 16, 0.84) 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(42, 140, 255, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 72%)',
                }}
              />

              {/* Center Premium Cinematic Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="relative flex items-center justify-center">
                  {/* Outer Ambient Pulse Ring */}
                  <span
                    aria-hidden="true"
                    className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-sky-400/35 bg-sky-500/10 scale-95 group-hover/thumb:scale-115 opacity-70 group-hover/thumb:opacity-100 transition-all duration-500"
                  />
                  {/* Secondary Futuristic Halo */}
                  <span
                    aria-hidden="true"
                    className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-blue-400/15 scale-90 group-hover/thumb:scale-110 opacity-40 group-hover/thumb:opacity-85 transition-all duration-700"
                  />

                  {/* Core Glassmorphic Play Button */}
                  <div
                    className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white border border-sky-300/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-110 group-hover/thumb:border-white active:scale-95"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(22, 119, 255, 0.92) 0%, rgba(56, 189, 248, 0.88) 100%)',
                      boxShadow:
                        '0 0 42px rgba(22, 119, 255, 0.75), 0 0 80px rgba(56, 189, 248, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.65)',
                    }}
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" />
                  </div>
                </div>

                {/* Subtle Prompt Caption Beneath Play Button */}
                <span className="mt-5 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono-tech uppercase tracking-[0.24em] text-sky-100/90 transition-all duration-300 group-hover/thumb:border-sky-400/50 group-hover/thumb:text-white">
                  Watch Creator Introduction
                </span>
              </div>
            </div>

            {/* ===============================================================
                2. ACTIVE VIDEO PLAYER & CONTROLS (Revealed smoothly on click)
                =============================================================== */}
            <div
              className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVideoActive
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-[0.975] pointer-events-none'
              }`}
            >
              <video
                ref={videoRef}
                src={VIDEO_URL}
                poster={THUMBNAIL_URL}
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                className="w-full h-full object-contain bg-black cursor-pointer"
              />

              {/* Top-Right Quick-Access Floating Mute / Unmute Pill for Immediate Visibility */}
              <div
                className={`absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 transition-opacity duration-300 ${
                  controlsVisible || !isPlaying || isMuted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-mono-tech uppercase tracking-[0.16em] font-semibold backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                    isMuted
                      ? 'bg-sky-500/90 text-white border-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.65)] hover:bg-sky-400'
                      : 'bg-black/60 text-sky-100 border-white/20 hover:border-sky-400/60 hover:bg-black/80'
                  }`}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Tap to Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-sky-400" />
                      <span>Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Center Play / Replay Overlay Button when Paused or Ended */}
              {isVideoActive && (!isPlaying || isEnded) && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isEnded ? 'Replay video' : 'Resume video'}
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white border border-sky-300/60 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 z-30 cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(22, 119, 255, 0.90) 0%, rgba(56, 189, 248, 0.85) 100%)',
                    boxShadow:
                      '0 0 36px rgba(22, 119, 255, 0.7), 0 0 64px rgba(56, 189, 248, 0.4)',
                  }}
                >
                  {isEnded ? (
                    <RotateCcw className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>
              )}

              {/* Bottom Futuristic Glassmorphic Control Deck */}
              <div
                className={`absolute inset-x-0 bottom-0 z-30 p-3 sm:p-5 md:p-6 bg-gradient-to-t from-[#030712]/95 via-[#040918]/80 to-transparent transition-opacity duration-300 ${
                  controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Interactive Progress Bar */}
                <div className="relative group/seek mb-3 sm:mb-4 flex items-center">
                  <div
                    onClick={handleSeek}
                    className="w-full h-2 sm:h-2.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden backdrop-blur-sm"
                  >
                    <div
                      className="h-full rounded-full relative transition-[width] duration-100"
                      style={{
                        width: `${progress}%`,
                        background:
                          'linear-gradient(90deg, #1677FF 0%, #38BDF8 85%, #FFFFFF 100%)',
                        boxShadow: '0 0 14px rgba(56, 189, 248, 0.9)',
                      }}
                    />
                  </div>
                  {/* Accessible range input overlay for touch & keyboard scrubbing */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={Number.isFinite(progress) ? progress : 0}
                    onChange={handleTimelineRangeSeek}
                    aria-label="Seek video timeline"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Controls Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-white text-xs font-mono-tech">
                  {/* Left Cluster: Play/Pause, Mute & Unmute Buttons, Volume Slider, Time */}
                  <div className="flex items-center flex-wrap gap-2 sm:gap-3.5">
                    {/* Play / Pause Button */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-sky-500/25 border border-white/15 hover:border-sky-400/60 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* Dedicated Mute / Unmute Controls (Clearly Visible & Easy to Access) */}
                    <div className="flex items-center rounded-xl bg-white/10 border border-white/15 p-0.5">
                      <button
                        type="button"
                        onClick={handleUnmute}
                        aria-label="Unmute video"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                          !isMuted && volume > 0
                            ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.55)]'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Unmute</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleMute}
                        aria-label="Mute video"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                          isMuted || volume === 0
                            ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(56,189,248,0.55)]'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Mute</span>
                      </button>
                    </div>

                    {/* Volume Control Slider */}
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume control"
                        className="w-16 sm:w-22 h-1.5 accent-sky-400 bg-white/20 rounded-lg cursor-pointer"
                      />
                      <span className="hidden md:inline-block w-8 text-right text-[10px] tabular-nums text-sky-200/85">
                        {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                      </span>
                    </div>

                    {/* Timecode Readout */}
                    <span className="text-[11px] sm:text-xs tabular-nums text-slate-200/90 pl-1">
                      {currentTime} <span className="text-sky-400/70">/</span> {duration}
                    </span>
                  </div>

                  {/* Right Cluster: Fullscreen Button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-sky-500/25 border border-white/15 hover:border-sky-400/60 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer"
                    >
                      {isFullscreen ? (
                        <>
                          <Minimize2 className="w-4 h-4 text-sky-400" />
                          <span className="hidden sm:inline">Exit</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4 text-sky-400" />
                          <span className="hidden sm:inline">Fullscreen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

