import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-[1180px]:w-[1180px] ml-auto mr-auto py-10 px-5 flex-1">
      {children}
    </div>
  )
}

export default Container
