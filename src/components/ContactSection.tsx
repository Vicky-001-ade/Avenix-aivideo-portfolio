import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Instagram, Linkedin, Send, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const { theme } = useTheme();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: initialService || 'AI Commercial / Film',
    budget: '$5,000 - $10,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const projectTypes = [
    'AI Commercial / Film',
    'AI Product Visuals',
    'AI Video Production',
    'AI UGC & Social Ads',
    'AI Image Generation',
    'Creative Direction',
    'Other / Custom Pipeline',
  ];

  const budgetTiers = [
    'Under $3,000',
    '$3,000 - $7,000',
    '$7,000 - $15,000',
    '$15,000+',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('olafimihangoodluck@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct contact info & context */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-[#2A8CFF]'
                }`}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-semibold font-mono-tech"
                style={{ color: theme === 'dark' ? '#4DA3FF' : '#1D74DF' }}
              >
                Inquiries & Bookings
              </span>
            </div>

            <h2
              className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-6"
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
            >
              Let's Create Something.
            </h2>

            <p
              className="text-base sm:text-lg font-normal leading-relaxed mb-8"
              style={{ color: theme === 'dark' ? '#A7ADB8' : '#334155' }}
            >
              Whether you need a flagship brand commercial, synthetic product visuals, or complete AI creative direction, let's explore what's possible.
            </p>

            {/* Email Contact Box */}
            <div
              className="p-6 rounded-2xl border mb-8 flex flex-col gap-3"
              style={{
                backgroundColor: theme === 'dark' ? '#0B1019' : '#FCFDFE',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#DCE5F0',
              }}
            >
              <div
                className={`text-xs uppercase font-mono-tech tracking-wider font-semibold ${
                  theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
                }`}
              >
                Direct Correspondence
              </div>
              <div className="flex items-center justify-between gap-4">
                <a
                  href="mailto:olafimihangoodluck@gmail.com"
                  className={`font-mono-tech text-sm sm:text-base font-semibold break-all transition-colors ${
                    theme === 'dark'
                      ? 'text-blue-500 hover:text-blue-400'
                      : 'text-[#1D74DF] hover:text-[#2A8CFF]'
                  }`}
                >
                  olafimihangoodluck@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  className={`p-2 rounded-lg border transition-colors shrink-0 ${
                    copiedEmail
                      ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                      : theme === 'dark'
                      ? 'border-white/10 hover:border-white/30 text-white'
                      : 'border-[#CBD8E8] bg-white hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827]'
                  }`}
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div>
              <div
                className={`text-xs uppercase font-mono-tech tracking-wider font-semibold mb-4 ${
                  theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
                }`}
              >
                Creative Channels & Portals
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-semibold border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5 hover:border-blue-500/50 text-white'
                      : 'border-[#CBD8E8] bg-[#FCFDFE] hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827]'
                  }`}
                >
                  <Instagram
                    className={`w-3.5 h-3.5 ${
                      theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                    }`}
                  />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-semibold border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5 hover:border-blue-500/50 text-white'
                      : 'border-[#CBD8E8] bg-[#FCFDFE] hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827]'
                  }`}
                >
                  <Linkedin
                    className={`w-3.5 h-3.5 ${
                      theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                    }`}
                  />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-semibold border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5 hover:border-blue-500/50 text-white'
                      : 'border-[#CBD8E8] bg-[#FCFDFE] hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827]'
                  }`}
                >
                  <span
                    className={`font-bold font-serif ${
                      theme === 'dark' ? 'text-blue-500' : 'text-[#2A8CFF]'
                    }`}
                  >
                    Bē
                  </span>
                  <span>Behance</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 sm:p-10 rounded-3xl border shadow-xl relative"
              style={{
                backgroundColor: theme === 'dark' ? '#0B1019' : '#FCFDFE',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.10)' : '#DCE5F0',
                boxShadow:
                  theme === 'dark'
                    ? undefined
                    : '0 22px 48px -16px rgba(42, 140, 255, 0.10), 0 4px 16px -4px rgba(17, 24, 39, 0.04)',
              }}
            >
              {submitted ? (
                <div className="py-12 text-center">
                  <div
                    className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-6 ${
                      theme === 'dark'
                        ? 'bg-blue-500/15 border-blue-500/30 text-blue-500'
                        : 'bg-[#2A8CFF]/12 border-[#2A8CFF]/35 text-[#2A8CFF]'
                    }`}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className="font-display text-2xl sm:text-3xl font-bold mb-3"
                    style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                  >
                    Project Inquiry Received
                  </h3>
                  <p
                    className="text-sm font-normal max-w-md mx-auto mb-8"
                    style={{ color: theme === 'dark' ? '#A7ADB8' : '#334155' }}
                  >
                    Thank you for reaching out. Goodluck will review your project brief and reply within 24 hours with an initial creative treatment or schedule a preliminary discovery call.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        projectType: 'AI Commercial / Film',
                        budget: '$5,000 - $10,000',
                        message: '',
                      });
                    }}
                    className={`px-6 py-2.5 rounded-xl text-xs font-mono-tech uppercase font-semibold border transition-colors ${
                      theme === 'dark'
                        ? ''
                        : 'text-[#111827] bg-white hover:bg-[#F2F7FD] hover:border-[#2A8CFF]/60'
                    }`}
                    style={{
                      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CBD8E8',
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-xs uppercase font-mono-tech tracking-wider mb-2 font-semibold ${
                          theme === 'dark' ? 'text-slate-500' : 'text-[#1E293B]'
                        }`}
                        htmlFor="form-name"
                      >
                        Your Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        placeholder="e.g. Jordan Hayes"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                          theme === 'dark'
                            ? 'bg-black/30 border-white/10 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            : 'bg-[#F8FBFE] border-[#CBD8E8] text-[#111827] placeholder-[#64748B] focus:bg-white focus:border-[#2A8CFF] focus:ring-3 focus:ring-[#2A8CFF]/18'
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-xs uppercase font-mono-tech tracking-wider mb-2 font-semibold ${
                          theme === 'dark' ? 'text-slate-500' : 'text-[#1E293B]'
                        }`}
                        htmlFor="form-email"
                      >
                        Email Address *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="jordan@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                          theme === 'dark'
                            ? 'bg-black/30 border-white/10 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                            : 'bg-[#F8FBFE] border-[#CBD8E8] text-[#111827] placeholder-[#64748B] focus:bg-white focus:border-[#2A8CFF] focus:ring-3 focus:ring-[#2A8CFF]/18'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Project Type selection */}
                  <div>
                    <label
                      className={`block text-xs uppercase font-mono-tech tracking-wider mb-2 font-semibold ${
                        theme === 'dark' ? 'text-slate-500' : 'text-[#1E293B]'
                      }`}
                      htmlFor="form-type"
                    >
                      Project Focus
                    </label>
                    <select
                      id="form-type"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-[#0B1019] border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          : 'bg-[#F8FBFE] border-[#CBD8E8] text-[#111827] focus:bg-white focus:border-[#2A8CFF] focus:ring-3 focus:ring-[#2A8CFF]/18'
                      }`}
                    >
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label
                      className={`block text-xs uppercase font-mono-tech tracking-wider mb-2 font-semibold ${
                        theme === 'dark' ? 'text-slate-500' : 'text-[#1E293B]'
                      }`}
                    >
                      Estimated Production Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormState({ ...formState, budget: tier })}
                          className={`py-2 px-3 text-xs font-mono-tech rounded-lg border text-center transition-all ${
                            formState.budget === tier
                              ? theme === 'dark'
                                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                                : 'bg-[#2A8CFF] text-white border-[#2A8CFF] shadow-sm shadow-[#2A8CFF]/25 font-semibold'
                              : theme === 'dark'
                              ? 'border-white/10 hover:border-white/20 text-slate-400'
                              : 'bg-[#F8FBFE] border-[#CBD8E8] hover:border-[#2A8CFF]/50 hover:bg-[#EDF4FC] text-[#334155]'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className={`block text-xs uppercase font-mono-tech tracking-wider mb-2 font-semibold ${
                        theme === 'dark' ? 'text-slate-500' : 'text-[#1E293B]'
                      }`}
                      htmlFor="form-message"
                    >
                      Project Narrative & Objectives *
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      placeholder="Briefly describe the campaign vision, target launch date, deliverables, or visual references..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none resize-none ${
                        theme === 'dark'
                          ? 'bg-black/30 border-white/10 text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          : 'bg-[#F8FBFE] border-[#CBD8E8] text-[#111827] placeholder-[#64748B] focus:bg-white focus:border-[#2A8CFF] focus:ring-3 focus:ring-[#2A8CFF]/18'
                      }`}
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-mono-tech text-xs uppercase tracking-wider font-semibold text-white transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_25px_rgba(22,119,255,0.4)] hover:shadow-[0_0_35px_rgba(22,119,255,0.6)]'
                        : 'bg-[#2A8CFF] hover:bg-[#3B97FF] shadow-[0_10px_26px_rgba(42,140,255,0.32)] hover:shadow-[0_14px_34px_rgba(42,140,255,0.45)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Synthesizing Dispatch...</span>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
