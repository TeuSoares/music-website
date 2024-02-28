import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  config.headers['Authorization'] =
    getCookie('token') && `Bearer ${getCookie('token')}`
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      deleteCookie('token')
      window.location.href = '/login'
    } else {
      return Promise.reject(error)
    }
  },
)

export { api }
