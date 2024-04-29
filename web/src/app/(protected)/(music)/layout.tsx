import Footer from '@/components/footer'
import Header from '@/components/header'
import Container from '@/components/layout/container'

export default function RootLayoutMusic({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col h-full">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
