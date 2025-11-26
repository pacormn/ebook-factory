"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStructure(title: string) {
  const prompt = `
  Génère une structure d'ebook en JSON strict :

  {
    "title": "...",
    "chapters": [
      { "title": "..." },
      { "title": "..." }
    ]
  }

  Titre : "${title}"
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "Tu renvoies toujours un JSON strict et valide." },
      { role: "user", content: prompt },
    ],
  });

  const msg = completion.choices[0].message;

  // cas 1 : OpenAI a déjà parsé
  if ("parsed" in msg && msg.parsed) {
    return msg.parsed.chapters ?? [];
  }

  // cas 2 : JSON dans message.content[0].text
  if (Array.isArray(msg.content)) {
    const text = msg.content[0]?.text;

    try {
      const parsed = JSON.parse(text);
      return parsed.chapters ?? [];
    } catch (err) {
      console.error("Erreur JSON :", text);
      return [];
    }
  }

  return [];
}
