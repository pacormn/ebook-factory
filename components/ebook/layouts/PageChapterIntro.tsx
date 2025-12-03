import { EbookTheme } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function PageChapterIntro({ page, theme }: Props) {
  return (
    <div
      className="w-full h-full flex flex-col justify-center px-24"
      style={{ color: theme.text, fontFamily: theme.fontBody }}
    >
      <div className="opacity-70 text-lg mb-6">Chapitre {page.pageNumber - 1}</div>

      <h2
        className="text-5xl font-bold leading-tight mb-8"
        style={{ fontFamily: theme.fontTitle }}
      >
        {page.title}
      </h2>

      {page.subtitle && (
        <p className="text-2xl opacity-80 max-w-[80%]">{page.subtitle}</p>
      )}
    </div>
  );
}
