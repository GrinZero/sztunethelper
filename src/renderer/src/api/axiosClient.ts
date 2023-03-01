import axios from 'axios'
import { history } from '@renderer/utils'

let token = localStorage.getItem('token')
const axiosClient = axios.create({
  baseURL: 'https://nethelper.sztulives.cn',
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

axiosClient.interceptors.response.use(
  (config) => {
    if (config.data?.token) {
      localStorage.setItem('token', config.data.token)
      token = config.data.token
    }
    return config
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('token')
      token = ''
      console.warn('token expired, redirect to login page')
      history.push('/mail_config')
    }
    return Promise.reject(err)
  }
)

export default axiosClient
