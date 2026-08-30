"use client";

import MediaCard from "@/components/shared/media-card";
import MediaCardSkeleton from "@/components/shared/media-card-skeleton";
import { discoverMedia } from "@/lib/api/media";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import GenreCombobox from "../_components/genre-combobox";
import SortingSelect, { SortOption } from "../_components/sorting-select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MoviesPage() {
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", "discover", selectedGenres, sortBy, page],
    queryFn: () => discoverMedia("movie", selectedGenres, sortBy, page),
  });

  if (error) return <div>{error.message}</div>;

  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  function handleGenreChange(genres: number[]) {
    setSelectedGenres(genres);
    setPage(1);
  }

  function handleSortChange(sort: SortOption) {
    setSortBy(sort);
    setPage(1);
  }

  return (
    <div className="max-w-300 mx-auto px-4">
      <div className="flex items-center justify-between mt-14 mb-10">
        <h1 className="font-bold text-3xl text-foreground w-full">
          Discover Movies
        </h1>

        <div className="flex items-center gap-4 w-full">
          <SortingSelect value={sortBy} onChange={handleSortChange} />

          <GenreCombobox
            mediaType="movie"
            value={selectedGenres}
            onChange={handleGenreChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-x-4 gap-y-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
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

      <Pagination className="mt-10 mb-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
