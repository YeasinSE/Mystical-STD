import { SidebarType } from "@/typings/sidebar";
import {
  DashboardIcon,
  BarChartIcon,
  MagnifyingGlassIcon,
  RocketIcon,
  ReaderIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

export const sidebarItems: SidebarType[] = [
  { url: "/", label: "Dashboard", icon: <DashboardIcon /> },
  { url: "/projects", label: "Projects", icon: <BarChartIcon /> },
  { url: "/scan", label: "Scan", icon: <MagnifyingGlassIcon /> },
  { url: "/deploy", label: "Deploy", icon: <RocketIcon /> },
  { url: "/tasks", label: "Tasks", icon: <ReaderIcon /> },
  { url: "/organization", label: "Organization", icon: <HomeIcon /> },
];
