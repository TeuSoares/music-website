'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="p-4 text-center bg-[#111111]">
      <Button className="bg-transparent hover:bg-transparent font-bold" asChild>
        <Link href="/dashboard" className="text-white hover:text-[#9466FF]">
          Dashboard
        </Link>
      </Button>

      <Button className="bg-transparent hover:bg-transparent text-white font-bold hover:text-[#9466FF]">
        Logout
      </Button>
    </header>
  )
}
