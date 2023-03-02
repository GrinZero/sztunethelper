import { exec as _exec } from 'child_process'
import { spawn as _spawn } from 'cross-spawn'
import iconv from 'iconv-lite'

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    process.platform === 'win32'
      ? _exec(cmd, { encoding: 'buffer' }, (err, stdout, stderr) => {
          if (err) {
            reject(err.message)
          }
          resolve({
            stdout: iconv.decode(stdout, 'gbk'),
            stderr: iconv.decode(stderr, 'gbk')
          })
        })
      : _exec(cmd, (err, stdout, stderr) => {
          if (err) {
            reject(err.message)
          }
          resolve({ stdout, stderr })
        })
  })
}

export const spawn = (cmd: string, timeout = 6666) => {
  const [command, ...args] = cmd.split(' ')
  const spawnInstance = _spawn(command, args, {
    stdio: 'pipe',
    cwd: process.cwd(),
    ...process.env
  })

  spawnInstance.stdout.pipe(process.stdout)
  spawnInstance.stderr.pipe(process.stderr)
  const result: string[] = []
  spawnInstance.stdout.on('data', (data) => {
    result.push(process.platform === 'win32' ? iconv.decode(data, 'gbk') : data.toString())
  })
  spawnInstance.stderr.on('data', (data) => {
    result.push(process.platform === 'win32' ? iconv.decode(data, 'gbk') : data.toString())
  })
  return new Promise<string>((resolve) => {
    const timeID = setTimeout(() => {
      spawnInstance.kill()
      resolve(result.join(''))
    }, timeout)
    spawnInstance.on('error', () => {
      resolve(result.join(''))
      clearTimeout(timeID)
    })

    spawnInstance.on('close', () => {
      resolve(result.join(''))
      clearTimeout(timeID)
    })
  })
}
