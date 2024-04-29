'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Button, ButtonProps } from '../ui/button'

interface Props extends ButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  className?: string
}

const GhostButton = ({ children, onClick, className = '' }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hover:bg-[#BC2627] hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default GhostButton
