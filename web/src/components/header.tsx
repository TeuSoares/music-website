'use client'

import Link from 'next/link'

import { useLogout } from '@/hooks/useLogout'

import { Button } from '@/components/ui/button'

const Header = () => {
  const { handleLogout } = useLogout()

  return (
    <header className="p-4 text-center bg-[#111111]">
      <Button className="bg-transparent hover:bg-transparent font-bold" asChild>
        <Link href="/dashboard" className="text-white hover:text-[#BC2627]">
          Dashboard
        </Link>
      </Button>

      <Button
        className="bg-transparent hover:bg-transparent text-white font-bold hover:text-[#BC2627]"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  )
}

export default Header
