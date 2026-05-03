import AppLayout from "@/components/common/app-layout";
import PatientForm from "@/components/pasien/patient-form";

export default function PasienMasukPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">
            Pasien Masuk
        </h1>

        <PatientForm />
      </div>
    </AppLayout>
  );
}
