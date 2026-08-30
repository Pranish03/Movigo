"use client";

import MediaCard from "@/components/shared/media-card";
import MediaCardSkeleton from "@/components/shared/media-card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getTopRatedMedia } from "@/lib/api/media";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TopRated() {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const { data, isLoading, error } = useQuery({
    queryKey: [mediaType, "top-rated"],
    queryFn: () => getTopRatedMedia(mediaType),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl my-4 text-foreground">Top Rated</h1>

        <ToggleGroup
          variant="outline"
          value={[mediaType]}
          onValueChange={(value) => {
            if (value[0] === "movie" || value[0] === "tv") {
              setMediaType(value[0]);
            }
          }}
        >
          <ToggleGroupItem value="movie">Movies</ToggleGroupItem>
          <ToggleGroupItem value="tv">Tv Shows</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem key={i} className="basis-1/5">
                  <MediaCardSkeleton />
                </CarouselItem>
              ))
            : data?.results.map((media) => (
                <CarouselItem key={media.id} className="basis-1/5">
                  <MediaCard
                    poster_path={media.poster_path}
                    title={media?.title}
                    name={media?.name}
                    release_date={media?.release_date}
                    first_air_date={media?.first_air_date}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
