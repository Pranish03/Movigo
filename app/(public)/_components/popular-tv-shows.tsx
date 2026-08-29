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
import { getPopularTvShows } from "@/lib/api/tv-shows";
import { useQuery } from "@tanstack/react-query";

export default function PopularTvShows() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tv", "popular"],
    queryFn: () => getPopularTvShows(),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h1 className="font-semibold text-3xl my-4 text-foreground">
        Popular Tv Shows
      </h1>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem key={i} className="basis-1/6">
                  <MediaCardSkeleton />
                </CarouselItem>
              ))
            : data?.results.map((tv) => (
                <CarouselItem key={tv.id} className="basis-1/6">
                  <MediaCard
                    poster_path={tv.poster_path}
                    name={tv.name}
                    release_date={tv.release_date}
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
