export default function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800"
        />
      ))}
    </div>
  );
}
