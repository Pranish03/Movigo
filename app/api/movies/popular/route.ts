import { tmdbClient } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await tmdbClient.get("/movie/popular");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 },
    );
  }
}
