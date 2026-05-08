"use client";

import ThemeToggle from "./theme-toggle";
import MobileSidebar from "./mobile-sidebar";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 text-card-foreground">
      <div className="flex items-center gap-3">
        <MobileSidebar />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="text-sm">
          <p className="font-medium">Admin RS</p>
          <p className="text-muted-foreground">Administrator</p>
        </div>
      </div>
    </header>
  );
}
