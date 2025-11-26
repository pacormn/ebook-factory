"use server";

import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateStructure(title: string) {
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
    model: "gpt-4.1",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "Tu renvoies toujours un JSON valide." },
      { role: "user", content: prompt }
    ]
  });

  const msg = completion.choices[0].message;

  // 1) JSON auto-parsé
  if ("parsed" in msg && msg.parsed) {
    return (msg.parsed as any)?.chapters ?? [];
  }

  // 2) JSON dans msg.content[0].text
  if (Array.isArray(msg.content)) {
    const text = msg.content[0]?.text;

    try {
      const parsed = JSON.parse(text);
      return parsed.chapters ?? [];
    } catch (err) {
      console.error("JSON invalide:", text);
      return [];
    }
  }

  console.log("Format de réponse inattendu:", msg);

  return [];
}
