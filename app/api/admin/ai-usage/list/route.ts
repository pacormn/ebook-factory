// app/api/admin/ai-usage/list/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const ALLOWED_SORT_FIELDS = new Set([
  "created_at",
  "total_tokens",
  "cost_usd",
  "endpoint",
]);

export async function GET(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin non configuré" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);

    const limit = Math.min(
      Number(searchParams.get("limit")) || 20000,
      100
    );

    const sortFieldRaw = searchParams.get("sort") || "created_at";
    const sortField = ALLOWED_SORT_FIELDS.has(sortFieldRaw)
      ? sortFieldRaw
      : "created_at";

    const dirParam = searchParams.get("dir");
    const ascending = dirParam === "asc";

    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select(
        "id, created_at, model, endpoint, total_tokens, prompt_tokens, completion_tokens, cost_usd"
      )
      .order(sortField, { ascending })
      .limit(limit);

    if (error) {
      console.error("[ai_usage/list]", error);
      return NextResponse.json(
        { error: "Erreur Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      items: data ?? [],
    });
  } catch (e) {
    console.error("[ai_usage/list] exception", e);
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
