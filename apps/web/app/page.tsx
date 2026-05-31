import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/DashboardShell";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
        <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/70 p-6 text-center">
          <h1 className="text-xl font-semibold">MineGuardian Control Plane</h1>
          <p className="text-sm text-slate-300">
            Sign in with Clerk to access server status and lifecycle actions.
          </p>
          <SignInButton mode="redirect">
            <button className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400">
              Sign in
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  return (
    <div className="relative">
      <div className="absolute right-4 top-4 z-20">
        <UserButton />
      </div>
      <DashboardShell />
    </div>
  );
}