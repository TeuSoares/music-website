import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

const withCredentials = true

const headers = {
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getCookie('token')}`,
}

const api = axios.create({
  baseURL,
  withCredentials,
  headers,
})

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
