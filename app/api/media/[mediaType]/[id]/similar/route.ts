import { tmdbClient } from "@/lib/axios";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ mediaType: string; id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const { mediaType, id } = await params;

  try {
    const { data } = await tmdbClient.get(`/${mediaType}/${id}/similar`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch similar media" },
      { status: 500 },
    );
  }
}
