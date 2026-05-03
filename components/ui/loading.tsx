import { cn } from "@/lib/utils";

interface LoadingProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

const sizeClass = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

export default function Loading({
  label = "Memuat data...",
  size = "md",
  fullScreen = false,
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullScreen && "min-h-screen",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "animate-spin rounded-full border-muted border-t-primary",
          sizeClass[size]
        )}
      />
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}
