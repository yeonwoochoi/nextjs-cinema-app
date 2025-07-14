import { MovieData, ReviewData } from "@/types/types";
import { Suspense } from "react";
import { ApiResult, cachedFetch, taggedFetch } from "@/lib/api";
import ReviewItem from "@/components/review/review-item";
import ReviewEditor from "@/components/review/review-editor";
import ErrorMessage from "@/components/error-message";

// true이면 정의되지 않는 param은 최초 SSR로 동작 -> 이후는 캐싱되어 정적으로 제공됨
// false이면 정의되지 않는 param은 not-found 페이지 return
// export const dynamicParams = false;

// 빌드시 SSG로 생성해 Full Route Cache에 저장됨
export function generateStaticParams() {
  return [
    {id: "1"},
    {id: "2"},
    {id: "3"}
  ]
}

type PageParams = Promise<{ id: string }>;

async function MovieDetail({ movieId }: { movieId: string }) {
  // 일단은 캐싱
  // 댓글창 추가되면 SSR 방식으로 변경 예정
  const result: ApiResult<MovieData | null> = await cachedFetch<MovieData>(`/movie/${movieId}`)

  if (result.status === "error" || !result.data) {
    return (
      <ErrorMessage message="영화 정보를 불러오지 못했습니다."/>
    )
  }

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl
  }: MovieData = result.data

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-2.5">
        <div
          className="relative flex justify-center p-5 bg-no-repeat bg-cover"
          style={{backgroundImage: `url('${posterImgUrl}')`}}
        >
          <img src={posterImgUrl} alt={title} className="z-[1] h-full max-h-[350px]"/>
          <div className="absolute inset-0 bg-black/70"/>
        </div>
        <div className="font-bold text-2xl">{title}</div>
        <div>{`${releaseDate} / ${genres.join(', ')} / ${runtime}분`}</div>
        <div className="mb-2">{company}</div>
        <div className="font-bold">{subTitle}</div>
        <div className="leading-[1.3] whitespace-pre-line">
          {description}
        </div>
      </div>
    </Suspense>
  )
}

async function ReviewList({ movieId }: { movieId: string }) {
  const result: ApiResult<ReviewData[] | null> = await taggedFetch(`/review/movie/${movieId}`, [`review-${movieId}`])

  if (result.status === "error" || !result.data) {
    return (
      <ErrorMessage message="리뷰 목록을 불러오지 못했습니다."/>
    )
  }

  const reviews = result.data

  if (!reviews || reviews.length === 0) {
    return <div className="text-white font-bold text-2xl">리뷰가 없습니다.</div>
  }

  return (
    <div className="flex flex-col gap-24 my-6">
      {reviews.map(review => {
        return <ReviewItem key={review.id} {...review} />
      })}
    </div>
  )
}

export default async function Page({params}: { params: PageParams }) {
  const {id} = await params
  return (
    <div>
      <MovieDetail movieId={id}/>
      <ReviewEditor movieId={id}/>
      <ReviewList movieId={id}/>
    </div>
  )
}
