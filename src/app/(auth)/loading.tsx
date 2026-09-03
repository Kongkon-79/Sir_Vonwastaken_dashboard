import { AuthSkeleton } from "@/components/shared/async-states";

export default function AuthLoading() {
  return <main className="auth-shell grid min-h-screen place-items-center px-4"><div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/90 p-6"><AuthSkeleton /></div></main>;
}
