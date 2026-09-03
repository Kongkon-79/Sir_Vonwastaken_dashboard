"use client";

import { StateError } from "@/components/shared/async-states";

export default function AuthError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="auth-shell grid min-h-screen place-items-center px-4"><div className="w-full max-w-md"><StateError message={error.message || "This authentication page could not load."} action={{ label: "Try again", onClick: reset }} /></div></main>;
}
