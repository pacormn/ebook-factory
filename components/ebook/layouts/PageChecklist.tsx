import { EbookTheme } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function PageChecklist({ page, theme }: Props) {
  return (
    <div
      className="w-full h-full px-24 py-20"
      style={{ color: theme.text, fontFamily: theme.fontBody }}
    >
      <h2
        className="text-4xl font-bold mb-10"
        style={{ fontFamily: theme.fontTitle }}
      >
        {page.title}
      </h2>

      <div className="space-y-6 text-2xl">
        {page.bullets?.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-lg font-bold text-black"
              style={{ background: theme.accent }}
            >
              ✓
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto text-xl opacity-60 pt-16">
        Page {page.pageNumber}
      </div>
    </div>
  );
}
