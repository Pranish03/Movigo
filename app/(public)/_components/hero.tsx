"use client";

import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/api/movies";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { Media } from "@/utils/types";

function pickRandomMovie(data: { results: Media[] }): Media | null {
  const withBackdrop = data.results.filter((m) => m.backdrop_path);
  if (!withBackdrop.length) return null;

  const randomIndex = Math.floor(Math.random() * withBackdrop.length);
  return withBackdrop[randomIndex];
}

export default function Hero() {
  const { data: randomMovie, isLoading } = useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: getNowPlaying,
    select: pickRandomMovie,
  });

  if (isLoading || !randomMovie) return null;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <Image
        src={`${TMDB_IMAGE_BASE_URL}/original${randomMovie.backdrop_path}`}
        alt={randomMovie.title || "backdrop image"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-background from-0% via-background/60 via-50% to-transparent to-100%" />
    </div>
  );
}
