"use server";

export async function generateStructure(title: string) {
  const res = await fetch("/api/generate-structure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    console.error("Erreur API generate-structure");
    return [];
  }

  const data = await res.json();
  return data.chapters ?? [];
}
