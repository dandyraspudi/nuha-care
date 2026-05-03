"use client";

import { usePatientStore } from "@/store/patient-store";

export default function RecentActivity() {
  const { patients } = usePatientStore();

  const activities = [...patients]
    .sort(
      (a, b) =>
        new Date(b.admissionDate).getTime() -
        new Date(a.admissionDate).getTime()
    )
    .slice(0, 4);

  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">Aktivitas Terbaru</h3>

      <div className="mt-4 space-y-3">
        {activities.length > 0 ? (
          activities.map((patient) => (
            <div
              key={patient.id}
              className="rounded-xl bg-muted p-3 text-sm text-muted-foreground"
            >
              <p className="font-medium text-foreground">{patient.name}</p>
              <p>
                Masuk ke {patient.room} pada {patient.admissionDate}
              </p>
              <p>
                {patient.diagnosis} - {patient.doctor}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
            Belum ada aktivitas pasien.
          </div>
        )}
      </div>
    </div>
  );
}
