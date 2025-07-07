import { MovieData } from "../types/types";
import Link from "next/link";

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  const path = `/movie/${id}`;

  return (
    <Link href={path}>
      <img src={posterImgUrl} />
    </Link>
  )
}