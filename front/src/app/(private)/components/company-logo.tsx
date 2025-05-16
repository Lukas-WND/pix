import { Button } from "@/components/ui/button";
import { ChevronsUpDown, GalleryVerticalEndIcon } from "lucide-react";

export function CompanyLogo() {
  return (
    <div className="flex gap-2 p-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEndIcon className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Canvi Billing</span>
        <span className="truncate text-xs">Enterprise</span>
      </div>
    </div>
  );
}
