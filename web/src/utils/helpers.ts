export const builderQueryParams = (data: { [attr: string]: any }) =>
  new URLSearchParams(data).toString()

export const setHours = (hours: number): Date => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  date.toLocaleDateString('pt-br')

  return date
}

export const validateFile = (file: File): boolean => {
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

export const convertInFileList = (path: string) => {
  const blob: Blob = new Blob([path], { type: 'image/jpeg' })

  const file: File = new File([blob], 'updated_file.jpg', {
    type: 'image/jpeg',
  })

  const dataTransfer = new DataTransfer()

  const files = [file]

  files.forEach((file) => {
    dataTransfer.items.add(file)
  })

  return dataTransfer.files
}
