import { tmdbClient } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaType = searchParams.get("media_type") ?? "movie";

  try {
    const { data } = await tmdbClient.get(`/genre/${mediaType}/list`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: `Failed to fetch ${mediaType} genres` },
      { status: 500 },
    );
  }
}
