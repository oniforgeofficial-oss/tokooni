export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card animate-pulse">
      {/* Image area */}
      <div className="aspect-square bg-muted" />
      {/* Content */}
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
        <div className="h-3 w-2/5 rounded bg-muted" />
        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="h-5 w-1/2 rounded bg-muted" />
          <div className="size-9 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
