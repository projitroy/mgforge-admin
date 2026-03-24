import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    redirect("/login");
  } else {
    const isValid = verifyToken(session);
    if (!isValid) {
      redirect("/login");
    }
  }

  return children;
}
