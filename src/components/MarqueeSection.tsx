import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { MARQUEE_IMAGES } from '../content';

const TILE_WIDTH = 420;
const TILE_GAP = 12; // gap-3
const ROW_WIDTH = MARQUEE_IMAGES.length * (TILE_WIDTH + TILE_GAP);

// Preview-only fallback while public/media/marquee/ is empty — delete
// once real campaign stills are in place (see content.ts).
const fallbackUrl = (src: string): string => {
  const seed = src.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `https://picsum.photos/seed/${seed}/840/540`;
};

function MarqueeRow({ x }: { x: MotionValue<number> }) {
  // Tripled so the row never runs out of tiles while wrapping.
  const tiles = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <motion.div style={{ x }} className="flex w-max gap-3 will-change-transform">
      {tiles.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          onError={(event) => {
            const img = event.currentTarget;
            if (!img.src.includes('picsum.photos')) img.src = fallbackUrl(src);
          }}
          alt=""
          loading="lazy"
          draggable={false}
          className="h-[180px] w-[280px] shrink-0 select-none rounded-2xl object-cover sm:h-[270px] sm:w-[420px]"
        />
      ))}
    </motion.div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const xRight = useMotionValue(-ROW_WIDTH);
  const xLeft = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Static offset so both rows still show a full spread of tiles.
      xRight.set(-ROW_WIDTH / 2);
      xLeft.set(-ROW_WIDTH / 2);
      return;
    }

    const update = (): void => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const wrapped = ((offset % ROW_WIDTH) + ROW_WIDTH) % ROW_WIDTH;

      xRight.set(wrapped - ROW_WIDTH); // row 1 drifts right
      xLeft.set(-wrapped); // row 2 drifts left
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [prefersReducedMotion, xRight, xLeft]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0C0C0C] py-16 md:py-24"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow x={xRight} />
        <MarqueeRow x={xLeft} />
      </div>
    </section>
  );
}
