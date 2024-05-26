import { SidebarSection } from "@/typings/sidebar";
import { RxDashboard as DashboardIcon } from "react-icons/rx";
import { GoProjectSymlink as ProjectIcon } from "react-icons/go";
import { BiScan as ScanIcon } from "react-icons/bi";
import { PiRocketLaunchLight as DeployIcon } from "react-icons/pi";
import { GoTasklist as TaskIcon } from "react-icons/go";
import { VscOrganization as OrganizationIcon } from "react-icons/vsc";
import { GoProjectRoadmap as CloudProjectIcon } from "react-icons/go";
import { IoIosNotificationsOutline as NotificationIcon } from "react-icons/io";
import { PiSlackLogoThin as SlackIcon } from "react-icons/pi";
import { PiWebhooksLogoThin as WebhookIcon } from "react-icons/pi";

export const sidebarItems: SidebarSection[] = [
  {
    title: "",
    items: [{ url: "/", label: "Dashboard", icon: <DashboardIcon /> }],
  },
  {
    title: "",
    items: [{ url: "/projects", label: "Projects", icon: <ProjectIcon /> }],
  },
  {
    title: "",
    items: [{ url: "/scan", label: "Scan", icon: <ScanIcon /> }],
  },
  {
    title: "",
    items: [{ url: "/deploy", label: "Deploy", icon: <DeployIcon /> }],
  },
  {
    title: "",
    items: [{ url: "/tasks", label: "Tasks", icon: <TaskIcon /> }],
  },
  {
    title: "Cloud",
    items: [
      {
        url: "/organization",
        label: "Organization",
        icon: <OrganizationIcon />,
      },
      { url: "/cloud-projects", label: "Projects", icon: <CloudProjectIcon /> },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        url: "/notification",
        label: "Notification",
        icon: <NotificationIcon />,
      },
      { url: "/slack", label: "Slack", icon: <SlackIcon /> },
      { url: "/webhook", label: "Webhook", icon: <WebhookIcon /> },
    ],
  },
];
