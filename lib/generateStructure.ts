export async function generateStructure(title: string) {
  const res = await fetch("/api/generate-structure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  console.log("DATA FROM API:", data);

  return Array.isArray(data.chapters) ? data.chapters : [];
}
