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
import { getTrendingMedia } from "@/lib/api/trending";
import { useQuery } from "@tanstack/react-query";

export default function Trending() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrendingMedia(),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h1 className="font-semibold text-3xl my-4 text-foreground">Trending</h1>

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
