import {ReviewData} from "@/types/types";
import ReviewItemDeleteButton from "@/components/review/review-item-delete-button";

export default function ReviewItem({ id, createdAt, content, author, movieId }: ReviewData) {
  return (
    <div>
      <div className="flex items-center leading-relaxed tracking-wide">
        <div className="font-bold mr-2">{author}</div>
        <div className="text-sm text-gray-400">{new Date(createdAt).toLocaleDateString()}일 작성됨</div>
      </div>
      <div className="mt-6 mb-4">
        {content}
      </div>
      <div>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  )
}
