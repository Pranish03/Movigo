import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/lib/constants";
import { CastMember } from "@/lib/api/media";
import { User } from "lucide-react";

export default function CastCard({
  name,
  character,
  profile_path,
}: CastMember) {
  return (
    <div className="shrink-0 w-32">
      <div className="relative aspect-square rounded-full overflow-hidden mb-2 bg-muted flex items-center justify-center">
        {profile_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/w185${profile_path}`}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <User className="size-10 text-muted-foreground" />
        )}
      </div>
      <p className="font-medium line-clamp-1 text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground line-clamp-1">{character}</p>
    </div>
  );
}
