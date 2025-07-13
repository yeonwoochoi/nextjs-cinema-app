import {ReviewData} from "@/types/types";

export default function ReviewItem({createdAt, content, author}: ReviewData) {
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
        <button className="text-sm text-gray-500 cursor-pointer underline">🗑리뷰 삭제하기</button>
      </div>
    </div>
  )
}
