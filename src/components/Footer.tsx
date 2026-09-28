import React, { useState } from 'react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Instagram,
  Mail,
} from 'lucide-react';

interface FooterLinkItem {
  label: string;
  href: string;
}

const SERVICES_LINKS: FooterLinkItem[] = [
  { label: 'AI Video Creation', href: '#work' },
  { label: 'AI Commercials', href: '#work' },
  { label: 'Product Visuals', href: '#visuals' },
  { label: 'Cinematic Storytelling', href: '#process' },
  { label: 'Creative Direction', href: '#about' },
];

const PORTFOLIO_LINKS: FooterLinkItem[] = [
  { label: 'Featured Work', href: '#work' },
  { label: 'AI Visuals', href: '#visuals' },
  { label: 'Motion Reel', href: '#work' },
  { label: 'Case Studies', href: '#services' },
  { label: 'Client Projects', href: '#services' },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Pricing', href: '#tools' },
  { label: 'Testimonials', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookies Policy', href: '#cookies' },
];

const BehanceIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.758.459 3.474 1.332 4.988L2 22l5.165-1.355a9.932 9.932 0 0 0 4.866 1.263h.004c5.515 0 9.965-4.452 9.965-9.968A9.908 9.908 0 0 0 19.082 4.92 9.906 9.906 0 0 0 12.031 2zm0 18.225h-.003a8.26 8.26 0 0 1-4.212-1.153l-.302-.179-3.012.79.804-2.936-.197-.313a8.248 8.248 0 0 1-1.268-4.395c0-4.554 3.706-8.259 8.263-8.259 2.207 0 4.281.86 5.841 2.421a8.208 8.208 0 0 1 2.417 5.839c0 4.555-3.706 8.185-8.331 8.185zm4.532-6.185c-.248-.124-1.471-.726-1.699-.809-.227-.083-.393-.124-.558.124-.165.248-.641.809-.785.974-.145.166-.289.186-.537.062-.248-.124-1.047-.386-1.994-1.231-.737-.658-1.235-1.47-1.38-1.718-.145-.248-.015-.382.109-.506.112-.111.248-.289.372-.434.124-.145.165-.248.248-.413.083-.166.041-.31-.021-.434-.062-.124-.558-1.344-.765-1.84-.201-.483-.406-.418-.558-.426-.145-.007-.31-.009-.475-.009s-.434.062-.661.31c-.227.248-.868.848-.868 2.067s.889 2.398 1.013 2.563c.124.165 1.749 2.671 4.238 3.745.592.256 1.054.409 1.414.523.594.189 1.135.162 1.563.098.477-.071 1.471-.601 1.678-1.181.207-.579.207-1.075.145-1.181-.062-.103-.227-.165-.475-.289z" />
  </svg>
);

interface SocialItem {
  name: string;
  href: string;
  ariaLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    name: 'Behance',
    href: 'https://www.behance.net/basiratbello',
    ariaLabel: 'Visit Behance profile',
    icon: BehanceIcon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ogunleyegoodluck244/',
    ariaLabel: 'Visit Instagram profile',
    icon: Instagram,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/message/6UEJD7UEULJJM1',
    ariaLabel: 'Connect on WhatsApp',
    icon: WhatsAppIcon,
  },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (
        href === '#privacy' ||
        href === '#terms' ||
        href === '#cookies'
      ) {
        e.preventDefault();
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-[#040B18] via-[#02060E] to-[#010307] text-white pt-16 pb-12 sm:pt-20 sm:pb-16">
      {/* Keyframes for subtle light streaks and floating ambient particles */}
      <style>{`
        @keyframes footerTopBeamSweep {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes footerParticleFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-10px) scale(1.25);
            opacity: 0.85;
          }
        }
      `}</style>

      {/* Glowing Top Border Separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/75 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.85)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden"
      >
        <div
          className="w-1/2 h-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.95) 45%, rgba(255, 255, 255, 0.98) 50%, rgba(56, 189, 248, 0.95) 55%, transparent 100%)',
            boxShadow: '0 0 24px rgba(56, 189, 248, 0.95)',
            animation: 'footerTopBeamSweep 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Top Center Cerulean Horizon Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-48 rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(22, 119, 255, 0.09) 50%, transparent 75%)',
        }}
      />

      {/* Ambient Cerulean Side Glows & Subtle Animated Light Particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(22, 119, 255, 0.16) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-28 right-0 w-[520px] h-[520px] rounded-full blur-[160px]"
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(22, 119, 255, 0.06) 55%, transparent 75%)',
          }}
        />

        {/* Subtle Animated Light Streaks & Particles */}
        <span
          className="absolute top-14 left-[12%] w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38BDF8]"
          style={{
            animation: 'footerParticleFloat 5.5s ease-in-out infinite',
          }}
        />
        <span
          className="absolute top-28 left-[46%] w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]"
          style={{
            animation: 'footerParticleFloat 6.8s ease-in-out 1.4s infinite',
          }}
        />
        <span
          className="absolute bottom-20 left-[68%] w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38BDF8]"
          style={{
            animation: 'footerParticleFloat 6.2s ease-in-out 0.8s infinite',
          }}
        />
        <span
          className="absolute top-20 right-[14%] w-1 h-1 rounded-full bg-sky-200 shadow-[0_0_8px_#7DD3FC]"
          style={{
            animation: 'footerParticleFloat 7.2s ease-in-out 2.1s infinite',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 relative z-10">
        {/* Main Multi-Column Studio Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* LEFT SECTION — BRAND AREA */}
          <div className="lg:col-span-3 flex flex-col justify-between lg:pr-4">
            <div>
              {/* AVENIX Brand Emblem & Title */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group/brand inline-flex items-center gap-3.5 focus:outline-none"
              >
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A1933] to-[#040B1A] border border-sky-400/45 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.28),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover/brand:border-sky-300 group-hover/brand:shadow-[0_0_32px_rgba(56,189,248,0.5)]">
                  <img
                    src={avenixLogo}
                    alt="AVENIX Logo"
                    className="w-8 h-8 object-contain transition-transform duration-300 group-hover/brand:scale-105"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.55))',
                    }}
                  />
                </div>
                <div>
                  <div
                    className="font-display text-2xl sm:text-[26px] font-extrabold tracking-[0.18em] bg-gradient-to-b from-white via-slate-100 to-sky-200 bg-clip-text text-transparent leading-none"
                    style={{
                      filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.28))',
                    }}
                  >
                    AVENIX
                  </div>
                  <div className="mt-1.5 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.28em] text-sky-300 font-semibold">
                    AI Video Creator
                  </div>
                </div>
              </a>

              {/* Short Brand Statement */}
              <p className="mt-5 text-sm text-slate-300/95 leading-relaxed font-normal max-w-sm">
                Transforming imagination into cinematic AI visuals through
                storytelling, creativity, and cutting-edge technology.
              </p>
            </div>

            {/* Copyright & Legal Links */}
            <div className="mt-8 pt-6 border-t border-sky-400/15">
              <div className="text-xs font-mono-tech text-slate-300/90 tracking-wide">
                © 2025 Avenix. All Rights Reserved.
              </div>

              <div className="mt-3.5 flex flex-wrap items-center gap-y-2 text-xs font-mono-tech text-slate-300">
                {LEGAL_LINKS.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mx-2.5 text-sky-400/35 select-none"
                      >
                        |
                      </span>
                    )}
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-slate-300 hover:text-sky-300 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.85)]"
                    >
                      {item.label}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER SECTION — QUICK LINKS (3 Structured Navigation Columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:px-6 lg:border-l lg:border-r border-sky-400/15">
            {/* COLUMN 1: Services */}
            <div>
              <h3 className="text-xs font-mono-tech font-bold uppercase tracking-[0.25em] text-sky-300 mb-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]"
                />
                <span>Services</span>
              </h3>
              <ul className="space-y-2.5">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group/link inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.75)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-sky-400/0 group-hover/link:bg-sky-300 transition-all duration-300 group-hover/link:shadow-[0_0_6px_#38BDF8]" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: Portfolio */}
            <div className="sm:border-l sm:border-sky-400/10 sm:pl-5">
              <h3 className="text-xs font-mono-tech font-bold uppercase tracking-[0.25em] text-sky-300 mb-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]"
                />
                <span>Portfolio</span>
              </h3>
              <ul className="space-y-2.5">
                {PORTFOLIO_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group/link inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.75)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-sky-400/0 group-hover/link:bg-sky-300 transition-all duration-300 group-hover/link:shadow-[0_0_6px_#38BDF8]" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Company */}
            <div className="sm:border-l sm:border-sky-400/10 sm:pl-5">
              <h3 className="text-xs font-mono-tech font-bold uppercase tracking-[0.25em] text-sky-300 mb-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]"
                />
                <span>Company</span>
              </h3>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group/link inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.75)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-sky-400/0 group-hover/link:bg-sky-300 transition-all duration-300 group-hover/link:shadow-[0_0_6px_#38BDF8]" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION — CONNECT & NEWSLETTER */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-2">
            {/* Connect With Avenix Card */}
            <div>
              <h3 className="text-xs font-mono-tech font-bold uppercase tracking-[0.25em] text-sky-300 mb-3.5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]"
                />
                <span>Connect With Avenix</span>
              </h3>

              {/* Futuristic Social Links with Icons */}
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="group/social inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#07142B]/80 hover:bg-sky-500/20 border border-sky-400/30 hover:border-sky-300/80 backdrop-blur-md text-xs font-medium text-slate-200 hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(56,189,248,0.45)]"
                    >
                      <IconComponent className="w-3.5 h-3.5 text-sky-300 transition-transform duration-300 group-hover/social:scale-110 group-hover/social:text-white" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Studio Direct Email */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="font-mono-tech uppercase tracking-wider text-slate-400 text-xs">
                  Email:
                </span>
                <a
                  href="mailto:ogunleyegoodluck244@gmail.com"
                  aria-label="Send an email to ogunleyegoodluck244@gmail.com"
                  className="group/mail inline-flex items-center gap-1.5 font-mono-tech font-semibold text-sky-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0 transition-transform duration-300 group-hover/mail:scale-110" />
                  <span className="break-all sm:break-normal">
                    ogunleyegoodluck244@gmail.com
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-75 transition-transform duration-300 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Futuristic Glassmorphism Newsletter Signup Box */}
            <div className="relative rounded-2xl p-4 sm:p-5 backdrop-blur-xl bg-gradient-to-br from-[#081730]/85 via-[#051024]/90 to-[#030A18]/95 border border-sky-400/40 shadow-[0_18px_45px_rgba(0,0,0,0.75),0_0_30px_rgba(56,189,248,0.16),inset_0_1px_1px_rgba(255,255,255,0.14)] hover:border-sky-300/70 transition-all duration-500">
              {/* Subtle Neon Top Edge Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/80 to-transparent"
              />

              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-white">
                  Stay Updated
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-sky-400/15 border border-sky-300/40 text-[9px] font-mono-tech uppercase tracking-widest text-sky-300">
                  AI Drops
                </span>
              </div>

              <p className="text-xs text-slate-300/90 leading-relaxed mb-3.5">
                Get notified about new projects, creative drops, AI insights,
                and behind-the-scenes content.
              </p>

              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#030915]/90 border border-sky-400/45 focus-within:border-sky-300 focus-within:shadow-[0_0_22px_rgba(56,189,248,0.42)] transition-all duration-300">
                  <div className="pl-3 text-sky-300/80 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    className="w-full min-w-0 bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none py-1.5"
                  />
                  <button
                    type="submit"
                    className="group/btn shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-xs font-bold text-[#031126] cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background:
                        'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 55%, #BAE6FD 100%)',
                      boxShadow:
                        '0 0 20px rgba(56, 189, 248, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.85)',
                    }}
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>

                {subscribed && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-mono-tech text-sky-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Subscribed! Welcome to the Avenix inner circle.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

