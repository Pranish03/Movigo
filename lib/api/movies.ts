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

export async function getDiscoverMovies(): Promise<PopularMediaResponse> {
  const res = await fetch("/api/movies/discover");

  if (!res.ok) throw new Error("Failed to fetch discover movies");

  return res.json();
}
