"use client";

import Link from "next/link";
import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { SidebarItem as SidebarItemProps } from "@/typings/sidebar";

export function SidebarItem({
  url,
  icon,
  label,
}: SidebarItemProps): ReactElement | null {
  const pathname = usePathname();
  return (
    <Link
      className={`flex w-fit items-center gap-2 ${
        pathname === url ? "font-semibold" : "dark:font-light"
      }`}
      href={url}
    >
      {icon}
      {label}
    </Link>
  );
}
