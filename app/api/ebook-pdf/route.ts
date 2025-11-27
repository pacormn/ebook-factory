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

    const BLUE = rgb(0.15, 0.35, 0.85);
    const GRAY = rgb(0.35, 0.35, 0.35);

    // Utils
    const addPage = (draw: (page: any) => void) => {
      const page = pdfDoc.addPage([595, 842]); // A4
      draw(page);
      return page;
    };

    const drawWrapped = (page: any, text: string, x: number, y: number, size = 12, lineHeight = 16) => {
      const maxWidth = 480;
      const words = text.split(" ");
      let line = "";
      let yy = y;

      for (const word of words) {
        const testLine = line + word + " ";
        const width = fontRegular.widthOfTextAtSize(testLine, size);

        if (width > maxWidth) {
          page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color: GRAY });
          line = word + " ";
          yy -= lineHeight;
        } else {
          line = testLine;
        }
      }

      if (line.length > 0) {
        page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color: GRAY });
      }

      return yy - lineHeight;
    };

    // =============================
    // 📘 PAGE DE COUVERTURE
    // =============================
    addPage((page) => {
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 595,
        height: 842,
        color: rgb(0.96, 0.97, 1),
      });

      page.drawText("E-Book Factory", {
        x: 50,
        y: 780,
        size: 14,
        font: fontBold,
        color: BLUE,
      });

      page.drawText(title, {
        x: 50,
        y: 680,
        size: 32,
        font: fontBold,
        color: rgb(0, 0, 0),
      });

      const subtitle = description || promise || "Un ebook professionnel généré sur mesure.";
      drawWrapped(page, subtitle, 50, 640, 14, 18);

      page.drawRectangle({
        x: 50,
        y: 590,
        width: 200,
        height: 4,
        color: BLUE,
      });

      page.drawText("Audience :", { x: 50, y: 550, size: 12, font: fontBold });
      drawWrapped(page, audience || "Débutants et créateurs", 50, 530);

      page.drawText("Style :", { x: 50, y: 490, size: 12, font: fontBold });
      drawWrapped(page, style || "Ton de coach motivant", 50, 470);

      page.drawText("Objectif :", { x: 50, y: 430, size: 12, font: fontBold });
      drawWrapped(page, goal || "Apprendre efficacement", 50, 410);
    });

    // =============================
    // 📖 TABLE DES MATIÈRES
    // =============================
    addPage((page) => {
      page.drawText("Table des matières", {
        x: 50,
        y: 780,
        size: 26,
        font: fontBold,
        color: BLUE,
      });

      let y = 740;

      chapters.forEach((c: any, i: number) => {
        page.drawText(`${i + 1}. ${c.title}`, {
          x: 50,
          y,
          size: 14,
          font: fontRegular,
        });
        y -= 22;
      });
    });

    // =============================
    // ✨ CHAPITRES
    // =============================
    chapters.forEach((chapter: any, index: number) => {
      addPage((page) => {
        page.drawText(`Chapitre ${index + 1}`, {
          x: 50,
          y: 780,
          size: 20,
          font: fontBold,
          color: BLUE,
        });

        page.drawRectangle({
          x: 50,
          y: 765,
          width: 200,
          height: 3,
          color: BLUE,
        });

        page.drawText(chapter.title, {
          x: 50,
          y: 740,
          size: 16,
          font: fontBold,
          color: rgb(0.05, 0.05, 0.05),
        });

        let y = 710;

        if (chapter.content) {
          y = drawWrapped(page, chapter.content, 50, y, 12, 17);
        }
      });
    });

    // =============================
    // 🔐 PAGE DE FIN / CTA
    // =============================
    addPage((page) => {
      page.drawText("Merci d’avoir lu cet extrait 📘", {
        x: 50,
        y: 780,
        size: 24,
        font: fontBold,
        color: BLUE,
      });

      drawWrapped(
        page,
        "Pour débloquer l'intégralité de cet ebook, tu peux acheter la version complète sur E-Book Factory. Tu recevras la licence de revente illimitée et le PDF complet immédiatement.",
        50,
        730,
        13,
        18
      );

      page.drawRectangle({
        x: 50,
        y: 650,
        width: 300,
        height: 50,
        color: BLUE,
      });

      page.drawText("Débloquer le PDF complet →", {
        x: 60,
        y: 668,
        size: 14,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
    });

    // =============================
    // EXPORT
    // =============================
    const pdfBytes = await pdfDoc.save();

    // Convert Uint8Array → Stream
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
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur PDF" }, { status: 500 });
  }
}
