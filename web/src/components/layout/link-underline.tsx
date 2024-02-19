import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, RefAttributes } from 'react'

type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  RefAttributes<HTMLAnchorElement>

const LinkUnderline = ({ href, children, className, ...rest }: Props) => {
  return (
    <Link
      href={href}
      className={`hover:underline text-sm text-blue-600 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default LinkUnderline
