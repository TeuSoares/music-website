'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="p-4 text-center bg-[#111111]">
      <Button className="bg-transparent hover:bg-transparent font-bold" asChild>
        <Link href="/dashboard" className="text-white hover:text-[#BC2627]">
          Dashboard
        </Link>
      </Button>

      <Button className="bg-transparent hover:bg-transparent text-white font-bold hover:text-[#BC2627]">
        Logout
      </Button>
    </header>
  )
}

export default Header
