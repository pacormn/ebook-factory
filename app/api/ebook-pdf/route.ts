import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req: Request) {
  const {
    title,
    cover,
    introduction,
    chapters,
    style,
    audience,
  } = await req.json();

  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Utility: wrap long text into lines
    function wrapText(text: string, maxLen: number) {
      const words = text.split(" ");
      const lines: string[] = [];
      let line = "";

      for (const word of words) {
        if ((line + word).length > maxLen) {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line += word + " ";
        }
      }
      if (line.trim().length > 0) lines.push(line.trim());
      return lines;
    }

    const addPage = (text: string, pageTitle?: string) => {
      const page = pdfDoc.addPage([595, 842]); // A4
      const { width, height } = page.getSize();
      const fontSize = 14;

      // title
      if (pageTitle) {
        page.drawText(pageTitle, {
          x: 40,
          y: height - 60,
          size: 22,
          font,
          color: rgb(0.15, 0.2, 0.7),
        });
      }

      const lines = wrapText(text || "", 90);
      let y = pageTitle ? height - 100 : height - 60;

      for (const line of lines) {
        if (y < 60) break;
        page.drawText(line, {
          x: 40,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= 20;
      }
    };

    // 📘 PAGE 1 : COVER
    {
      const page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();

      // bande colorée
      page.drawRectangle({
        x: 0,
        y: height - 160,
        width: 595,
        height: 160,
        color: rgb(0.11, 0.29, 0.77),
      });

      page.drawText(title || "Titre de l’ebook", {
        x: 40,
        y: height - 110,
        size: 30,
        font,
        color: rgb(1, 1, 1),
      });

      page.drawText(cover || "", {
        x: 40,
        y: height - 190,
        size: 14,
        font,
        color: rgb(0.25, 0.25, 0.25),
      });

      page.drawText(`Audience : ${audience || "Non précisée"}`, {
        x: 40,
        y: height - 230,
        size: 12,
        font,
        color: rgb(0.35, 0.35, 0.35),
      });

      page.drawText(`Style : ${style || "Standard"}`, {
        x: 40,
        y: height - 250,
        size: 12,
        font,
        color: rgb(0.35, 0.35, 0.35),
      });
    }

    // ✨ PAGE 2 : INTRODUCTION
    if (introduction) {
      addPage(introduction, "Introduction");
    }

    // 📖 PAGES SUIVANTES : premiers chapitres (max 3)
    if (Array.isArray(chapters)) {
      for (const chap of chapters.slice(0, 3)) {
        addPage(chap.content || "", chap.title || "Chapitre");
      }
    }

    // 🔒 PAGE LOCK
    addPage(
      "Les chapitres suivants sont verrouillés.\n\n" +
        "Débloque l’ebook complet pour obtenir :\n" +
        "- Toutes les stratégies avancées\n" +
        "- Le plan d’action complet\n" +
        "- Tous les chapitres et bonus\n" +
        "- Les droits de revente de l’ebook",
      "Chapitres verrouillés"
    );

const pdfBytes = await pdfDoc.save();

// Convert Uint8Array → ReadableStream
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(pdfBytes);
    controller.close();
  },
});

return new NextResponse(stream, {
  status: 200,
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="ebook-preview.pdf"',
  },
});

  } catch (error) {
    console.error("PDF ERROR:", error);
    return NextResponse.json(
      { error: "Impossible de générer le PDF." },
      { status: 500 }
    );
  }
}
