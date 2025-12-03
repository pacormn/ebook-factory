import { EbookPageContent } from "@/types/ebook";
import { EbookTheme } from "@/config/themes";

import { PageCover } from "./layouts/PageCover";
import { PageChapterIntro } from "./layouts/PageChapterIntro";
import { PageContent1Col } from "./layouts/PageContent1Col";
import { PageQuote } from "./layouts/PageQuote";
import { PageChecklist } from "./layouts/PageChecklist";

type Props = {
  page: EbookPageContent;
  theme: EbookTheme;
};

export function EbookPage({ page, theme }: Props) {
  switch (page.layout) {
    case "cover":
      return <PageCover page={page} theme={theme} />;

    case "chapter-intro":
      return <PageChapterIntro page={page} theme={theme} />;

    case "content-1col":
      return <PageContent1Col page={page} theme={theme} />;

    case "quote":
      return <PageQuote page={page} theme={theme} />;

    case "checklist":
      return <PageChecklist page={page} theme={theme} />;

    default:
      return <PageContent1Col page={page} theme={theme} />;
  }
}
