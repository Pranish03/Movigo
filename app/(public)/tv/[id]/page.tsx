import TvDetailClient from "./tv-detail-client";

type IdProps = {
  params: Promise<{ id: string }>;
};

export default async function TvDetailPage({ params }: IdProps) {
  const { id } = await params;
  return <TvDetailClient id={id} />;
}
