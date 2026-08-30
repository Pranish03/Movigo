import { tmdbClient } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await tmdbClient.get("/movie/now_playing");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch now playing" },
      { status: 500 },
    );
  }
}
