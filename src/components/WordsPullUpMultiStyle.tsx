import { motion, useReducedMotion } from 'framer-motion';
import type { TextSegment } from '../content';

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  /** Seconds between each word's entrance. */
  stagger?: number;
}

interface StyledWord {
  word: string;
  className: string;
}

/**
 * Splits an array of styled text segments into individually animated words
 * that pull up from y: 40 with a staggered entrance. Falls back to a simple
 * fade when the user prefers reduced motion.
 */
export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  stagger = 0.06,
}: WordsPullUpMultiStyleProps) {
  const prefersReducedMotion = useReducedMotion();

  const words: StyledWord[] = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className ?? '' })),
  );

  return (
    <h2 className={className}>
      {words.map((item, index) => (
        <motion.span
          key={`${item.word}-${index}`}
          className={`inline-block whitespace-pre ${item.className}`}
          initial={
            prefersReducedMotion ? { opacity: 0 } : { y: 40, opacity: 0 }
          }
          whileInView={
            prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }
          }
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{
            delay: prefersReducedMotion ? 0 : index * stagger,
            duration: prefersReducedMotion ? 0.4 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {item.word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </h2>
  );
}
