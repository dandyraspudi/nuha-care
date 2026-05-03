import Link from "next/link";
import { FilePlus2, Users } from "lucide-react";

export default function QuickAction() {
  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">Quick Action</h3>

      <div className="mt-4 grid gap-3">
        <Link
          href="/pasien-masuk"
          className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-primary-foreground transition hover:bg-primary/90"
        >
          <FilePlus2 size={18} />
          Tambah Pasien Masuk
        </Link>

        <Link
          href="/pasien-aktif"
          className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3 text-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          <Users size={18} />
          Lihat Pasien Aktif
        </Link>
      </div>
    </div>
  );
}
