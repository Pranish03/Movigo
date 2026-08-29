import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { formatReleaseDate } from "@/utils/format-date";
import { Media } from "@/utils/types";

export default function MediaCard({
  poster_path,
  title,
  name,
  release_date,
  first_air_date,
}: Media) {
  return (
    <div>
      <div className="relative aspect-2/3 rounded-[10px] overflow-hidden mb-2">
        <Image
          src={`${TMDB_IMAGE_BASE_URL}/w342${poster_path}`}
          alt={title ?? name ?? "poster"}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="font-semibold line-clamp-1 text-lg text-foreground">
        {title ?? name}
      </h2>
      <p className="text-muted-foreground text-sm">
        {formatReleaseDate(release_date || first_air_date || "")}
      </p>
    </div>
  );
}
