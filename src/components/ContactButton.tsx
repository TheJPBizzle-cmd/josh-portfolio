import { ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  /** Defaults to scrolling to the contact section. */
  href?: string;
  label?: string;
  className?: string;
}

export default function ContactButton({
  href = '#contact',
  label = "Let's Talk",
  className = '',
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] md:px-8 md:py-4 md:text-sm ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          'inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -3px 8px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(182, 0, 168, 0.25)',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
    </a>
  );
}
