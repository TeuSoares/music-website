import { HTMLAttributes, ReactNode } from 'react'

interface TailwindProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface Props {
  children: ReactNode
}

const Center = ({ children, className }: Props & TailwindProps) => {
  return (
    <div className={`h-full flex justify-center items-center ${className}`}>
      {children}
    </div>
  )
}

export default Center
