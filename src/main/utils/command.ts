import { exec as _exec } from 'child_process'
import { spawn as _spawn } from 'cross-spawn'

export const exec = (cmd: string): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    _exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err.message)
      }
      resolve({ stdout, stderr })
    })
  })
}

export const spawn = (cmd: string, timeout = 6666, commandLine = false) => {
  const [command, ...args] = cmd.split(' ')
  const spawnInstance = _spawn(command, args, {
    stdio: 'pipe'
  })
  if (commandLine) {
    spawnInstance.stdout.pipe(process.stdout)
    spawnInstance.stderr.pipe(process.stderr)
  }
  const result: string[] = []
  spawnInstance.stdout.on('data', (data) => {
    result.push(data.toString())
  })
  return new Promise<string>((resolve) => {
    const timeID = setTimeout(() => {
      spawnInstance.kill()
      resolve(result.join(''))
    }, timeout)
    spawnInstance.on('close', () => {
      resolve(result.join(''))
      clearTimeout(timeID)
    })
  })
}
