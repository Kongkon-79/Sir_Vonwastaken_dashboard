"use client";

import { StateError } from "@/components/shared/async-states";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="studio-shell grid min-h-screen place-items-center px-4"><div className="w-full max-w-xl"><StateError message={error.message || "The dashboard could not load right now."} action={{ label: "Reload page", onClick: reset }} /></div></main>;
}
