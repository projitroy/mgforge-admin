'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import Link from "next/link";
import {userAuth} from "@/src/context/AuthContext";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", permission: null },
  { label: "Users", href: "/users", permission: "view_users" },
  { label: "Settings", href: "/settings", permission: "manage_settings" },
] as const;

export function AppSidebar() {

  const {can} = userAuth();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        {menuItems.filter(item => !item.permission || can(item.permission as any)).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}