import { tmdbClient } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaType = searchParams.get("media_type") ?? "movie";

  try {
    const { data } = await tmdbClient.get(`/${mediaType}/popular`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch popular" },
      { status: 500 },
    );
  }
}
