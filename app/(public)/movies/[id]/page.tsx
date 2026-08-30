import MovieDetailClient from "./movie-detail-client";

type IdProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailPage({ params }: IdProps) {
  const { id } = await params;
  return <MovieDetailClient id={id} />;
}
