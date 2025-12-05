import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import type { EbookStructure } from "@/types/ebook";

// ⚠️ Assure-toi que ce fichier existe bien : /demo/ebook.json
import rawDemo from "@/demo/ebook.json";

const demoEbook = rawDemo as unknown as EbookStructure;

type PageProps = {
  params: {
    id: string;
  };
};

export default function EbookPrintPage({ params }: PageProps) {
  // Plus tard : tu iras chercher l'ebook réel par ID (DB, etc.)
  const ebook = demoEbook;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <EbookRenderer themeId={ebook.themeId} pages={ebook.pages} scale={1} />
    </div>
  );
}
