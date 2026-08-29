export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

type PopularMoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
};

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const res = await fetch("/api/movies/popular");

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}
