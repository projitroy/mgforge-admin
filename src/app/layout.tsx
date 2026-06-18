import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { RootLayoutWrapper } from "@/src/components/RootLayoutWrapper";

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
  const session = cookieStore.get('session');
  const isLoggedIn = Boolean(session?.value);

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`antialiased`}>
        <RootLayoutWrapper isLoggedIn={isLoggedIn}>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
