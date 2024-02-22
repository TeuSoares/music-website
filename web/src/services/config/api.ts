import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'

const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api` })

api.defaults.withCredentials = true
api.defaults.withXSRFToken = true
api.defaults.headers.options = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getCookie('token')}`,
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      await api.post('logout')
      deleteCookie('token')
      window.location.href = '/login'
    } else {
      return Promise.reject(error)
    }
  },
)

export { api }
