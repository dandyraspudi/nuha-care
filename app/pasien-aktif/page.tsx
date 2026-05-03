import AppLayout from "@/components/common/app-layout";
import PatientTable from "@/components/pasien/patient-table";

export default function PasienAktifPage() {
  return (
    <AppLayout>
      <div className="space-y-6 bg-white rounded-md p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Daftar Pasien Aktif</h1>

          <p className="text-muted-foreground">
            Daftar pasien yang sedang menjalani rawat inap.
          </p>
        </div>

        <PatientTable />
      </div>
    </AppLayout>
  );
}
