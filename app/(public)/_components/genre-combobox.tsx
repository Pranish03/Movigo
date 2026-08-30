"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { getMediaGenres } from "@/lib/api/media";

type Genre = {
  id: number;
  name: string;
};

type GenreComboboxProps = {
  mediaType: "movie" | "tv";
  value: number[];
  onChange: (value: number[]) => void;
};

export default function GenreCombobox({
  mediaType,
  value,
  onChange,
}: GenreComboboxProps) {
  const anchor = useComboboxAnchor();

  const { data } = useQuery({
    queryKey: ["genres", mediaType],
    queryFn: () => getMediaGenres(mediaType),
  });

  const genres: Genre[] = data?.genres ?? [];

  const selectedItems = genres.filter((g) => value.includes(g.id));

  return (
    <Combobox
      multiple
      autoHighlight
      items={genres}
      itemToStringLabel={(item: Genre) => item.name}
      value={selectedItems}
      onValueChange={(items: Genre[]) => onChange(items.map((i) => i.id))}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: Genre[]) => (
            <React.Fragment>
              {values.map((genre) => (
                <ComboboxChip key={genre.id}>{genre.name}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Select genres..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No genres found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Genre) => (
            <ComboboxItem key={item.id} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
