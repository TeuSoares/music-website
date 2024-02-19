import { ButtonHTMLAttributes } from 'react'

import { ButtonProps, Button } from '@/components/ui/button'

const FormButton = ({
  className,
  children,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      type="submit"
      className={`bg-[#BC2627] hover:bg-[#9e3535] w-full ${className}`}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default FormButton
