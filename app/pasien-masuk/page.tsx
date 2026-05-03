import AppLayout from "@/components/common/app-layout";

export default function PasienMasukPage() {
  return (
    <AppLayout>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Pasien Masuk</h1>
        <p className="text-muted-foreground">
          Form dan ringkasan pasien masuk akan ditampilkan di sini.
        </p>
      </div>
    </AppLayout>
  );
}
