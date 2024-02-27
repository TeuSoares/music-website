import Footer from '@/components/footer'
import Header from '@/components/header'
import Loading from '@/components/layout/loading'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayoutMusic({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Toaster />
      <Loading />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
