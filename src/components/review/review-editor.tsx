'use client'

import { useActionState, useEffect } from "react"
import { createReviewAction } from "@/actions/create-review.action"
import { ApiResult } from "@/lib/api";
import { ReviewData } from "@/types/types";
import LoadingSpinner from "@/components/ui/loading-spinner";

type ReviewActionState = ApiResult<ReviewData | null>

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState<ReviewActionState, FormData>(createReviewAction, {
    status: 'success',
    data: null,
  })

  useEffect(() => {
    if (state && state.status === 'error') {
      alert(state.error)
    }
  }, [state]);

  return (
    <section className="mt-16 mb-24">
      <form action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly/>
        <textarea
          name="content"
          required
          disabled={isPending}
          placeholder="리뷰 내용"
          className="w-full p-4 border border-gray-400 min-h-32"
        />
        <div className="flex justify-end h-12 mt-2">
          <input
            required
            name="author"
            placeholder="작성자"
            disabled={isPending}
            className="border border-gray-400 w-full sm:w-64 px-2 mr-4"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-white text-black px-2 sm:px-4 sm:w-28 w-32 font-bold hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed relative"
          >
            { isPending ? <LoadingSpinner color="fill-black" /> : "작성하기" }
          </button>
        </div>
      </form>
    </section>
  )
}
