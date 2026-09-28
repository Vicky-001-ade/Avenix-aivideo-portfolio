import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film, ArrowRight, ArrowLeft, Terminal } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-2xl transition-all duration-300 overflow-y-auto"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(5, 7, 11, 0.88)' : 'rgba(247, 250, 253, 0.92)',
      }}
    >
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-auto"
        style={{
          backgroundColor: theme === 'dark' ? '#0B1019' : '#FCFDFE',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#DCE5F0',
        }}
      >
        {/* Header bar */}
        <div
          className="p-5 md:px-8 border-b flex items-center justify-between"
          style={{
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#DCE5F0',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-mono-tech text-xs font-bold ${
                theme === 'dark' ? 'text-blue-500' : 'text-[#1D74DF]'
              }`}
            >
              {project.number}
            </span>
            <span className={theme === 'dark' ? 'text-slate-500' : 'text-[#94A3B8]'}>/</span>
            <span
              className={`font-mono-tech text-xs uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-[#475569] font-medium'
              }`}
            >
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-full border transition-colors ${
              theme === 'dark'
                ? 'border-white/10 hover:border-white/30 text-white'
                : 'border-[#CBD8E8] bg-white hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Player Section */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          {project.videoSrc ? (
            <>
              <video
                ref={videoRef}
                src={project.videoSrc}
                poster={project.image}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover"
                onClick={togglePlay}
              />
              {/* Play / Mute controls overlay */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-105 transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono-tech text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>4K CINEMA MASTER</span>
            <span>·</span>
            <span>{project.duration}</span>
          </div>
        </div>

        {/* Project Context & Metadata */}
        <div className="p-6 md:p-10 space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <h2
                className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
              >
                {project.title}
              </h2>
              {project.metrics && (
                <div
                  className="px-3.5 py-1.5 rounded-lg border text-xs font-mono-tech font-semibold"
                  style={{
                    backgroundColor:
                      theme === 'dark' ? 'rgba(22, 119, 255, 0.08)' : 'rgba(42, 140, 255, 0.08)',
                    borderColor:
                      theme === 'dark' ? 'rgba(22, 119, 255, 0.3)' : 'rgba(42, 140, 255, 0.32)',
                    color: theme === 'dark' ? '#4DA3FF' : '#1D74DF',
                  }}
                >
                  {project.metrics}
                </div>
              )}
            </div>

            <div
              className={`flex items-center gap-3 text-xs font-mono-tech ${
                theme === 'dark' ? 'text-slate-500' : 'text-[#475569] font-medium'
              }`}
            >
              <span>Client: {project.client}</span>
              <span>·</span>
              <span>Year: {project.year}</span>
            </div>
          </div>

          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: theme === 'dark' ? '#A7ADB8' : '#334155' }}
          >
            {project.longDescription}
          </p>

          {/* Director's Note */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor:
                theme === 'dark' ? 'rgba(22, 119, 255, 0.03)' : 'rgba(42, 140, 255, 0.05)',
              borderColor:
                theme === 'dark' ? 'rgba(22, 119, 255, 0.2)' : 'rgba(42, 140, 255, 0.25)',
            }}
          >
            <div
              className={`flex items-center gap-2 mb-2 text-xs font-mono-tech uppercase font-bold ${
                theme === 'dark' ? 'text-blue-500' : 'text-[#1D74DF]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Director's Creative Note</span>
            </div>
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: theme === 'dark' ? '#D1D5DB' : '#1E293B' }}
            >
              "{project.directorNote}"
            </p>
          </div>

          {/* Prompt Conditioning Blueprint */}
          <div
            className="p-5 rounded-xl border"
            style={{
              backgroundColor: theme === 'dark' ? '#070A10' : '#F4F8FD',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#DCE5F0',
            }}
          >
            <div
              className={`flex items-center gap-2 mb-2 text-xs font-mono-tech uppercase font-semibold ${
                theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
              }`}
            >
              <Terminal
                className={`w-3.5 h-3.5 ${
                  theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                }`}
              />
              <span>Prompt Conditioning Formula</span>
            </div>
            <code
              className={`text-xs font-mono-tech break-words leading-relaxed block ${
                theme === 'dark' ? 'text-blue-400/90' : 'text-[#1D74DF] font-medium'
              }`}
            >
              {project.promptExcerpt}
            </code>
          </div>

          {/* Tools stack */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-mono-tech uppercase mr-2 font-semibold ${
                theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
              }`}
            >
              Tools:
            </span>
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-md text-xs font-mono-tech border"
                style={{
                  backgroundColor:
                    theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#F8FBFE',
                  borderColor:
                    theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#DCE5F0',
                  color: theme === 'dark' ? '#E2E8F0' : '#1E293B',
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Bottom Next / Prev Navigation */}
          <div
            className="pt-6 border-t flex items-center justify-between"
            style={{
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#DCE5F0',
            }}
          >
            <button
              onClick={() => onSelectProject(prevProject)}
              className={`flex items-center gap-2 text-xs font-mono-tech font-semibold transition-colors ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-blue-500'
                  : 'text-[#334155] hover:text-[#2A8CFF]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{prevProject.number} · {prevProject.title.split(':')[0]}</span>
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className={`flex items-center gap-2 text-xs font-mono-tech font-semibold transition-colors ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-blue-500'
                  : 'text-[#334155] hover:text-[#2A8CFF]'
              }`}
            >
              <span>{nextProject.number} · {nextProject.title.split(':')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
