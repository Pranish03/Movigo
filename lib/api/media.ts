import { Media } from "@/utils/types";

type MediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

type GenreResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};

export async function discoverMedia(
  mediaType: string,
  genreIds: number[] = [],
  sortBy: string = "popularity.desc",
): Promise<MediaResponse> {
  const params = new URLSearchParams({
    media_type: mediaType,
    sort_by: sortBy,
  });

  if (genreIds.length > 0) {
    params.set("with_genres", genreIds.join(","));
  }

  const res = await fetch(`/api/media/discover?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch discover movies");

  return res.json();
}

export async function getPopularMedia(
  mediaType: string,
): Promise<MediaResponse> {
  const res = await fetch(`/api/media/popular?media_type=${mediaType}`);

  if (!res.ok) throw new Error("Failed to fetch popular medias");

  return res.json();
}

export async function getTopRatedMedia(
  mediaType: string,
): Promise<MediaResponse> {
  const res = await fetch(`/api/media/top-rated?media_type=${mediaType}`);

  if (!res.ok) throw new Error("Failed to fetch top rated medias");

  return res.json();
}

export async function getTrendingMedia(
  timeWindow: string,
): Promise<MediaResponse> {
  const res = await fetch(`/api/media/trending?time_window=${timeWindow}`);

  if (!res.ok) throw new Error("Failed to fetch trending medias");

  return res.json();
}

export async function getMediaGenres(
  mediaType: string,
): Promise<GenreResponse> {
  const res = await fetch(`/api/media/genres?media_type=${mediaType}`);

  if (!res.ok) throw new Error(`Failed to fetch ${mediaType} genres`);

  return res.json();
}
