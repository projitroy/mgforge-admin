import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { RootLayoutWrapper } from "@/src/components/RootLayoutWrapper";
import { verifyToken } from "../lib/auth/jwt";
import { Role } from "../lib/rbac";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "MGForge-ADMIN",
  description: "MGForge-ADMIN",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("access_token")?.value;

  let user = null;

  if (session) {
    const payload = verifyToken(session);

    if (payload && typeof payload === "object") {
      user = {
        id: payload.sub as string,
        tenantId: payload.tid as string,
        roles: (payload.roles ?? []) as Role[],
      };
    }
  }

  const isLoggedIn = Boolean(user);

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`antialiased`}>
        <RootLayoutWrapper isLoggedIn={isLoggedIn} user={user}>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
