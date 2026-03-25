import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default async function LandingPage() {
  const cookieStore = cookies();
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>You are not logged in.</p>
    </div>
  );
}
