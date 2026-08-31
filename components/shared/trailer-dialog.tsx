"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Video } from "@/lib/api/media";

type TrailerDialogProps = {
  videos: Video[];
};

export default function TrailerDialog({ videos }: TrailerDialogProps) {
  const trailer =
    videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official,
    ) ?? videos.find((v) => v.type === "Trailer" && v.site === "YouTube");

  if (!trailer) return null;

  return (
    <Dialog>
      <DialogTrigger
        render={<Button size="lg" variant="outline" className="gap-2" />}
      >
        <Play className="size-4 fill-current" />
        Watch Trailer
      </DialogTrigger>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 overflow-hidden gap-0">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
