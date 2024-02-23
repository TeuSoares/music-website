'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { useAppContext, useError, useMessage } from '@/hooks'
import { handleLogout } from '@/services/http/logout'

const Header = () => {
  const { setError } = useError()
  const { setMessage } = useMessage()
  const { setIsLoading } = useAppContext()
  const router = useRouter()

  const logout = async () => {
    setIsLoading(true)

    try {
      const data = await handleLogout()

      setMessage({
        description: data.message,
        status: 'success',
      })

      router.push('login')
    } catch (error: any) {
      setError(error)
    }

    setIsLoading(false)
  }

  return (
    <header className="p-4 text-center bg-[#111111]">
      <Button className="bg-transparent hover:bg-transparent font-bold" asChild>
        <Link href="/dashboard" className="text-white hover:text-[#BC2627]">
          Dashboard
        </Link>
      </Button>

      <Button
        className="bg-transparent hover:bg-transparent text-white font-bold hover:text-[#BC2627]"
        onClick={logout}
      >
        Logout
      </Button>
    </header>
  )
}

export default Header
