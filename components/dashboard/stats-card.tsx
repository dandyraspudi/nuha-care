import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  desc: string;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, desc, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-2 text-3xl font-bold">{value}</h3>

          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
