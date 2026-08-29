"use client";

import MediaCard from "@/components/shared/media-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPopularMovies } from "@/lib/api/movies";
import { useQuery } from "@tanstack/react-query";

export default function PopularMovie() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => getPopularMovies(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h1 className="font-semibold text-3xl my-4 text-foreground">
        Popular Movies
      </h1>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {data?.results.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/6">
              <MediaCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
