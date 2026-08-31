"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchMedia } from "@/lib/api/media";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchMedia(debouncedQuery),
    enabled: debouncedQuery.trim().length > 1,
  });

  const results =
    data?.results.filter(
      (r) => r.media_type === "movie" || r.media_type === "tv",
    ) ?? [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(result: (typeof results)[number]) {
    setOpen(false);
    setQuery("");
    router.push(
      `/${result.media_type === "movie" ? "movies" : "tv"}/${result.id}`,
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search movies & shows..."
        className="pl-9"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query.length > 0 && setOpen(true)}
      />

      {open && debouncedQuery.trim().length > 1 && (
        <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg z-50">
          {isFetching ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin mr-2" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            <ul>
              {results.slice(0, 8).map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted text-left"
                  >
                    <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden bg-muted">
                      {result.poster_path && (
                        <Image
                          src={`${TMDB_IMAGE_BASE_URL}/w92${result.poster_path}`}
                          alt={result.title || result.name || ""}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">
                        {result.title || result.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {result.media_type === "movie" ? "Movie" : "TV Show"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
