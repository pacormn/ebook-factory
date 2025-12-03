import { EbookTheme } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function PageContent1Col({ page, theme }: Props) {
  return (
    <div
      className="w-full h-full px-24 py-28 flex flex-col gap-12"
      style={{ color: theme.text, fontFamily: theme.fontBody }}
    >
      {page.title && (
        <h2
          className="text-4xl font-bold"
          style={{ fontFamily: theme.fontTitle }}
        >
          {page.title}
        </h2>
      )}

      {page.text && (
        <p className="text-2xl opacity-90 leading-relaxed whitespace-pre-line">
          {page.text}
        </p>
      )}

      {page.bullets && (
        <ul className="space-y-4 text-2xl">
          {page.bullets.map((b, i) => (
            <li key={i} className="flex gap-4">
              <div
                className="w-4 h-4 rounded-full mt-2"
                style={{ background: theme.accent }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto text-xl opacity-60">
        Page {page.pageNumber}
      </div>
    </div>
  );
}
