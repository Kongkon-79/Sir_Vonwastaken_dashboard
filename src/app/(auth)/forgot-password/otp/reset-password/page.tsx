import React, { Suspense } from 'react'
import ResetPasswordForm from './_components/reset-password-form'
import { AuthSkeleton } from '@/components/shared/async-states'
const ResetPasswordPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center px-4 py-16'>
        <Suspense fallback={<AuthSkeleton />}>
          <ResetPasswordForm />
        </Suspense>
    </main>)
}
export default ResetPasswordPage
