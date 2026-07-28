import { motion, useReducedMotion } from 'framer-motion';
import { SKILLS } from '../content';

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { y: 40, opacity: 0 },
    whileInView: prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-8% 0px' },
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="skills"
      className="relative z-10 rounded-t-[40px] bg-white px-6 pb-40 pt-20 text-[#0C0C0C] sm:rounded-t-[60px] md:px-12 md:pt-28 lg:px-20"
    >
      <motion.h2
        className="font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
        {...reveal(0)}
      >
        Skills
      </motion.h2>

      <ul className="mt-12 md:mt-20">
        {SKILLS.map((skill, index) => (
          <motion.li
            key={skill.number}
            className="flex flex-col gap-4 border-b border-[#0C0C0C]/15 py-8 sm:flex-row sm:items-baseline sm:gap-10 md:py-12 lg:gap-20"
            {...reveal(index * 0.08)}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]/90"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              {skill.number}
            </span>
            <div className="max-w-2xl">
              <h3
                className="font-bold uppercase tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
              >
                {skill.title}
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-[#0C0C0C]/70 md:text-lg">
                {skill.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
