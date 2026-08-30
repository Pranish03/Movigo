"use client";

import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/api/movies";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { Media } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

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
    <div className="relative h-[70vh] min-h-125 w-full overflow-hidden">
      <Image
        src={`${TMDB_IMAGE_BASE_URL}/original${randomMovie.backdrop_path}`}
        alt={randomMovie.title || "backdrop image"}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-linear-to-t from-background from-0% via-background/70 via-40% to-transparent to-100%" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Explore movies & shows worth watching
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
          Browse trending movies and TV shows, explore detailed info, and find
          your next favorite watch — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="gap-2">
            <Play className="size-4 fill-current" />
            Start Exploring
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/10"
          >
            <Info className="size-4" />
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
