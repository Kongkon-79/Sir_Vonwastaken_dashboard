import React, { Suspense } from 'react'
import OtpForm from './_components/otp-form'
import { AuthSkeleton } from '@/components/shared/async-states'

const OtpPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center px-4 py-16'>
        <Suspense fallback={<AuthSkeleton />}>
          <OtpForm />
        </Suspense>
    </main>)
}
export default OtpPage
