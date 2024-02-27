import LinkUnderline from '@/components/layout/link-underline'
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const CardFailed = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Email verification failed</CardTitle>
        <CardDescription>
          Your email verification attempt failed. This may have happened because
          of a server problem. Please try again later
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <LinkUnderline href="/" className="mt-2">
          Click here to return to home page
        </LinkUnderline>
      </CardFooter>
    </>
  )
}

export default CardFailed
