"use client";

import { EbookThemeId, EBOOK_THEMES } from "@/config/themes";
import { EbookPageContent } from "@/types/ebook";
import { EbookPage } from "./EbookPage";

type Props = {
  themeId: EbookThemeId;
  pages: EbookPageContent[];
  scale?: number; // pour réduire la preview
};

export function EbookRenderer({ themeId, pages, scale = 0.45 }: Props) {
  const theme = EBOOK_THEMES[themeId];

  return (
    <div className="flex flex-col items-center gap-10">
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          className="relative rounded-3xl shadow-xl overflow-hidden"
          style={{
            width: 1080 * scale,
            height: 1920 * scale,
          }}
        >
          <div
            className={`${theme.backgroundGradient} w-full h-full`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: 1080,
              height: 1920,
            }}
          >
            <EbookPage page={page} theme={theme} />
          </div>
        </div>
      ))}
    </div>
  );
}
