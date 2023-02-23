import axios from 'axios'

let token = localStorage.getItem('token')
const axiosClient = axios.create({
  baseURL: 'http://10.161.154.223:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

axiosClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use((config) => {
  if (config.data?.token) {
    localStorage.setItem('token', config.data.token)
    token = config.data.token
  }
  return config
})

export default axiosClient
