import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ContactButton from './ContactButton';
import { HERO, NAV_LINKS } from '../content';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  // Falls back to a hosted placeholder clip until Josh drops his real
  // showreel loop at public/media/hero-reel.mp4 (see content.ts).
  const [videoSrc, setVideoSrc] = useState<string>(HERO.videoSrc);

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration: 0.5 },
        }
      : {
          initial: { y: 40, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <header className="relative flex h-screen flex-col overflow-hidden p-4 md:p-6">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Cinematic background video */}
        <video
          key={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => {
            if (videoSrc !== HERO.videoFallbackSrc) {
              setVideoSrc(HERO.videoFallbackSrc);
            }
          }}
        />

        {/* Noise + gradient overlays */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/40 via-transparent to-[#0C0C0C]/90" />

        {/* Pill navbar hanging from the top edge. The outer div owns the
            centering so Framer's transform animation can't override it. */}
        <div className="absolute inset-x-0 top-0 z-20 flex justify-center">
          <motion.nav
            className="rounded-b-2xl bg-[#0C0C0C]/80 px-4 py-2 backdrop-blur-md"
            initial={prefersReducedMotion ? { opacity: 0 } : { y: -60 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex items-center gap-3 sm:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block min-h-[44px] px-1 py-2.5 text-xs uppercase tracking-wider text-[#D7E2EA] transition-colors duration-300 hover:text-primary sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* Massive gradient headline pinned center-bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[16%] z-10 flex justify-center overflow-hidden sm:bottom-[12%] md:bottom-[10%]">
          <motion.h1
            className="hero-heading whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
            {...rise(0.2)}
          >
            {HERO.heading}
          </motion.h1>
        </div>

        {/* Bottom bar: tagline + contact CTA */}
        <motion.div
          className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-end justify-between gap-4 md:bottom-10 md:left-10 md:right-10"
          {...rise(0.45)}
        >
          <p className="max-w-[260px] text-[11px] font-light uppercase leading-relaxed tracking-wide text-[#D7E2EA] sm:text-sm">
            {HERO.tagline}
          </p>
          <ContactButton />
        </motion.div>
      </div>
    </header>
  );
}
