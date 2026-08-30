import { Media } from "@/utils/types";

type PopularMediaResponse = {
  results: Media[];
  page: number;
  total_pages: number;
};

export async function getTopRatedMedia(
  mediaType: string,
): Promise<PopularMediaResponse> {
  const res = await fetch(`/api/top-rated?media_type=${mediaType}`);

  if (!res.ok) throw new Error("Failed to fetch top rated medias");

  return res.json();
}
