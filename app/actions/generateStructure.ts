"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateStructure(title: string) {
  const prompt = `
  Tu es un expert en création d’ebooks marketing. 
  Génère une structure complète et professionnelle d’un ebook intitulé : "${title}".

  Format JSON strict :
  [
    { "title": "Chapitre 1" },
    { "title": "Chapitre 2" },
    ...
  ]
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "Tu renvoies toujours du JSON valide." },
      { role: "user", content: prompt }
    ]
  });

  const json = JSON.parse(completion.choices[0].message.content);

  return json;
}
