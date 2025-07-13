import MovieItem from "../../../components/movie-item";
import { MovieData } from "../../../types/types";
import { dynamicFetch } from "../../../lib/api";
import delay from "../../../utils/delay";
import { Suspense } from 'react'
import MovieListSkeleton from "../../../components/skeleton/movie-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  // 검색어가 다양해 SSG 캐시 관리가 어려워 SSR 방식으로 데이터를 가져옴
  await delay(2000)
  const searchedMovies: MovieData[] = await dynamicFetch(`/movie/search?q=${q}`)

  if (!searchedMovies || searchedMovies.length === 0) {
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
    <Suspense key={query} fallback={<MovieListSkeleton count={3} />}>
      <SearchResult q={query} />
    </Suspense>
  )
}
