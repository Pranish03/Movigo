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

export type MediaDetails = Media & {
  overview: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres: { id: number; name: string }[];
  backdrop_path: string;
  vote_average: number;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type CreditsResponse = {
  cast: CastMember[];
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

type VideosResponse = {
  results: Video[];
};

export async function discoverMedia(
  mediaType: string,
  genreIds: number[] = [],
  sortBy: string = "popularity.desc",
  page: number = 1,
): Promise<MediaResponse> {
  const params = new URLSearchParams({
    media_type: mediaType,
    sort_by: sortBy,
    page: page.toString(),
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

export async function getMediaDetails(
  mediaType: string,
  id: string,
): Promise<MediaDetails> {
  const res = await fetch(`/api/media/${mediaType}/${id}`);

  if (!res.ok) throw new Error("Failed to fetch media details");

  return res.json();
}

export async function getMediaCredits(
  mediaType: string,
  id: string,
): Promise<CreditsResponse> {
  const res = await fetch(`/api/media/${mediaType}/${id}/credits`);

  if (!res.ok) throw new Error("Failed to fetch credits");

  return res.json();
}

export async function getSimilarMedia(
  mediaType: string,
  id: string,
): Promise<MediaResponse> {
  const res = await fetch(`/api/media/${mediaType}/${id}/similar`);

  if (!res.ok) throw new Error("Failed to fetch similar media");

  return res.json();
}

export async function getMediaVideos(
  mediaType: string,
  id: string,
): Promise<VideosResponse> {
  const res = await fetch(`/api/media/${mediaType}/${id}/videos`);

  if (!res.ok) throw new Error("Failed to fetch videos");

  return res.json();
}
