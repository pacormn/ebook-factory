import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFPage } from "pdf-lib";
import fs from "fs";
import path from "path";

function sanitizeText(text?: string): string {
  if (!text) return "";
  // Enlever les emojis / caractères hors WinAnsi (accents ok)
  return text
    .replace(/\r\n/g, "\n")
    .split("")
    .filter((ch) => ch.charCodeAt(0) <= 255)
    .join("");
}

function loadAsset(filename: string): Uint8Array | null {
  try {
    const fullPath = path.join(process.cwd(), "public", "pdf-assets", filename);
    return fs.readFileSync(fullPath);
  } catch (e) {
    console.warn("[PDF] Asset manquant:", filename);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = sanitizeText(body.title || "Ton ebook professionnel");
    const description = sanitizeText(body.description || body.promise || "");
    const style = sanitizeText(body.style || "");
    const audience = sanitizeText(body.audience || "");
    const audienceProblem = sanitizeText(body.audienceProblem || "");
    const goal = sanitizeText(body.goal || "");
    const chapters = Array.isArray(body.chapters) ? body.chapters : [];

    const pdfDoc = await PDFDocument.create();
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const PRIMARY = rgb(0.36, 0.42, 0.95); // violet/bleu
    const ACCENT = rgb(0.93, 0.41, 0.68); // rose
    const TEXT = rgb(0.15, 0.15, 0.18);
    const MUTED = rgb(0.45, 0.45, 0.50);
    const BG_SOFT = rgb(0.97, 0.98, 1);

    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 50;

    const coverBytes = loadAsset("cover-abstract.png");
    const bannerBytes = loadAsset("chapter-banner.png");
    const separatorBytes = loadAsset("separator.png");

    const iconIdeaBytes = loadAsset("icon-idea.png");
    const iconRocketBytes = loadAsset("icon-rocket.png");
    const iconChartBytes = loadAsset("icon-chart.png");
    const iconCheckBytes = loadAsset("icon-check.png");
    const iconTargetBytes = loadAsset("icon-target.png");
    const iconNoteBytes = loadAsset("icon-note.png");

    const coverImg = coverBytes ? await pdfDoc.embedPng(coverBytes) : null;
    const bannerImg = bannerBytes ? await pdfDoc.embedPng(bannerBytes) : null;
    const separatorImg = separatorBytes ? await pdfDoc.embedPng(separatorBytes) : null;

    const iconIdea = iconIdeaBytes ? await pdfDoc.embedPng(iconIdeaBytes) : null;
    const iconRocket = iconRocketBytes ? await pdfDoc.embedPng(iconRocketBytes) : null;
    const iconChart = iconChartBytes ? await pdfDoc.embedPng(iconChartBytes) : null;
    const iconCheck = iconCheckBytes ? await pdfDoc.embedPng(iconCheckBytes) : null;
    const iconTarget = iconTargetBytes ? await pdfDoc.embedPng(iconTargetBytes) : null;
    const iconNote = iconNoteBytes ? await pdfDoc.embedPng(iconNoteBytes) : null;

    const keyBullets: string[] = [
      sanitizeText(goal) || "Un plan clair et actionnable.",
      sanitizeText(audienceProblem) || "Des reponses aux questions frequentes.",
      sanitizeText(style) || "Un ton adapte a ton audience.",
    ];

    const addPage = () => pdfDoc.addPage([pageWidth, pageHeight]);

    function drawFooter(page: PDFPage, pageNumber: number) {
      page.drawText("E-Book Factory", {
        x: margin,
        y: 25,
        size: 9,
        font: fontRegular,
        color: MUTED,
      });
      page.drawText(String(pageNumber), {
        x: pageWidth - margin,
        y: 25,
        size: 9,
        font: fontRegular,
        color: MUTED,
      });
    }

    function writeWrapped(
      page: PDFPage,
      text: string,
      x: number,
      y: number,
      size = 12,
      lineHeight = 18,
      color = TEXT
    ): number {
      text = sanitizeText(text);
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
    }

    function drawSoftSeparator(page: PDFPage, y: number) {
      if (separatorImg) {
        const sw = 260;
        const sh = (separatorImg.height / separatorImg.width) * sw;
        page.drawImage(separatorImg, {
          x: margin,
          y: y - sh,
          width: sw,
          height: sh,
          opacity: 0.7,
        });
        return y - sh - 10;
      } else {
        page.drawRectangle({
          x: margin,
          y: y - 4,
          width: 200,
          height: 3,
          color: PRIMARY,
        });
        return y - 20;
      }
    }

    // ================
    // 📘 COVER PAGE
    // ================
    let pageNumber = 1;
    {
      const page = addPage();

      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: BG_SOFT,
      });

      if (coverImg) {
        const w = pageWidth;
        const h = (coverImg.height / coverImg.width) * w;
        page.drawImage(coverImg, {
          x: 0,
          y: pageHeight - h,
          width: w,
          height: h,
          opacity: 0.95,
        });

        page.drawRectangle({
          x: 0,
          y: pageHeight - h,
          width: w,
          height: h,
          color: rgb(0, 0, 0),
          opacity: 0.12,
        });
      }

      page.drawRectangle({
        x: margin,
        y: pageHeight - 260,
        width: pageWidth - margin * 2,
        height: 140,
        color: rgb(1, 1, 1),
        opacity: 0.96,
      });

      page.drawRectangle({
        x: margin,
        y: pageHeight - 260,
        width: 6,
        height: 140,
        color: PRIMARY,
      });

      page.drawText("E-Book Factory", {
        x: margin + 10,
        y: pageHeight - 120,
        size: 11,
        font: fontBold,
        color: PRIMARY,
      });

      page.drawText(title, {
        x: margin + 10,
        y: pageHeight - 150,
        size: 22,
        font: fontBold,
        color: TEXT,
      });

      let y = writeWrapped(page, description || "Un ebook professionnel genere automatiquement pour ton audience.", margin + 10, pageHeight - 180, 11, 16, MUTED);

      y -= 35;
      page.drawText("Pour qui ?", {
        x: margin + 10,
        y,
        size: 11,
        font: fontBold,
        color: ACCENT,
      });

      y = writeWrapped(
        page,
        audience || "Entrepreneurs, createurs de contenu et personnes ambitieuses.",
        margin + 10,
        y - 18,
        10,
        15,
        MUTED
      );

      drawFooter(page, pageNumber);
      pageNumber++;
    }

    // ======================
    // 🎯 PAGE "Ce que tu vas apprendre"
    // ======================
    {
      const page = addPage();

      page.drawText("Ce que tu vas apprendre", {
        x: margin,
        y: pageHeight - 80,
        size: 22,
        font: fontBold,
        color: PRIMARY,
      });

      let y = drawSoftSeparator(page, pageHeight - 90);

      const iconSize = 22;
      const bulletIcons = [iconIdea, iconChart, iconRocket, iconCheck, iconTarget, iconNote];

      keyBullets.forEach((b, i) => {
        if (!b.trim()) return;
        const icon = bulletIcons[i] || iconCheck;

        if (icon) {
          page.drawImage(icon, {
            x: margin,
            y: y - iconSize + 4,
            width: iconSize,
            height: iconSize,
          });
        }

        page.drawText("- ", {
          x: margin + (icon ? iconSize + 8 : 0),
          y,
          size: 11,
          font: fontRegular,
          color: PRIMARY,
        });

        y = writeWrapped(
          page,
          b,
          margin + (icon ? iconSize + 18 : 12),
          y,
          11,
          16,
          TEXT
        ) - 8;
      });

      if (audienceProblem) {
        y -= 15;
        page.drawRectangle({
          x: margin,
          y: y - 60,
          width: pageWidth - margin * 2,
          height: 60,
          color: rgb(1, 1, 1),
          opacity: 0.95,
        });
        page.drawRectangle({
          x: margin,
          y: y - 60,
          width: 5,
          height: 60,
          color: ACCENT,
        });

        page.drawText("Le probleme que tu resols :", {
          x: margin + 10,
          y: y - 18,
          size: 11,
          font: fontBold,
          color: ACCENT,
        });

        writeWrapped(page, audienceProblem, margin + 10, y - 34, 10, 15, MUTED);
      }

      drawFooter(page, pageNumber);
      pageNumber++;
    }

    // ======================
    // 📑 TABLE DES MATIERES
    // ======================
    {
      const page = addPage();

      page.drawText("Table des matieres", {
        x: margin,
        y: pageHeight - 80,
        size: 20,
        font: fontBold,
        color: PRIMARY,
      });

      let y = pageHeight - 120;

      chapters.forEach((ch: any, i: number) => {
        const line = `${i + 1}. ${sanitizeText(ch.title || "")}`;
        page.drawText(line, {
          x: margin,
          y,
          size: 12,
          font: fontRegular,
          color: TEXT,
        });
        y -= 22;
      });

      drawFooter(page, pageNumber);
      pageNumber++;
    }

    // ======================
    // 🧩 CHAPITRES
    // ======================
    chapters.forEach((ch: any, i: number) => {
      const page = addPage();

      if (bannerImg) {
        const bw = pageWidth;
        const bh = (bannerImg.height / bannerImg.width) * bw;
        page.drawImage(bannerImg, {
          x: 0,
          y: pageHeight - bh,
          width: bw,
          height: bh,
          opacity: 0.95,
        });

        page.drawRectangle({
          x: 0,
          y: pageHeight - bh,
          width: bw,
          height: bh,
          color: rgb(0, 0, 0),
          opacity: 0.15,
        });
      }

      page.drawText(`Chapitre ${i + 1}`, {
        x: margin,
        y: pageHeight - 90,
        size: 14,
        font: fontBold,
        color: ACCENT,
      });

      page.drawText(sanitizeText(ch.title || "Chapitre"), {
        x: margin,
        y: pageHeight - 110,
        size: 18,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      let y = pageHeight - 150;

      const content = sanitizeText(ch.content || "");
      y = writeWrapped(page, content, margin, y, 12, 18, TEXT);

      drawFooter(page, pageNumber);
      pageNumber++;
    });

    // ======================
    // 🎉 PAGE DE FIN / CTA
    // ======================
    {
      const page = addPage();

      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: BG_SOFT,
      });

      page.drawText("Merci pour ta lecture !", {
        x: margin,
        y: pageHeight - 80,
        size: 22,
        font: fontBold,
        color: PRIMARY,
      });

      let y = pageHeight - 130;

      y = writeWrapped(
        page,
        "Tu viens de lire un extrait. La version complete comprend tous les chapitres, la mise en page finale et la licence de revente illimitee.",
        margin,
        y,
        12,
        18,
        TEXT
      );

      y -= 30;

      page.drawRectangle({
        x: margin,
        y: y - 60,
        width: pageWidth - margin * 2,
        height: 60,
        color: PRIMARY,
      });

      page.drawText("Debloquer l'ebook complet", {
        x: margin + 16,
        y: y - 28,
        size: 14,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      page.drawText("Paiement unique, acces immediat et licence de revente incluse.", {
        x: margin + 16,
        y: y - 44,
        size: 10,
        font: fontRegular,
        color: rgb(0.93, 0.95, 1),
      });

      drawFooter(page, pageNumber);
    }

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
    console.error("[PDF ERROR]", err);
    return NextResponse.json({ error: "Erreur PDF" }, { status: 500 });
  }
}
