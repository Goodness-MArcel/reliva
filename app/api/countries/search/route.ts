// app/api/countries/search/route.ts
import { NextResponse } from "next/server";
import { getCountrySuggestions } from "@/lib/countries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json([]);
  }

  const results = await getCountrySuggestions(q);
  return NextResponse.json(results);
}