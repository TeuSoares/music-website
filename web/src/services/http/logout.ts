import { api } from '../config/api'

export const handleLogout = async () => {
  return await api.post('logout')
}
