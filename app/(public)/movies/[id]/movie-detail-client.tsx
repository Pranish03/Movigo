"use client";

import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "@/lib/api/media";

export default function MovieDetailClient({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", "details", id],
    queryFn: () => getMediaDetails("movie", id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.overview}</p>
    </div>
  );
}
