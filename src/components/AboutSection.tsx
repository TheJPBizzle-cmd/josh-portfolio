import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  Camera,
  Film,
  Clapperboard,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import { ABOUT } from '../content';

interface FloatingIconConfig {
  icon: LucideIcon;
  position: string;
  delay: number;
  x: number;
  y: number;
  rotate: number;
}

const FLOATING_ICONS: FloatingIconConfig[] = [
  { icon: Camera, position: 'left-[6%] top-[12%]', delay: 0.1, x: -40, y: -30, rotate: -12 },
  { icon: Film, position: 'right-[8%] top-[16%]', delay: 0.3, x: 40, y: -24, rotate: 10 },
  { icon: Clapperboard, position: 'left-[10%] bottom-[14%]', delay: 0.5, x: -32, y: 36, rotate: 8 },
  { icon: TrendingUp, position: 'right-[6%] bottom-[10%]', delay: 0.7, x: 36, y: 40, rotate: -8 },
];

function FloatingIcon({ config }: { config: FloatingIconConfig }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = config.icon;
  return (
    <motion.div
      className={`pointer-events-none absolute hidden md:block ${config.position}`}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: config.x, y: config.y, rotate: config.rotate }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0, rotate: config.rotate / 2 }
      }
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: config.delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-2xl backdrop-blur-sm lg:h-24 lg:w-24"
        style={{ transform: `rotate(${config.rotate}deg)` }}
      >
        <Icon className="h-9 w-9 text-primary lg:h-11 lg:w-11" strokeWidth={1.25} />
      </div>
    </motion.div>
  );
}

function RevealUnit({
  unit,
  progress,
  range,
}: {
  unit: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="whitespace-pre-wrap">
      {unit}
    </motion.span>
  );
}

/** True below the md breakpoint; drives the lighter mobile animation. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

function ScrollRevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  });

  const paragraphClass =
    'mx-auto mt-14 max-w-3xl text-center text-lg font-light leading-relaxed text-[#D7E2EA] sm:text-xl md:mt-20 md:text-2xl';

  // Reduced motion: no scroll choreography at all.
  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={paragraphClass}>
        {text}
      </p>
    );
  }

  // Per-character on desktop; per-word on mobile so low-powered devices
  // animate ~40 spans instead of ~400.
  const units = isMobile
    ? text.split(/(?<=\s)/)
    : text.split('');

  return (
    <p ref={ref} className={paragraphClass}>
      {units.map((unit, index) => (
        <RevealUnit
          key={index}
          unit={unit}
          progress={scrollYProgress}
          range={[index / units.length, (index + 1) / units.length]}
        />
      ))}
    </p>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-noise relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-6 py-28 md:py-40"
    >
      {FLOATING_ICONS.map((config, index) => (
        <FloatingIcon key={index} config={config} />
      ))}

      <WordsPullUpMultiStyle
        segments={ABOUT.headingSegments}
        className="max-w-6xl text-center text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.05] tracking-tight"
        stagger={0.07}
      />

      <ScrollRevealParagraph text={ABOUT.paragraph} />
    </section>
  );
}
