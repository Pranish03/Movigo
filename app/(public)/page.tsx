import PopularMovies from "./_components/popular-movies";
import Trending from "./_components/trending";

export default function Home() {
  return (
    <div className="max-w-300 mx-auto py-4 space-y-10">
      <Trending />
      <PopularMovies />
    </div>
  );
}
