"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export default function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState("")

  const q = searchParams.get("q")

  useEffect(() => {
    setSearch(q || "")
  }, [q])

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <div className="flex w-full gap-2 h-12 mt-2 mb-6">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="flex-1 px-4 bg-transparent border border-gray-400 placeholder-gray-600 rounded-md"

      />
      <button className="w-[80px] bg-[#434343] rounded-md cursor-pointer" onClick={onSubmit}>
        검색
      </button>
    </div>
  )
}