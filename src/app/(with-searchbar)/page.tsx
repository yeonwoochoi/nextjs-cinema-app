import MovieItem from "../../components/movie-item";
import { MovieData } from "../../types/types";
import { cachedFetch, revalidatingFetch } from "../../lib/api";

async function AllMovies() {
  try {
    // 데이터 변경이 거의 없으므로 SSG 캐싱 사용
    const allMovies: MovieData[] = await cachedFetch('/movie')

    return (
      <div className="grid grid-cols-5 gap-1">
        {allMovies.map(movie => {
          return <MovieItem key={movie.id} {...movie} />
        })}
      </div>
    )
  } catch (err) {
    let message = "알 수 없는 에러 발생";

    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }

    return <div>{message}</div>;
  }
}

async function RecoMovies() {
  try {
    // SSG처럼 캐싱할 수도 있지만,
    // 1시간 주기로 캐시를 갱신하는 ISR 방식을 사용함.
    // (On Demand ISR이 더 효과적이지만, 이번에는 생략함)
    const recoMovies: MovieData[] = await revalidatingFetch<MovieData[]>('/movie/random', 3600)

    return (
      <div className="grid grid-cols-3 gap-1">
        {recoMovies.map(movie => {
          return <MovieItem key={movie.id} {...movie} />
        })}
      </div>
    )
  } catch (err) {
    console.error(err)
    let message = "알 수 없는 에러 발생";

    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }

    return <div>{message}</div>;
  }
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
