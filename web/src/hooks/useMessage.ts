import { useToast } from '@/components/ui/use-toast'

interface Message {
  title?: string
  description: string
  status: 'success' | 'info' | 'warning' | 'error'
}

export const useMessage = () => {
  const { toast } = useToast()

  const setMessage = (message: Message): void => {
    let background

    switch (message.status) {
      case 'success':
        background = 'bg-green-500'
        break

      case 'info':
        background = 'bg-blue-500'
        break

      case 'warning':
        background = 'bg-yellow-500'
        break

      default:
        background = ''
    }

    toast({
      title: message.title,
      description: message.description,
      variant: message.status == 'error' ? 'destructive' : 'default',
      className: `border-transparent ${background}`,
    })
  }

  return { setMessage }
}
