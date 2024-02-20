import { ReactNode } from 'react'

export default function RootLayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {children}
    </div>
  )
}
