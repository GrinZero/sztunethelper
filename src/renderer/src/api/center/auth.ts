import axiosClient from '../axiosClient'

const sendVeirfyCode = async (mail: string) => {
  return await axiosClient.post('/public/sendVerifyCode', { mail })
}

const auth = async (mail: string, code: string) => {
  return await axiosClient.post('/public/auth', { mail, code })
}

export { sendVeirfyCode, auth }
