import { EbookTheme } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function PageQuote({ page, theme }: Props) {
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center px-20 text-center"
      style={{ color: theme.text, fontFamily: theme.fontBody }}
    >
      <div className="text-[180px] leading-none opacity-30 mb-10">“</div>

      <p className="text-4xl font-semibold leading-snug max-w-[75%]">
        {page.highlight}
      </p>

      {page.quoteAuthor && (
        <p className="text-2xl mt-8 opacity-70">— {page.quoteAuthor}</p>
      )}

      <div className="absolute bottom-12 right-12 text-xl opacity-60">
        Page {page.pageNumber}
      </div>
    </div>
  );
}
