'use server'

import { ApiResult, fetchApi } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { ReviewData } from "@/types/types";

export async function createReviewAction(_: any, formData: FormData): Promise<ApiResult<ReviewData | null>> {
  const movieId = formData.get("movieId")?.toString()
  const content = formData.get("content")?.toString()
  const author = formData.get("author")?.toString()

  if (!movieId || !content || !author) {
    return {
      status: "error",
      error: "리뷰 내용과 작성자를 입력해주세요"
    }
  }

  const result: ApiResult<ReviewData | null> = await fetchApi("/review", {
    method: "POST",
    body: JSON.stringify({ movieId, content, author })
  })

  if (result.status === "error") {
    return {
      status: 'error',
      error: "리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요."
    }
  }

  revalidateTag(`review-${movieId}`)
  return {
    status: "success",
    data: result.data
  }
}
