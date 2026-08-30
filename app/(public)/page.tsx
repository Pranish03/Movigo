import Hero from "./_components/hero";
import Popular from "./_components/popular";
import TopRated from "./_components/top-rated";
import Trending from "./_components/trending";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      <div className="max-w-300 mx-auto space-y-10">
        <Trending />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
}
