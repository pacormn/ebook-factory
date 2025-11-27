import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req: Request) {
  const {
    title,
    introduction,
    cover,
    chapters,
    style,
    audience
  } = await req.json();

  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const addPage = (text: string, pageTitle?: string) => {
      const page = pdfDoc.addPage([595, 842]); // format A4
      const { width, height } = page.getSize();
      const fontSize = 14;

      // Title
      if (pageTitle) {
        page.drawText(pageTitle, {
          x: 40,
          y: height - 60,
          size: 22,
          font,
          color: rgb(0.2, 0.2, 0.7),
        });
      }

      // Content
      const textWidth = 515;
      const wrapped = wrapText(text, 90);

      let y = height - 100;
      for (const line of wrapped) {
        if (y < 50) break; // stop page overflow
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

    // Utility: wrap long text
    function wrapText(text: string, maxLen: number) {
      const words = text.split(" ");
      const lines = [];
      let line = "";

      for (const word of words) {
        if ((line + word).length > maxLen) {
          lines.push(line);
          line = word + " ";
        } else {
          line += word + " ";
        }
      }
      lines.push(line);
      return lines;
    }

    // 📘 COVER PAGE
    {
      const page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();

      page.drawText(title, {
        x: 40,
        y: height - 120,
        size: 32,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });

      page.drawText(cover, {
        x: 40,
        y: height - 180,
        size: 16,
        font,
        color: rgb(0.4, 0.4, 0.4),
      });

      page.drawText(`Audience : ${audience}`, {
        x: 40,
        y: height - 220,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText(`Style : ${style}`, {
        x: 40,
        y: height - 250,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }

    // ✨ Introduction
    addPage(introduction, "Introduction");

    // 📖 First chapters (max 3)
    for (const chap of chapters.slice(0, 3)) {
      addPage(chap.content, chap.title);
    }

    // 🔒 LOCK PAGE
    addPage(
      "Les chapitres suivants sont verrouillés.\n\nDébloque l’ebook complet pour obtenir :\n- 50+ pages\n- Stratégies avancées\n- Contenus exclusifs\n- Droits de revente",
      "Chapitres verrouillés"
    );

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="ebook-preview.pdf"',
      },
    });

  } catch (error) {
    console.error("PDF ERROR:", error);
    return NextResponse.json({ error: "PDF creation failed" }, { status: 500 });
  }
}
