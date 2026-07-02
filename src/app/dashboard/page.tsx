export default function DashboardPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="rounded-xl bg-white p-10 shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-4 text-slate-600">You are authenticated and can access protected pages.</p>
      </div>
    </main>
  );
}
