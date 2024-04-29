import { ReactNode } from 'react'

import Center from '@/components/layout/center'
import Loading from '@/components/layout/loading'
import { Card } from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayoutAuth({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <Loading />
      <Center>
        <Card className="min-[450px]:w-[450px]">{children}</Card>
      </Center>
    </>
  )
}
