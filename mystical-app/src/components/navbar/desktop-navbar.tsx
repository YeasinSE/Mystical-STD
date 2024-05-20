import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function DesktopNavbar() {
  return (
    <div className="hidden sm:flex items-center gap-4">
      <Button variant="outline">Sign out</Button>
      <ThemeToggle />
    </div>
  );
}
