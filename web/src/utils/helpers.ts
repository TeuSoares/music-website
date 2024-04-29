export const builderQueryParams = (data: { [attr: string]: any }) =>
  new URLSearchParams(data).toString()

export const setHours = (hours: number): Date => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  date.toLocaleDateString('pt-br')

  return date
}

export const validateFile = (path: string): boolean => {
  const fileName = path.substring(path.lastIndexOf('\\') + 1)
  const file = new File([path], fileName, { type: 'image/jpeg' })

  if (!file || !file.name) {
    return false
  }

  const allowedExtensions = ['jpg', 'jpeg', 'png']
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (!extension || !allowedExtensions.includes(extension)) {
    return false
  }

  return true
}
