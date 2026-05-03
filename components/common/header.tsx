"use client";

import ThemeToggle from "./theme-toggle";
import { Bell } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 text-card-foreground">
      <div className="flex items-center gap-3">
        <MobileSidebar />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl border bg-background p-2 text-foreground transition hover:bg-accent hover:text-accent-foreground">
          <Bell size={18} />
        </button>

        <ThemeToggle />

        <div className="text-sm">
          <p className="font-medium">Admin RS</p>
          <p className="text-muted-foreground">Administrator</p>
        </div>
      </div>
    </header>
  );
}
