import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FileFieldProps {
  name: string
  label?: string
  description?: string | ReactNode
  disabled?: boolean
  className?: string
}

const FileField = ({
  name,
  label,
  description,
  className,
  disabled = false,
}: FileFieldProps) => {
  const { control, register } = useFormContext()

  const fileRef = register(name)

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={() => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type="file" {...fileRef} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileField
