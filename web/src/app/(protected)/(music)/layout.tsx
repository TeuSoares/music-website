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
      <main className="py-10 px-5">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
