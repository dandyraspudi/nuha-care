import AppLayout from "@/components/common/app-layout";

import StatsCard from "@/components/dashboard/stats-card";
import QuickAction from "@/components/dashboard/quick-action";
import RecentActivity from "@/components/dashboard/recent-activity";

import { Users, CalendarCheck, BedDouble, Stethoscope } from "lucide-react";

export default function HomePage() {
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
            value="128"
            desc="+12 minggu ini"
            icon={Users}
          />

          <StatsCard
            title="Masuk Hari Ini"
            value="18"
            desc="Update realtime"
            icon={CalendarCheck}
          />

          <StatsCard
            title="Ruangan Terisi"
            value="87%"
            desc="32 / 37 kamar"
            icon={BedDouble}
          />

          <StatsCard
            title="Dokter Bertugas"
            value="14"
            desc="Shift aktif"
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
