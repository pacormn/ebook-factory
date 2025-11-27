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
      preview, // { cover, introduction, chapters: [...] } venant de /ebook-preview
      title,
      description,
      promise,
      goal,
      style,
      audience,
      audienceLevel,
      audienceProblem,
      chapters, // structure complète
    } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY manquant" },
        { status: 500 }
      );
    }

    if (!title || !Array.isArray(chapters) || !preview) {
      return NextResponse.json(
        { error: "Données invalides pour la génération complète." },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // On considère que l'aperçu contient déjà les chapitres 0 et 1
    const remainingChapters = chapters.slice(2);

    if (remainingChapters.length === 0) {
      // Rien à générer, tout était déjà dans le preview
      return NextResponse.json({
        fullBook: {
          cover: preview.cover,
          introduction: preview.introduction,
          chapters: preview.chapters,
        },
      });
    }

    const prompt = `
Tu complètes un ebook déjà partiellement généré.

Ne régénère PAS la couverture ni l'introduction ni les premiers chapitres.
Génère SEULEMENT le contenu des chapitres restants ci-dessous.

FORMAT JSON STRICT :

{
  "chapters": [
    { "title": "Titre chapitre X", "content": "Contenu détaillé" },
    ...
  ]
}

Contexte global :
Titre : "${title}"
Description : "${description}"
Promesse : "${promise}"
Objectif : "${goal}"
Style : "${style}"
Audience : "${audience}"
Niveau : "${audienceLevel}"
Problème principal : "${audienceProblem}"

Chapitres DEJA GÉNÉRÉS (aperçu) :
${JSON.stringify(preview.chapters)}

Chapitres À GÉNÉRER (la suite uniquement) :
${JSON.stringify(remainingChapters)}
`;

    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const msg = completion.choices[0].message;

    const raw = typeof msg.content === "string" ? msg.content : "{}";
    console.log("[ebook-full] RAW:", raw);

    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("[ebook-full] JSON parse error:", raw);
      return NextResponse.json(
        { error: "Réponse IA invalide (JSON parse error)." },
        { status: 500 }
      );
    }

    const extraChapters = Array.isArray(parsed.chapters) ? parsed.chapters : [];

    const fullBook = {
      cover: preview.cover,
      introduction: preview.introduction,
      chapters: [...(preview.chapters || []), ...extraChapters],
    };

    // === LOG SUPABASE ===
    const usage = completion.usage;
    if (usage && supabaseAdmin) {
      const promptTokens = usage.prompt_tokens ?? 0;
      const completionTokens = usage.completion_tokens ?? 0;
      const totalTokens = usage.total_tokens ?? promptTokens + completionTokens;
      const cost_usd = calculateCost(MODEL, promptTokens, completionTokens);

      const { error } = await supabaseAdmin.from("ai_usage").insert({
        model: MODEL,
        endpoint: "ebook_full",
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
          chapters_count: chapters.length,
          preview_chapters_count: preview.chapters?.length ?? 0,
          remaining_chapters_count: remainingChapters.length,
        },
      });

      if (error) {
        console.error("[ai_usage insert error][ebook_full]", error);
      }
    }

    return NextResponse.json({ fullBook });
  } catch (e) {
    console.error("ERROR /api/ebook-full:", e);
    return NextResponse.json(
      { error: "Erreur interne lors de la génération complète." },
      { status: 500 }
    );
  }
}
