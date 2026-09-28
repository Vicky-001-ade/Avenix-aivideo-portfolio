import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const MarqueeStatement: React.FC = () => {
  const { theme } = useTheme();

  const items = [
    'AI VIDEO',
    'AI COMMERCIALS',
    'AI UGC',
    'CINEMATIC VISUALS',
    'PRODUCT FILMS',
    'AI IMAGE GENERATION',
    'CREATIVE DIRECTION',
    'VISUAL STORYTELLING',
  ];

  return (
    <div
      className="relative w-full overflow-hidden py-6 border-y select-none transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(8, 17, 36, 0.55)' : 'rgba(241, 246, 253, 0.82)',
        borderColor: theme === 'dark' ? 'rgba(77, 163, 255, 0.12)' : '#DCE5F0',
      }}
    >
      {/* Edge gradient masks for seamless fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to right, #060D1A, transparent)'
            : 'linear-gradient(to right, #F7FAFD, transparent)',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to left, #060D1A, transparent)'
            : 'linear-gradient(to left, #F7FAFD, transparent)',
        }}
      />

      <div className="animate-marquee flex items-center">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span
              className="font-display text-sm md:text-base font-bold tracking-[0.2em] uppercase transition-colors px-6"
              style={{
                color: idx % 3 === 0
                  ? theme === 'dark' ? '#4DA3FF' : '#1D74DF'
                  : theme === 'dark' ? '#FFFFFF' : '#111827',
              }}
            >
              {text}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full opacity-60 ${
                theme === 'dark' ? 'bg-blue-500' : 'bg-[#2A8CFF]'
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
