import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      chapters,
      promise,
      goal,
      style,
      audience,
      audienceLevel,
      audienceProblem,
    } = await req.json();

    const pdfDoc = await PDFDocument.create();

    // === FONTS ===
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const PRIMARY = rgb(0.16, 0.35, 0.85);
    const TEXT = rgb(0.15, 0.15, 0.15);
    const GRAY = rgb(0.45, 0.45, 0.45);

    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 50;

    const addPage = () => pdfDoc.addPage([pageWidth, pageHeight]);

    const writeWrapped = (
      page: any,
      text: string,
      x: number,
      y: number,
      size = 12,
      lineHeight = 17,
      color = TEXT
    ) => {
      if (!text) return y;

      const maxWidth = pageWidth - margin * 2;
      const words = text.split(" ");
      let line = "";
      let yy = y;

      for (const w of words) {
        const test = line + w + " ";
        if (fontRegular.widthOfTextAtSize(test, size) > maxWidth) {
          page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color });
          line = w + " ";
          yy -= lineHeight;
        } else {
          line = test;
        }
      }

      if (line.trim().length > 0) {
        page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color });
        yy -= lineHeight;
      }

      return yy;
    };

    const drawSeparator = (page: any, x: number, y: number, width = 200) => {
      page.drawRectangle({
        x,
        y,
        width,
        height: 3,
        color: PRIMARY
      });
    };

    const drawFooter = (page: any, number: number) => {
      page.drawText(String(number), {
        x: pageWidth / 2 - 5,
        y: 20,
        size: 10,
        font: fontRegular,
        color: GRAY,
      });
    };

    // =================================
    // 📘 COVER PAGE
    // =================================
    {
      const page = addPage();

      // Background soft gradient
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: rgb(0.97, 0.98, 1),
      });

      // Title
      page.drawText(title, {
        x: margin,
        y: pageHeight - 150,
        size: 32,
        font: fontBold,
        color: TEXT,
      });

      // Subtitle
      const subtitle =
        description ||
        promise ||
        "Un ebook professionnel généré automatiquement avec E-Book Factory.";

      let y = writeWrapped(page, subtitle, margin, pageHeight - 200, 14, 20);

      drawSeparator(page, margin, y - 10);

      // Audience block
      y -= 50;
      page.drawText("Audience", { x: margin, y, font: fontBold, size: 12, color: PRIMARY });
      y = writeWrapped(page, audience || "Débutants ambitieux", margin, y - 18);

      // Style block
      y -= 30;
      page.drawText("Style", { x: margin, y, font: fontBold, size: 12, color: PRIMARY });
      y = writeWrapped(page, style || "Ton motivant et pédagogique", margin, y - 18);

      drawFooter(page, 1);
    }

    // =================================
    // 📑 TABLE OF CONTENTS
    // =================================
    {
      const page = addPage();

      page.drawText("Table des matières", {
        x: margin,
        y: pageHeight - 80,
        size: 24,
        font: fontBold,
        color: PRIMARY,
      });

      let y = pageHeight - 130;

      (chapters || []).forEach((c: any, i: number) => {
        page.drawText(`${i + 1}.  ${c.title}`, {
          x: margin,
          y,
          size: 13,
          font: fontRegular,
          color: TEXT,
        });
        y -= 22;
      });

      drawFooter(page, 2);
    }

    // =================================
    // 🧩 CHAPTERS
    // =================================
    let pageCount = 3;

    chapters.forEach((chapter: any, index: number) => {
      const page = addPage();

      // Chapter title
      page.drawText(`Chapitre ${index + 1}`, {
        x: margin,
        y: pageHeight - 80,
        size: 20,
        font: fontBold,
        color: PRIMARY,
      });

      drawSeparator(page, margin, pageHeight - 95);

      page.drawText(chapter.title, {
        x: margin,
        y: pageHeight - 130,
        size: 15,
        font: fontBold,
        color: TEXT,
      });

      let y = pageHeight - 160;

      // Content
      if (chapter.content) {
        y = writeWrapped(page, chapter.content, margin, y, 12, 17, TEXT);
      }

      drawFooter(page, pageCount);
      pageCount++;
    });

    // =================================
    // 🎯 END PAGE
    // =================================
    {
      const page = addPage();

      page.drawText("Merci pour ta lecture !", {
        x: margin,
        y: pageHeight - 100,
        size: 22,
        font: fontBold,
        color: PRIMARY,
      });

      let y = writeWrapped(
        page,
        "Tu viens de lire un extrait. La version complète inclut tous les chapitres, la mise en page finale, et la licence de revente illimitée.",
        margin,
        pageHeight - 150,
        14,
        20
      );

      page.drawRectangle({
        x: margin,
        y: y - 40,
        width: 300,
        height: 50,
        color: PRIMARY,
      });

      page.drawText("Débloquer l’ebook complet →", {
        x: margin + 15,
        y: y - 20,
        size: 14,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      drawFooter(page, pageCount);
    }

    // =================================
    // EXPORT
    // =================================
    const pdfBytes = await pdfDoc.save();

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
  } catch (err) {
    console.error("PDF ERROR", err);
    return NextResponse.json({ error: "Erreur PDF" }, { status: 500 });
  }
}
