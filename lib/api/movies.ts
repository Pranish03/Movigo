import { tmdbClient } from "@/lib/axios";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_data: string;
};

type PopularMoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
};

export async function getPopularMovies(page = 1) {
  const { data } = await tmdbClient.get<PopularMoviesResponse>(
    "/movie/popular",
    { params: page },
  );

  return data;
}
