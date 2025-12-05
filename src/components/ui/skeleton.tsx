import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/80", className)}
      {...props}
    />
  )
}

function PricingCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="pt-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingSectionSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <PricingCardSkeleton key={i} />
      ))}
    </div>
  );
}

function CheckoutPlanSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="pt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Skeleton, PricingCardSkeleton, PricingSectionSkeleton, CheckoutPlanSkeleton }
