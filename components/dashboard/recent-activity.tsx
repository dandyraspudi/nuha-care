export default function RecentActivity() {
  const logs = [
    "Andi Wijaya masuk ke VIP 1",
    "Siti Rahma dipindah ke Kelas 1A",
    "Budi Santoso selesai tindakan",
    "Ruangan VIP 2 tersedia",
  ];

  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">Aktivitas Terbaru</h3>

      <div className="mt-4 space-y-3">
        {logs.map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-muted p-3 text-sm text-muted-foreground"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
