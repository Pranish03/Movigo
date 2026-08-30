import { tmdbClient } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeWindow = searchParams.get("time_window") ?? "day";

  try {
    const { data } = await tmdbClient.get(`/trending/all/${timeWindow}`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending" },
      { status: 500 },
    );
  }
}
