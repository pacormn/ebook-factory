import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import type { EbookStructure } from "@/types/ebook";
import fs from "fs";
import path from "path";

export default function PrintPage({ params }: { params: { id: string } }) {
  const filePath = path.join("/tmp", `${params.id}.json`);

  if (!fs.existsSync(filePath)) {
    return <div className="text-white p-10">Ebook introuvable.</div>;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const ebook: EbookStructure = JSON.parse(raw);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <EbookRenderer themeId={ebook.themeId} pages={ebook.pages} scale={1} />
    </div>
  );
}
