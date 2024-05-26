import { SidebarSection as SidebarSectionProps } from "@/typings/sidebar";
import { SidebarItem } from "./sidebar-item";

export function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    <>
      {title ? (
        <span className="dark:text-gray-500 text-gray-400 text-sm mt-4">
          {title}
        </span>
      ) : null}
      {items?.map((item, index) => (
        <SidebarItem key={`sidebar-item-${index}`} {...item} />
      ))}
    </>
  );
}
