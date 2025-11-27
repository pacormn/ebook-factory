import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MODEL = "gpt-4.1-nano";

const MODEL_PRICES: Record<string, { input: number; output: number }> = {
  "gpt-4.1-nano": {
    input: 0.001 / 1000,
    output: 0.004 / 1000,
  },
};

function calculateCost(model: string, promptTokens: number, completionTokens: number) {
  const price = MODEL_PRICES[model];
  if (!price) return 0;
  return promptTokens * price.input + completionTokens * price.output;
}

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      promise,
      goal,
      style,
      audience,
      audienceLevel,
      audienceProblem,
      chapters,
    } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant" },
        { status: 500 }
      );
    }

    if (!title || !chapters || !Array.isArray(chapters)) {
      return NextResponse.json(
        { error: "Données invalides pour la génération d'aperçu." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 1–2 premiers chapitres pour l'aperçu
    const previewChapters = chapters.slice(0, 2);

    const prompt = `
Génère uniquement un APERÇU d'ebook, pas le livre complet.

Structure EXACTE attendue :

{
  "cover": "Texte court de couverture (max 2 lignes)",
  "introduction": "Introduction (180 à 250 mots)",
  "chapters": [
    { "title": "Titre chapitre 1", "content": "Contenu du chapitre 1" },
    { "title": "Titre chapitre 2", "content": "Contenu du chapitre 2" }
  ]
}

Règles :
- NE génère PAS les autres chapitres, seulement les deux premiers.
- Respecte strictement le JSON, sans texte autour.

Contexte :
Titre : "${title}"
Description : "${description}"
Promesse : "${promise}"
Objectif : "${goal}"
Style : "${style}"
Audience : "${audience}"
Niveau : "${audienceLevel}"
Problème principal : "${audienceProblem}"

Chapitres (aperçu) :
${JSON.stringify(previewChapters)}
`;

    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const msg = completion.choices[0].message;

    // On récupère le JSON brut dans msg.content (string) et on parse nous-mêmes
    const raw = typeof msg.content === "string" ? msg.content : "{}";
    console.log("[ebook-preview] RAW:", raw);

    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("[ebook-preview] JSON parse error:", raw);
      return NextResponse.json(
        { error: "Réponse IA invalide (JSON parse error)." },
        { status: 500 }
      );
    }

    // === LOG DES TOKENS + COÛT DANS SUPABASE ===
    const usage = completion.usage;
    if (usage && supabaseAdmin) {
      const promptTokens = usage.prompt_tokens ?? 0;
      const completionTokens = usage.completion_tokens ?? 0;
      const totalTokens = usage.total_tokens ?? promptTokens + completionTokens;
      const cost_usd = calculateCost(MODEL, promptTokens, completionTokens);

      const { error } = await supabaseAdmin.from("ai_usage").insert({
        model: MODEL,
        endpoint: "ebook_preview",
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd,
        user_id: null,
        meta: {
          title,
          style,
          audience,
          audienceLevel,
          is_preview: true,
        },
      });

      if (error) {
        console.error("[ai_usage insert error][ebook_preview]", error);
      }
    }

    return NextResponse.json(parsed);
  } catch (e) {
    console.error("ERROR /api/ebook-preview:", e);
    return NextResponse.json(
      { error: "Erreur interne lors de la génération de l'aperçu." },
      { status: 500 }
    );
  }
}
