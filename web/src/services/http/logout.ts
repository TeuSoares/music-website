import { api } from '../config/api'

export const logout = async () => {
  const { data } = await api.post('logout')
  return data
}
