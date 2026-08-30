import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30 mt-16">
      <div className="max-w-300 mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-2xl font-bold transition-opacity hover:opacity-80"
            >
              Movi<span className="text-blue-500">Go</span>.
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Discover trending movies and TV shows, all in one place — powered
              by TMDB.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="https://github.com/Pranish03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaGithub className="size-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaTwitter className="size-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaLinkedin className="size-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Browse
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/movies"
                    className="transition-colors hover:text-foreground"
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tv"
                    className="transition-colors hover:text-foreground"
                  >
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trending"
                    className="transition-colors hover:text-foreground"
                  >
                    Trending
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Project
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/Pranish03/movigo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    Source Code
                  </a>
                </li>
                <li>
                  <a
                    href="https://pranishchaulagain.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Movigo. Built by Pranish.</p>
          <p className="text-center sm:text-right">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
