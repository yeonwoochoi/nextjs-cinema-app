import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types/types";
import { ApiResult, cachedFetch, revalidatingFetch } from "@/lib/api";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import delay from "@/utils/delay";
import ErrorMessage from "@/components/error-message";

async function AllMovies() {
  await delay(2000)

  // 데이터 변경이 거의 없으므로 SSG 캐싱 사용
  const result: ApiResult<MovieData[] | null> = await cachedFetch('/movie')

  if (result.status === "error" || !result.data) {
    return (
      <ErrorMessage message="영화 목록을 불러오지 못했습니다."/>
    )
  }

  const allMovies = result.data

  return (
    <div className="grid grid-cols-5 gap-1">
      {allMovies.map(movie => {
        return <MovieItem key={movie.id} {...movie} />
      })}
    </div>
  )
}

async function RecoMovies() {
  await delay(3000)

  // SSG처럼 캐싱할 수도 있지만,
  // 1시간 주기로 캐시를 갱신하는 ISR 방식을 사용함.
  // (On Demand ISR이 더 효과적이지만, 이번에는 생략함)
  const result: ApiResult<MovieData[] | null> = await revalidatingFetch<MovieData[]>('/movie/random', 3600)

  if (result.status === "error" || !result.data) {
    return (
      <ErrorMessage message="추천 영화를 불러오지 못했습니다."/>
    )
  }

  const recoMovies = result.data

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
        <Suspense fallback={<MovieListSkeleton count={3} />}>
          <RecoMovies/>
        </Suspense>
      </div>
      <div>
        <div className="text-lg font-bold pb-4">등록된 모든 영화</div>
        <Suspense fallback={<MovieListSkeleton count={12} itemsPerRow={5} />}>
          <AllMovies/>
        </Suspense>
      </div>
    </div>
  );
}
