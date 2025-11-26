import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import OpenAI from "openai";

const MODEL = "gpt-4.1";

const MODEL_PRICES: Record<string, { input: number; output: number }> = {
  "gpt-4.1": {
    input: 0.005 / 1000,     // exemple : 5$/1M tokens => 0.005/1k
    output: 0.015 / 1000,    // exemple : 15$/1M tokens => 0.015/1k
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
      "title": "...",
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

    // extraction JSON selon le nouveau format OpenAI
    const msg = completion.choices[0].message;

    let chapters: any[] = [];

if ("parsed" in msg && msg.parsed) {
  const parsed: any = msg.parsed;   // <-- Fix TypeScript ici
  chapters = parsed.chapters ?? [];
}
else if (Array.isArray(msg.content)) {
  const text = msg.content[0]?.text ?? "{}";

  try {
    const parsed = JSON.parse(text);
    chapters = parsed.chapters ?? [];
  } catch (e) {
    console.error("Erreur JSON structure:", text);
  }
}


    // === LOG DES TOKENS + COÛT ===
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
        meta: {
          title,
        },
      });

      if (error) {
        console.error("[ai_usage insert error]", error);
      }
    }
    console.log("Generated chapters:", chapters);

    return NextResponse.json({ chapters });
  } catch (e) {
    console.error("ERROR /api/generate-structure:", e);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
