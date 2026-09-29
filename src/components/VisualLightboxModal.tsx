import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AIVisual } from '../types';
import { X, Copy, Check, Sparkles, Terminal, Camera } from 'lucide-react';

interface VisualLightboxModalProps {
  visual: AIVisual | null;
  onClose: () => void;
}

export const VisualLightboxModal: React.FC<VisualLightboxModalProps> = ({ visual, onClose }) => {
  const { theme } = useTheme();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!visual) return null;

  const copyPrompt = () => {
    navigator.clipboard.writeText(visual.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 backdrop-blur-2xl transition-all duration-300 overflow-y-auto"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(5, 7, 11, 0.90)' : 'rgba(247, 250, 253, 0.92)',
      }}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden z-10 my-auto"
        style={{
          backgroundColor: theme === 'dark' ? '#0B1019' : '#FCFDFE',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#DCE5F0',
        }}
      >
        {/* Header bar */}
        <div
          className="p-3.5 sm:p-4 md:px-8 border-b flex items-center justify-between"
          style={{
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#DCE5F0',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-mono-tech text-xs font-bold uppercase ${
                theme === 'dark' ? 'text-blue-500' : 'text-[#1D74DF]'
              }`}
            >
              {visual.category}
            </span>
            <span className={theme === 'dark' ? 'text-slate-500' : 'text-[#94A3B8]'}>·</span>
            <span
              className={`font-mono-tech text-xs ${
                theme === 'dark' ? 'text-slate-400' : 'text-[#475569] font-medium'
              }`}
            >
              {visual.dimensions}
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

        {/* Media visual container */}
        <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={visual.image}
            alt={visual.title}
            referrerPolicy="no-referrer"
            className="w-full max-h-[60vh] object-contain"
          />
        </div>

        {/* Visual metadata breakdown */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
              >
                {visual.title}
              </h2>
              <div
                className={`text-xs font-mono-tech mt-1 ${
                  theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
                }`}
              >
                Engine:{' '}
                <span
                  className={`font-semibold ${
                    theme === 'dark' ? 'text-blue-500' : 'text-[#1D74DF]'
                  }`}
                >
                  {visual.tools}
                </span>
              </div>
            </div>

            <div
              className="px-4 py-2 rounded-xl border text-xs font-mono-tech"
              style={{
                backgroundColor:
                  theme === 'dark' ? 'rgba(22, 119, 255, 0.06)' : 'rgba(42, 140, 255, 0.06)',
                borderColor:
                  theme === 'dark' ? 'rgba(22, 119, 255, 0.25)' : 'rgba(42, 140, 255, 0.28)',
              }}
            >
              <div
                className={`text-[10px] uppercase font-semibold ${
                  theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
                }`}
              >
                Lighting Setup
              </div>
              <div
                className={`font-medium ${
                  theme === 'dark' ? 'text-blue-400' : 'text-[#1D74DF]'
                }`}
              >
                {visual.lightingSetup}
              </div>
            </div>
          </div>

          {/* Prompt Blueprint with Copy action */}
          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: theme === 'dark' ? '#070A10' : '#F4F8FD',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#DCE5F0',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`flex items-center gap-2 text-xs font-mono-tech uppercase font-semibold ${
                  theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
                }`}
              >
                <Terminal
                  className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                  }`}
                />
                <span>Synthesis Prompt Formula</span>
              </div>

              <button
                onClick={copyPrompt}
                className={`flex items-center gap-1.5 text-xs font-mono-tech font-semibold ${
                  theme === 'dark'
                    ? 'text-blue-500 hover:text-blue-400'
                    : 'text-[#1D74DF] hover:text-[#2A8CFF]'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <code
              className={`text-xs font-mono-tech break-words leading-relaxed block ${
                theme === 'dark' ? 'text-blue-400/90' : 'text-[#1D74DF] font-medium'
              }`}
            >
              {visual.prompt}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
