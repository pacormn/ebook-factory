"use client";

import { EbookRenderer } from "@/components/ebook/EbookRenderer";
import type { EbookStructure } from "@/types/ebook";

type PrintClientProps = {
  ebook: EbookStructure;
};

export default function PrintClient({ ebook }: PrintClientProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <EbookRenderer
        themeId={ebook.themeId}
        pages={ebook.pages}
        scale={1}
      />
    </div>
  );
}
