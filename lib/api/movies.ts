import { Media } from "@/utils/types";

type PopularMoviesResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const res = await fetch("/api/movies/popular");

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}
