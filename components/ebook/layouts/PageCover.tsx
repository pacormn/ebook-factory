import { EbookTheme } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function PageCover({ page, theme }: Props) {
  return (
    <div
      className="w-full h-full flex flex-col justify-between p-24"
      style={{ color: theme.text, fontFamily: theme.fontBody }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm uppercase tracking-widest opacity-60">
          ebook-factory.fr
        </div>
        <div
          className="px-4 py-1 rounded-full text-xs font-semibold"
          style={{ background: theme.accent, color: "#000" }}
        >
          Edition 2025
        </div>
      </div>

      {/* Title */}
      <div className="space-y-8">
        <h1
          className="text-6xl font-bold leading-tight"
          style={{ fontFamily: theme.fontTitle }}
        >
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-2xl opacity-80 max-w-[70%]">{page.subtitle}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="opacity-80 space-y-1 text-lg">
          <div>{page.highlight || "Créé avec IA"}</div>
        </div>
        <div className="text-xl opacity-60">Page {page.pageNumber}</div>
      </div>
    </div>
  );
}
