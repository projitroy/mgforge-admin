"use client"

import { ReactNode } from "react"
import { AuthProvider, AuthUser } from "@/src/context/AuthContext"
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/AppSideBar"



export function RootLayoutWrapper({
  children,
  isLoggedIn,
  user
}: {
  children: ReactNode
  isLoggedIn: boolean
  user: AuthUser | null
}) {
  if (!isLoggedIn) {
    return <AuthProvider user={null}>{children}</AuthProvider>
  }

  return (
    <AuthProvider user={user}>
      {isLoggedIn ? (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      ) : (children)}
    </AuthProvider>
  )
}
