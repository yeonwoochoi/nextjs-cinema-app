'use client'

import {useActionState, useEffect} from "react"
import {createReviewAction} from "@/actions/create-review.action"

type ReviewActionState = {
  status: boolean;
  error?: string;
}

export default function ReviewEditor({bookId}: { bookId: string }) {
  const [state, formAction, isPending] = useActionState<ReviewActionState, FormData>(createReviewAction, null)

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error)
    }
  }, [state]);

  return (
    <section className="mt-16 mb-24">
      <form action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          className="w-full p-4 border border-gray-400 min-h-32"
          disabled={isPending}
          name="content"
          required
          placeholder="리뷰 내용"
        />
        <div className="flex justify-end h-12 mt-2">
          <input
            className="border border-gray-400 w-full sm:w-64 px-2 mr-4"
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button
            className="bg-white text-black px-2 sm:px-4 sm:w-28 w-32 font-bold hover:bg-gray-100"
            disabled={isPending}
            type="submit"
          >
            작성하기
          </button>
        </div>
      </form>
    </section>
  )
}
