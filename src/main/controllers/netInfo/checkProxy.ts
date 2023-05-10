import { exec } from '../../utils'

export async function checkProxy() {
  let cmd, regex

  // 判断当前操作系统类型
  switch (process.platform) {
    case 'win32':
      cmd = 'netsh.exe winhttp show proxy'
      regex =
        /((当前\sWinHTTP\s代理服务器是)|(Current\sUser\s*Proxy\s*Settings))|(\s*直接访问\s*\(没有代理服务器\)\s*)|(\s*Direct\s*access\s*\(no\s*proxy\s*server\)\s*)/i
      break

    case 'darwin':
      cmd = 'networksetup -getwebproxy "Wi-Fi"'
      regex = /Enabled: Yes/
      break
    case 'linux':
      cmd = 'gsettings get org.gnome.system.proxy mode'
      regex = /manual/
      break
    default:
      return Promise.reject(new Error(`不支持的操作系统: ${process.platform}`))
  }

  // 执行系统命令
  const result = (await exec(cmd)).stdout
  const proxyEnabled = regex.test(result)

  return proxyEnabled
}
