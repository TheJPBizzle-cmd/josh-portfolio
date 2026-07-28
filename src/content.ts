/**
 * ============================================================
 * SITE CONTENT — edit everything here, no layout code involved.
 * All media paths point at /public/media — drop your real
 * assets in there using the same filenames (or update paths).
 * ============================================================
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface TextSegment {
  text: string;
  className?: string;
}

export interface Skill {
  number: string;
  title: string;
  description: string;
}

export interface Project {
  number: string;
  category: string;
  name: string;
  description: string;
  /** TODO(Josh): swap for the real reel link (YouTube/Vimeo/Drive). */
  reelUrl: string;
  /** [stacked-top, stacked-bottom, tall-right] */
  images: [string, string, string];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const HERO = {
  // TODO(Josh): drop your showreel loop at public/media/hero-reel.mp4 —
  // a silent 10–20s loop cut from WWE2K, Baller League, or Six Nations
  // coverage works best. Keep it under ~8MB for fast load.
  videoSrc: '/media/hero-reel.mp4',
  // Fallback plays only if hero-reel.mp4 is missing, so the preview
  // still looks cinematic. Delete once your real clip is in place.
  videoFallbackSrc:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4',
  heading: "Hi, I'm Josh",
  tagline:
    'a creative producer turned brand storyteller, directing unforgettable social-first content for global brands',
} as const;

// TODO(Josh): drop 14 stills/GIFs from real campaigns (WWE2K activation,
// Baller League UK, Six Nations, Goldsmiths/Brighton work) into
// public/media/marquee/ named 01.jpg … 14.jpg (420×270 or larger, 16:10-ish).
export const MARQUEE_IMAGES: string[] = Array.from(
  { length: 14 },
  (_, i) => `/media/marquee/${String(i + 1).padStart(2, '0')}.jpg`,
);

export const ABOUT = {
  headingSegments: [
    { text: 'I am Josh,', className: 'font-sans font-medium text-[#D7E2EA]' },
    {
      text: ' a storyteller for brands.',
      className: 'font-serif italic text-primary',
    },
    {
      text: ' I turn briefs into culture.',
      className: 'font-sans font-medium text-[#D7E2EA]',
    },
  ] as TextSegment[],
  paragraph:
    "With over six years directing end-to-end video and multimedia production, I've built disruptive, platform-native content for major global brands — owning everything from live-event capture to advanced post-production, motion graphics, and final delivery. I partner with agencies, social teams, and stakeholders to turn complex briefs into award-nominated campaigns that actually move the needle.",
} as const;

export const SKILLS: Skill[] = [
  {
    number: '01',
    title: 'Production & Direction',
    description:
      'DSLR & native capture, lighting, audio, and fast-paced real-time live-event coverage — owning the shoot from call sheet to wrap.',
  },
  {
    number: '02',
    title: 'Editing & Motion Design',
    description:
      'Adobe Premiere Pro, After Effects, Photoshop, DaVinci Resolve, CapCut, and AI-enhanced workflows that keep craft high and turnaround fast.',
  },
  {
    number: '03',
    title: 'Social & Platform Strategy',
    description:
      'Platform-native formatting, trend forecasting, algorithm optimization — translating analytics into content that actually performs.',
  },
  {
    number: '04',
    title: 'Creative Leadership',
    description:
      'Concept ideation, copywriting, mentoring junior creators, and stakeholder management across matrix organizations.',
  },
  {
    number: '05',
    title: 'Brand Governance',
    description:
      'Maintaining visual identity and tone consistency across disruptive, social-first formats — without losing brand safety.',
  },
];

// TODO(Josh): replace every image below with real campaign stills —
// drop them in public/media/projects/ and update the paths. Each card
// needs two landscape stills and one tall portrait/vertical still.
export const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Live Event / Gaming Campaign',
    name: 'WWE2K Activation',
    description:
      'ESA Award-nominated real-time capture and edit for a major gaming activation.',
    reelUrl: 'https://example.com/wwe2k-reel', // TODO(Josh): real WWE2K reel link
    images: [
      '/media/projects/wwe2k-1.jpg', // TODO(Josh): replace with real WWE2K activation still
      '/media/projects/wwe2k-2.jpg',
      '/media/projects/wwe2k-tall.jpg',
    ],
  },
  {
    number: '02',
    category: 'Social-First Brand Coverage',
    name: 'Baller League UK',
    description:
      "Disruptive social-first coverage integrating VMO2's visual identity into culturally relevant football content.",
    reelUrl: 'https://example.com/baller-league-reel', // TODO(Josh): real Baller League reel link
    images: [
      '/media/projects/baller-1.jpg', // TODO(Josh): replace with real Baller League still
      '/media/projects/baller-2.jpg',
      '/media/projects/baller-tall.jpg',
    ],
  },
  {
    number: '03',
    category: 'Live Sport Coverage',
    name: 'England Rugby Six Nations',
    description:
      'End-to-end production for high-profile live sport content across social platforms.',
    reelUrl: 'https://example.com/six-nations-reel', // TODO(Josh): real Six Nations reel link
    images: [
      '/media/projects/rugby-1.jpg', // TODO(Josh): replace with real Six Nations still
      '/media/projects/rugby-2.jpg',
      '/media/projects/rugby-tall.jpg',
    ],
  },
];

export const CONTACT = {
  heading: "Let's make something people actually watch",
  email: 'hello@joshbennett.example', // TODO(Josh): your real email
  linkedin: 'https://www.linkedin.com/in/your-handle', // TODO(Josh): your real LinkedIn URL
  footerNote: '© 2026 Josh Bennett — Creative Content Producer',
} as const;
