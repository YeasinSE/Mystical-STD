import { sidebarItems } from "@/constants/sidebar-list";
import { SidebarSection } from "@/components/sidebar/sidebar-section";

export function Sidebar() {
  return (
    <aside className="sticky left-0 w-[120px] top-[80px] h-[calc(100vh-64px-33px)]">
      <div className="flex flex-col gap-2">
        {sidebarItems?.map((item, index) => (
          <SidebarSection {...item} key={`sidebar-section-${index}`} />
        ))}
      </div>
    </aside>
  );
}
