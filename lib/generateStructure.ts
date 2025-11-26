export async function generateStructure(title: string) {
  const res = await fetch("/api/generate-structure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  console.log("RESPONSE STATUS:", res.status);

  const data = await res.json();
  return data.chapters ?? []; // ← seul endroit important
}
