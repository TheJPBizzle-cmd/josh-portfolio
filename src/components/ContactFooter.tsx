import { motion, useReducedMotion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import ContactButton from './ContactButton';
import { CONTACT } from '../content';

export default function ContactFooter() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { y: 40, opacity: 0 },
    whileInView: prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <footer
      id="contact"
      className="bg-noise relative flex flex-col items-center gap-10 overflow-hidden bg-[#0C0C0C] px-6 py-28 text-center md:py-40"
    >
      <motion.h2
        className="hero-heading max-w-4xl font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.25rem, 8vw, 7rem)' }}
        {...reveal(0)}
      >
        {CONTACT.heading}
      </motion.h2>

      <motion.div
        className="flex flex-col items-center gap-6 sm:flex-row"
        {...reveal(0.2)}
      >
        <ContactButton href={`mailto:${CONTACT.email}`} label="Let's Talk" />
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-widest text-[#D7E2EA] transition-colors duration-300 hover:border-white/50 hover:bg-white/10 md:text-sm"
        >
          <Linkedin className="h-4 w-4" strokeWidth={1.75} />
          LinkedIn
        </a>
      </motion.div>

      <motion.a
        href={`mailto:${CONTACT.email}`}
        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-light tracking-wide text-[#D7E2EA]/70 transition-colors hover:text-primary"
        {...reveal(0.3)}
      >
        <Mail className="h-4 w-4" strokeWidth={1.75} />
        {CONTACT.email}
      </motion.a>

      <p className="text-xs font-light uppercase tracking-[0.25em] text-[#D7E2EA]/40">
        {CONTACT.footerNote}
      </p>
    </footer>
  );
}
