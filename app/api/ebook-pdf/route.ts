import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFPage } from "pdf-lib";
import type { PDFFont } from "pdf-lib";
import fs from "fs";
import path from "path";

function safeText(text?: string): string {
  if (!text) return "";
  return text.replace(/\r\n/g, "\n");
}

function loadFile(relativePath: string): Uint8Array | null {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    return fs.readFileSync(fullPath);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = safeText(body.title || "Titre de ton ebook");
    const description = safeText(body.description || body.promise || "");
    const style = safeText(body.style || "");
    const audience = safeText(body.audience || "");
    const audienceProblem = safeText(body.audienceProblem || "");
    const goal = safeText(body.goal || "");
    const chapters = Array.isArray(body.chapters) ? body.chapters : [];

    const pdfDoc = await PDFDocument.create();

    // ===== FONTS =====
    const interRegularBytes = loadFile("public/fonts/Inter-Regular.ttf");
    const interBoldBytes = loadFile("public/fonts/Inter-Bold.ttf");

    let fontRegular: PDFFont;
    let fontBold: PDFFont;

    // d'abord on charge la police par défaut (Helvetica)
    const defaultRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const defaultBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    fontRegular = defaultRegular;
    fontBold = defaultBold;

    // si les fonts Inter existent, on override
    if (interRegularBytes && interBoldBytes) {
      try {
        fontRegular = await pdfDoc.embedFont(interRegularBytes);
        fontBold = await pdfDoc.embedFont(interBoldBytes);
      } catch (e) {
        console.warn("[PDF] Erreur chargement fonts Inter, fallback Helvetica.", e);
      }
    }


    // ===== ASSETS IMAGES =====
    const coverBytes = loadFile("public/pdf-assets/cover-luxe.png");
    const bannerBytes = loadFile("public/pdf-assets/chapter-banner.png");
    const separatorBytes = loadFile("public/pdf-assets/separator.png");

    const iconIdeaBytes = loadFile("public/pdf-assets/icon-idea.png");
    const iconRocketBytes = loadFile("public/pdf-assets/icon-rocket.png");
    const iconChartBytes = loadFile("public/pdf-assets/icon-chart.png");
    const iconTargetBytes = loadFile("public/pdf-assets/icon-target.png");
    const iconNoteBytes = loadFile("public/pdf-assets/icon-note.png");
    const iconCheckBytes = loadFile("public/pdf-assets/icon-check.png");

    const coverImg = coverBytes ? await pdfDoc.embedPng(coverBytes) : null;
    const bannerImg = bannerBytes ? await pdfDoc.embedPng(bannerBytes) : null;
    const separatorImg = separatorBytes ? await pdfDoc.embedPng(separatorBytes) : null;

    const iconIdea = iconIdeaBytes ? await pdfDoc.embedPng(iconIdeaBytes) : null;
    const iconRocket = iconRocketBytes ? await pdfDoc.embedPng(iconRocketBytes) : null;
    const iconChart = iconChartBytes ? await pdfDoc.embedPng(iconChartBytes) : null;
    const iconTarget = iconTargetBytes ? await pdfDoc.embedPng(iconTargetBytes) : null;
    const iconNote = iconNoteBytes ? await pdfDoc.embedPng(iconNoteBytes) : null;
    const iconCheck = iconCheckBytes ? await pdfDoc.embedPng(iconCheckBytes) : null;

    const iconPool = [iconIdea, iconRocket, iconChart, iconTarget, iconNote, iconCheck].filter(
      Boolean
    ) as any[];

    // ===== PALETTE MAGAZINE LUXE =====
    const PRIMARY = rgb(0.35, 0.32, 0.98); // Indigo
    const SECONDARY = rgb(0.93, 0.40, 0.72); // rose
    const BG = rgb(0.98, 0.98, 1);
    const TEXT = rgb(0.12, 0.12, 0.16);
    const MUTED = rgb(0.45, 0.45, 0.50);

    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 50;

    const addPage = () => pdfDoc.addPage([pageWidth, pageHeight]);

    function footer(page: PDFPage, n: number) {
      page.drawText("E-Book Factory", {
        x: margin,
        y: 25,
        size: 9,
        font: fontRegular,
        color: MUTED,
      });
      page.drawText(String(n), {
        x: pageWidth - margin,
        y: 25,
        size: 9,
        font: fontRegular,
        color: MUTED,
      });
    }

    function wrapped(
      page: PDFPage,
      text: string,
      x: number,
      y: number,
      size = 12,
      lineHeight = 18,
      color = TEXT,
      maxWidthOverride?: number
    ): number {
      text = safeText(text);
      const maxWidth = maxWidthOverride ?? pageWidth - margin * 2;
      const words = text.split(" ");
      let line = "";
      let yy = y;

      for (const word of words) {
        const t = line + word + " ";
        if (fontRegular.widthOfTextAtSize(t, size) > maxWidth) {
          page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color });
          line = word + " ";
          yy -= lineHeight;
        } else {
          line = t;
        }
      }

      if (line.trim().length) {
        page.drawText(line.trim(), { x, y: yy, size, font: fontRegular, color });
        yy -= lineHeight;
      }

      return yy;
    }

    function softSeparator(page: PDFPage, y: number): number {
      if (separatorImg) {
        const w = 260;
        const h = (separatorImg.height / separatorImg.width) * w;
        page.drawImage(separatorImg, {
          x: margin,
          y: y - h,
          width: w,
          height: h,
          opacity: 0.85,
        });
        return y - h - 10;
      } else {
        page.drawRectangle({
          x: margin,
          y: y - 3,
          width: 180,
          height: 3,
          color: PRIMARY,
        });
        return y - 20;
      }
    }

    // ========= PAGE 1 : COUVERTURE LUXE =========
    let pageNumber = 1;
    {
      const page = addPage();

      // fond général
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: BG,
      });

      if (coverImg) {
        const w = pageWidth;
        const h = (coverImg.height / coverImg.width) * w;
        page.drawImage(coverImg, {
          x: 0,
          y: pageHeight - h,
          width: w,
          height: h,
        });

        // overlay dégradé "magazine"
        page.drawRectangle({
          x: 0,
          y: pageHeight - h,
          width: w,
          height: h,
          color: PRIMARY,
          opacity: 0.35,
        });
      }

      // bloc luxe
      const cardWidth = pageWidth - margin * 2;
      const cardHeight = 190;
      const cardY = pageHeight - 260;

      page.drawRectangle({
        x: margin,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
        color: rgb(1, 1, 1),
        opacity: 0.98,
      });

      // barre gradient fake
      page.drawRectangle({
        x: margin,
        y: cardY + cardHeight - 8,
        width: cardWidth,
        height: 8,
        color: SECONDARY,
      });

      page.drawText("Edition premium", {
        x: margin + 16,
        y: cardY + cardHeight - 30,
        size: 11,
        font: fontBold,
        color: SECONDARY,
      });

      page.drawText(title, {
        x: margin + 16,
        y: cardY + cardHeight - 60,
        size: 24,
        font: fontBold,
        color: TEXT,
      });

      let yy = wrapped(
        page,
        description || "Un ebook professionnel, structure, pret a etre revendu.",
        margin + 16,
        cardY + cardHeight - 90,
        11,
        16,
        MUTED
      );

      yy -= 6;
      page.drawText("Audience :", {
        x: margin + 16,
        y: yy,
        size: 10,
        font: fontBold,
        color: PRIMARY,
      });

      yy = wrapped(
        page,
        audience || "Entrepreneurs, createurs de contenu, infopreneurs.",
        margin + 16,
        yy - 14,
        10,
        14,
        MUTED
      );

      // bas de couverture
      page.drawText("E-Book Factory", {
        x: margin,
        y: 60,
        size: 11,
        font: fontRegular,
        color: MUTED,
      });

      footer(page, pageNumber);
      pageNumber++;
    }

    // ========= PAGE 2 : AVANT-PROPOS / PROMESSE =========
    {
      const page = addPage();

      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: rgb(1, 1, 1),
      });

      page.drawText("Avant-propos", {
        x: margin,
        y: pageHeight - 80,
        size: 20,
        font: fontBold,
        color: PRIMARY,
      });

      let y = softSeparator(page, pageHeight - 90);

      y = wrapped(
        page,
        goal ||
          "Ce guide a ete concu pour etre actionnable, clair et directement exploitable pour ton audience.",
        margin,
        y,
        12,
        18,
        TEXT
      );

      y -= 20;

      // encadré "problème"
      const boxHeight = 100;
      page.drawRectangle({
        x: margin,
        y: y - boxHeight,
        width: pageWidth - margin * 2,
        height: boxHeight,
        color: rgb(0.98, 0.98, 1),
      });
      page.drawRectangle({
        x: margin,
        y: y - boxHeight,
        width: 5,
        height: boxHeight,
        color: SECONDARY,
      });

      page.drawText("Le probleme que rencontre ton audience", {
        x: margin + 14,
        y: y - 20,
        size: 11,
        font: fontBold,
        color: SECONDARY,
      });

      wrapped(
        page,
        audienceProblem ||
          "Manque de clarté, d'information structuree, et de plan d'action simple a suivre.",
        margin + 14,
        y - 36,
        10,
        15,
        MUTED
      );

      footer(page, pageNumber);
      pageNumber++;
    }

    // ========= PAGE 3 : TABLE DES MATIERES magazine =========
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

      chapters.forEach((ch: any, idx: number) => {
        const num = idx + 1;
        const txt = `${num}. ${safeText(ch.title || "")}`;

        page.drawText(txt, {
          x: margin,
          y,
          size: 12,
          font: fontRegular,
          color: TEXT,
        });

        // petit accent ligne
        page.drawRectangle({
          x: margin,
          y: y - 4,
          width: 120,
          height: 1,
          color: rgb(0.88, 0.88, 0.95),
        });

        y -= 26;
      });

      footer(page, pageNumber);
      pageNumber++;
    }

    // ========= CHAPITRES (preview 3 max) =========
    chapters.slice(0, 3).forEach((ch: any, idx: number) => {
      const page = addPage();

      // bandeau haut
      if (bannerImg) {
        const bw = pageWidth;
        const bh = (bannerImg.height / bannerImg.width) * bw;
        page.drawImage(bannerImg, {
          x: 0,
          y: pageHeight - bh,
          width: bw,
          height: bh,
        });
        page.drawRectangle({
          x: 0,
          y: pageHeight - bh,
          width: bw,
          height: bh,
          color: rgb(0, 0, 0),
          opacity: 0.18,
        });
      } else {
        page.drawRectangle({
          x: 0,
          y: pageHeight - 120,
          width: pageWidth,
          height: 120,
          color: PRIMARY,
        });
      }

      // icône chapitre
      const icon = iconPool[idx % (iconPool.length || 1)];
      if (icon) {
        const is = 30;
        page.drawImage(icon, {
          x: margin,
          y: pageHeight - 100,
          width: is,
          height: is,
        });
      }

      page.drawText(`Chapitre ${idx + 1}`, {
        x: margin + 40,
        y: pageHeight - 80,
        size: 13,
        font: fontBold,
        color: SECONDARY,
      });

      page.drawText(safeText(ch.title || "Chapitre"), {
        x: margin + 40,
        y: pageHeight - 100,
        size: 18,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      let y = pageHeight - 150;

      // bloc "a retenir"
      page.drawRectangle({
        x: margin,
        y: y - 60,
        width: pageWidth - margin * 2,
        height: 60,
        color: rgb(0.98, 0.98, 1),
      });
      page.drawRectangle({
        x: margin,
        y: y - 60,
        width: 5,
        height: 60,
        color: PRIMARY,
      });

      page.drawText("A retenir", {
        x: margin + 14,
        y: y - 20,
        size: 11,
        font: fontBold,
        color: PRIMARY,
      });

      wrapped(
        page,
        "Les idees fortes de ce chapitre doivent etre claires, simples et orientees action.",
        margin + 14,
        y - 36,
        10,
        15,
        MUTED
      );

      y -= 90;

      const content = safeText(ch.content || "");
      y = wrapped(page, content, margin, y, 12, 18, TEXT);

      footer(page, pageNumber);
      pageNumber++;
    });

    // ========= PAGE FINAL CTA LUXE =========
    {
      const page = addPage();

      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
        color: BG,
      });

      // bloc central gradient simulé
      page.drawRectangle({
        x: margin,
        y: pageHeight / 2 - 80,
        width: pageWidth - margin * 2,
        height: 160,
        color: PRIMARY,
      });

      page.drawRectangle({
        x: margin + 5,
        y: pageHeight / 2 - 75,
        width: pageWidth - margin * 2 - 10,
        height: 150,
        color: SECONDARY,
        opacity: 0.25,
      });

      page.drawText("Debloque l'ebook complet", {
        x: margin + 24,
        y: pageHeight / 2 + 50,
        size: 18,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      wrapped(
        page,
        "Accede a l'integralite du contenu, aux chapitres avances, aux exemples concrets et a la licence de revente illimitee.",
        margin + 24,
        pageHeight / 2 + 20,
        11,
        16,
        rgb(0.95, 0.96, 1),
        pageWidth - margin * 2 - 40
      );

      page.drawText("Paiement unique. Acces immediat en PDF.", {
        x: margin + 24,
        y: pageHeight / 2 - 10,
        size: 10,
        font: fontRegular,
        color: rgb(0.9, 0.92, 1),
      });

      footer(page, pageNumber);
    }

    // ===== EXPORT =====
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
