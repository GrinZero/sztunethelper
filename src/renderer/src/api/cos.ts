import * as qiniu from 'qiniu-js'

export const UPLOAD_DOMAIN = 'https://cos.sztulives.cn/'

export interface KeyOptions {
  username: string
  id: number | string
  filename: string
}
export const getKey = ({ username, id, filename }: KeyOptions) => {
  const PrefixPATH = `nethelper/${username}/${id}/`
  return `${PrefixPATH}${new Date().format('HH-mm-ss')}_${Math.random()
    .toString(36)
    .substr(2)}_${filename}`
}

export interface UploadFileResult {
  key: string
  hash: string
  h: number | null
  w: number | null
}

export const uploadFile = async (
  file: File,
  keyOptions: KeyOptions,
  type: 'file' | 'img' = 'file'
) => {
  const token = sessionStorage.getItem('uploadToken')
  if (!token) throw new Error('No token found in sessionStorage')
  const config = {
    useCdnDomain: true
  }
  const putExtra = {
    fname: file.name
  }

  let newFile = file
  if (type === 'img') {
    newFile = (
      await qiniu.compressImage(file, {
        quality: 0.92,
        noCompressIfLarger: true
      })
    ).dist as File
  }
  const key = getKey(keyOptions)
  const observable = qiniu.upload(newFile, key, token, putExtra, config)

  return new Promise((resolve, reject) => {
    observable.subscribe({
      error(err) {
        reject(err)
      },
      complete(res) {
        resolve(res)
      }
    })
  })
}
