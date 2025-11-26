import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import OpenAI from "openai";

const MODEL = "gpt-4.1";

const MODEL_PRICES: Record<string, { input: number; output: number }> = {
  "gpt-4.1": {
    input: 0.005 / 1000,
    output: 0.015 / 1000,
  },
};

function calculateCost(model: string, promptTokens: number, completionTokens: number) {
  const price = MODEL_PRICES[model];
  if (!price) return 0;
  return promptTokens * price.input + completionTokens * price.output;
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Missing title." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Génère une structure d'ebook en JSON strict :

{
  "chapters": [
    { "title": "Introduction" },
    { "title": "Chapitre 1" },
    { "title": "Chapitre 2" }
  ]
}

Titre : "${title}"
`;

    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Tu renvoies toujours un JSON strict et valide." },
        { role: "user", content: prompt },
      ],
    });

    const msg = completion.choices[0].message;

    // Nouvelle extraction JSON
    const raw = msg.content ?? "{}"; // fallback JSON vide
    console.log("RAW STRUCTURE:", raw);

    let chapters: any[] = [];

    try {
      const parsed = JSON.parse(raw);
      chapters = parsed.chapters ?? [];
    } catch (e) {
      console.error("Erreur JSON:", raw);
    }

    // LOG TOKENS
    const usage = completion?.usage;
    if (usage && supabaseAdmin) {
      const promptTokens = usage.prompt_tokens ?? 0;
      const completionTokens = usage.completion_tokens ?? 0;
      const totalTokens = usage.total_tokens ?? promptTokens + completionTokens;
      const cost_usd = calculateCost(MODEL, promptTokens, completionTokens);

      const { error } = await supabaseAdmin.from("ai_usage").insert({
        model: MODEL,
        endpoint: "generate_structure",
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd,
        user_id: null,
        meta: { title },
      });

      if (error) console.error("[ai_usage insert error]", error);
    }

    console.log("CHAPTERS PARSED:", chapters);

    return NextResponse.json({ chapters });

  } catch (e) {
    console.error("ERROR /api/generate-structure:", e);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
