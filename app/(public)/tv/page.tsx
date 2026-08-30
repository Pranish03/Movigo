"use client";

import MediaCard from "@/components/shared/media-card";
import MediaCardSkeleton from "@/components/shared/media-card-skeleton";
import { discoverMedia } from "@/lib/api/discover";
import { useQuery } from "@tanstack/react-query";

export default function MoviesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tv", "discover"],
    queryFn: () => discoverMedia("tv"),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-300 mx-auto px-4">
      <h1 className="font-bold text-3xl mt-14 mb-10 text-foreground">
        Discover Tv Shows
      </h1>
      <div className="grid grid-cols-6 gap-x-4 gap-y-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <MediaCardSkeleton key={i} />
            ))
          : data?.results.map((media) => (
              <MediaCard
                key={media.id}
                poster_path={media.poster_path}
                title={media?.title}
                name={media?.name}
                release_date={media?.release_date}
                first_air_date={media?.first_air_date}
              />
            ))}
      </div>
    </div>
  );
}
