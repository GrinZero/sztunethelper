import { Host } from '@renderer/api'

// TODO: 在electron和web共享代码
const getHostContent = (list: Host[]) => {
  const content = list
    .filter((item) => item.open)
    .map((item) => `\n# --- #${item.name}# ---\n${item.content}`)
    .join('\n')

  return content
}

export default getHostContent
