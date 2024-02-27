'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

import Loading from '@/components/layout/loading'
import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

export default function RootLayoutProtected({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Toaster />
      <Loading />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
