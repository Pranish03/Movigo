import Popular from "./_components/popular";
import TopRated from "./_components/top-rated";
import Trending from "./_components/trending";

export default function Home() {
  return (
    <div className="max-w-300 mx-auto py-4 space-y-10">
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}
