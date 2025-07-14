'use server'

import { ApiResult, fetchApi } from "@/lib/api";
import { revalidateTag } from "next/cache";
import delay from "@/utils/delay";

export async function deleteReviewAction(_: any, formData: FormData): Promise<ApiResult<null>> {
  const reviewId = formData.get('reviewId')?.toString()
  const movieId = formData.get('movieId')?.toString()

  if (!reviewId) {
    return {
      status: 'error',
      error: "삭제할 리뷰 정보가 없습니다."
    }
  }

  const result: ApiResult<any> = await fetchApi(`/review/${reviewId}`, {
    method: 'DELETE'
  })

  await delay(2000)

  if (result.status === "error") {
    return {
      status: 'error',
      error: "리뷰 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
    }
  }

  revalidateTag(`review-${movieId}`)
  return {
    status: "success",
    data: null
  }
}
