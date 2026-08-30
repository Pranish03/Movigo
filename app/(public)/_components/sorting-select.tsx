"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "original_title.asc";

const sortItems: { label: string; value: SortOption }[] = [
  { label: "Popularity Descending", value: "popularity.desc" },
  { label: "Popularity Ascending", value: "popularity.asc" },
  { label: "Rating Descending", value: "vote_average.desc" },
  { label: "Rating Ascending", value: "vote_average.asc" },
  { label: "Release Date Descending", value: "primary_release_date.desc" },
  { label: "Release Date Ascending", value: "primary_release_date.asc" },
  { label: "Title (A-Z)", value: "original_title.asc" },
];

type SortingSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortingSelect({ value, onChange }: SortingSelectProps) {
  return (
    <Select
      items={sortItems}
      value={value}
      onValueChange={(v) => onChange(v as SortOption)}
    >
      <SelectTrigger className="w-full max-w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {sortItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
