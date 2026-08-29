import Image from "next/image";
import { Movie } from "@/lib/api/movies";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { formatReleaseDate } from "@/utils/format-date";

export default function MediaCard({ movie }: { movie: Movie }) {
  return (
    <div>
      <div className="relative aspect-2/3 rounded-[10px] overflow-hidden mb-2">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}/w342${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="font-semibold line-clamp-1 text-lg text-foreground">
        {movie.title}
      </h2>
      <p className="text-muted-foreground text-sm">
        {formatReleaseDate(movie.release_date)}
      </p>
    </div>
  );
}
