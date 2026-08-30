import { tmdbClient } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaType = searchParams.get("media_type") ?? "movie";
  const withGenres = searchParams.get("with_genres");
  const sortBy = searchParams.get("sort_by") ?? "popularity.desc";

  try {
    const { data } = await tmdbClient.get(`/discover/${mediaType}`, {
      params: {
        sort_by: sortBy,
        ...(withGenres && { with_genres: withGenres }),
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch discover media" },
      { status: 500 },
    );
  }
}
