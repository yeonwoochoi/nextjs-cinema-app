import movies from '../../mock/movies.json'
import MovieItem from "../../components/movie-item";
import { MovieData } from "../../types/types";

async function AllMovies() {
  const allMovies: MovieData[] = movies

  return (
    <div className="grid grid-cols-5 gap-1">
      {allMovies.map(movie => {
        return <MovieItem key={movie.id} {...movie} />
      })}
    </div>
  )
}

async function RecoMovies() {
  const recoMovies: MovieData[] = [...movies]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div className="grid grid-cols-3 gap-1">
      {recoMovies.map(movie => {
        return <MovieItem key={movie.id} {...movie} />
      })}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col gap-y-16 py-4">
      <div>
        <div className="text-lg font-bold pb-4">지금 가장 추천하는 영화</div>
        <RecoMovies/>
      </div>
      <div>
        <div className="text-lg font-bold pb-4">등록된 모든 영화</div>
        <AllMovies/>
      </div>
    </div>
  );
}
