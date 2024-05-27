'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Button, ButtonProps } from '../ui/button'

interface Props extends ButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  className?: string
  testid?: string
}

const GhostButton = ({
  children,
  onClick,
  className = '',
  testid = '',
}: Props) => {
  return (
    <Button
      variant="ghost"
      data-testid={testid}
      size="icon"
      className={`hover:bg-[#BC2627] hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default GhostButton
