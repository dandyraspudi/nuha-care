"use client";

import Link from "next/link";
import { LayoutDashboard, Users, FilePlus2, BedDouble } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";

const menus = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Pasien Masuk",
    href: "/pasien-masuk",
    icon: FilePlus2,
  },
  {
    name: "Pasien Aktif",
    href: "/pasien-aktif",
    icon: Users,
  },
];

interface SidebarProps {
  mobile?: boolean;
}

export default function Sidebar({ mobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 flex-col bg-card text-card-foreground md:border-r ${
        mobile ? "flex h-full" : "hidden md:flex h-screen"
      }`}
    >
      {/* Header */}
      <div className="border-b p-6">
        <h1 className="text-xl font-bold text-blue-600">NUHA CARE</h1>

        <p className="text-sm text-muted-foreground">Sistem Rumah Sakit</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-accent hover:text-accent-foreground ${menu.href === pathname ? "bg-accent text-accent-foreground" : ""}`}
            >
              <Icon size={18} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <div className="rounded-xl bg-primary/10 p-4 text-primary text-center">
          <BedDouble size={20} />
          <p className="mt-2 text-sm">Rawat Inap Management</p>
        </div>
      </div>
    </aside>
  );
}
