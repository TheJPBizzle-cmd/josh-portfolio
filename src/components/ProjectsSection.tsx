import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, type Project } from '../content';

// Preview-only fallback while public/media/projects/ is empty — delete
// once real campaign stills are in place (see content.ts).
const fallbackUrl = (src: string, tall: boolean): string => {
  const seed = src.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `https://picsum.photos/seed/${seed}/${tall ? '1100/1400' : '900/700'}`;
};

function ProjectImage({
  src,
  alt,
  tall = false,
  className = '',
}: {
  src: string;
  alt: string;
  tall?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        const img = event.currentTarget;
        if (!img.src.includes('picsum.photos')) img.src = fallbackUrl(src, tall);
      }}
      className={`min-h-0 w-full rounded-2xl object-cover md:rounded-3xl ${className}`}
    />
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const rawScale = useTransform(progress, [index / total, 1], [1, targetScale]);
  // Reduced motion: cards still stack via position: sticky, but skip the
  // scale choreography entirely.
  const scale = prefersReducedMotion ? 1 : rawScale;

  return (
    <div
      className="sticky flex h-screen items-start justify-center px-3 md:px-8"
      style={{ top: 0 }}
    >
      <motion.article
        style={{ scale, marginTop: `calc(7.5vh + ${index * 22}px)` }}
        className="relative flex h-[85vh] w-full max-w-7xl origin-top flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[#101010] p-6 shadow-2xl md:rounded-[60px] md:p-12"
      >
        {/* Decorative blur orb */}
        <div className="pointer-events-none absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#D7E2EA]/5 blur-3xl" />

        {/* Top row: number, category, name, CTA */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 md:gap-6">
          <div className="flex items-start gap-4 md:gap-8">
            <span
              className="font-black leading-none text-transparent"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                WebkitTextStroke: '1.5px rgba(215, 226, 234, 0.35)',
              }}
            >
              {project.number}
            </span>
            <div className="pt-1 md:pt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/50 md:text-xs">
                {project.category}
              </p>
              <h3
                className="mt-1 font-bold uppercase tracking-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.35rem, 4vw, 3.25rem)' }}
              >
                {project.name}
              </h3>
              <p className="mt-2 hidden max-w-xl text-sm font-light leading-relaxed text-[#D7E2EA]/60 sm:block md:text-base">
                {project.description}
              </p>
            </div>
          </div>

          <a
            href={project.reelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[10px] uppercase tracking-widest text-[#D7E2EA] transition-colors duration-300 hover:border-white/50 hover:bg-white/10 md:px-6 md:py-3 md:text-xs"
          >
            Watch Reel
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>

        {/* Bottom grid: 2 stacked images left (40%), 1 tall image right (60%) */}
        <div className="relative z-10 mt-6 grid min-h-0 flex-1 grid-cols-1 gap-3 md:mt-10 md:grid-cols-[40%_1fr]">
          <div className="hidden min-h-0 flex-col gap-3 md:flex">
            <ProjectImage
              src={project.images[0]}
              alt={`${project.name} — still 1`}
              className="flex-1"
            />
            <ProjectImage
              src={project.images[1]}
              alt={`${project.name} — still 2`}
              className="flex-1"
            />
          </div>
          <ProjectImage
            src={project.images[2]}
            alt={`${project.name} — hero still`}
            tall
            className="h-full"
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="work" className="relative -mt-14 bg-[#0C0C0C] pb-24">
      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
