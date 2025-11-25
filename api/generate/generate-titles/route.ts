// app/api/generate-titles/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MODEL = "gpt-4o-mini";

const MODEL_PRICES: Record<
  string,
  { input: number; output: number }
> = {
  // prix par token (pas par million)
  "gpt-4o-mini": {
    input: 0.00015 / 1000, // 0.15$ / 1M
    output: 0.00060 / 1000, // 0.60$ / 1M
  },
  // tu pourras en rajouter d'autres plus tard
};

function calculateCost(model: string, promptTokens: number, completionTokens: number) {
  const price = MODEL_PRICES[model];
  if (!price) return 0;
  return promptTokens * price.input + completionTokens * price.output;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY manquant dans les variables d'environnement." },
      { status: 500 }
    );
  }

  try {
    const { domain, subDomain, keywords, baseTitle } = await req.json();

    const prompt = `
Tu es un expert copywriter français spécialisé dans les titres d'ebooks ultras vendeurs.

Domaine principal : ${domain}
Sous-domaine : ${subDomain}
Mots-clés optionnels : ${keywords || "aucun"}

${
  baseTitle
    ? `L'utilisateur a aimé le titre suivant, propose des variations similaires : "${baseTitle}".`
    : `Propose des idées originales adaptées à des ebooks vendus sur TikTok / Instagram.`
}

Contraintes :
- Titres en français uniquement.
- Titre court (max 12 mots).
- Très vendeur / accroche TikTok.
- Style punchy, dynamique, orienté bénéfice.
- Pas de jargon technique.
- Pas de numérotation.

Donne UNIQUEMENT une liste de 5 titres, un par ligne, sans texte autour.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error("OpenAI error:", txt);
      return NextResponse.json(
        { error: "Erreur lors de l'appel à OpenAI." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content || "";

    const titles = content
      .split("\n")
      .map((l: string) => l.replace(/^\d+[\).\-\s]*/, "").trim())
      .filter((l: string) => l.length > 0)
      .slice(0, 5);

    // === LOG DES TOKENS + COÛT ===
    const usage = data?.usage;
    if (usage && supabaseAdmin) {
      const promptTokens = usage.prompt_tokens ?? 0;
      const completionTokens = usage.completion_tokens ?? 0;
      const totalTokens = usage.total_tokens ?? promptTokens + completionTokens;

      const cost_usd = calculateCost(MODEL, promptTokens, completionTokens);

      const { error } = await supabaseAdmin.from("ai_usage").insert({
        model: MODEL,
        endpoint: "generate_title",
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd,
        user_id: null,
        meta: {
          domain,
          subDomain,
          keywords,
          baseTitle,
        },
      });

      if (error) {
        console.error("[ai_usage insert error]", error);
      }
    }

    return NextResponse.json({ titles });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur interne lors de la génération de titres." },
      { status: 500 }
    );
  }
}
