"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "./sidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="rounded-xl border bg-background p-2 text-foreground transition hover:bg-accent hover:text-accent-foreground md:hidden">
        <Menu size={20} />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <Sidebar mobile />
      </SheetContent>
    </Sheet>
  );
}
