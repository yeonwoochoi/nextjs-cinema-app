import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types/types";
import { ApiResult, dynamicFetch } from "@/lib/api";
import { Suspense } from 'react'
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import ErrorMessage from "@/components/error-message";

async function SearchResult({ q }: { q: string }) {
  // 검색어가 다양해 SSG 캐시 관리가 어려워 SSR 방식으로 데이터를 가져옴
  const result: ApiResult<MovieData[] | null> = await dynamicFetch(`/movie/search?q=${q}`)

  if (result.status === "error" || !result.data) {
    return (
      <ErrorMessage message="검색 결과를 불러오지 못했습니다."/>
    )
  }

  const searchedMovies = result.data

  if (!searchedMovies || searchedMovies.length === 0) {
    return <div className="font-bold text-2xl mb-2">검색 결과가 없습니다.</div>
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
    <Suspense key={query} fallback={<MovieListSkeleton count={3}  itemsPerRow={3}/>}>
      <SearchResult q={query} />
    </Suspense>
  )
}
