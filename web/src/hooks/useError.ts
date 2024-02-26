import { useMessage } from './useMessage'

interface Params {
  response: {
    data: {
      errors: { [x: string]: Array<string> | string }
    }
  }
}

export const useError = () => {
  const { setMessage } = useMessage()

  const setError = (instance: Params, keys: Array<string> = []) => {
    if (!instance.response.data.errors) {
      setMessage({
        description:
          'There was an error while the server was processing the request.',
        status: 'error',
      })
      return
    }

    const errors = instance.response.data.errors

    for (const key of keys) {
      if (errors[key]) {
        setMessage({ description: errors[key][0], status: 'error' })
        return
      }
    }

    if (errors.request) {
      setMessage({ description: errors.request[0], status: 'error' })
      return
    }

    setMessage({ description: errors[0] as string, status: 'error' })
  }

  return { setError }
}
