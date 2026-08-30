"use client";

import MediaCard from "@/components/shared/media-card";
import MediaCardSkeleton from "@/components/shared/media-card-skeleton";
import { discoverMedia } from "@/lib/api/media";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import GenreCombobox from "../_components/genre-combobox";
import SortingSelect, { SortOption } from "../_components/sorting-select";

export default function MoviesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", "discover", selectedGenres, sortBy],
    queryFn: () => discoverMedia("movie", selectedGenres, sortBy),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-300 mx-auto px-4">
      <div className="flex items-center justify-between mt-14 mb-10">
        <h1 className="font-bold text-3xl text-foreground w-full">
          Discover Movies
        </h1>

        <div className="flex items-center gap-4 w-full">
          <SortingSelect value={sortBy} onChange={setSortBy} />

          <GenreCombobox
            mediaType="movie"
            value={selectedGenres}
            onChange={setSelectedGenres}
          />
        </div>
      </div>
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
