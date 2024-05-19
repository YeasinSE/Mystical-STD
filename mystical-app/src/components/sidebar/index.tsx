import { sidebarItems } from "@/constants/sidebar-list";
import { SidebarItem } from "@/components/sidebar/sidebar-item";

export function Sidebar() {
  return (
    <aside className="sticky left-0 w-[120px] top-[80px] h-[calc(100vh-64px-33px)]">
      <div className="flex flex-col gap-8">
        {sidebarItems?.map((item, index) => (
          <SidebarItem {...item} key={`sidebar-item-${item?.url}-${index}`} />
        ))}
      </div>
    </aside>
  );
}
