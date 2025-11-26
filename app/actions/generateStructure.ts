"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateStructure(title: string) {
console.log("Generating for :", title);
  const prompt = `
  Génère une structure d'ebook en JSON strict :
  {
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
      { role: "system", content: "Tu renvoies toujours un JSON valide." },
      { role: "user", content: prompt }
    ]
  });

    const msg = completion.choices[0].message;

    // 1. Si OpenAI a déjà parsé le JSON automatiquement
    if ("parsed" in msg && msg.parsed) {
      return (msg as any).parsed;
    }

    // 2. Si le JSON est dans msg.content[0].text
    if (Array.isArray(msg.content)) {
      const text = msg.content[0]?.text;

      if (typeof text === "string") {
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error("Erreur JSON parse:", text);
        }
      }
    }

// 3. fallback
console.log("Fallback content:", msg.content);
return msg.content;
}
