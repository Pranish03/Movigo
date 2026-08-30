import { Media } from "@/utils/types";

type PopularMediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getNowPlaying(): Promise<PopularMediaResponse> {
  const res = await fetch("/api/movies/now-playing");

  if (!res.ok) throw new Error("Failed to fetch now playing movies");

  return res.json();
}
