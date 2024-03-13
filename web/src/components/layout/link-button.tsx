import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

import { Button, ButtonProps } from '../ui/button'

interface Props extends ButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  href: string
  className?: string
}

const LinkButton = ({ label, href, className = '' }: Props) => {
  return (
    <Button
      className={`bg-transparent hover:bg-transparent font-bold text-white hover:text-[#BC2627] ${className}`}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default LinkButton
