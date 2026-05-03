import AppLayout from "@/components/common/app-layout";
import PatientTable from "@/components/pasien/patient-table";

export default function PasienAktifPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Daftar Pasien Aktif</h1>

          <p className="text-muted-foreground">
            Monitoring seluruh pasien rawat inap aktif
          </p>
        </div>

        <PatientTable />
      </div>
    </AppLayout>
  );
}
