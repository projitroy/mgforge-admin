'use client';

import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import { NavMain } from "@/src/components/sidebar/NavMain";
import { NavUser } from "@/src/components/sidebar/NavUser";
import { TeamSwitcher } from "@/src/components/sidebar/TeamSwitch";
import { userAuth } from "@/src/context/AuthContext";
import { LayoutDashboard, Settings, Users, FolderDot, ChevronDown, User2, Home, GalleryVerticalEnd } from "lucide-react"

const menuItems = [
  { title: "Dashboard", href: "/dashboard", permission: null, icon: LayoutDashboard },
  { title: "Tenants", href: "/tenants", permission: "tenant.manage", icon: FolderDot },
  { title: "Users", href: "/users", permission: "user.view", icon: Users, childrens: [] },
  { title: "Settings", href: "/settings", permission: "manage_settings", icon: Settings },
];

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
];

const user = {
  name: "CN",
  email: " ",
  avatar: ""
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { can } = userAuth();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}