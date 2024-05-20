import Link from "next/link";
import { Separator } from "@/components/ui";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50  dark:bg-black bg-white">
      <div className="container flex items-center h-16">
        <nav className="flex-1 flex justify-between items-center">
          <Link href="/">MYSTICAL.io</Link>
          <DesktopNavbar />
          <MobileNavbar />
        </nav>
      </div>
      <Separator orientation="horizontal" />
    </header>
  );
}
