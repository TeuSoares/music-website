import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayoutAuth({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Card className="min-[450px]:w-[450px]">{children}</Card>
      </div>
    </>
  )
}
