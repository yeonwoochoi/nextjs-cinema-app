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
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="px-2 py-1 outline rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

      />
      <button onClick={onSubmit} className="ml-2 px-3 py-1 bg-gray-200 text-black border-1 border-gray-400 rounded hover:bg-gray-400">검색</button>
    </div>
  )
}