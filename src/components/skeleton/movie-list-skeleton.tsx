import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";

export default function MovieListSkeleton({ count, itemsPerRow = 3 }: { count: number, itemsPerRow?: number }) {
  const getGridColsClass = (n: number) => `grid-cols-${n}`;

  return (
    <div className={`grid ${getGridColsClass(itemsPerRow)} gap-1`}>
      {new Array(count).fill(0).map((_, idx) => <MovieItemSkeleton key={`movie-skeleton-item-${idx}`} />)}
    </div>
  )
}