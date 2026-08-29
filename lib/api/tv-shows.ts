import { Media } from "@/utils/types";

type PopularTvShowsResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getPopularTvShows(): Promise<PopularTvShowsResponse> {
  const res = await fetch("/api/tv/popular");

  if (!res.ok) throw new Error("Failed to fetch tv shows");

  return res.json();
}
