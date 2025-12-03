import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import { EBOOK_THEMES } from "@/config/themes";

// ⚠️ Tu remplaceras ça par un fetch à ta DB plus tard
import rawData from "@/demo/ebook.json";
import { EbookStructure } from "@/types/ebook";

const demoData = rawData as unknown as EbookStructure;


export default function PrintPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
<EbookRenderer
  themeId={demoData.themeId as any}
  pages={demoData.pages as any}
/>

    </div>
  );
}
