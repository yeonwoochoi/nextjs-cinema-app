import allMovies from "../../../mock/movies.json";
import MovieItem from "../../../components/movie-item";
import { MovieData } from "../../../types/types";

async function SearchResult({ q }: { q: string }) {
  const searchedMovies: MovieData[] = allMovies.filter(movie => movie.title.includes(q) || movie.subTitle.includes(q) || movie.description.includes(q))

  if (!searchedMovies) {
    return <div>검색 결과가 없습니다.</div>
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {searchedMovies.map(movie => {
        return <MovieItem key={movie.id} {...movie} />
      })}
    </div>
  )
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams
  const query = q ?? "";
  return (
    <SearchResult q={query} />
  )
}
