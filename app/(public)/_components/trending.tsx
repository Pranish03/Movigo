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
import { getTrendingMedia } from "@/lib/api/trending";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Trending() {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  const { data, isLoading, error } = useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: () => getTrendingMedia(timeWindow),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl my-4 text-foreground">Trending</h1>

        <ToggleGroup
          variant="outline"
          value={[timeWindow]}
          onValueChange={(value) => {
            if (value[0] === "day" || value[0] === "week") {
              setTimeWindow(value[0]);
            }
          }}
        >
          <ToggleGroupItem value="day">Today</ToggleGroupItem>
          <ToggleGroupItem value="week">This Week</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem key={i} className="basis-1/6">
                  <MediaCardSkeleton />
                </CarouselItem>
              ))
            : data?.results.map((media) => (
                <CarouselItem key={media.id} className="basis-1/6">
                  <MediaCard
                    poster_path={media.poster_path}
                    name={media?.name}
                    title={media?.title}
                    release_date={media.release_date}
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
