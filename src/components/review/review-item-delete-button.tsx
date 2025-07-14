'use client'

import { useActionState, useEffect } from "react";
import { deleteReviewAction } from "@/actions/delete-review.action";
import { ApiResult } from "@/lib/api";

type ReviewActionType = ApiResult<null>

export default function ReviewItemDeleteButton({ reviewId, movieId }: { reviewId: number, movieId: number }) {
  const [state, formAction, isPending] = useActionState<ReviewActionType, FormData>(deleteReviewAction, {
    status: 'success',
    data: null,
  })

  useEffect(() => {
    if (state?.status === "error") {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly/>
      <input name="movieId" value={movieId} hidden readOnly/>
      <button
        type="submit"
        disabled={isPending}
        className="
          text-sm
          text-gray-500
          cursor-pointer
          underline
          hover:text-gray-400
          disabled:text-gray-300
          disabled:no-underline
          disabled:cursor-not-allowed
        "
      >
        {isPending ? '삭제 중...' : '🗑리뷰 삭제하기'}
      </button>
    </form>
  );
}