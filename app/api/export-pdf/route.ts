import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import playwright from "playwright-core";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { ebookId } = await req.json();

    if (!ebookId) {
      return NextResponse.json(
        { error: "ebookId is required" },
        { status: 400 }
      );
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ebook/print/${ebookId}`;

    const executablePath = await chromium.executablePath();

    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath,
      headless: true // ✅ SIMPLE, PROPRE, COMPATIBLE VERCEL
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    const pdf = await page.pdf({
      width: "1080px",
      height: "1920px",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    const uint8 = new Uint8Array(pdf);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ebook-${ebookId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(error) },
      { status: 500 }
    );
  }
}
