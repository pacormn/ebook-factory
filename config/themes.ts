export type EbookThemeId = "digital-business" | "lux-purple" | "fitness-green";

export type EbookTheme = {
  id: EbookThemeId;
  name: string;
  description: string;
  backgroundGradient: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  fontTitle: string;
  fontBody: string;
};

export const EBOOK_THEMES: Record<EbookThemeId, EbookTheme> = {
  "digital-business": {
    id: "digital-business",
    name: "Business Digital",
    description: "Style moderne violet/bleu pour business en ligne",
    backgroundGradient: "bg-gradient-to-b from-[#140B33] to-[#2C125C]",
    primary: "#A855F7",
    secondary: "#4F46E5",
    accent: "#FACC15",
    text: "#F9FAFB",
    fontTitle: "var(--font-geist-sans)",
    fontBody: "var(--font-geist-sans)",
  },
  "lux-purple": {
    id: "lux-purple",
    name: "Luxe Violet",
    description: "Style premium et élégant",
    backgroundGradient: "bg-gradient-to-b from-[#10041F] to-[#2A0E4F]",
    primary: "#C4A468",
    secondary: "#9F7AEA",
    accent: "#F97316",
    text: "#F9FAFB",
    fontTitle: "var(--font-geist-sans)",
    fontBody: "var(--font-geist-sans)",
  },
  "fitness-green": {
    id: "fitness-green",
    name: "Fitness & Santé",
    description: "Vert énergique pour programmes sportifs",
    backgroundGradient: "bg-gradient-to-b from-[#02140C] to-[#064E3B]",
    primary: "#22C55E",
    secondary: "#16A34A",
    accent: "#FACC15",
    text: "#ECFDF5",
    fontTitle: "var(--font-geist-sans)",
    fontBody: "var(--font-geist-sans)",
  },
};
