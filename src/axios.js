import axios from 'axios'
import { useLocalStorage } from './service/local-starage-service'
import router from './router'


axios.defaults.baseURL =import.meta.env.VITE_BACKEND_URL


axios.interceptors.request.use(request => {
  const { token } = useLocalStorage()
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})
window.VITE_CLIENT_NAME= import.meta.env.VITE_CLIENT_NAME;

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    console.log('axios main response', response)
    const res = response.status
    console.log('ggg intercepted response new', response?.data?.error_code)
    if (!response?.data?.success) {
      console.log('failed response', response?.data?.error_code)
      if (response?.data?.error_code === 401) {
        console.log('expired session here')
        useLocalStorage().clearSession()

        router.push('/login')
      } else {
        // Handle else
      }
      return response
    }
    if (response?.data?.error_code === 401) {
      useLocalStorage().clearSession()

      router.push('/login')
    }
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('intercepted error')
    if (error?.response?.status === 401) {
      useLocalStorage().clearSession()

      router.push('/login')
    }
    return Promise.reject(error)
  }
)
// axios.defaults.baseURL = 'https://projectdental.nl/staging-backend/api/patients/'

// axios.defaults.baseURL = 'https://192.168.1.32:8001/staging-backend/api/patients/'
//
export default axios
