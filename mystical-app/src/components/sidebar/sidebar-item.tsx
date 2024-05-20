"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarType } from "@/typings/sidebar";

export function SidebarItem({ url, icon, label }: SidebarType) {
  const pathname = usePathname();

  return (
    <Link
      className={`flex w-fit items-center gap-2 ${
        pathname === url ? "font-semibold border-b-2" : ""
      }`}
      href={url}
    >
      {icon}
      {label}
    </Link>
  );
}
