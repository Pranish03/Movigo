export function formatReleaseDate(dateString: string): string {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
