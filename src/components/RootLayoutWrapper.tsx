"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/src/context/AuthContext"
import { SidebarProvider } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/AppSideBar"

export function RootLayoutWrapper({
  children,
  isLoggedIn,
}: {
  children: ReactNode
  isLoggedIn: boolean
}) {
  if (!isLoggedIn) {
    return <AuthProvider user={null}>{children}</AuthProvider>
  }

  return (
    <AuthProvider user={null}>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </AuthProvider>
  )
}
