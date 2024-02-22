import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { AppContextProvider } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Website',
  description: 'Your favorite songs in just one place.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1e1e20]`}>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  )
}
