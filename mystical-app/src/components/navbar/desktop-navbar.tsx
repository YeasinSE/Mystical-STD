"use client"
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/providers/auth-provider";

export function DesktopNavbar() {
  const {logout} = useAuth()
  return (
    <div className="hidden sm:flex items-center gap-4">
      <Button onClick={logout} variant="outline">Sign out</Button>
      <ThemeToggle />
    </div>
  );
}
