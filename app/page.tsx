"use client";

import { useMemo } from "react";
import AppLayout from "@/components/common/app-layout";

import StatsCard from "@/components/dashboard/stats-card";
import QuickAction from "@/components/dashboard/quick-action";
import RecentActivity from "@/components/dashboard/recent-activity";
import { usePatientStore } from "@/store/patient-store";

import { Users, CalendarCheck, BedDouble, Stethoscope } from "lucide-react";

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function HomePage() {
  const { patients } = usePatientStore();

  const stats = useMemo(() => {
    const today = getLocalDateKey(new Date());
    const admittedToday = patients.filter(
      (patient) => patient.admissionDate === today
    ).length;
    const activeRooms = new Set(patients.map((patient) => patient.room));
    const activeDoctors = new Set(patients.map((patient) => patient.doctor));

    return {
      activePatients: patients.length,
      admittedToday,
      activeRooms: activeRooms.size,
      activeDoctors: activeDoctors.size,
    };
  }, [patients]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Rawat Inap</h1>

          <p className="text-muted-foreground">
            Monitoring pasien dan operasional rumah sakit
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Pasien Aktif"
            value={String(stats.activePatients)}
            desc="Total pasien rawat inap"
            icon={Users}
          />

          <StatsCard
            title="Masuk Hari Ini"
            value={String(stats.admittedToday)}
            desc="Berdasarkan tanggal masuk"
            icon={CalendarCheck}
          />

          <StatsCard
            title="Ruangan Dipakai"
            value={String(stats.activeRooms)}
            desc="Ruangan unik terisi"
            icon={BedDouble}
          />

          <StatsCard
            title="Dokter Bertugas"
            value={String(stats.activeDoctors)}
            desc="Dokter menangani pasien"
            icon={Stethoscope}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentActivity />
          </div>

          <QuickAction />
        </div>
      </div>
    </AppLayout>
  );
}
