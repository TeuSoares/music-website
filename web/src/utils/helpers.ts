export const builderQueryParams = (data: { [attr: string]: any }) =>
  new URLSearchParams(data).toString()

export const setHours = (hours: number) => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  date.toLocaleDateString('pt-br')

  return date
}
