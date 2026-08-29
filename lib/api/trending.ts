import { Media } from "@/utils/types";

type TrendingMediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getTrendingMedia(
  timeWindow: string,
): Promise<TrendingMediaResponse> {
  const res = await fetch(`/api/trending?time_window=${timeWindow}`);

  if (!res.ok) throw new Error("Failed to fetch trending medias");

  return res.json();
}
