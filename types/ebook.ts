export type PageLayoutType =
  | "cover"
  | "chapter-intro"
  | "content-1col"
  | "content-2cols"
  | "quote"
  | "checklist";

export type EbookPageContent = {
  layout: PageLayoutType;
  pageNumber: number;

  // Champs génériques
  title?: string;
  subtitle?: string;
  text?: string;

  // Pour listes / bullets
  bullets?: string[];

  // Pour citations
  highlight?: string;
  quoteAuthor?: string;

  // Pour badges / tags
  badge?: string;
};

export type EbookStructure = {
  title: string;
  subtitle?: string;
  themeId: string;
  pages: EbookPageContent[];
};
