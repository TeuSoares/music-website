'use client'

import { useAppContext } from '@/hooks'

import { Loader2 } from 'lucide-react'

const Loading = () => {
  const { isLoading } = useAppContext()

  return (
    <>
      {isLoading && (
        <div className="absolute">
          <div className="w-[100vw] h-[100vh] p-4 bg-black/30">
            <Loader2 className="h-20 w-20 text-[#BC2627] animate-spin" />
          </div>
        </div>
      )}
    </>
  )
}

export default Loading
