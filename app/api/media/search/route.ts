import { tmdbClient } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { data } = await tmdbClient.get("/search/multi", {
      params: { query },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
