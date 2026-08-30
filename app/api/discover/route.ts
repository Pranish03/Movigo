import { tmdbClient } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaType = searchParams.get("media_type") ?? "movie";

  try {
    const { data } = await tmdbClient.get(`/discover/${mediaType}`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch discover movies" },
      { status: 500 },
    );
  }
}
