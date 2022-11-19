import { exec, spawn } from '../../utils'

export const ping = async (ip: string) => {
  const cmd = `ping -c 1 ${ip}`
  return (await exec(cmd)).stdout
}

export const tracert = (ip: string) => {
  const cmd = process.platform === 'win32' ? `tracert ${ip}` : `traceroute ${ip}`
  return spawn(cmd, 6666)
}

export const ifconfig = async () => {
  const cmd = process.platform === 'win32' ? 'ipconfig /all' : 'ifconfig -a'
  return (await exec(cmd)).stdout
}

export const netstat = async () => {
  const cmd = 'netstat -a'
  return spawn(cmd, 5000)
}

export const arp = async () => {
  const cmd = 'arp -a'
  return spawn(cmd, 5000)
}
