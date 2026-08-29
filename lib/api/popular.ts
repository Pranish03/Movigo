import { Media } from "@/utils/types";

type PopularMediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getPopularMedia(
  mediaType: string,
): Promise<PopularMediaResponse> {
  const res = await fetch(`/api/popular?media_type=${mediaType}`);

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}
