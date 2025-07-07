import { MovieData } from "../../../types/types";
import movies from "../../../mock/movies.json"
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const movie: MovieData | undefined = movies.find((movie) => String(movie.id) === String(id));
  if (!movie) {
    return <div>잘못된 요청입니다.</div>
  }

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl
  }: MovieData = movie

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-2.5">
        <div
          className="relative flex justify-center p-5 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt={title} className="z-[1] h-full max-h-[350px]"/>
          <div className="absolute inset-0 bg-black/70" />
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
