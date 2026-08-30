interface IdProps {
  params: Promise<{ id: "string" }>;
}

export default async function MovieDetailPage({ params }: IdProps) {
  const { id } = await params;
  return <div>MoviePage {id}</div>;
}
