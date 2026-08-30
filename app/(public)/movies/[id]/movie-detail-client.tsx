"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMediaDetails,
  getMediaCredits,
  getSimilarMedia,
} from "@/lib/api/media";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { formatReleaseDate } from "@/utils/format-date";
import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CastCard from "@/components/shared/cast-card";
import MediaCard from "@/components/shared/media-card";
import MediaCardSkeleton from "@/components/shared/media-card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import MediaDetailSkeleton from "@/components/shared/media-detail-skeleton";

export default function MovieDetailClient({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", "details", id],
    queryFn: () => getMediaDetails("movie", id),
  });

  const { data: credits } = useQuery({
    queryKey: ["movie", "credits", id],
    queryFn: () => getMediaCredits("movie", id),
  });

  const { data: similar, isLoading: isSimilarLoading } = useQuery({
    queryKey: ["movie", "similar", id],
    queryFn: () => getSimilarMedia("movie", id),
  });

  if (isLoading) return <MediaDetailSkeleton />;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <div className="relative h-[54vh] min-h-125 w-full overflow-hidden">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}/original${data.backdrop_path}`}
          alt={data.title || "backdrop image"}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-linear-to-t from-background from-0% via-background/70 via-40% to-transparent to-100%" />

        <div className="max-w-300 mx-auto px-4 mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-48 md:w-64 aspect-2/3 rounded-xl overflow-hidden shrink-0 shadow-xl">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}`}
                alt={data.title || "poster"}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-end p-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 text-foreground font-medium">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  {data.vote_average.toFixed(1)}
                </div>
                <span>•</span>
                <span>{formatReleaseDate(data.release_date || "")}</span>
                {data.runtime && (
                  <>
                    <span>•</span>
                    <span>
                      {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {data.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-6">
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="size-4 fill-current" />
                  Watch Trailer
                </Button>
              </div>

              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {data.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {credits?.cast && credits.cast.length > 0 && (
        <div className="max-w-300 mx-auto px-4">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Casts</h2>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {credits.cast.slice(0, 15).map((member) => (
                <CarouselItem key={member.id} className="basis-1/8">
                  <CastCard {...member} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {credits.cast.length > 8 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      )}

      {(isSimilarLoading ||
        (similar?.results && similar.results.length > 0)) && (
        <div className="max-w-300 mx-auto px-4 mt-16 pb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            More Like This
          </h2>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {isSimilarLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i} className="basis-1/5">
                      <MediaCardSkeleton />
                    </CarouselItem>
                  ))
                : similar?.results.map((media) => (
                    <CarouselItem key={media.id} className="basis-1/5">
                      <Link href={`/movies/${media.id}`}>
                        <MediaCard
                          poster_path={media.poster_path}
                          title={media?.title}
                          name={media?.name}
                          release_date={media?.release_date}
                          first_air_date={media?.first_air_date}
                        />
                      </Link>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
}
