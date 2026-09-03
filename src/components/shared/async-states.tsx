import type React from "react";
import { AlertCircle, FileQuestion, RefreshCw } from "lucide-react";

type StateAction = { label: string; onClick: () => void };

export function StateSkeleton({ variant = "cards" }: { variant?: "cards" | "panel" | "list" | "profile" }) {
  if (variant === "list") return <div className="studio-state space-y-3" aria-label="Loading"><div className="studio-skeleton h-16" /><div className="studio-skeleton h-16" /><div className="studio-skeleton h-16" /></div>;
  if (variant === "profile") return <div className="studio-state space-y-4" aria-label="Loading"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="studio-skeleton h-32" />)}</div><div className="studio-skeleton h-64" /></div>;
  if (variant === "panel") return <div className="studio-state space-y-3" aria-label="Loading"><div className="studio-skeleton h-8 w-1/3" /><div className="studio-skeleton h-24" /><div className="studio-skeleton h-24" /></div>;
  return <div className="studio-state grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="studio-skeleton h-56" />)}</div>;
}

export function StateError({ message, action }: { message: string; action?: StateAction }) {
  return <div className="studio-state studio-state-error rounded-2xl border p-5" role="alert"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><h2 className="font-semibold">Something went wrong</h2><p className="mt-1 text-sm">{message}</p>{action && <button onClick={action.onClick} className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"><RefreshCw className="h-3.5 w-3.5" />{action.label}</button>}</div></div></div>;
}

export function StateEmpty({ title = "Nothing here yet", message, action }: { title?: string; message: string; action?: React.ReactNode }) {
  return <div className="studio-state studio-state-empty rounded-2xl border border-dashed p-10 text-center"><FileQuestion className="mx-auto h-8 w-8" /><h2 className="mt-3 font-semibold">{title}</h2><p className="mx-auto mt-1 max-w-md text-sm">{message}</p>{action && <div className="mt-4">{action}</div>}</div>;
}

export function AuthSkeleton() {
  return <div className="auth-form-skeleton space-y-4" aria-label="Loading"><div className="mx-auto h-10 w-10 rounded-xl bg-white/10" /><div className="mx-auto h-8 w-2/3 rounded-lg bg-white/10" /><div className="h-11 rounded-xl bg-white/10" /><div className="h-11 rounded-xl bg-white/10" /><div className="h-11 rounded-xl bg-cyan-300/20" /></div>;
}
