import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthProvider } from "@/src/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/AppSideBar";

export default async function LandingPage({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const session = (await cookies()).get("session")?.value;

  // if (!session) {
  //   redirect('/auth/login');
  // }

  return (
    <SidebarProvider>
      <AuthProvider user={null}>
        <AppSidebar />
      </AuthProvider>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
