import { Media } from "@/utils/types";

type MediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function discoverMedia(mediaType: string): Promise<MediaResponse> {
  const res = await fetch(`/api/discover?media_type=${mediaType}`);

  if (!res.ok) throw new Error("Failed to fetch discover movies");

  return res.json();
}
