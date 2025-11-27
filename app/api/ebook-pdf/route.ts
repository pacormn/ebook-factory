import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  console.log("📄 [PDF] Début génération...");

  try {
    const body = await req.json();
    console.log("📥 [PDF] Body reçu :", body);

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
    } = body;

    if (!title) {
      console.error("❌ Pas de titre");
      throw new Error("Missing title");
    }

    console.log("📝 [PDF] Initialisation PDFDocument...");
    const pdfDoc = await PDFDocument.create();

    console.log("🔤 [PDF] Chargement des polices...");
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    console.log("🎨 [PDF] Génération couverture...");
    const addPage = (draw: (page: any) => void) => {
      const page = pdfDoc.addPage([595, 842]);
      draw(page);
      return page;
    };

    addPage((page) => {
      page.drawText(title, { x: 50, y: 750, size: 28, font: fontBold });
    });

    console.log("📚 [PDF] Génération table des matières...");
    addPage((page) => {
      page.drawText("Table des matières", {
        x: 50,
        y: 780,
        size: 20,
        font: fontBold,
      });

      let y = 740;
      (chapters || []).forEach((c: any, i: number) => {
        page.drawText(`${i + 1}. ${c.title}`, {
          x: 50,
          y,
          size: 12,
          font: fontRegular,
        });
        y -= 20;
      });
    });

    console.log("🧩 [PDF] Génération chapitres...");
    chapters?.forEach((ch: any, index: number) => {
      addPage((page) => {
        page.drawText(`Chapitre ${index + 1}`, {
          x: 50,
          y: 780,
          size: 18,
          font: fontBold,
        });

        page.drawText(ch.title, {
          x: 50,
          y: 740,
          size: 14,
          font: fontBold,
        });

        if (ch.content) {
          page.drawText(ch.content.slice(0, 500), {
            x: 50,
            y: 710,
            size: 12,
            font: fontRegular,
          });
        }
      });
    });

    console.log("💾 [PDF] Sauvegarde PDF...");
    const pdfBytes = await pdfDoc.save();
    console.log("✅ [PDF] PDF généré avec succès :", pdfBytes.length, "bytes");

    console.log("📤 [PDF] Envoi PDF...");
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
    console.error("❌ [PDF ERROR]:", error);
    return NextResponse.json({ error: "Erreur PDF", details: String(error) }, { status: 500 });
  }
}
