import got from 'got'

export const getPublicIP = async () => {
  const result = await got.get('https://api-v3.speedtest.cn/ip')
  // const result = await got.get('https://api.ipify.org?format=json')
  console.log('result', result.body)
}

export default getPublicIP
