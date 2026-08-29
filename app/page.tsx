"use client";

import { getPopularMovies } from "@/lib/api/movies";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { formatReleaseDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => getPopularMovies(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-300 mx-auto">
      <h1 className="font-semibold text-3xl my-4 text-foreground">
        Popular Movies
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.results.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/6">
              <div className="relative h-70 w-45 rounded-[10px] overflow-hidden mb-2">
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}/w342${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="font-semibold line-clamp-1 text-lg text-foreground">
                {movie.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {formatReleaseDate(movie.release_date)}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
