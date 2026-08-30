import { tmdbClient } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaType = searchParams.get("media_type") ?? "movie";
  const withGenres = searchParams.get("with_genres");
  const sortBy = searchParams.get("sort_by") ?? "popularity.desc";
  const page = searchParams.get("page") ?? "1";

  try {
    const { data } = await tmdbClient.get(`/discover/${mediaType}`, {
      params: {
        sort_by: sortBy,
        page,
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
