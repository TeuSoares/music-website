import LinkUnderline from '@/components/layout/link-underline'
import { CardFooter } from '@/components/ui/card'

interface CardFooterLinkProps {
  description: string
  textLink: string
  href: string
}

const CardFooterLink = ({
  description,
  textLink,
  href,
}: CardFooterLinkProps) => {
  return (
    <CardFooter className="flex justify-center text-sm max-[450px]:flex-col">
      {description}
      <LinkUnderline href={href} className="ml-1">
        {textLink}
      </LinkUnderline>
    </CardFooter>
  )
}

export default CardFooterLink
