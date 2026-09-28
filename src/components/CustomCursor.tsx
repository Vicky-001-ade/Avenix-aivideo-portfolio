import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'play' | 'pointer'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check element under cursor for special attributes or classes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="view"]');
      const videoEl = target.closest('[data-cursor="play"]');
      const buttonEl = target.closest('button, a, input, select, textarea, [role="button"]');

      if (projectEl) {
        setCursorType('view');
      } else if (videoEl) {
        setCursorType('play');
      } else if (buttonEl) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Smooth trailing follower animation
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId: number;

    const follow = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isExpanded = cursorType === 'view' || cursorType === 'play';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Central precise dot */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        } ${cursorType === 'pointer' ? 'w-2 h-2 bg-blue-500 shadow-[0_0_8px_#1677FF]' : 'w-1.5 h-1.5 bg-blue-400'}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Atmospheric trailing ring / pill */}
      <div
        className={`fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isExpanded
            ? 'w-16 h-16 rounded-full bg-blue-600/90 text-white backdrop-blur-md shadow-[0_0_24px_rgba(22,119,255,0.6)] border border-blue-300/40'
            : cursorType === 'pointer'
            ? 'w-10 h-10 rounded-full border border-blue-500/60 bg-blue-500/10'
            : 'w-7 h-7 rounded-full border border-blue-400/30'
        }`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
        }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-bold tracking-widest uppercase font-mono-tech select-none">
            VIEW
          </span>
        )}
        {cursorType === 'play' && (
          <span className="text-[10px] font-bold tracking-widest uppercase font-mono-tech select-none">
            PLAY
          </span>
        )}
      </div>
    </div>
  );
};
