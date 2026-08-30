import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="w-full max-w-300 mx-auto flex items-center justify-between my-4 px-4 gap-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-3xl font-bold shrink-0">
          Movi<span className="text-blue-500">Go</span>.
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/movies" className="hover:text-foreground">
            Movies
          </Link>
          <Link href="/tv" className="hover:text-foreground">
            TV Shows
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies & shows..."
            className="pl-9"
          />
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}
