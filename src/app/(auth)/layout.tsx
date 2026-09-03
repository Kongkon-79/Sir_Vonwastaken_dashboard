import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-shell relative min-h-screen">
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-medium leading-normal text-slate-200 shadow-sm transition hover:border-cyan-400/50 hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go to Dashboard</span>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default AuthLayout
